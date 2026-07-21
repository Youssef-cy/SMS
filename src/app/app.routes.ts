import { Routes } from '@angular/router';
import { Dashboard } from './feature/dashboard/dashboard';
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
        loadComponent: () => import('./feature/employees/employees').then(m => m.Employees),
        canActivate: [authGuard]
    },
    {
        path: "Students",
        loadComponent: () => import('./feature/student/student').then(m => m.StudentsComponent),
        canActivate: [authGuard]
    },
    {
        path: "notification",
        loadComponent: () => import('./feature/notifications/notifications').then(m => m.Notifications),
        canActivate: [authGuard]
    },
    {
        path: "TOP",
        loadComponent: () => import('./feature/top-student/top-student').then(m => m.TopStudentsComponent),
        canActivate: [authGuard]
    },
    {
        path: "Exam_schedule",
        loadComponent: () => import('./feature/exam-schedule/exam-schedule').then(m => m.ExamSchedule),
        canActivate: [authGuard]
    },
    {
        path: "Timetable",
        loadComponent: () => import('./feature/time-table/time-table').then(m => m.Timetable),
        canActivate: [authGuard]
    },
    {
        path: "Reports",
        loadComponent: () => import('./feature/reports/reports').then(m => m.Reports),
        canActivate: [authGuard]
    },
    {
        path: "Materials",
        loadComponent: () => import('./feature/materials/materials').then(m => m.Materials),
        canActivate: [authGuard]
    },
    {
        path: "teacherProfile/:id",
        loadComponent: () => import('./feature/employees/employee-profile/employee-profile').then(m => m.EmployeeProfile),
        canActivate: [authGuard]
    },
    {
        path: "studentProfile/:id",
        loadComponent: () => import('./feature/student-profile/student-profile').then(m => m.StudentProfile),
        canActivate: [authGuard]
    },
    {
        path: "Class",
        loadComponent: () => import('./feature/class/class').then(m => m.Class),
        canActivate: [authGuard]
    },
    {
        path: "Attendance",
        loadComponent: () => import('./feature/attendance/attendance').then(m => m.Attendance),
        canActivate: [authGuard]
    }
];
