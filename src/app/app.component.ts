import { Component, OnInit } from '@angular/core';
import { DataService } from './core/data-service/data-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private ds: DataService) {
  }
  title = 'app';

  maxSessions = 3;
  maxStudentPerSession = 25;
  students;
  activities;
  // TODO add sessions object to firebase
  sessions = [];

  ngOnInit() {
    this.timetableCalculation();
  }

  timetableCalculation() {
    for (let i = 0; i < this.maxSessions; i++) {
      this.sessions[i] = [];
    }
    this.getActivities();
    this.getStudents();
  }

  getActivities() {
    this.ds.getAllActivities('name', true).subscribe(activities => {
      activities.forEach((activity) => {
        activity.count = 0;
      });
      this.activities = activities;
    });
  }

  getStudents() {
    this.ds.getAllStudents('studentName', true).subscribe(students => {
      this.students = students;
      this.calculateCounts();
    });
  }

  calculateCounts() {
    this.students.forEach((student) => {
      student.selectedActivities.forEach((activity) => {
        const activityIndex = _.findIndex(this.activities, { name: activity.name });
        this.activities[activityIndex].count++;
      });
    });
    this.populateSessions();
  }

  populateSessions() {
    let i = -1;
    this.activities.forEach((activity, index) => {
      if (activity.count > 0) {
        const sessionIndex = ++i % this.maxSessions;
        this.sessions[sessionIndex].push({ name: activity.name, assignedStudents: 0 });
        for (let x = 1; x <= this.maxSessions; x++) {
          if (activity.count > this.maxStudentPerSession * x) {
            const sessionIndex = ++i % this.maxSessions;
            this.sessions[sessionIndex].push({ name: activity.name, assignedStudents: 0 });
          } else {
            break;
          }
        }
      }
    });
    this.assignStudents();
  }

  assignStudents() {
    this.students.forEach((student) => {
      student.selectedActivities.forEach((activity) => {
        let i = 0;
        while (i < this.maxSessions * this.maxSessions) {
          const sessionIndex = i % this.maxSessions;
          const existingSession = _.find(student.selectedActivities, { session: (sessionIndex + 1) });
          const activityIndex = _.findIndex(this.sessions[sessionIndex], { name: activity.name });
          if (activityIndex !== -1 && (existingSession === undefined || (sessionIndex + 1) !== existingSession.session)
            && this.sessions[sessionIndex][activityIndex].assignedStudents < this.maxStudentPerSession) {
            activity.session = (i + 1);
            this.sessions[sessionIndex][activityIndex].assignedStudents++;
            break;
          }
          i++;
        }
      });
    });
    console.log(this.students);
    console.log(this.sessions);
  }



}
