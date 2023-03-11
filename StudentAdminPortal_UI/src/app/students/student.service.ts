import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
private baseApiUrl="https://localhost:44321"
  constructor(private httpClient:HttpClient) { }

  getStudent(): Observable<any>{
   return  this.httpClient.get<any>(this.baseApiUrl+'/students');
  }
}
