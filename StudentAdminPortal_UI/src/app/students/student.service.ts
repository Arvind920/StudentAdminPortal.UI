import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {MatPaginatorModule} from '@angular/material/paginator';
import { Student } from '../Models/api-models/student.model';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
private baseApiUrl="https://localhost:44321"
  constructor(private httpClient:HttpClient) { }

  getStudents(): Observable<Student[]>{
   return  this.httpClient.get<Student[]>(this.baseApiUrl+'/students');
  }


  getStudent(studentId:string):Observable<Student> {
    return this.httpClient.get<Student>(this.baseApiUrl+'/students/'+ studentId);
  }

}
