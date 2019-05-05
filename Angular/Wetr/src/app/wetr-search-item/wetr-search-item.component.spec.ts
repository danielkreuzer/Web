import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WetrSearchItemComponent } from './wetr-search-item.component';

describe('WetrSearchItemComponent', () => {
  let component: WetrSearchItemComponent;
  let fixture: ComponentFixture<WetrSearchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WetrSearchItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WetrSearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
