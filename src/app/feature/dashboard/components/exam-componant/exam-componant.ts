import { Component, signal } from '@angular/core';
import { Exam } from '../../../../core/service/exam';
import { ExamRES } from '../../../../core/model/exam-res';
import { DashboardS } from '../../../../core/service/dashboard';
import { DashboardI } from '../../../../core/model/dashboardI';

@Component({
  selector: 'app-exam-componant',
  imports: [],
  templateUrl: './exam-componant.html',
  styleUrl: './exam-componant.css',
})
export class ExamComponant {

  
  constructor(private dashboard:DashboardS){}
  
    examData = signal<DashboardI | null>(null)
  
  ngOnInit() {
    this.getExam()
  }

  getExam(){
    this.dashboard.getDashboardContent().subscribe({
      next:(data)=>{
        this.examData.set(data)
      }
    })
  }

  
}
