import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WetrAddMeasurementFormComponent } from './wetr-add-measurement-form.component';

describe('WetrAddMeasurementFormComponent', () => {
  let component: WetrAddMeasurementFormComponent;
  let fixture: ComponentFixture<WetrAddMeasurementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WetrAddMeasurementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WetrAddMeasurementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
