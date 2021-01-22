import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElysiaComponent } from './elysia.component';

describe('ElysiaComponent', () => {
  let component: ElysiaComponent;
  let fixture: ComponentFixture<ElysiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElysiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElysiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
