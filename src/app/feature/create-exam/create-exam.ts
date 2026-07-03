import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Exam } from '../../core/service/exam';
import { ExamREQ } from '../../core/model/exam-req';
import { CancelBtn } from "../../shared/cancel-btn/cancel-btn";
import { SaveBtn } from "../../shared/save-btn/save-btn";
import { PublishBtn } from "../../shared/publish-btn/publish-btn";

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
    status: 'Scheduled'
  };

  createExam() {
    console.log(this.exam)
    this.examService.createExam(this.exam).subscribe({

      next: (res) => {
        console.log(res);
        alert('Exam created successfully');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}