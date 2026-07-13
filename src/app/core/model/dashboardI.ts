import { ExamRES } from "./exam-res";

export interface DashboardI {
  absentForStudents: number;
  countExams: number;
  totalTopStudents: number;
  totalLowStudents: number;
  averageGrades: AverageGrade[];
  attendanceChart: AttendanceChart[];
  exams: ExamRES[];
}

export interface AverageGrade {
  gradeName: string;
  average: number;
}

export interface AttendanceChart {
  dayOfWeek: number;
  absentCount: number;
}