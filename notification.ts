import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationI } from '../model/notification-i';
import { Observable } from 'rxjs';
import { NotificationReq } from '../model/notification-req';

@Injectable({
  providedIn: 'root',
})
export class Notification {
  
  constructor(private http:HttpClient){}

      private baseUrl:string ="http://localhost:8080/API/Notification";

      getAllNotification():Observable<NotificationI[]>{
          return this.http.get<NotificationI[]>(this.baseUrl);
         }

         addNotification(data: NotificationReq): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, data);
  }

}
