import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VolunteerComponent } from './volunteer/volunteer/volunteer.component';
import { StudentComponent } from './student/student/student.component';
import { SchoolComponent } from './school/school/school.component';
import { ActivityComponent } from './activity/activity/activity.component';

const routes: Routes = [
  {path:'student',component:StudentComponent},
  {path:'volunteer',component:VolunteerComponent},
  {path:'school',component:SchoolComponent},
  {path:'activity',component:ActivityComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
