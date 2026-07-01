import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportRES } from '../model/report-res';

@Injectable({
  providedIn: 'root',
})
export class ReportS {
  constructor(private http:HttpClient){}
      private baseUrl:string ="http://localhost:8080/API/Report";
  getAllReports():Observable<ReportRES[]>{
    return this.http.get<ReportRES[]>(this.baseUrl)
  }

}
