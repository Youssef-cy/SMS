export interface SessionRES {
  id: number;
  courseId: number;
  className: string;
  courseName: string;
  teacherName: string;
  dayOfWeek: number;
  startAt: string;
  endAt: string;
  colorClass?: string;
}