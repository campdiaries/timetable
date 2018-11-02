import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from 'src/app/models/user';
import * as firebase from 'firebase';
import { Student } from 'src/app/models/Student';
import { Activity } from 'src/app/models/Activity';
import { Session } from 'src/app/models/Session';
import { School } from 'src/app/models/School';

const STUDENTS_COLLECTION = 'students';
const ACTIVITIES_COLLECTION = 'activities';
const SESSIONS_COLLECTION = 'sessions';
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

  // add & modify
  addSession(session: Session) {
    return this.firestore.collection<Session>(SESSIONS_COLLECTION).doc(session.sessionId).set(session, { merge: true });
  }

  getSession(sessionId: string) {
    return this.firestore.collection<Session>(SESSIONS_COLLECTION).doc(sessionId).valueChanges();
  }

  getSessionsByName(name: string) {
    return this.firestore.collection<Session>(SESSIONS_COLLECTION, ref => ref.where('name', '==', name)).valueChanges();
  }

  getSessionsByDate(date: Date) {
    return this.firestore.collection<Session>(SESSIONS_COLLECTION, ref => ref.where('time', '==', date).orderBy('time')).valueChanges();
  }

  getAllSessions(sortField: string, asc: boolean, limit?: number) {
    if (limit) {
      return this.firestore.collection<Session>(SESSIONS_COLLECTION,
        ref => ref.orderBy(sortField, asc ? 'asc' : 'desc').limit(limit)).valueChanges();
    } else {
      return this.firestore.collection<Session>(SESSIONS_COLLECTION,
        ref => ref.orderBy(sortField, asc ? 'asc' : 'desc')).valueChanges();
    }
  }

  // use only with matching cases
  searchSessionByName(sessionName: string) {
    return this.firestore.collection<Session>(SESSIONS_COLLECTION, ref =>
      ref.where('name', '>', sessionName).where('name', '<', `${sessionName}z`).orderBy('name')).valueChanges();
  }

  deleteSession(sessionId: string) {
    return this.firestore.collection<Session>(SESSIONS_COLLECTION).doc(sessionId).delete();
  }

  // add & modify
  addSchool(school: School) {
    return this.firestore.collection<School>(SCHOOL_COLLECTION).doc(school.schoolId).set(school, { merge: true });
  }

  getSchool(schoolId: string) {
    return this.firestore.collection<School>(SCHOOL_COLLECTION).doc(schoolId).valueChanges();
  }

  getSchoolByName(name: string) {
    return this.firestore.collection<School>(SCHOOL_COLLECTION, ref => ref.where('name', '==', name)).valueChanges();
  }

  getAllSchools(sortField: string, asc: boolean, limit?: number) {
    if (limit) {
      return this.firestore.collection<School>(SCHOOL_COLLECTION,
        ref => ref.orderBy(sortField, asc ? 'asc' : 'desc').limit(limit)).valueChanges();
    } else {
      return this.firestore.collection<School>(SCHOOL_COLLECTION,
        ref => ref.orderBy(sortField, asc ? 'asc' : 'desc')).valueChanges();
    }
  }

  // use only with matching cases
  searchSchoolByName(schoolName: string) {
    return this.firestore.collection<School>(SCHOOL_COLLECTION, ref =>
      ref.where('name', '>', schoolName).where('name', '<', `${schoolName}z`).orderBy('name')).valueChanges();
  }

  deleteSchool(schoolId: string) {
    return this.firestore.collection<School>(SCHOOL_COLLECTION).doc(schoolId).delete();
  }

}
