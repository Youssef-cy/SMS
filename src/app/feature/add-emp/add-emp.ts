import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBtn } from '../../shared/add-btn/add-btn';
import { SaveBtn } from '../../shared/save-btn/save-btn';
import { CancelBtn } from "../../shared/cancel-btn/cancel-btn";

@Component({
  selector: 'app-add-emp',
  standalone: true,
  imports: [
    CommonModule,
    AddBtn,
    SaveBtn,
    CancelBtn
],
  templateUrl: './add-emp.html',
  styleUrl: './add-emp.css',
})
export class AddEmp {

}