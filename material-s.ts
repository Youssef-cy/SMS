import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialI } from '../model/material-i';

@Injectable({
  providedIn: 'root',
})
export class MaterialS {
   constructor(private http: HttpClient) { }

    private baseUrl:string ="http://localhost:8080/API/Materials" ;

   getMaterialsContent():Observable<MaterialI[]>{
    return this.http.get<MaterialI[]>(this.baseUrl);
   }
}
