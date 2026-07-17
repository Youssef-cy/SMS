import { Component, OnInit, signal, computed } from '@angular/core';
import { RemoveBtn } from '../../shared/remove-btn/remove-btn';
import { ViewBtn } from '../../shared/view-btn/view-btn';
import { AddBtn } from '../../shared/add-btn/add-btn';
import { AddEmp } from './add-emp/add-emp';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { WorkerService } from '../../core/service/worker-service';
import { TopBanner } from "./Components/top-banner/top-banner";
import { Table } from "./Components/table/table";
import { OverView } from "./Components/over-view/over-view";
import { WorkersComponent } from "./Components/filter-bar/filter-bar";

@Component({
  selector: 'app-employees',
  imports: [ViewBtn, AddBtn, RouterLink, TopBanner, Table, OverView, WorkersComponent],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees  {
 
}