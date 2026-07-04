import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SessionRES } from '../model/session-res';
import { TeacherListRES } from '../model/teacher-list-res';
import { SessionREQ } from '../model/session-req';
import { ClassRES } from '../model/class-res';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  private baseUrl = 'http://localhost:8080/API/Sessions';

  constructor(private http: HttpClient) { }

  // ===========================
  // Get All Sessions
  // ===========================
  getAllSessions(classId: number): Observable<SessionRES[]> {
    return this.http.get<SessionRES[]>(
      `${this.baseUrl}/?classId=${classId}`
    );
  }

  // ===========================
  // Get Teachers List
  // ===========================
  getAllTeachers(): Observable<TeacherListRES[]> {
    return this.http.get<TeacherListRES[]>(
      `${this.baseUrl}/Teachers`
    );
  }

  // ===========================
  // Add Session
  // ===========================
  addSession(request: SessionREQ): Observable<SessionRES> {
    return this.http.post<SessionRES>(
      `${this.baseUrl}/Add`,
      request
    );
  }


  getClass():Observable<ClassRES[]> {
    return this.http.get<ClassRES[]>(`${this.baseUrl}/Class`)
  }

}