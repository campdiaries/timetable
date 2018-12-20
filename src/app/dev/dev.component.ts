import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data-service/data-service.service';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent implements OnInit {

  students;
  users;

  constructor(private ds: DataService) { }

  ngOnInit() {
    this.ds.getAllStudents('studentName', true, 'hello').subscribe(data => {
      this.students = data;
    });
    this.ds.getAllUsers('email', true).subscribe(data => {
      this.users = data;
    });


  }

}
