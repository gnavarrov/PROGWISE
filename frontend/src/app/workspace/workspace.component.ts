import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../services/proyecto.service';
import { UsuarioService } from '../services/usuario.service';
import { Proyecto } from '../models/proyecto.model';
import { Usuario } from '../models/usuario.model';
import { AuthService } from '../services/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  proyectos: Proyecto[] = [];
  usuarios: Usuario[] = [];
  nuevoProyecto: Proyecto = {
    nombre: '',
    tipo: '',
    descripcion: '',
    propietarioId: 0,
    colaboradoresIds: []
  };

  constructor(
    private proyectoService: ProyectoService,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    const usuarioAutenticado = this.authService.obtenerUsuarioAutenticado();
    if (usuarioAutenticado) {
      this.nuevoProyecto.propietarioId = usuarioAutenticado.usuarioId;
    } else {
      console.error('El usuario autenticado no está disponible.');
    }
  }

  obtenerUsuarios() {
    this.usuarioService.obtenerTodosLosUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  crearProyecto() {
    const modalElement = document.getElementById('crearProyectoModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  guardarProyecto() {
    if (this.nuevoProyecto.propietarioId === 0) {
      console.error('El propietario no está establecido.');
      return;
    }
    this.proyectoService.crearProyecto(this.nuevoProyecto).subscribe(
      proyecto => {
        this.proyectos.push(proyecto);
        const modalElement = document.getElementById('crearProyectoModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        }
      },
      error => {
        console.error('Error al crear el proyecto:', error);
      }
    );
  }

  editarProyecto(proyecto: Proyecto) {
    console.log('Editar proyecto', proyecto);
  }

  eliminarProyecto(proyecto: Proyecto) {
    console.log('Eliminar proyecto', proyecto);
  }
}
