import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from './core/data-service/data-service.service';
import { TimetableService } from './services/timetable.service';
import * as _ from 'lodash';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SetSchoolModalComponent } from './ui-components/set-school-modal/set-school-modal.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private ds: DataService, private timetableService: TimetableService, public dialog: MatDialog) {
  }
  title = 'app';

  animal: string;
  name: string;

  ngOnInit() {
    console.log(localStorage.getItem('schoolId'));
  }

}
