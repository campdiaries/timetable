import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { DataService } from './data-service/data-service.service';
import { AuthGuard } from './auth-guard/auth.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthService,
    DataService,
    AuthGuard,
  ]
})
export class CoreModule { }
