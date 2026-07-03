import { Component, OnInit, Input } from '@angular/core';
import { DragDropModule, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { forkJoin } from 'rxjs';

import { SessionsService } from '../../../core/service/session-service';
import { SessionRES } from '../../../core/model/session-res';
import { TeacherListRES } from '../../../core/model/teacher-list-res';
import { SessionREQ } from '../../../core/model/session-req';
import swal from 'sweetalert2';
import { AddBtn } from "../../../shared/add-btn/add-btn";
import { CancelBtn } from "../../../shared/cancel-btn/cancel-btn";


interface Column {
  type: string;
  label?: string;
  periodIdx?: any;
  start?: string;
  end?: string;
}

interface PeriodColumn extends Column {
  type: 'period';
  periodIdx: number;
  start: string;
  end: string;
}

interface Teacher {
  id: number;
  courseId: number;
  name: string;
  subject: string;
  colorClass: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [DragDropModule, AddBtn, CancelBtn],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnInit {
  constructor(private sessionsService: SessionsService) {}

  private _classId = 1;
  loading = false;

  @Input()
  set classId(value: any) {
    const parsed = Number(value);
    if (!isNaN(parsed) && parsed > 0) {
      const changed = this._classId !== parsed;
      this._classId = parsed;
      if (changed && this.teachers && this.teachers.length > 0) {
        this.loadSessions();
      }
    }
  }

  get classId(): number {
    return this._classId;
  }

  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

  columns: Column[] = [
    { type: 'day' },

    { type: 'period', label: '8:00 - 8:50', periodIdx: 0, start: '08:00:00', end: '08:50:00' },
    { type: 'period', label: '8:50 - 9:40', periodIdx: 1, start: '08:50:00', end: '09:40:00' },
    { type: 'period', label: '9:40 - 10:30', periodIdx: 2, start: '09:40:00', end: '10:30:00' },

    { type: 'break', label: 'Break' },

    { type: 'period', label: '11:00 - 11:50', periodIdx: 3, start: '11:00:00', end: '11:50:00' },
    { type: 'period', label: '11:50 - 12:40', periodIdx: 4, start: '11:50:00', end: '12:40:00' },
    { type: 'period', label: '12:40 - 1:30', periodIdx: 5, start: '12:40:00', end: '13:30:00' },

    { type: 'break', label: 'Break' },

    { type: 'period', label: '1:50 - 2:40', periodIdx: 6, start: '13:50:00', end: '14:40:00' },
    { type: 'period', label: '2:40 - 3:30', periodIdx: 7, start: '14:40:00', end: '15:30:00' },
  ];

  teachers: Teacher[] = [];


  timetableData: SessionRES[][][] = Array.from({ length: 5 }, () =>
    Array.from({ length: 8 }, () => []),
  );

  private readonly colorPalette: string[] = [
    'pink',
    'blue',
    'green',
    'purple',
    'orange',
    'teal',
    'red',
    'yellow',
    'indigo',
    'cyan',
  ];
  private colorMap = new Map<string, string>();

  ngOnInit(): void {
    this.loadTeachers();
  }


  getTeacherColor(teacherName: string): string {
    if (this.colorMap.has(teacherName)) {
      return this.colorMap.get(teacherName)!;
    }

    const randomIndex = Math.floor(Math.random() * this.colorPalette.length);
    const color = this.colorPalette[randomIndex];

    this.colorMap.set(teacherName, color);

    return color;
  }

  // Type guard: narrows a Column down to the 'period' variant
  private isPeriodColumn(c: Column): c is PeriodColumn {
    return c.type === 'period';
  }

  loadTeachers() {
    this.loading = true;
    this.sessionsService.getAllTeachers().subscribe({
      next: (res: TeacherListRES[]) => {
        this.teachers = res.map((t) => ({
          id: t.id,
          courseId: t.id, // Map courseId to t.id because backend TeacherListRES only has "id"
          name: t.teacherName,
          subject: t.courseName,
          colorClass: this.getTeacherColor(t.teacherName),
        }));
        // Load sessions after teachers are loaded to map existing courses
        this.loadSessions();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  private normalizeTime(timeStr: string): string {
    if (!timeStr) return '';
    if (timeStr.includes(' ')) {
      timeStr = timeStr.split(' ')[1];
    } else if (timeStr.includes('T')) {
      timeStr = timeStr.split('T')[1];
    }
    const parts = timeStr.split(':');
    if (parts.length >= 2) {
      return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}`;
    }
    return timeStr;
  }

  loadSessions() {
    this.loading = true;
    this.sessionsService.getAllSessions(this.classId).subscribe({
      next: (sessions: SessionRES[]) => {
        // تنظيف الجدول
        this.timetableData = Array.from({ length: 5 }, () => Array.from({ length: 8 }, () => []));

        sessions.forEach((session) => {
          // البحث عن العمود المناسب حسب الوقت
          const column = this.columns.find(
            (col): col is PeriodColumn =>
              this.isPeriodColumn(col) &&
              this.normalizeTime(col.start) === this.normalizeTime(session.startAt) &&
              this.normalizeTime(col.end) === this.normalizeTime(session.endAt),
          );

          if (!column) {
            return;
          }

          // dayOfWeek عندك يبدأ من 1
          const dayIndex = Number(session.dayOfWeek) - 1;

          if (dayIndex < 0 || dayIndex > 4) {
            return;
          }

          // Find the teacher's courseId from this.teachers
          const matchedTeacher = this.teachers.find(
            (t) => t.name === session.teacherName && t.subject === session.courseName
          );
          const courseId = matchedTeacher ? matchedTeacher.courseId : undefined;

          // نمنع وجود أكتر من حصة في نفس الخانة حتى لو الباك اند رجّع بيانات مكررة/غلط
          const cell = this.timetableData[dayIndex][column.periodIdx];
          if (cell.length > 0) {
            console.warn(
              `Duplicate session ignored for day ${dayIndex}, period ${column.periodIdx}:`,
              session,
            );
            return;
          }

          cell.push({
            id: session.id, // Map backend "id" correctly
            courseId: courseId, // Resolved course ID
            className: session.className,
            courseName: session.courseName,
            teacherName: session.teacherName,
            dayOfWeek: Number(session.dayOfWeek),
            startAt: session.startAt,
            endAt: session.endAt,
          });
        });
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  allSlotIds(): string[] {
    const ids = ['teacher-list'];

    for (let day = 0; day < 5; day++) {
      for (let period = 0; period < 8; period++) {
        ids.push(`slot-${day}-${period}`);
      }
    }

    return ids;
  }

  getListId(day: number, period: number): string {
    return `slot-${day}-${period}`;
  }

  getAvatarInitial(name: string): string {
    return name.charAt(0).toUpperCase();
  }

  drop(event: CdkDragDrop<any>) {
    const sourceData = event.previousContainer.data;
    const targetData = event.container.data;

    if (event.previousContainer === event.container) {
      return;
    }

    const isTeacherList = event.previousContainer.id === 'teacher-list';

    // ========= Drag From Teacher List =========
    if (isTeacherList) {
      const teacher = sourceData[event.previousIndex];

      if (teacher.courseId == null) {
        console.error(`Teacher "${teacher.name}" has no courseId from the backend; drop ignored.`);
        return;
      }

      // الخانة مشغولة بالفعل بحصة أخرى -> نرفض الإفلات
      if (targetData.length > 0) {
        swal.fire('تنبيه', 'هذه الخانة مشغولة بالفعل بحصة أخرى', 'warning');
        return;
      }

      const ids = event.container.id.split('-');

      const dayIndex = Number(ids[1]);
      const periodIndex = Number(ids[2]);

      const column = this.columns.find(
        (c): c is PeriodColumn => this.isPeriodColumn(c) && c.periodIdx === periodIndex,
      );

      if (!column) {
        return;
      }

      targetData.push({
        courseId: teacher.courseId,
        className: '',
        courseName: teacher.subject,
        teacherName: teacher.name,
        dayOfWeek: dayIndex + 1,
        startAt: column.start,
        endAt: column.end,
      });

      return;
    }

    // ========= Move / Swap Between Cells =========
    const targetIds = event.container.id.split('-');
    const newDayIndex = Number(targetIds[1]);
    const newPeriodIndex = Number(targetIds[2]);

    const newColumn = this.columns.find(
      (c): c is PeriodColumn => this.isPeriodColumn(c) && c.periodIdx === newPeriodIndex,
    );

    if (!newColumn) {
      return;
    }

    const oldIds = event.previousContainer.id.split('-');
    const oldDayIndex = Number(oldIds[1]);
    const oldPeriodIndex = Number(oldIds[2]);
    const oldColumn = this.columns.find(
      (c): c is PeriodColumn => this.isPeriodColumn(c) && c.periodIdx === oldPeriodIndex,
    );

    if (targetData.length > 0) {
      // ===== الخانة الهدف مشغولة بالفعل -> نعمل Swap حقيقي بين الحصتين =====
      const movedItem = sourceData[event.previousIndex];
      const existingItem = targetData[0];

      sourceData.splice(event.previousIndex, 1);
      targetData.splice(0, 1);

      movedItem.dayOfWeek = newDayIndex + 1;
      movedItem.startAt = newColumn.start;
      movedItem.endAt = newColumn.end;
      targetData.push(movedItem);

      if (oldColumn) {
        existingItem.dayOfWeek = oldDayIndex + 1;
        existingItem.startAt = oldColumn.start;
        existingItem.endAt = oldColumn.end;
      }
      sourceData.push(existingItem);
    } else {
      // ===== الخانة الهدف فاضية -> نقل عادي =====
      transferArrayItem(sourceData, targetData, event.previousIndex, event.currentIndex);

      const movedItem = targetData[targetData.length - 1];
      if (movedItem) {
        movedItem.dayOfWeek = newDayIndex + 1;
        movedItem.startAt = newColumn.start;
        movedItem.endAt = newColumn.end;
      }
    }
  }

  save() {
    const requests: SessionREQ[] = [];

    for (let day = 0; day < this.timetableData.length; day++) {
      for (let period = 0; period < this.timetableData[day].length; period++) {
        this.timetableData[day][period].forEach((session) => {
          if (session.courseId == null) {
            console.warn(`Skipping session because courseId is missing/unresolved.`);
            return;
          }

          requests.push({
            classid: this.classId,
            courseid: session.courseId!,
            dayOfWeek: session.dayOfWeek,
            startAt: session.startAt,
            endAt: session.endAt,
            updated: new Date().toISOString().split('T')[0],
          });
        });
      }
    }

    if (requests.length === 0) {
      return;
    }

    console.log(requests);
    this.loading = true;

    const observables = requests.map((req) => this.sessionsService.addSession(req));

    forkJoin(observables).subscribe({
      next: (responses) => {
        console.log('Saved all successfully', responses);
        this.loadSessions();
        this.loading = false;
        swal.fire('Success', 'Sessions saved successfully', 'success');
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        swal.fire('Error', 'Failed to save sessions', 'error');
      },
    });
  }
}