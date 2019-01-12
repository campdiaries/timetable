import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data-service/data-service.service';
import { forEach } from '@angular/router/src/utils/collection';
import * as _ from 'lodash';
@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent implements OnInit {

  students;
  users;
  activities;
  tt = {};

  constructor(private ds: DataService) { }

  ngOnInit() {

    this.tt = { s1: [], s2: [], s3: [] };
    this.ds.getAllActivities('name', true).subscribe(data => {
      data.forEach((activity) => {
        activity.count = 0;
      });
      this.activities = data;
      console.log(data);
      // // this.tt['s1'] = data;
      // // this.tt['s2'] = data;
      // // this.tt['s3'] = data;
      // this.activities = data;
      console.log(this.tt);
    });
    this.ds.getAllStudents('studentName', true, 'hello').subscribe(data => {
      data.forEach((stu) => {
        stu['selectedActivities'].forEach((act) => {
          act['isAssigned'] = false;
        });
      });
      this.students = data;
      console.log(this.students);

      // this.students.forEach(student)
      //  this.assignStudents();
      this.calculateCounts();
      this.assignActToSession();
    });
    // this.ds.getAllUsers('email', true).subscribe(data => {
    //   this.users = data;
    // });




  }

  assignStudents() {

    console.log(this.students[0]['selectedActivities'][0]['name']);
    console.log(this.tt['s1'][0]['name']);
    const assignedStudesnts = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < this.students.length; j++) {
        const currStu = this.students[j];
        const currStuAcvits = currStu['selectedActivities'];
        // scanning 3 activities
        currStuAcvits.forEach(currAct => {
          const currSessAct = this.tt['s' + (i + 1)].filter((sessAct) => {
            return sessAct['name'] === currAct['name'];

          });
          let getAssignedStu = [];
          getAssignedStu = assignedStudesnts.filter(obj => {
            return obj['studentId'] === currStu['studentId'];
          });

          if (getAssignedStu.length === 0) {
            assignedStudesnts.push(currStu);
            currSessAct[0]['students'].push(currStu);
          }
          // console.log(currSessAct);

        });


      }
    }

  }


  calculateCounts() {
    this.students.forEach((student) => {
      student.selectedActivities.forEach((activity) => {
        const activityIndex = _.findIndex(this.activities, { name: activity.name });
        this.activities[activityIndex].count++;
      });
    });


  }


  assignActToSession() {

    this.activities.sort((a, b) => {
      return a.count - b.count;
    });

    const l3 = 1, l2 = 2, l4 = 3;

    this.tt['s1'] = [this.activities[5], this.activities[6], this.activities[7], this.activities[8], this.activities[3], this.activities[4],
    this.activities[0], this.activities[1], this.activities[2]];
    this.tt['s2'] = [this.activities[5], this.activities[6],
    this.activities[7], this.activities[8], this.activities[3], this.activities[4]];
    this.tt['s3'] = [this.activities[5], this.activities[6], this.activities[7], this.activities[8]];
    this.assignStudents1();

  }


  assignStudents1() {

    this.students.forEach((stu, index) => {
      console.log(stu['studentName']);

      const sess = (index % 3) + 1;
      const sessName = 's' + sess;

      for (let i = 0; i < this.tt[sessName].length; i++) {
        if (this.tt[sessName][i]['name'] === stu.selectedActivities[0].name) {
          stu.selectedActivities[0].isAssigned = true;
          this.tt[sessName][i]['students'].push(stu['studentName']);
        }

      }

      // this.tt[sessName].forEach(act => {
      //   if (act['name'] === stu.selectedActivities[0].name) {
      //     stu.selectedActivities[0].isAssigned = true;
      //     act['students'].push(stu['studentName']);

      //   }

      // });

    });
    console.log(this.tt)

  }


}
