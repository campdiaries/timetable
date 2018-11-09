import { Component, OnInit } from '@angular/core';
import { DataService } from './core/data-service/data-service.service';
import { TimetableService } from './services/timetable.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private ds: DataService, private timetableService: TimetableService) {
  }
  title = 'app';

  ngOnInit() {
    console.log(this.timetableService.sessions);
  }

}
