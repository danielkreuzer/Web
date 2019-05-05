import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WetrAddStationFormComponent } from './wetr-add-station-form.component';

describe('WetrAddStationFormComponent', () => {
  let component: WetrAddStationFormComponent;
  let fixture: ComponentFixture<WetrAddStationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WetrAddStationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WetrAddStationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
