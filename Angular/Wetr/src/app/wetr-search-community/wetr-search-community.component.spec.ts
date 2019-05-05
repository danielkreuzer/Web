import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WetrSearchCommunityComponent } from './wetr-search-community.component';

describe('WetrSearchCommunityComponent', () => {
  let component: WetrSearchCommunityComponent;
  let fixture: ComponentFixture<WetrSearchCommunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WetrSearchCommunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WetrSearchCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
