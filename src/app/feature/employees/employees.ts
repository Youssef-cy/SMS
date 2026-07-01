import { Component, OnInit, signal } from '@angular/core';
import { RemoveBtn } from "../../shared/remove-btn/remove-btn";
import { ViewBtn } from "../../shared/view-btn/view-btn";
import { AddBtn } from "../../shared/add-btn/add-btn";
import { EmployeeS } from '../../core/service/employee-s';
import { TeacherI } from '../../core/model/teacher-i';
import { MatDialog } from '@angular/material/dialog';
import { AddEmp } from '../add-emp/add-emp';


@Component({
  selector: 'app-employees',
  imports: [RemoveBtn, ViewBtn, AddBtn],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees implements OnInit {

   constructor(private content:EmployeeS,private dialog:MatDialog){}
    
    data=signal<TeacherI[]>([]) ;
  
  
    
    ngOnInit() {
      this.getallTeacher();
    }
  
  
 getallTeacher() {
  this.content.getTeachers().subscribe({
    next: (data) => {
      console.log(data)
      this.data.set(data)
    },
    error: (err) => {
      console.error(err);
    }
  });
}



  
    openDialog(){
      this.dialog.open(AddEmp,{
        width: '400px'
      })
    }

}

