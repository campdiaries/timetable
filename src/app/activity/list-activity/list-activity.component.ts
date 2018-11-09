import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Activity } from 'src/app/models/Activity';
import { DataService } from 'src/app/core/data-service/data-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-activity',
  templateUrl: './list-activity.component.html',
  styleUrls: ['./list-activity.component.css']
})
export class ListActivityComponent implements OnInit {

  activities: Activity[] = [];
  @Output() changeTab = new EventEmitter<string>();
  constructor(private ds: DataService, private router: Router) { }

  ngOnInit() {

    this.ds.getAllActivities('name', true).subscribe(data => {
      console.log(data);
      this.activities = data;
    });

  }



  onActivityLinkClicked(activityId: string) {
    console.log(activityId);
    this.router.navigate(['activity/' + activityId]);

     this.changeTab.emit('0');
  }

}
