import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data-service/data-service.service';
import { Student } from 'src/app/models/Student';
import { AuthService } from 'src/app/core/auth/auth.service';


@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {

  students: Student[] = [];
  isAdmin = false;
  constructor(private ds: DataService, private as: AuthService) {
  }


  ngOnInit() {
    this.ds.getAllStudents('studentName', true).subscribe(data => {
      console.log(data);
      this.students = data;
    });

    const userObj = this.as.getUserObj();
    this.isAdmin = userObj.isAdmin;
    console.log('isAdmin ' + this.isAdmin);

  }

}
