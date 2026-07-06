import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../model/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

   constructor(private http:HttpClient){}
  
    private baseUrl:string ="http://localhost:8080/API/Role" ;

    getAllRoles():Observable<Role[]>{
      return this.http.get<Role[]>(this.baseUrl)
    }
  
}
