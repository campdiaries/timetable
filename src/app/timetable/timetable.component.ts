import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../services/timetable.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  constructor(private timetableService: TimetableService) { }

  sessions;
  students;

  ngOnInit() {
    this.sessions = this.timetableService.sessions;
    this.students = this.timetableService.students;
  }

}
