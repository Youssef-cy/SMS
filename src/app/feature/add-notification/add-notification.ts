import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notification } from '../../core/service/notification';

export interface NotificationFormValue {
  announcementType: string | null;
  title: string;
  priority: string | null;
  receiver: string | null;
  notes: string;
}

@Component({
  selector: 'app-create-notifications',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-notification.html',
  styleUrls: ['./add-notification.css']
})
export class CreateNotificationsComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() saveDraft = new EventEmitter<NotificationFormValue>();
  @Output() publish = new EventEmitter<NotificationFormValue>();

  announcementTypes = ['General', 'Maintenance', 'Event', 'Urgent'];
  priorities = ['Low', 'Medium', 'High'];
  people = ['All Residents', 'Building A', 'Building B', 'Staff Only'];

  form: FormGroup;

  constructor(private fb: FormBuilder,private create:Notification) {
    console.log("loadddded")
    this.form = this.fb.group({
      announcementType: [null, Validators.required],
      title: ['', Validators.required],
      priority: [null, Validators.required],
      receiver: [null, Validators.required],
      notes: ['']
    });
  }

  

  onCancel(): void {
    this.cancel.emit();
  }

  onSaveDraft(): void {
    this.saveDraft.emit(this.form.value);
  }

  onPublish(): void {
      console.log('Publish Clicked');
      
      if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.create.addNotification({
      title: this.form.value.title,
      body: this.form.value.notes,
      priority: this.form.value.priority,
      type: this.form.value.announcementType,
      sentDate: new Date().toISOString().split('T')[0] // yyyy-MM-dd
    }).subscribe({
  next: (data) => {
    console.log(data);
    this.publish.emit(this.form.value);
  },
  error: (err) => {
    console.log(err);
  }
});
console.log('Publish Clickedييي');
  }
}