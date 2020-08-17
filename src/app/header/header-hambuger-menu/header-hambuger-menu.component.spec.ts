import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHambugerMenuComponent } from './header-hambuger-menu.component';

describe('HeaderHambugerMenuComponent', () => {
  let component: HeaderHambugerMenuComponent;
  let fixture: ComponentFixture<HeaderHambugerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderHambugerMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderHambugerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
