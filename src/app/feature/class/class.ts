import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClassFormComponent } from './create-class/form-group';
import { ClassService } from '../../core/service/class.service';
import { GradeService } from '../../core/service/grade-service';
import { ClassRES } from '../../core/model/class-res';
import { GradeRES } from '../../core/model/grade-res';
import swal from 'sweetalert2';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-class',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './class.html',
  styleUrl: './class.css',
})
export class Class implements OnInit {

  allClasses = signal<ClassRES[]>([]);
  grades = signal<GradeRES[]>([]);
  selectedGradeId = signal<number | null>(null);
  loading = signal<boolean>(false);
  selectedClassIds = signal<Set<number>>(new Set());

  classes = computed(() => {
    const gradeId = this.selectedGradeId();
    const allGrades = this.grades();
    const allCls = this.allClasses();
    if (gradeId !== null && allGrades.length > 0) {
      const selectedGradeObj = allGrades.find(g => g.id == gradeId);
      if (selectedGradeObj) {
        return allCls.filter(c => c.grade === selectedGradeObj.grade);
      }
    }
    return [];
  });

  constructor(
    private dialog: MatDialog,
    private classService: ClassService,
    private gradeService: GradeService
  ) {}

  ngOnInit(): void {
    this.loading.set(true);
    console.log("SMS_DEBUG: Fetching grades from GradeService...");
    this.gradeService.getAllGrades().subscribe({
      next: (res) => {
        console.log("SMS_DEBUG: Grades received successfully from backend:", res);
        this.grades.set(res || []);
        if (this.grades().length > 0) {
          this.selectedGradeId.set(this.grades()[0].id);
          console.log("SMS_DEBUG: Selected default Grade ID:", this.selectedGradeId());
        } else {
          console.warn("SMS_DEBUG: Received empty grades list from backend.");
        }
        this.loadClasses();
      },
      error: (err) => {
        console.error("SMS_DEBUG: Error fetching grades from backend:", err);
        this.loading.set(false);
      }
    });
  }

  loadClasses(): void {
    this.loading.set(true);
    console.log("SMS_DEBUG: Fetching classes from ClassService...");
    this.classService.getAllClasses().subscribe({
      next: (res) => {
        console.log("SMS_DEBUG: Classes received successfully from backend:", res);
        this.allClasses.set(res || []);
        this.selectedClassIds.set(new Set()); // clear selections when data changes
        this.loading.set(false);
      },
      error: (err) => {
        console.error("SMS_DEBUG: Error fetching classes from backend:", err);
        this.loading.set(false);
        swal.fire('Error', 'Failed to load classes', 'error');
      }
    });
  }

  onGradeChange(gradeId: any): void {
    const id = gradeId ? Number(gradeId) : null;
    this.selectedGradeId.set(id);
    this.selectedClassIds.set(new Set());
  }

  openDilog(classObj?: ClassRES) {
    const dialogRef = this.dialog.open(ClassFormComponent, {
      width: '1000px',
      data: classObj || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClasses();
      }
    });
  }

  toggleSelection(classId: number): void {
    this.selectedClassIds.update(set => {
      const next = new Set(set);
      if (next.has(classId)) {
        next.delete(classId);
      } else {
        next.add(classId);
      }
      return next;
    });
  }

  deleteClass(id: number): void {
    swal.fire({
      title: 'Delete Class?',
      text: 'Are you sure you want to delete this class?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading.set(true);
        this.classService.deleteClass(id).subscribe({
          next: () => {
            swal.fire('Deleted!', 'Class has been deleted.', 'success');
            this.selectedClassIds.update(set => {
              const next = new Set(set);
              next.delete(id);
              return next;
            });
            this.loadClasses();
          },
          error: (err) => {
            console.error(err);
            this.loading.set(false);
            if (err.status === 409) {
              swal.fire('Conflict!', 'Cannot delete class because it contains students or is linked to other records.', 'error');
            } else {
              swal.fire('Error!', 'Failed to delete class.', 'error');
            }
          }
        });
      }
    });
  }

  deleteSelectedClasses(): void {
    const selectedIds = this.selectedClassIds();
    if (selectedIds.size === 0) return;

    swal.fire({
      title: 'Delete Selected Classes?',
      text: `Are you sure you want to delete ${selectedIds.size} selected classes?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete them!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading.set(true);
        const deleteObservables = Array.from(selectedIds).map(id => this.classService.deleteClass(id));
        
        forkJoin(deleteObservables).subscribe({
          next: () => {
            swal.fire('Deleted!', 'Selected classes have been deleted.', 'success');
            this.selectedClassIds.set(new Set());
            this.loadClasses();
          },
          error: (err) => {
            console.error(err);
            this.loading.set(false);
            if (err.status === 409) {
              swal.fire('Conflict!', 'Some selected classes cannot be deleted because they contain students or are linked to other records.', 'error');
            } else {
              swal.fire('Error!', 'Failed to delete some or all selected classes.', 'error');
            }
          }
        });
      }
    });
  }
}
