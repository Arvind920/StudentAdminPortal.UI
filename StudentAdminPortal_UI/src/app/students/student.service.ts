import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {MatPaginatorModule} from '@angular/material/paginator';
import { Student } from '../Models/api-models/student.model';
import { UpdateStudentRequest } from '../Models/api-models/update-student-request.model';
import { AddStudentRequest } from '../Models/api-models/add-student-request.model';
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
  updateStudent(studentId:string, StudentRequest:Student):Observable<Student>{
    const updateStudentRequest:UpdateStudentRequest={
      firstName:StudentRequest.firstName,
      lastName:StudentRequest.lastName,
      dateOfBirth:StudentRequest.dateOfBirth,
      mobile:StudentRequest.mobile,
      email:StudentRequest.email,
      genderId:StudentRequest.genderId,
      physicalAddress:StudentRequest.address.physicalAddress,
      postalAddress:StudentRequest.address.postalAddress
    };
   return this.httpClient.put<Student>(this.baseApiUrl+'/students/'+studentId,
    updateStudentRequest)
  }
  deleteStudent(studentId:string):Observable<Student>
{
  return this.httpClient.delete<Student>(this.baseApiUrl+'/students/'+studentId);

}
addStudent(studentRequest: Student): Observable<Student> {
  const addStudentRequest: AddStudentRequest = {
    firstName: studentRequest.firstName,
    lastName: studentRequest.lastName,
    dateOfBirth: studentRequest.dateOfBirth,
    email: studentRequest.email,
    mobile: studentRequest.mobile,
    genderId: studentRequest.genderId,
    physicalAddress: studentRequest.address.physicalAddress,
    postalAddress: studentRequest.address.postalAddress
  };

  return this.httpClient.post<Student>(this.baseApiUrl + '/students/add', addStudentRequest);
}

uploadImage(studentId:string, file:File):Observable<any>{
  const formData=new FormData();
  formData.append("profileImage", file);

  return this.httpClient.post(this.baseApiUrl + '/students/'+studentId+'/upload-image',formData
  ,{
    responseType:'text'
  });

}
getImagePath(relativePath:string){
  return `${this.baseApiUrl}/${relativePath}`;
}

}
