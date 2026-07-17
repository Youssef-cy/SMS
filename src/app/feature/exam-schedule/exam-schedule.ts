import { Component, OnInit, signal } from '@angular/core';
import { Exam } from '../../core/service/exam';
import { ExamRES } from '../../core/model/exam-res';
import { MatDialog } from '@angular/material/dialog';
import {  CreateExamComponent } from '../create-exam/create-exam';
import { RouterLink } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam-schedule',
  imports: [RouterLink],
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
  const dialogRef = this.dilog.open(
    CreateExamComponent,{
      width:'400px'
    }
  );
  dialogRef.afterClosed().subscribe(res => {
    if (res) this.getExams();
  });
}

openEditDialog(exam: ExamRES) {
  const dialogRef = this.dilog.open(CreateExamComponent, {
    width: '400px',
    data: exam
  });

  dialogRef.afterClosed().subscribe(res => {
    if (res) this.getExams();
  });
}

deleteExam(id: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this exam!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#db5267',
    cancelButtonColor: '#0F2747',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.content.deleteExam(id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Exam has been deleted.',
            confirmButtonColor: '#0F2747'
          });
          this.getExams();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Could not delete exam.'
          });
        }
      });
    }
  });
}

}
