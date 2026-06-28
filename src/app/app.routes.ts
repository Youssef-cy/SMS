import { Routes } from '@angular/router';
import { Dashboard } from './feature/dashboard/dashboard';
import { Employees } from './feature/employees/employees';
import { ExamSchedule } from './feature/exam-schedule/exam-schedule';
import { Reports } from './feature/reports/reports';
import { Materials } from './feature/materials/materials';

export const routes: Routes = [
    {
        path: "",
        component: Dashboard
    },
    {
        path: "Employees",
        component: Employees
    },
    // {
    //     path:"Students",
    //     component:students
    // },
    // {
    //     path:"Top Students",
    //     component:topstudents
    // },
    {
        path: "Exam schedule",
        component: ExamSchedule
    },
    // {
    //     path: "Timetable",
    //     component: timetable
    // },
    {
        path:"Reports",
        component:Reports
    },
    {
        path:"Materials",
        component:Materials
    }
];
