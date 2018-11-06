import { Component, OnInit, Input } from '@angular/core';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  selectedTab = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.selectedTab);
  }

  setTab($event: any) {
    console.log($event);
    this.selectedTab = $event;
  }

  tabClick(tabName) {
    switch (tabName) {
      case 'Add activity':
        this.router.navigate(['activity']);
    }

  }
}
