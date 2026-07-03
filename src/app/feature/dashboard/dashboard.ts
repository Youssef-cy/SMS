import { Component, signal } from '@angular/core';
import { EditBtn } from "../../shared/edit-btn/edit-btn";
import { DashboardS } from '../../core/service/dashboard';
import { DashboardI } from '../../core/model/dashboardI';
import { RouterLink } from "@angular/router";
import { ExamSchedule } from '../exam-schedule/exam-schedule';
import { Exam } from '../../core/service/exam';
import { ExamRES } from '../../core/model/exam-res';

@Component({
  selector: 'app-dashboard',
  imports: [EditBtn, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  constructor(private content:DashboardS,private exam:Exam){}
  
    data = signal<DashboardI | null>(null);
    examData = signal<ExamRES[]>([])
  
  ngOnInit() {
    this.getAllDashboard();
    this.getExam()
  }


  getAllDashboard(){
    this.content.getDashboardContent().subscribe({next:(data)=>{
        console.log(data);
        this.data.set(data);
      }
    });

  }


  getExam(){
    this.exam.getExam().subscribe({
      next:(data)=>{
        this.examData.set(data)
      }
    })
  }
  
}
