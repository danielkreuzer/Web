import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WetrSearchComponent } from './wetr-search.component';

describe('WetrSearchComponent', () => {
  let component: WetrSearchComponent;
  let fixture: ComponentFixture<WetrSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WetrSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WetrSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
