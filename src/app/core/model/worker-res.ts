import { TeacherI } from "./teacher-i";

export interface WorkerRES {
  totalEmployees: number;
  activeEmployees: number;
  onLeave: number;
  totalTeacher: number;
  employeesList: TeacherI[];
}