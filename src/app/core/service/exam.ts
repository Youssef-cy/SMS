import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamRES } from '../model/exam-res';
import { ExamREQ } from '../model/exam-req';

@Injectable({
  providedIn: 'root',
})
export class Exam {

  constructor(private http:HttpClient){}
        private baseUrl:string ="http://localhost:8080/API/Exam" ;

  getExam():Observable<ExamRES[]>{
    return this.http.get<ExamRES[]>(this.baseUrl);
  }

  createExam(exam:ExamREQ):Observable<ExamREQ>{
    return this.http.post<ExamREQ>(this.baseUrl,exam)
  }

  updateExam(id: number, exam: ExamREQ): Observable<ExamREQ> {
    return this.http.put<ExamREQ>(`${this.baseUrl}/${id}`, exam);
  }

  deleteExam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }


}
