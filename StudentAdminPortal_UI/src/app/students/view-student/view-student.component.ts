import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/Models/api-models/student.model';
import { Gender } from 'src/app/Models/Ui-models/gender.model';
import { GenderService } from 'src/app/Services/gender.service';
import { StudentService } from '../student.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  studentId:string |null | undefined;
  student:Student={
    id:'',
    firstName:'',
    lastName:'',
    dateOfBirth:'',
    email:'',
    mobile:'',
    genderId:'',
    profileImageURl:'',
    gender:{
      id:'',
      description:''
    },
    address:{
      id:'',
      physicalAddress:'',
      postalAddress:''
    }

  }
  genderList:Gender[]=[];
  constructor(private readonly studentService:StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderService:GenderService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params)=>{
       this.studentId = params.get('id');

       if(this.studentId){
        this.studentService.getStudent(this.studentId)
        .subscribe(
          successResponse => {
         this.student= successResponse;
        });

        this.genderService.getGenderList()
        .subscribe(
          (successResponse)=>{
            this.genderList= successResponse;
          }
        );


       }

      }
    );
  }
  onUpdate(){
    //call student service to update student
this.studentService.updateStudent(this.student.id,this.student)
.subscribe(
  (successRespons)=>{
//show a notification

  },
  (errorResponse)=>{
    //log it
  }
);
  }

}
