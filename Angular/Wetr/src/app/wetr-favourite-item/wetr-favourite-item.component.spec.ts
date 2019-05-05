import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WetrFavouriteItemComponent } from './wetr-favourite-item.component';

describe('WetrFavouriteItemComponent', () => {
  let component: WetrFavouriteItemComponent;
  let fixture: ComponentFixture<WetrFavouriteItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WetrFavouriteItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WetrFavouriteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
