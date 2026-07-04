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


}
