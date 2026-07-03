import { Component, OnInit, signal } from '@angular/core';
import { Exam } from '../../core/service/exam';
import { ExamRES } from '../../core/model/exam-res';
import { MatDialog } from '@angular/material/dialog';
import {  CreateExamComponent } from '../create-exam/create-exam';

@Component({
  selector: 'app-exam-schedule',
  imports: [],
  templateUrl: './exam-schedule.html',
  styleUrl: './exam-schedule.css',
})
export class ExamSchedule implements OnInit {

  constructor(private content:Exam,private dilog:MatDialog){}
  data = signal<ExamRES[]>([])
ngOnInit(): void {
  this.getExams()
}


getExams(){
  this.content.getExam().subscribe({
    next:(data)=>{
      console.log(data)
this.data.set(data)
    },error:(err)=>{
      console.log(err)
    }
  })
}

get groupedExams() {
  const groups: { [key: string]: ExamRES[] } = {};

  this.data().forEach(exam => {
    if (!groups[exam.gradeName]) {
      groups[exam.gradeName] = [];
    }
    groups[exam.gradeName].push(exam);
  });

  return Object.entries(groups);
}


opendilog(){
  this.dilog.open(
    CreateExamComponent,{
      width:'400px'
    }
    
  )
}


}
