import { Component } from '@angular/core';
import { Nav } from './nav/nav';
import { Table } from './table/table';
import { Filter } from './filter/filter';

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [Nav, Filter, Table],
  templateUrl: './time-table.html',
  styleUrls: ['./time-table.css'],
})
export class Timetable {}