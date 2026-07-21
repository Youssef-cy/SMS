import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

// ─── API shapes (mirror the backend DTOs) ────────────────────────────────────

interface ClassResponse {
  id: number;
  name: string;
  displayName: string;
  studentCount: number;
}

interface SessionAttendanceResponse {
  sessionId: number;
  periodNumber: number;
  courseName: string;
  startAt: string;
  endAt: string;
  status: 'P' | 'A' | 'E' | null; // null = not yet recorded
}

interface StudentAttendanceRowResponse {
  studentId: number;
  fullName: string;
  initials: string;
  className: string;
  sessions: SessionAttendanceResponse[];
}

interface AttendanceGridResponse {
  classId: number;
  className: string;
  date: string;
  studentCount: number;
  sessions: SessionAttendanceResponse[]; // column headers
  rows: StudentAttendanceRowResponse[];
}

// ─── Component ────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
})
export class Attendance implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);

  // ── State ─────────────────────────────────────────────────────────────────
  readonly today = new Date();
  readonly currentDate = this.today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  selectedDate: Date = this.today;

  allClasses = signal<ClassResponse[]>([]);
  selectedClass = signal<ClassResponse | null>(null);

  grid = signal<AttendanceGridResponse | null>(null);

  /** Column headers — derived from the top-level sessions in the grid response */
  sessions = computed(() => this.grid()?.sessions ?? []);

  /** Student rows with mutable local attendance map  */
  rows = computed(() => this.grid()?.rows ?? []);

  loading = signal(false);

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.loadClasses();
  }

  // ── Data loading ──────────────────────────────────────────────────────────
  loadClasses(): void {
    this.http.get<ClassResponse[]>('http://localhost:8080/api/v1/attendance/classes').subscribe({
      error: (err) => {
        console.error('Failed to load classes', err);
      },
      next: (classes) => {
        this.allClasses.set(classes);
        if (classes.length > 0) {
          this.onClassChange(classes[0]);
        }
      },
    });
  }

  onClassChange(cls: ClassResponse): void {
    this.selectedClass.set(cls);
    this.loadGrid(cls.id);
  }

  loadGrid(classId: number): void {
    this.loading.set(true);
    const dateStr = this.selectedDate.toISOString().split('T')[0]; // yyyy-MM-dd
    const params = new HttpParams().set('classId', classId.toString()).set('date', dateStr);

    this.http
      .get<AttendanceGridResponse>('http://localhost:8080/api/v1/attendance/grid', {
        params,
      })
      .subscribe({
        error: (err) => {
          console.error('Failed to load grid', err);
          this.loading.set(false);
        },
        next: (gridData) => {
          this.grid.set(gridData);
          this.loading.set(false);
        },
      });
  }

  // ── Date Change Handler ────────────────────────────────────────────────────
  onDateChange(): void {
    const cls = this.selectedClass();
    if (cls) {
      this.loadGrid(cls.id);
    }
  }

  // ── Stats ─────────────────────────────────────────────────────────────────

  private dayStatus(row: StudentAttendanceRowResponse): 'P' | 'A' | 'E' | null {
    const statuses = row.sessions.map((s) => s.status);
    if (statuses.length === 0) return null;
    if (statuses.includes('P')) return 'P';
    if (statuses.includes(null)) return null;
    if (statuses.every((s) => s === 'E')) return 'E';
    return 'A';
  }

  presentCount = computed(() => {
    let count = 0;
    for (const row of this.rows()) {
      if (this.dayStatus(row) === 'P') count++;
    }
    return count;
  });

  absentCount = computed(() => {
    let count = 0;
    for (const row of this.rows()) {
      if (this.dayStatus(row) === 'A') count++;
    }
    return count;
  });

  permissionCount = computed(() => {
    let count = 0;
    for (const row of this.rows()) {
      if (this.dayStatus(row) === 'E') count++;
    }
    return count;
  });

  // ── Excel Export Trigger ──────────────────────────────────────────────────
  onExportClick(): void {
    const gridData = this.grid();
    if (gridData) {
      this.exportToExcel(gridData);
    }
  }

  // ── Excel Export ─────────────────────────────────────────────────────────
  async exportToExcel(gridData: AttendanceGridResponse) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attendance');

    // 1. Define Columns
    const columns: Partial<ExcelJS.Column>[] = [
      { header: 'STUDENT NAME', key: 'name', width: 25 },
      { header: 'CLASS', key: 'className', width: 15 },
    ];
    for (const sess of gridData.sessions) {
      columns.push({ header: `PERIOD ${sess.periodNumber}`, key: `p${sess.sessionId}`, width: 12 });
    }
    worksheet.columns = columns;

    // 2. Format Header Row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF8B152D' }, // Maroon color matching UI
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.height = 25;

    // 3. Add Rows
    for (const row of gridData.rows) {
      const rowData: any = {
        name: row.fullName,
        className: row.className,
      };
      
      for (const sess of row.sessions) {
        rowData[`p${sess.sessionId}`] = sess.status === 'P' ? 'Present' 
                                      : sess.status === 'A' ? 'Absent' 
                                      : sess.status === 'E' ? 'Permission' 
                                      : '-';
      }
      
      const addedRow = worksheet.addRow(rowData);
      addedRow.height = 20;
      addedRow.alignment = { vertical: 'middle', horizontal: 'center' };
      
      // Left align the student name
      addedRow.getCell(1).alignment = { vertical: 'middle', horizontal: 'left' };

      // 4. Color Code Attendance Cells
      for (let i = 0; i < gridData.sessions.length; i++) {
        const colIndex = i + 3; // Columns are 1-based, 1=name, 2=class
        const cell = addedRow.getCell(colIndex);
        if (cell.value === 'Present') {
          cell.font = { color: { argb: 'FF059669' }, bold: true };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD1FAE5' } };
        } else if (cell.value === 'Absent') {
          cell.font = { color: { argb: 'FFE11D48' }, bold: true };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFE4E6' } };
        } else if (cell.value === 'Permission') {
          cell.font = { color: { argb: 'FF2563EB' }, bold: true };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDBEAFE' } };
        }
      }
    }

    // 5. Add Borders to all cells
    worksheet.eachRow((row: any) => {
      row.eachCell((cell: any) => {
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFDDDDDD' } },
          left: { style: 'thin', color: { argb: 'FFDDDDDD' } },
          bottom: { style: 'thin', color: { argb: 'FFDDDDDD' } },
          right: { style: 'thin', color: { argb: 'FFDDDDDD' } },
        };
      });
    });

    // 6. Generate File and Trigger Download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const fileName = `Attendance_${gridData.className}_${gridData.date}.xlsx`;
    saveAs(blob, fileName);
  }

}
