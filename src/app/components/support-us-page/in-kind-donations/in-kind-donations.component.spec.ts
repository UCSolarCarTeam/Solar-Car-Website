import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InKindDonationsComponent } from './in-kind-donations.component';

describe('InKindDonationsComponent', () => {
  let component: InKindDonationsComponent;
  let fixture: ComponentFixture<InKindDonationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InKindDonationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InKindDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
