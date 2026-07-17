import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WorkerREQ } from '../model/worker-req';
import { WorkerRES } from '../model/worker-res';
import { TeacherI } from '../model/teacher-i';
import { TeacherReq } from '../model/teacher-req';

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  public reloadEmployees$ = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}
  private EmployeeUrl: string = 'http://localhost:8080/API/Employees';
  private WorkerUrl: string = 'http://localhost:8080/API/Workers';
  private TeacherUrl: string = 'http://localhost:8080/API/Teacher';

  createWorker(worker: WorkerREQ): Observable<WorkerREQ> {
    return this.http.post<WorkerREQ>(this.WorkerUrl, worker);
  }

  allWorkers(): Observable<WorkerRES> {
    return this.http.get<WorkerRES>(this.EmployeeUrl);
  }

  changeStatus(id: number): Observable<void> {
    return this.http.put<void>(`${this.WorkerUrl}/${id}/deactivate`, {});
  }

  getTeachers(): Observable<TeacherI[]> {
    return this.http.get<TeacherI[]>(this.TeacherUrl);
  }

  createTeacher(teacher: TeacherReq): Observable<TeacherI> {
    return this.http.post<TeacherI>(this.TeacherUrl, teacher);
  }

  updateWorker(id: number, worker: WorkerREQ): Observable<WorkerREQ> {
    return this.http.put<WorkerREQ>(`${this.WorkerUrl}/${id}`, worker);
  }

  updateTeacher(id: number, teacher: TeacherReq): Observable<TeacherI> {
    return this.http.put<TeacherI>(`${this.TeacherUrl}/${id}`, teacher);
  }

  getProfile(id:number): Observable<any> {
    return this.http.get<any>(`${this.EmployeeUrl}/Profile/${id}`)
  }

}
