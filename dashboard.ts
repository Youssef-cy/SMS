import { HttpClient } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardI } from '../model/dashboardI';

@Injectable({
    providedIn: 'root'
})
export class DashboardS {

    constructor(private http: HttpClient) { }

    private baseUrl:string ="http://localhost:8080/API/Dashboard" ;

   getDashboardContent():Observable<DashboardI>{
    return this.http.get<DashboardI>(this.baseUrl);
   }
    

}
