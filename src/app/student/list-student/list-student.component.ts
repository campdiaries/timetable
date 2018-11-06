import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data-service/data-service.service';
import { Student } from 'src/app/models/Student';


@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {

  students: Student[] = [];
  constructor(private ds: DataService) {
  }


  ngOnInit() {
    this.ds.getAllStudents('studentName', true).subscribe(data => {
      console.log(data);
      this.students = data;
    });

  }

}
