import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/User';
import * as firebase from 'firebase/app';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;
  userObj: User;
  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore, private router: Router, private zone: NgZone) {
    this.afAuth.auth.getRedirectResult().then(cred => {
      if (cred.user) {
        console.log('successfully signed-in ', cred.user);
        this.updateUserData(cred.user);
        this.zone.run(_ => {
          this.router.navigate(['']);
        });
      }
    }).catch(err => {
      console.error(err);
    });

    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));

  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    // update this if you want to add user to volunteers by default
    const userRef = this.afStore.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      isAdmin: false,
      isVolunteer: true
    };
    return userRef.set(data, { merge: true });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithRedirect(provider);
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }

  isAuthorized(user: User): boolean {
    console.log(user);
    this.userObj = user;
    return user.isVolunteer || user.isAdmin;
  }

  isAdmin(user: User): boolean {
    return user.isAdmin;
  }

  isVolunteer(user: User): boolean {
    return user.isVolunteer;
  }

  getUserObj(): User {
    return this.userObj;
  }

}
