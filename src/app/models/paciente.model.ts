export interface Paciente {
  id?: string; // Opcional para el ID
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
  direccion?: string; // Opcional
  userId?: string; // Campo para almacenar el ID del usuario
}