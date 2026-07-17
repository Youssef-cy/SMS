import { NgForm } from '@angular/forms';
import { Component, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Exam } from '../../../core/service/exam';
import { ExamREQ } from '../../../core/model/exam-req';
import { CancelBtn } from "../../../shared/cancel-btn/cancel-btn";
import { SaveBtn } from "../../../shared/save-btn/save-btn";
import { PublishBtn } from "../../../shared/publish-btn/publish-btn";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-exam',
  standalone: true,
  imports: [FormsModule, CancelBtn, SaveBtn, PublishBtn],
  templateUrl: './create-exam.html',
  styleUrl: './create-exam.css'
})
export class CreateExamComponent {
  constructor(
    private examService: Exam,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() private dialogRef: MatDialogRef<CreateExamComponent>
  ) {
    if (this.data) {
      this.isEditMode = true;
      this.editId = this.data.id;
      let parsedGradeId = 0;
      if (this.data.gradeName === 'Grade 10') parsedGradeId = 1;
      else if (this.data.gradeName === 'Grade 11') parsedGradeId = 2;
      else if (this.data.gradeName === 'Grade 12') parsedGradeId = 3;

      this.exam = {
        courseName: this.data.courseName,
        duration: this.data.duration,
        gradeId: parsedGradeId,
        committeeName: this.data.committeeName,
        examDate: this.data.examDate,
        examTime: this.data.examTime ? this.data.examTime.substring(0, 5) : '',
        status: this.data.status,
        examType: this.data.examType
      };
    }
  }

  isEditMode = false;
  editId: number | null = null;

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

  if (this.isEditMode && this.editId) {
    this.examService.updateExam(this.editId, this.exam).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Exam Updated Successfully',
          confirmButtonColor: '#0F2747'
        });
        if (this.dialogRef) {
          this.dialogRef.close(true);
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Unable to update exam.'
        });
      }
    });
  } else {
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

    if (this.dialogRef) {
      this.dialogRef.close(true);
    }

  },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Unable to create exam.'
        });
      }

    });
  }

}
}