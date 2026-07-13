import { Component } from '@angular/core';
import { Nav } from './nav/nav';
import { Table } from './table/table';
import { Filter } from './filter/filter';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [Nav, Filter, Table,],
  templateUrl: './time-table.html',
  styleUrls: ['./time-table.css'],
})
export class Timetable {

  grade = 'Grade 10';
  classId: number | null = null;

  onFilterChanged(event: any) {
    this.grade = event.grade;
    const parsed = Number(event.classId);
    this.classId = !isNaN(parsed) && parsed > 0 ? parsed : null;
  }
}