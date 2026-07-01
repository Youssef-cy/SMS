import { Attendance } from "./attendance";
import { Top } from "./top";

export interface DashboardI {
    totalStudents :number;
    totalTeachers : number;
    topStudents: Top[];
    absent: [];
    attendanceRate : number;
}
