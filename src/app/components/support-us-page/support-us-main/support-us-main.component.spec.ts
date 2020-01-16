import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportUsMainComponent } from './support-us-main.component';

describe('SupportUsMainComponent', () => {
  let component: SupportUsMainComponent;
  let fixture: ComponentFixture<SupportUsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportUsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportUsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
