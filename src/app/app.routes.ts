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
import { Login } from './feature/login/login';
import { authGuard } from './core/service/auth-guard';

export const routes: Routes = [
    {
        path: "login",
        component: Login
    },
    {
        path: "",
        component: Dashboard,
        canActivate: [authGuard]
    },
    {
        path: "Employees",
        component: Employees,
        canActivate: [authGuard]
    },
    {
        path: "Students",
        component: StudentsComponent,
        canActivate: [authGuard]
    },
    {
        path: "notification",
        component: Notifications,
        canActivate: [authGuard]
    },
    {
        path: "TOP",
        component: TopStudentsComponent,
        canActivate: [authGuard]
    },
    {
        path: "Exam_schedule",
        component: ExamSchedule,
        canActivate: [authGuard]
    },
    {
        path: "Timetable",
        component: Timetable,
        canActivate: [authGuard]
    },
    {
        path: "Reports",
        component: Reports,
        canActivate: [authGuard]
    },
    {
        path: "Materials",
        component: Materials,
        canActivate: [authGuard]
    },
    {
        path: "teacherProfile/:id",
        component: EmployeeProfile,
        canActivate: [authGuard]
    },
    {
        path: "studentProfile/:id",
        component: StudentProfile,
        canActivate: [authGuard]
    },
    {
        path: "Class",
        component: Class,
        canActivate: [authGuard]
    },
    {
        path: "Attendance",
        component: Attendance,
        canActivate: [authGuard]
    }
];
