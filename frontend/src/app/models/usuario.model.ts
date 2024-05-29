export class Usuario {
  constructor(
    public usuarioId: number,
    public nombre: string,
    public apellido: string,
    public email: string,
    public password: string,
  ) {}
}
