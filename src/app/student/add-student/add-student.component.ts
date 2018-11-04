import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/data-service/data-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Student } from '../../models/Student';
export interface IStudent {
  name: string;
  grade: number;
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  addStudentForm: FormGroup;
  fileUploading: boolean = false;
  students: Observable<IStudent[]>;
  activities: any[];
  student: Student;
  private studentCollection: AngularFirestoreCollection<IStudent>

  constructor(db: AngularFirestore, private afs: AngularFirestore, private ds: DataService, private fb: FormBuilder) {

  }




  onFileChange($event) {
    console.log($event.target.files[0])
    this.fileUploading = true;
    const uploadRes = this.ds.uploadFileToStorage($event.target.files[0]);
    uploadRes.percentageChanges().subscribe((val) => {
      console.log(val);
    })

    uploadRes.snapshotChanges().subscribe((val) => {
      this.addStudentForm.patchValue({ profilePicUrl: val })
      this.fileUploading = false;
    })

  }

  addStudent() {
    const studentId=this.ds.generateRandomId();
    this.addStudentForm.patchValue({studentId:studentId})
    const student: Student = this.addStudentForm.value
    this.ds.addStudent(student)

  }

  ngOnInit() {
    this.addStudentForm = this.fb.group({
      studentId: '',
      studentName: '',
      studentGrade: 0,
      profilePicUrl: '',
      act1: '',
      act2: '',
      act3: '',
    });
    this.ds.getAllActivities('name', true).subscribe(data => {
      console.log(data);
      this.activities = data;
    })


  }


  clearForm() {

  }

}
