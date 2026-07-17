export interface SessionREQ {
  id?: number;
  classid: number;
  courseid: number;
  dayOfWeek: number;
  startAt: string;
  endAt: string;
  updated: string;
}