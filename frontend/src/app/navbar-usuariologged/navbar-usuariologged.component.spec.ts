import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarUsuarioLoggedComponent } from './navbar-usuariologged.component';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NavbarUsuarioLoggedComponent', () => {
  let component: NavbarUsuarioLoggedComponent;
  let fixture: ComponentFixture<NavbarUsuarioLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarUsuarioLoggedComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [AuthService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarUsuarioLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
