import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VolunteerComponent } from './volunteer/volunteer/volunteer.component';
import { StudentComponent } from './student/student/student.component';
import { SchoolComponent } from './school/school/school.component';
import { ActivityComponent } from './activity/activity/activity.component';
import { AuthGuard } from './core/auth-guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { TimetableComponent } from './timetable/timetable.component';
import { DevComponent } from './dev/dev.component';


// TODO: use gaurds here
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'student',
    pathMatch: 'full'
  },
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'volunteer',
    component: VolunteerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'school',
    component: SchoolComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'activity',
    component: ActivityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-update-student',
    component: AddStudentComponent,
  },
  {
    path: 'add-update-student/:id',
    component: AddStudentComponent,
  },
  {
    path: 'activity/:id',
    component: ActivityComponent
  },
  {
    path: 'timetable',
    component: TimetableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dev',
    component: DevComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
