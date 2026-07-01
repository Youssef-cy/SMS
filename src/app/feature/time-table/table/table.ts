import {CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { signal } from '@angular/core';

import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DashboardI } from '../../../core/model/dashboardI';
import { DashboardS } from '../../../core/service/dashboard';
interface Session {
  subject: string;
  teacher: string;
  colorClass: string;
}

@Component({
  selector: 'app-table',
  imports: [DragDropModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {

  data = signal<DashboardI>({} as DashboardI)
  
  constructor(private dashboard:DashboardS) {}

  ngOnInit(): void {
    this.get();
  }
  get(){
    this.dashboard.getDashboardContent().subscribe({
      next:(data)=>{
        console.log(data);
        this.data.set(data);
      }
    });
  }





  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

  columns = [
    { type: 'day' as const },
    { type: 'period' as const, label: '8:00 - 8:50', periodIdx: 0 },
    { type: 'period' as const, label: '8:50 - 9:40', periodIdx: 1 },
    { type: 'period' as const, label: '9:40 - 10:30', periodIdx: 2 },
    { type: 'break' as const, label: 'Break' },
    { type: 'period' as const, label: '11:00 - 11:50', periodIdx: 3 },
    { type: 'period' as const, label: '11:50 - 12:40', periodIdx: 4 },
    { type: 'period' as const, label: '12:40 - 1:30', periodIdx: 5 },
    { type: 'break' as const, label: 'Break' },
    { type: 'period' as const, label: '1:50 - 2:40', periodIdx: 6 },
    { type: 'period' as const, label: '2:40 - 3:30', periodIdx: 7 },
  ];

  teachers = [
    { name: 'Hala Nasser', subject: 'IT', colorClass: 'pink' },
    { name: 'Wael Ahmed', subject: 'English', colorClass: 'blue' },
    { name: 'Rasha Samir', subject: 'Mathematics', colorClass: 'green' },
    { name: 'Sayed Ibrahim', subject: 'Physics', colorClass: 'purple' },
    { name: 'Khaled Omar', subject: 'Arabic / Religion', colorClass: 'orange' },
    { name: 'Maged Farouk', subject: 'Social Studies', colorClass: 'teal' },
    { name: 'Lamyaa / Ashraf', subject: 'PE', colorClass: 'pink' },
    { name: 'Youssef Ali', subject: 'Chemistry', colorClass: 'blue' },
  ];

  timetableData: Session[][][] = Array.from({ length: 5 }, () =>
    Array.from({ length: 8 }, () => [])
  );

  allSlotIds(): string[] {
    const ids = ['teacher-list'];
    for (let d = 0; d < 5; d++) {
      for (let p = 0; p < 8; p++) {
        ids.push(`slot-${d}-${p}`);
      }
    }
    return ids;
  }

  getListId(dayIdx: number, periodIdx: number): string {
    return `slot-${dayIdx}-${periodIdx}`;
  }

  drop(event: CdkDragDrop<any>) {
    const sourceData: any[] = event.previousContainer.data;
    const targetData: any[] = event.container.data;

    if (event.previousContainer === event.container) {
      return;
    }

    const isFromTeachers = event.previousContainer.id === 'teacher-list';

    if (isFromTeachers) {
      const teacher = sourceData[event.previousIndex];
      targetData.push({
        subject: teacher.subject,
        teacher: teacher.name,
        colorClass: teacher.colorClass,
      });
    } else {
      if (targetData.length === 0) {
        transferArrayItem(sourceData, targetData, event.previousIndex, event.currentIndex);
      } else {
        const dragged = sourceData.splice(event.previousIndex, 1)[0];
        const target = targetData.splice(event.currentIndex, 1, dragged)[0];
        sourceData.splice(event.previousIndex, 0, target);
      }
    }
  }

  getAvatarInitial(name: string): string {
    return name.charAt(0);
  }




}
