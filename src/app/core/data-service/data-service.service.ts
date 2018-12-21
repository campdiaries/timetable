import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from 'src/app/models/User';
import * as firebase from 'firebase';
import { Student } from 'src/app/models/Student';
import { Activity } from 'src/app/models/Activity';
import { Session } from 'src/app/models/Session';
import { School } from 'src/app/models/School';
import { Volunteer } from 'src/app/models/Volunteer';
import { Timetable } from 'src/app/models/Timetable';
import { map } from 'rxjs/operators';

const STUDENTS_COLLECTION = 'students';
const ACTIVITIES_COLLECTION = 'activities';
const SESSIONS_COLLECTION = 'sessions';
const SCHOOL_COLLECTION = 'schools';
const TIMETABLE_COLLECTION = 'timetable';
const USERS_COLLECTION = 'users';
const VOLUNTEERS_COLLECTION = 'volunteers';
const APP_SETTINGS = 'appsettings';

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
    return this.firestore.createId();
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


  getStudentByName(name: string, schoolId: string) {
    return this.firestore.collection<Student>(STUDENTS_COLLECTION, ref => ref.where('schoolId', '==', schoolId)
      .where('name', '==', name)).valueChanges();
  }

  getAllStudents(sortField: string, asc: boolean, schoolId: string, limit?: number) {
    if (limit) {
      return this.firestore.collection<Student>(STUDENTS_COLLECTION, ref =>
        ref.where('schoolId', '==', schoolId).orderBy(sortField, asc ? 'asc' : 'desc').limit(limit)).valueChanges();
    } else {
      return this.firestore.collection<Student>(STUDENTS_COLLECTION, ref =>
        ref.where('schoolId', '==', schoolId).orderBy(sortField, asc ? 'asc' : 'desc')).valueChanges();
    }
  }

  // works only with matching cases
  searchStudentsByName(name: string, schoolId: string) {
    return this.firestore.collection<Student>(STUDENTS_COLLECTION, ref =>
      ref.where('name', '>', name).where('name', '<', `${name}z`).where('schoolId', '==', schoolId).orderBy('name')).valueChanges();
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
        ref => ref.orderBy(sortField, asc ? 'asc' : 'desc')).snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              // console.log({ id, ...data });
              return { id, ...data };
            });
          })
        );
      // return this.firestore.collection<School>(SCHOOL_COLLECTION,
      //   ref => ref.orderBy(sortField, asc ? 'asc' : 'desc')).valueChanges();
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

  // add & modify
  addVolunteer(volunteer: Volunteer) {
    return this.firestore.collection<Volunteer>(VOLUNTEERS_COLLECTION).doc(volunteer.volunteerId).set(volunteer, { merge: true });
  }

  getVolunteer(volunteerId: string) {
    return this.firestore.collection<Volunteer>(VOLUNTEERS_COLLECTION).doc(volunteerId).valueChanges();
  }

  getVolunteerByName(volunteerName: string) {
    return this.firestore.collection<Volunteer>(VOLUNTEERS_COLLECTION, ref => ref.where('name', '==', volunteerName)).valueChanges();
  }

  getAllVolunteers(sortField: string, asc: boolean, limit?: number) {
    if (limit) {
      return this.firestore.collection<Volunteer>(VOLUNTEERS_COLLECTION,
        ref => ref.orderBy(sortField, asc ? 'asc' : 'desc').limit(limit)).valueChanges();
    } else {
      return this.firestore.collection<Volunteer>(VOLUNTEERS_COLLECTION,
        ref => ref.orderBy(sortField, asc ? 'asc' : 'desc')).valueChanges();
    }
  }

  getVolunteersByActivity(activityId: string, asc: boolean) {
    return this.firestore.collection<Volunteer>(VOLUNTEERS_COLLECTION,
      ref => ref.where('activity', '==', activityId).orderBy('name', asc ? 'asc' : 'desc')).valueChanges();
  }

  // use only with matching cases
  searchVolunteerByName(volunteerName: string) {
    return this.firestore.collection<Volunteer>(VOLUNTEERS_COLLECTION, ref =>
      ref.where('name', '>', volunteerName).where('name', '<', `${volunteerName}z`).orderBy('name')).valueChanges();
  }

  deleteVolunteer(volunteerId: string) {
    return this.firestore.collection<Volunteer>(VOLUNTEERS_COLLECTION).doc(volunteerId).delete();
  }

  // add & modify
  addTimetable(timetable: Timetable) {
    return this.firestore.collection<Timetable>(TIMETABLE_COLLECTION).doc(timetable.timetableId).set(timetable, { merge: true });
  }

  getTimetable(timetableId: string) {
    return this.firestore.collection<Timetable>(TIMETABLE_COLLECTION).doc(timetableId).valueChanges();
  }

  deleteTimetable(timetableId: string) {
    return this.firestore.collection<Timetable>(TIMETABLE_COLLECTION).doc(timetableId).delete();
  }

  // upload file,
  // tslint:disable-next-line:max-line-length
  // use detectFiles for reference from https://github.com/DarshanGowda0/new-reaching-hands/blob/master/src/app/components/common/student-details/add-student-log/add-student-log.component.ts

  uploadFileToStorage(file: File) {
    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }
    const path = `/Images/${new Date().getTime()}_${file.name}`;
    const customMetadata = { app: 'Students Images' };
    return this.storage.upload(path, file, { customMetadata });
  }


  getAllUsers(sortField: string, asc: boolean, limit?: number) {
    if (limit) {
      return this.firestore.collection<Volunteer>(USERS_COLLECTION,
        ref => ref.orderBy(sortField, asc ? 'asc' : 'desc').limit(limit)).valueChanges();
    } else {
      return this.firestore.collection<Volunteer>(USERS_COLLECTION,
        ref => ref.orderBy(sortField, asc ? 'asc' : 'desc')).valueChanges();
    }
  }


  // getUser(): User {
  //   return this.user;
  // }

}
