import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-usuariologged',
  templateUrl: './navbar-usuariologged.component.html',
  styleUrls: ['./navbar-usuariologged.component.scss']
})
export class NavbarUsuariologgedComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

