import { Component } from '@angular/core';
import { CdkDropList } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-table',
  imports: [CdkDropList],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
 public teachers: any[] = []; 

  constructor() {
    // Initialize or fetch your data here
    this.teachers = [
      { name: 'John Doe' },
      { name: 'Jane Smith' }
    ];
  }

  drop(event: any) {
    // Your drop logic
  }
  public allSlotIds(): string[] {
    // Return the array of IDs that this drop list should connect to
    return ['slot1', 'slot2', 'slot3']; 
  }
  public getAvatarInitial(name: string): string {
    if (!name) return '';
    return name.charAt(0).toUpperCase();
  }
  public columns: any[] = [
    { type: 'break', label: 'Morning Break' },
    { type: 'period', label: 'Period 1' },
    { type: 'period', label: 'Period 2' }
  ];
  public days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  public getListId(dayIdx: number, periodIdx: number): string {
    // Return a unique string ID based on the provided indices
    return `slot-${dayIdx}-${periodIdx}`;
  }
  public timetableData: any[][] = [
    // Initialize with your expected data structure
    [], 
    []
  ];
  public openDialog(): void {
    // Logic to open your dialog goes here
    console.log('Dialog opening...');
  }
}
