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

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  addStudentForm: FormGroup;
  loading = false;
  activities: any[];
  student: Student;
  actionBtnName = 'Add Student';
  @ViewChild('profilePicInput')
  profilePicInput: ElementRef;

  selectedActCtrl: any;
  noOfActi: number;

  readonly ADD_STDNT_BTN_TXT = 'Add Student';
  readonly UPDT_STDNT_BTN_TXT = 'Update Student';
  readonly LOADIN_BTN_TXT = 'loading ...';


  constructor(private router: Router, private route: ActivatedRoute, private sb: MatSnackBar, private afs: AngularFirestore,
    private ds: DataService, private fb: FormBuilder) {
  }


  // TODO: all 3 activitites must be different



  onFileChange($event) {
    // console.log($event.target.files[0])
    this.loading = true;
    this.actionBtnName = this.LOADIN_BTN_TXT;
    const task = this.ds.uploadFileToStorage($event.target.files[0]);
    task.snapshotChanges().subscribe((val) => {

      val.ref.getDownloadURL().then((downloadUrl) => {
        console.log(downloadUrl);
        this.addStudentForm.patchValue({ profilePicUrl: downloadUrl || '' });
        this.loading = false;
        this.actionBtnName = this.ADD_STDNT_BTN_TXT;
      });

    });

  }


  validation(): any {

    console.log(this.addStudentForm.get('selectedActivities').value);
    if (!this.checkDifferent(this.addStudentForm.get('selectedActivities').value)) {
      return { status: false, message: 'please make sure all the activities are different' };
    }

    return { status: true, message: '' };
  }

  checkDifferent(activities) {
    const actArr = [];

    activities.forEach(element => {
      actArr.push(element['name']);
    });

    const actSet = new Set(actArr);
    return (actArr.length === actSet.size);

  }

  addStudent() {
    if (this.addStudentForm.controls.studentId.value === '') {
      const studentId = this.ds.generateRandomId();
      this.addStudentForm.patchValue({ studentId: studentId });
    }

    const valiRes = this.validation();

    if (valiRes.status) {
      const student: Student = this.addStudentForm.value;
      console.log(student);
      this.loading = true;
      this.actionBtnName = this.LOADIN_BTN_TXT;
      this.ds.addStudent(student).then((data) => {
        this.clearForm();
        this.loading = false;
        this.actionBtnName = this.ADD_STDNT_BTN_TXT;
        this.toast('Student has been added/updated', 'okay');
      });
    } else {
      this.toast(valiRes.message, 'okay');

    }
  }


  toast(msg: string, btnTxt: string) {
    this.sb.open(msg, btnTxt, {
      duration: 2000,
    });
  }


  ngOnInit() {
    this.initForm();
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
          this.actionBtnName = this.UPDT_STDNT_BTN_TXT;
        });

      }
    });

  }

  initForm() {
    this.addStudentForm = this.fb.group({
      studentId: '',
      studentName: ['', Validators.required],
      studentGrade: 0,
      volEmailAddress: '',
      selectedActivities: this.fb.array(this.createFGActivity(AppSettings.noOfActivitiesPerChild)),
    });
  }


  clearForm() {
    // this.profilePicInput.nativeElement.value = '';
    this.initForm();

  }

  createFGActivity(no: number): FormGroup[] {
    const fbgroups: FormGroup[] = [];
    for (let i = 0; i < no; i++) {
      fbgroups.push(this.fb.group({ name: '' }));
    }
    return fbgroups;
  }

}
