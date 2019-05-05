import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WetrHomeComponent } from './wetr-home.component';

describe('WetrHomeComponent', () => {
  let component: WetrHomeComponent;
  let fixture: ComponentFixture<WetrHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WetrHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WetrHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
