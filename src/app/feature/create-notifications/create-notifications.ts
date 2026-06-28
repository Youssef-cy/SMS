import { Component } from '@angular/core';
import { SaveBtn } from "../../shared/save-btn/save-btn";
import { PublishBtn } from '../../shared/publish-btn/publish-btn';
import { CancelBtn } from '../../shared/cancel-btn/cancel-btn';
@Component({
  selector: 'app-create-notifications',
  imports: [SaveBtn, CancelBtn, PublishBtn],
  templateUrl: './create-notifications.html',
  styleUrl: './create-notifications.css',
})
export class CreateNotifications {

}
