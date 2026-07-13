  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { StudentI } from '../model/student-i';

  @Injectable({
    providedIn: 'root',
  })
  export class StudentS {
      constructor(private http:HttpClient){}

            private baseUrl:string ="http://localhost:8080/API/Student";


            getAllStudent():Observable<StudentI[]>{
                return this.http.get<StudentI[]>(this.baseUrl);

            }


            getProfile(id:number):Observable<any>{
              return this.http.get<any>(`${this.baseUrl}/Profile/${id}`);
            }


  }
