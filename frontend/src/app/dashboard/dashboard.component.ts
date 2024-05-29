import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from '../models/proyecto.model';  // Asegúrate de importar el modelo correctamente

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  proyectos: Proyecto[] = [];  // Declara la variable con el tipo adecuado

  constructor(
    private authService: AuthService,
    private proyectoService: ProyectoService
  ) { }

  ngOnInit(): void {
    this.proyectoService.getProyectosInteres().subscribe((proyectos: Proyecto[]) => {
      this.proyectos = proyectos;
    });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
