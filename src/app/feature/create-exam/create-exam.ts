import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Exam } from '../../core/service/exam';
import { ExamREQ } from '../../core/model/exam-req';
import { CancelBtn } from "../../shared/cancel-btn/cancel-btn";
import { SaveBtn } from "../../shared/save-btn/save-btn";
import { PublishBtn } from "../../shared/publish-btn/publish-btn";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-exam',
  standalone: true,
  imports: [FormsModule, CancelBtn, SaveBtn, PublishBtn],
  templateUrl: './create-exam.html',
  styleUrl: './create-exam.css'
})
export class CreateExamComponent {

  constructor(private examService: Exam) {}

  exam: ExamREQ = {
    courseName: '',
    duration: 0,
    gradeId: 0,
    committeeName: '',
    examDate: '',
    examTime: '',
    status: 'Scheduled',
    examType:''
  };

  createExam() {
    console.log(this.exam)
    this.examService.createExam(this.exam).subscribe({

      next: (res) => {
        console.log(res);
Swal.fire({ icon: 'success',
    title: 'Employee Created Successfully',
    html: `
      <div style="text-align:left">
        <p><strong>Subject:</strong> ${res.courseName}</p>
        <p><strong>Date:</strong> ${res.examDate}</p>
      </div>
    `,
    confirmButtonText: 'OK',
    confirmButtonColor: '#0F2747'})
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}