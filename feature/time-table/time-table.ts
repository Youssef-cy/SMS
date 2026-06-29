import { Component } from '@angular/core';
import { Nav } from "./nav/nav";
import { Table } from "./table/table";
import { Filter } from './filter/filter';
@Component({
  selector: 'app-timetable',
  imports: [Nav, Table],
  templateUrl: './time-table.html',
  styleUrl: './time-table.css',
})
export class Timetable {

}
