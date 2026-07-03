import { Grade } from "./grade";
import { Role } from "./role";

export interface TeacherReq {
  firstName: string;
  firstNameAnArabic: string;
  lastName: string;
  lastNameAnArabic: string;
  nationalId: number;
  email: string;
  password: string;
  address: string;
   gender: 'M' | 'F'; // char في Java → string في TS
  nationality: string;
  birthDate: string; // LocalDate → string (ISO date)
  roleId: number,
  subject: string;
  subjectType: string;
  subjectDescription: string;
  gradeId: number,
  isDeleted: boolean;
  religion: string;
  education: string;
  employeeHistory: string;
  numberYearsOfExperience: number;
  termId:number;
  mateials:string;
}