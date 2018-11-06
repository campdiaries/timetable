import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/data-service/data-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Student } from '../../models/Student';
import { AppSettings } from 'src/environments/AppSettings';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Route, Router, NavigationEnd } from '@angular/router';

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
  loading = false;
  students: Observable<IStudent[]>;
  activities: any[];
  student: Student;
  actionBtnName = 'Add Student';
  @ViewChild('profilePicInput')
  profilePicInput: ElementRef;

  selectedActCtrl: any;
  noOfActi: number;


  constructor(private router: Router, private route: ActivatedRoute, private sb: MatSnackBar, private afs: AngularFirestore,
    private ds: DataService, private fb: FormBuilder) {
  }






  onFileChange($event) {
    // console.log($event.target.files[0])
    this.loading = true;
    const task = this.ds.uploadFileToStorage($event.target.files[0]);
    task.snapshotChanges().subscribe((val) => {

      val.ref.getDownloadURL().then((downloadUrl) => {
        console.log(downloadUrl);
        this.addStudentForm.patchValue({ profilePicUrl: downloadUrl || '' });
        this.loading = false;
      });

    });

  }

  addStudent() {
    if (this.addStudentForm.controls.studentId.value === '') {
      const studentId = this.ds.generateRandomId();
      this.addStudentForm.patchValue({ studentId: studentId });
    }

    const student: Student = this.addStudentForm.value;
    console.log(this.addStudentForm.value);
    this.loading = true;
    this.ds.addStudent(student).then((data) => {
      this.loading = false;
      this.clearForm();
      this.sb.open('Student has been added', 'okay', {
        duration: 2000,
      });

    });


  }


  ngOnInit() {
    this.addStudentForm = this.fb.group({
      studentId: '',
      studentName: '',
      studentGrade: 0,
      profilePicUrl: '',
      selectedActivities: this.fb.array(this.createFGActivity(AppSettings.noOfActivitiesPerChild)),
    });
    this.selectedActCtrl = this.addStudentForm.get('selectedActivities') as FormArray;

    this.ds.getAllActivities('name', true).subscribe(data => {
      this.activities = data;
    });



    // -------------------------EDIT SECTION----------------------------------------
    this.route.url.subscribe(data => {
      // const actionUrl = (data[1]) ? data[1].path : '';
      if (data[1]) {
        const studentId = data[1].path;
        this.ds.getStudent(studentId).subscribe(val => {
          this.addStudentForm.setValue(val);
          this.actionBtnName = 'Update Student';
        });

      }
    });

  }


  clearForm() {
    // this.profilePicInput.nativeElement.value = '';
    this.addStudentForm = this.fb.group({
      studentId: '',
      studentName: '',
      studentGrade: 0,
      profilePicUrl: '',
      selectedActivities: this.fb.array(this.createFGActivity(AppSettings.noOfActivitiesPerChild)),
    });

  }

  createFGActivity(no: number): FormGroup[] {
    const fbgroups: FormGroup[] = [];
    for (let i = 0; i < no; i++) {
      fbgroups.push(this.fb.group({ name: '' }));
    }
    return fbgroups;
  }

}
