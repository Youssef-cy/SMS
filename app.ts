import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employees } from './feature/employees/employees';
import { AddEmp } from "./feature/add-emp/add-emp";
import { Materials } from './feature/materials/materials';
import { Reports } from "./feature/reports/reports";
import { Dashboard } from './feature/dashboard/dashboard';
import { ExamSchedule } from "./feature/exam-schedule/exam-schedule";
import { CreateExam } from "./feature/create-exam/create-exam";
import { Notifications } from './feature/notifications/notifications';
import { CreateNotifications } from "./feature/create-notifications/create-notifications";
import { SIdeNav } from "./layout/side-nav/side-nav";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Employees, AddEmp, Materials, Reports, Dashboard, ExamSchedule, CreateExam, Notifications, CreateNotifications, SIdeNav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SMS');
}
