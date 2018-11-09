import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/core/data-service/data-service.service';
import { Activity } from 'src/app/models/Activity';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  addActivityForm: FormGroup;
  loading = false;
  actionBtnName = 'Add activity';

  constructor(private route: ActivatedRoute, private ds: DataService, private fb: FormBuilder, private sb: MatSnackBar) { }

  ngOnInit() {
    this.initFormGroup();
    // -------------------------EDIT SECTION----------------------------------------
    this.route.url.subscribe(data => {
      // const actionUrl = (data[1]) ? data[1].path : '';
      if (data[1]) {
        const activityId = data[1].path;
        this.ds.getActivity(activityId).subscribe(val => {
          this.addActivityForm.setValue(val);
          this.actionBtnName = 'Update Activity';
        });

      }
    });

  }

  initFormGroup() {
    this.addActivityForm = this.fb.group({
      activityId: '',
      name: ''
    });
  }

  clearForm() {
    this.initFormGroup();
  }

  addActivity() {
    if (this.addActivityForm.controls.activityId.value === '') {
      const randomActivityId = this.ds.generateRandomId();
      this.addActivityForm.patchValue({ activityId: randomActivityId });
    }

    console.log(this.addActivityForm.value);

    const acitvity: Activity = this.addActivityForm.value;
    this.loading = true;
    this.ds.addActivity(acitvity).then((data) => {
      this.loading = false;
      this.clearForm();
      this.sb.open('Activity has been added', 'okay', {
        duration: 2000
      });

    });

  }

}
