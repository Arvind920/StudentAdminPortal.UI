import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/Models/api-models/student.model';
import { Gender } from 'src/app/Models/Ui-models/gender.model';
import { GenderService } from 'src/app/Services/gender.service';
import { StudentService } from '../student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  isNewStudent=false;
  header='';
  displayProfileImageUrl ='';
  genderList:Gender[]=[];
  constructor(private readonly studentService:StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderService:GenderService,
    private snackbar:MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params)=>{
       this.studentId = params.get('id');

       if(this.studentId){




          if(this.studentId.toLowerCase()==='Add'.toLowerCase())
          {
            this.isNewStudent=true;
            this.header='Add New Student';
            this.setImage();
             //if the route contain the Add
        //-> new Student Functionality
          }

          else{
            this.isNewStudent=false;
            this.header='Edit Student';
             //otherwise
        //-> Existing Functionality
        this.studentService.getStudent(this.studentId)
        .subscribe(
          successResponse => {
         this.student= successResponse;
         this.setImage();
        },
        (errorResponse)=>{
          this.setImage();
        }
        );
      }

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
  onUpdate():void{
    //call student service to update student
this.studentService.updateStudent(this.student.id,this.student)
.subscribe(
  (successRespons)=>{
//show a notification
this.snackbar.open('Student updated Successfully', undefined,{duration:2000});

  },
  (errorResponse)=>{
    //log it
  }
);
}
  onDelete():void{
this.studentService.deleteStudent(this.student.id).subscribe(
  (successResponse)=>{
this.snackbar.open('Student Deleted Successfully',undefined,{
  duration:2000
});

setTimeout(()=>{
  this.router.navigateByUrl('students');
},2000);

  },
  (errorRespons)=>{
    //log
  }
);
}
  onAdd():void{
   this.studentService.addStudent(this.student)
   .subscribe(
    (successResponse)=>{
      this.snackbar.open('Student Added Successfully',undefined,{
        duration:2000
      });

      setTimeout(()=>{
        this.router.navigateByUrl('students');
      },2000);



    },
    (errorResponse)=>{
//log
    }
   );

  }

  uploadImage(event:any):void{
    if(this.studentId){
      const file: File=event.target.files[0];
      this.studentService.uploadImage(this.student.id,file)
      .subscribe(
        (successResponse)=>
        {
          this.student.profileImageURl=successResponse;
          this.setImage();
          this.snackbar.open('Profile Image has been updated', undefined,{duration:2000});

        },
        (errorResponse)=>{

        }
      );
    }
  }
  private setImage():void{
     if(this.student.profileImageURl){
      //Fethch the image by url
      this.displayProfileImageUrl=this.studentService.getImagePath(this.student.profileImageURl);
     }
     else{
      //Dispaly a default
      this.displayProfileImageUrl='/assets/default_image.png';

     }
  }

}
