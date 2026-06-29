import { Component } from '@angular/core';
import { CancelBtn } from "../../shared/cancel-btn/cancel-btn";
import { SaveBtn } from "../../shared/save-btn/save-btn";
import { PublishBtn } from '../../shared/publish-btn/publish-btn';
@Component({
  selector: 'app-create-exam',
  imports: [CancelBtn, SaveBtn, PublishBtn],
  templateUrl: './create-exam.html',
  styleUrl: './create-exam.css',
})
export class CreateExam {

}
