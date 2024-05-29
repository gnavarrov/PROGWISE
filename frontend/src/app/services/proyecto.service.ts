import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiUrl = 'http://localhost:8080/api/proyectos';

  constructor(private http: HttpClient) {}

  crearProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(`${this.apiUrl}/crear`, proyecto);
  }

  getProyectosInteres(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.apiUrl}/interes`);
  }
}
