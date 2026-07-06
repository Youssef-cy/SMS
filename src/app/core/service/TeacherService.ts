  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeacherI } from '../model/teacher-i';
import { TeacherReq } from '../model/teacher-req';

  @Injectable({
    providedIn: 'root',
  })
  export class TeacherService {
    
    constructor(private http: HttpClient) { }

      private baseUrl:string ="http://localhost:8080/API/Teacher" ;

    getTeachers():Observable<TeacherI[]>{
      return this.http.get<TeacherI[]>(this.baseUrl);
    }

    createTeacher(teacher: TeacherReq): Observable<TeacherI> {
    return this.http.post<TeacherI>(this.baseUrl, teacher
);
  }

  }
