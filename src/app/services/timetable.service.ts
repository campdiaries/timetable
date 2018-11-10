import { Injectable } from '@angular/core';
import { DataService } from '../core/data-service/data-service.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  maxSessions = 3;
  maxStudentPerSession = 25;
  _students;
  activities;
  // TODO add sessions object to firebase
  _sessions = [];

  constructor(private ds: DataService) {
  }

  timetableCalculation() {
    for (let i = 0; i < this.maxSessions; i++) {
      this._sessions[i] = [];
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
      this._students = students;
      this.calculateCounts();
    });
  }

  calculateCounts() {
    this._students.forEach((student) => {
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
        this._sessions[sessionIndex].push({ name: activity.name, assignedStudents: 0 });
        for (let x = 1; x <= this.maxSessions; x++) {
          if (activity.count > this.maxStudentPerSession * x) {
            const sessionIndex = ++i % this.maxSessions;
            this._sessions[sessionIndex].push({ name: activity.name, assignedStudents: 0 });
          } else {
            break;
          }
        }
      }
    });
    this.assignStudents();
  }

  assignStudents() {
    this._students.forEach((student) => {
      student.selectedActivities.forEach((activity) => {
        let count = _.countBy(_.flatten(this._sessions), function (val) { return val.name == activity.name; }).true;
        activity.count = count;
      });
      student.selectedActivities.sort(function(a, b){
        return a.count-b.count;
      });
      student.selectedActivities.forEach((activity) => {
        let i = 0;
        while (i < this.maxSessions * this.maxSessions) {
          const sessionIndex = i % this.maxSessions;
          const existingSession = _.find(student.selectedActivities, { session: (sessionIndex + 1) });
          const activityIndex = _.findIndex(this._sessions[sessionIndex], { name: activity.name });
          if (activityIndex !== -1 && (existingSession === undefined || (sessionIndex + 1) !== existingSession.session)
            && this._sessions[sessionIndex][activityIndex].assignedStudents < this.maxStudentPerSession) {
            activity.session = (i + 1);
            this._sessions[sessionIndex][activityIndex].assignedStudents++;
            break;
          }
          i++;
        }
       });
    });
    this.students = this._students;
    this.sessions = this._sessions;
    console.log(this._students);
    console.log(this._sessions);
  }

  get sessions() {
    if(this._sessions.length > 0){
      return this._sessions;
    } else {
        this.timetableCalculation();
        return this._sessions;
    }
  }

  get students() {
    if(this._students) {
      return this._students;
    } else {
      if(this._sessions) {
        this.assignStudents();
        return this._students;
      } else {
        this.timetableCalculation();
        return this._students;
      }
    }
  }

  set students(students) {
    this._students = students;
  }

  set sessions(sessions) {
    this._sessions = sessions;
  }

  getStudentById(id) {
    if(this._students) {
      return this.findStudentById(id);
    } else {
      this.timetableCalculation();
      if(this._students) {
        return this.findStudentById(id);
      }
    }
  }

  findStudentById(id) {
    let student;
    this._students.forEach((data) => {
      if(data.studentId == id){
        console.log(data);
        student = data;
        return;
      }
    });
    return student;
  }


}
