import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PortalComponent } from './portal.component';

describe('BusinessComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        PortalComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PortalComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Solar-Car-Website'`, () => {
    const fixture = TestBed.createComponent(PortalComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Solar-Car-Website');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(PortalComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Solar-Car-Website!');
  });
});
