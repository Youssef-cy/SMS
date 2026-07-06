import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GradeRES } from '../model/grade-res';

@Injectable({
  providedIn: 'root',
})
export class GradeService {

  constructor(private http:HttpClient){}
  
    private baseUrl:string ="http://localhost:8080/API/Grade" ;

    getAllGrades():Observable<GradeRES[]>{
      return this.http.get<GradeRES[]>(this.baseUrl)
    }

}
