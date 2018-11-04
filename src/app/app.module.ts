import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field'
import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {MatGridListModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirebaseCredentials } from '../environments/firebase-credentials';
import { AddActivityComponent } from './activity/add-activity/add-activity.component';
import { ListActivityComponent } from './activity/list-activity/list-activity.component';
import { AddSchoolComponent } from './school/add-school/add-school.component';
import { ListSchoolComponent } from './school/list-school/list-school.component';
import { AddVolunteerComponent } from './volunteer/add-volunteer/add-volunteer.component';
import { ListVolunteerComponent } from './volunteer/list-volunteer/list-volunteer.component';
import { VolunteerComponent } from './volunteer/volunteer/volunteer.component';
import { StudentComponent } from './student/student/student.component';
import { SchoolComponent } from './school/school/school.component';
import { ActivityComponent } from './activity/activity/activity.component';
import { ListStudentComponent } from './student/list-student/list-student.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    AddActivityComponent,
    ListActivityComponent,
    AddSchoolComponent,
    ListSchoolComponent,
    AddVolunteerComponent,
    ListVolunteerComponent,
    VolunteerComponent,
    StudentComponent,
    SchoolComponent,
    ActivityComponent,
    ListStudentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(FirebaseCredentials.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    CoreModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
