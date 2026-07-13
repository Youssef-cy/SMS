import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarkI } from '../model/markRES';

@Injectable({
  providedIn: 'root',
})
export class Marks {
  
  constructor(private http:HttpClient){}

  private baseUrl:string ="http://localhost:8080/API/Marks" ;


  getMarks():Observable<MarkI[]>{
    return this.http.get<MarkI[]>(this.baseUrl)
  }

}
