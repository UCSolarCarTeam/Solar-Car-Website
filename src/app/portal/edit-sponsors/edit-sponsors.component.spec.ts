import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSponsorsComponent } from './edit-sponsors.component';

describe('EditSponsorsComponent', () => {
  let component: EditSponsorsComponent;
  let fixture: ComponentFixture<EditSponsorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSponsorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
