import { NgForm } from '@angular/forms';
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


createExam(form: NgForm) {

  if (form.invalid) {
    form.control.markAllAsTouched();
    return;
  }

  console.log(form.value)

  this.examService.createExam(this.exam).subscribe({
   next: () => {

  Swal.fire({
    icon: 'success',
    title: 'Exam Created Successfully',
    html: `
      <div style="text-align:left">
        <p><strong>Subject:</strong> ${this.exam.courseName}</p>
        <p><strong>Date:</strong> ${this.exam.examDate}</p>
      </div>
    `,
    confirmButtonColor: '#0F2747'
  });

  form.resetForm({
    status: 'Scheduled',
    gradeId: 0,
    courseName: '',
    committeeName: '',
    examDate: '',
    examTime: '',
    duration: 0,
    examType: ''
  });

},
    error: (err) => {
      console.log(err);

      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Unable to create exam.'
      });
    }

  });

}
}