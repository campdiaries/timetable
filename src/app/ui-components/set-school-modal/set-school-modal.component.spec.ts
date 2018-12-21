import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSchoolModalComponent } from './set-school-modal.component';

describe('SetSchoolModalComponent', () => {
  let component: SetSchoolModalComponent;
  let fixture: ComponentFixture<SetSchoolModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetSchoolModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetSchoolModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
