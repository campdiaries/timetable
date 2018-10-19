import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  addStudentForm = new FormGroup({
    name: new FormControl(''),
    grade: new FormControl(0),
    profilePic: new FormControl('')
  })


  onFileChange($event) {

    this.addStudentForm.patchValue({ profilePic: $event.target.files[0] })
  }

  constructor() { }

  ngOnInit() {
  }

}
