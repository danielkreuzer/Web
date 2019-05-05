import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WetrLoginComponent } from './wetr-login.component';

describe('WetrLoginComponent', () => {
  let component: WetrLoginComponent;
  let fixture: ComponentFixture<WetrLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WetrLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WetrLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
