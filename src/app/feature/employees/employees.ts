import { Component } from '@angular/core';
import { RemoveBtn } from "../../shared/remove-btn/remove-btn";
import { ViewBtn } from "../../shared/view-btn/view-btn";
import { AddBtn } from "../../shared/add-btn/add-btn";

@Component({
  selector: 'app-employees',
  imports: [RemoveBtn, ViewBtn, AddBtn],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees {

  
}

