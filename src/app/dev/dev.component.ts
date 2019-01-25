import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data-service/data-service.service';
import { forEach } from '@angular/router/src/utils/collection';
import * as _ from 'lodash';
import { filter } from 'rxjs/operators';
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

    this.tt = { s1: [], s2: [], s3: [] }; // time table has 3 sessions
    this.ds.getAllActivities('name', true).subscribe(data => {
      data.forEach((activity) => { // getting all activity and assigning student count of 0 to each activity
        activity.count = 0;
      });
      this.activities = data;
    });
    this.ds.getAllStudents('studentName', true, 'hello').subscribe(data => {
      data.forEach((stu) => {
        stu['selectedActivities'].forEach((act) => {
          act['isAssigned'] = false; // getting all students and have variable isAssigned for each activity of selected student
          act['session'] = ''; // to attach session no to each activity for each student
        });
      });
      this.students = data;
      this.calculateCounts(); // this will calculate the no of students for each activity

    });
  }

  calculateCounts() {
    this.students.forEach((student) => {
      student.selectedActivities.forEach((activity) => {
        const activityIndex = _.findIndex(this.activities, { name: activity.name });
        this.activities[activityIndex].count++;
      });
    });
    this.assignActToSession(); // here assign activities to sessions

  }


  assignActToSession() {

    this.activities.sort((a, b) => {
      return a.count - b.count;
    }); // sort the activitiies by increasing no of activity strength

    for (let i = 0; i < 9; i++) {
      const a = JSON.parse(JSON.stringify(this.activities[i]));
      this.tt['s1'].push(a);

    }
    for (let i = 0; i < 9; i++) {
      const a = JSON.parse(JSON.stringify(this.activities[i]));
      this.tt['s2'].push(a);

    }
    for (let i = 0; i < 9; i++) {
      const a = JSON.parse(JSON.stringify(this.activities[i]));
      this.tt['s3'].push(a);

    }

    this.assignStudents(); // distribute each student activity in sessions in round robin 

  }


  assignStudents() {

    let itemProc = 0; // flag to calculate the end of foreach loop

    this.students.forEach((stu, i, array) => {
      itemProc++; // increate the flag

      const selectedActivities = stu['selectedActivities']; // get all the 3 selected activities
      selectedActivities.forEach((selectedActivity, index) => {
        const sess = (index % 3) + 1; // roud robin through sessions 1 - 3
        const sessName = 's' + sess; // get session name

        const availAct = this.filterAct(this.tt, selectedActivity, sess); // get the activity obj in a perticular session

        const checkRepeat = this.isStudentHaving2ActIn1Ses(stu); // check if the assigned session has another activity of this student 
        // if (checkRepeat) {
        //   console.log('repeat found');
        // }

        if (checkRepeat || availAct[0]['students'].length > 25) {
          // 2 condtions to get the next session instad of assigning to current decided session
          const nexSess = this.getNextSessionNo(sess); // calculate next session

          const nextAvailAct = this.filterAct(this.tt, selectedActivity, nexSess); // get the next session's activity
          this.pushStudentObjInSessionAct(nextAvailAct[0], stu); // push this student to next calculated activity

        } else {
          this.pushStudentObjInSessionAct(availAct[0], stu); // else just push to current selected session
        }

        if (itemProc === array.length) {
          this.printDuplicateStudents(); // print all the outliers whom manually have to be sorted

        }

      });


    });


  }


  pushStudentObjInSessionAct(sessAct, stu) {
    sessAct['students'].push(stu); // just push the student in the actvities array

  }

  getNextSessionNo(currSess) {

    currSess = (currSess !== 3) ? currSess + 1 : currSess;
    // to increase the session by 1 so as to get the next session and not to increase if the passed session no is 3
    const nextSess = (currSess % 3) + 1; // to compensate the array start index
    return nextSess;


  }

  // this function will get the activity object of the desired session
  filterAct(arr, reqAct, sessNo) {

    let currSess = sessNo;

    const sessName = 's' + sessNo;

    let availAct = arr[sessName].filter((act) => { // main filter method
      return act['name'] === reqAct['name'];
    });

    if (availAct.length === 0) { // if there is no activity in that session then go for the next session
      currSess = this.getNextSessionNo(currSess);
      availAct = this.filterAct(arr, reqAct, currSess);
    }

    reqAct['session'] = currSess; // assign the session id to this activity

    return availAct;

  }



  // this function checks if the student has 2 activities in same session
  isStudentHaving2ActIn1Ses(stu) {
    const sess1 = stu['selectedActivities'][0]['session'];
    const sess2 = stu['selectedActivities'][1]['session'];
    const sess3 = stu['selectedActivities'][2]['session'];

    if ((sess1 !== '' && sess2 !== '') && (sess1 === sess2)) {
      return true;
    }

    if ((sess2 !== '' && sess3 !== '') && (sess2 === sess3)) {
      return true;
    }

    if ((sess3 !== '' && sess1 !== '') && (sess3 === sess1)) {
      return true;
    }

    return false;

  }


  // loops throrugh all the activities and prints the duplicate

  printDuplicateStudents() {

    let f = 0;

    this.students.forEach((stu) => {

      if (this.isStudentHaving2ActIn1Ses(stu)) {
        f = 1;

        console.log(stu['studentName']);

      }

    });

    if (f) {
      return true;
    } else {
      return false;
    }

  }




}
