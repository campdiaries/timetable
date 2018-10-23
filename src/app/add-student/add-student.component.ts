import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface IStudent{
  name:string;
  grade:number;
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  addStudentForm = new FormGroup({
    name: new FormControl(''),
    grade: new FormControl(0),
   // profilePic: new FormControl('')
  })
  students: Observable<IStudent[]>;
  private studentCollection:AngularFirestoreCollection<IStudent>



  onFileChange($event) {

   // this.addStudentForm.patchValue({ profilePic: $event.target.files[0] })
  }

  constructor(db: AngularFirestore,private afs:AngularFirestore) { 
    this.studentCollection = afs.collection<IStudent>('students')
    this.students=this.studentCollection.valueChanges();
  }

  addStudent(){
    console.log(this.addStudentForm.value)
    this.studentCollection.add(this.addStudentForm.value)
  }

  ngOnInit() {
  }

}
