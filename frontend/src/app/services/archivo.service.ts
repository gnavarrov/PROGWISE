import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {
  private baseUrl = 'http://localhost:8080/api/archivos';

  constructor(private http: HttpClient) {}

  getArchivosPorProyecto(proyectoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/proyecto/${proyectoId}`);
  }

  subirArchivo(archivoData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/subir`, archivoData);
  }
}
