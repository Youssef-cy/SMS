import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassRES } from '../model/class-res';
import { ClassREQ } from '../model/class-req';

@Injectable({
  providedIn: 'root',
})
export class ClassService {

  private baseUrl: string = "http://localhost:8080/API/Class";

  constructor(private http: HttpClient) {}

  getAllClasses(): Observable<ClassRES[]> {
    return this.http.get<ClassRES[]>(this.baseUrl);
  }

  addClass(classReq: ClassREQ): Observable<void> {
    return this.http.post<void>(this.baseUrl, classReq);
  }

  updateClass(id: number, classReq: ClassREQ): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, classReq);
  }

  deleteClass(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deleteAllClasses(): Observable<void> {
    return this.http.delete<void>(this.baseUrl);
  }
}
