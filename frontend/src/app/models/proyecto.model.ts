
export interface Proyecto {
  proyectoId?: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  propietarioId: number; // Asegúrate de tener este campo
  colaboradoresIds?: number[];
}
