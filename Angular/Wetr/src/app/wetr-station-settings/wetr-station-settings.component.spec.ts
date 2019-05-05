import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WetrStationSettingsComponent } from './wetr-station-settings.component';

describe('WetrStationSettingsComponent', () => {
  let component: WetrStationSettingsComponent;
  let fixture: ComponentFixture<WetrStationSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WetrStationSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WetrStationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
