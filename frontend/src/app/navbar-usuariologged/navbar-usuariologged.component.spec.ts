import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUsuariologgedComponent } from './navbar-usuariologged.component';

describe('NavbarUsuariologgedComponent', () => {
  let component: NavbarUsuariologgedComponent;
  let fixture: ComponentFixture<NavbarUsuariologgedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarUsuariologgedComponent]
    });
    fixture = TestBed.createComponent(NavbarUsuariologgedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
