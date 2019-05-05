import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WetrStationComponent } from './wetr-station.component';

describe('WetrStationComponent', () => {
  let component: WetrStationComponent;
  let fixture: ComponentFixture<WetrStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WetrStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WetrStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
