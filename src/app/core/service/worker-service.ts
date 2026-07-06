import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkerREQ } from '../model/worker-req';
import { workerRES } from '../model/worker-res';

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = 'http://localhost:8080/API/Employee';

  createWorker(worker: WorkerREQ): Observable<workerRES> {
    return this.http.post<workerRES>(this.baseUrl, worker);
  }

  allWorkers():Observable<workerRES[]>{
    return this.http.get<workerRES[]>(this.baseUrl)
  }

  changeStatus(id:number):Observable<void>{
    return this.http.put<void>(`${this.baseUrl}/${id}/deactivate`, {});
  }

}
