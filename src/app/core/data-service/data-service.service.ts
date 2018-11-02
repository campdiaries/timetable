import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from 'src/app/models/user';
import * as firebase from 'firebase';
import { Student } from 'src/app/models/Student';
import { Activity } from 'src/app/models/Activity';

const STUDENTS_COLLECTION = 'students';
const ACTIVITIES_COLLECTION = 'activities';
const SCHOOL_COLLECTION = 'schools';
const TIMETABLE_COLLECTION = 'timetable';
const USERS_COLLECTION = 'users';
const VOLUNTEERS_COLLECTION = 'volunteers';

@Injectable({
  providedIn: 'root'
})

// make sure indexing is done for all individual calls
export class DataService {

  // logged in user
  user: User;

  constructor(private authService: AuthService, private firestore: AngularFirestore, private storage: AngularFireStorage) {
    this.authService.user.subscribe(mUser => {
      this.user = mUser;
    });
  }

  generateRandomId() {
    return this.firestore.createId;
  }

  getServerTimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  // add & modify
  addStudent(student: Student) {
    return this.firestore.collection<Student>(STUDENTS_COLLECTION).doc(student.studentId).set(student, { merge: true });
  }

  getStudent(studentId: string) {
    return this.firestore.collection<Student>(STUDENTS_COLLECTION).doc(studentId).valueChanges();
  }

  getStudentByName(name: string) {
    return this.firestore.collection<Student>(STUDENTS_COLLECTION, ref => ref.where('name', '==', name)).valueChanges();
  }

  getAllStudents(sortField: string, asc: boolean, limit?: number) {
    if (limit) {
      return this.firestore.collection<Student>(STUDENTS_COLLECTION, ref =>
        ref.orderBy(sortField, asc ? 'asc' : 'desc').limit(limit)).valueChanges();
    } else {
      return this.firestore.collection<Student>(STUDENTS_COLLECTION, ref =>
        ref.orderBy(sortField, asc ? 'asc' : 'desc')).valueChanges();
    }
  }

  // works only with matching cases
  searchStudentsByName(name: string) {
    return this.firestore.collection<Student>(STUDENTS_COLLECTION, ref =>
      ref.where('name', '>', name).where('name', '<', `${name}z`).orderBy('name')).valueChanges();
  }

  deleteStudent(studentId) {
    return this.firestore.collection<Student>(STUDENTS_COLLECTION).doc(studentId).delete();
  }

  // add & modify
  addActivity(activity: Activity) {
    return this.firestore.collection<Activity>(ACTIVITIES_COLLECTION).doc(activity.activityId).set(activity, { merge: true });
  }

  getActivity(activityId: string) {
    return this.firestore.collection<Activity>(ACTIVITIES_COLLECTION).doc(activityId).valueChanges();
  }

  // for getting activites under activityLead or by name
  getActivitiesByAttribute(attributeName: string, attributeValue: string, asc: boolean) {
    return this.firestore.collection<Activity>(ACTIVITIES_COLLECTION,
      ref => ref.where(attributeName, '==', attributeValue).orderBy(attributeName, asc ? 'asc' : 'desc')).valueChanges();
  }

  getAllActivities(sortField: string, asc: boolean, limit?: number) {
    if (limit) {
      return this.firestore.collection<Activity>(ACTIVITIES_COLLECTION,
        ref => ref.orderBy(sortField, asc ? 'asc' : 'desc').limit(limit)).valueChanges();
    } else {
      return this.firestore.collection<Activity>(ACTIVITIES_COLLECTION,
        ref => ref.orderBy(sortField, asc ? 'asc' : 'desc')).valueChanges();
    }
  }

  // use only with matching cases
  searchActivityByName(activityName: string) {
    return this.firestore.collection<Activity>(ACTIVITIES_COLLECTION, ref =>
      ref.where('name', '>', activityName).where('name', '<', `${activityName}z`).orderBy('name')).valueChanges();
  }

  deleteActivity(activityId: string) {
    return this.firestore.collection<Activity>(ACTIVITIES_COLLECTION).doc(activityId).delete();
  }


}
