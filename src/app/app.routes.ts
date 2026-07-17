import { Routes } from '@angular/router';
import { Dashboard } from './feature/dashboard/dashboard';
import { Employees } from './feature/employees/employees';
import { ExamSchedule } from './feature/exam-schedule/exam-schedule';
import { Reports } from './feature/reports/reports';
import { Materials } from './feature/materials/materials';
import { Timetable } from './feature/time-table/time-table';
import { Notifications } from './feature/notifications/notifications';
import { TopStudentsComponent } from './feature/top-student/top-student';
import { StudentsComponent } from './feature/student/student';
import { EmployeeProfile } from './feature/employees/employee-profile/employee-profile';
import { StudentProfile } from './feature/student-profile/student-profile';
import { Class } from './feature/class/class';
import { Attendance } from './feature/attendance/attendance';

export const routes: Routes = [
   {
        path: "",
        component: Dashboard
    },
    {
        path: "Employees",
        component: Employees
    },
    {
        path:"Students",
        component:StudentsComponent
    },
    {
        path:"notification",
        component:Notifications
    },
    {
        path:"TOP",
        component:TopStudentsComponent
    },
    {
        path: "Exam_schedule",
        component: ExamSchedule
    },
    {
        path: "Timetable",
        component: Timetable
    },
    {
        path:"Reports",
        component:Reports
    },
    {
        path:"Materials",
        component:Materials
    },
    {
        path:"teacherProfile/:id",
        component:EmployeeProfile
    },
    {
        path:"studentProfile/:id",
        component:StudentProfile

    },
    {
        path:"Class",
        component:Class

    },
    {
        path:"Attendance",
        component:Attendance
    }
    
    
];
