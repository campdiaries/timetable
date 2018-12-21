import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data-service/data-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-school-modal',
  templateUrl: './set-school-modal.component.html',
  styleUrls: ['./set-school-modal.component.css']
})
export class SetSchoolModalComponent implements OnInit {

  schools: any[];
  selectedSchool: any;
  form = new FormGroup({
    schools: new FormControl({})
  });
  constructor(private ds: DataService, private router: Router) { }

  ngOnInit() {
    this.ds.getAllSchools('name', true).subscribe(data => {
      this.schools = data;
    });

  }

  setSchoolId() {
    console.log(this.selectedSchool);
    if (this.selectedSchool === undefined) {
      alert('please select the school');
    } else {
      localStorage.setItem('schoolId', this.selectedSchool);
      this.router.navigate(['']);

    }

  }

}
