export interface Medico {
    id?: string; 
    rut: string; 
    correo: string;
    nombre: string;  
    apellido: string;
    especialidad: Especialidad; 
    claveSecreta: string; 
    contraseña: string; 
}

export type Especialidad = 'Medicina General' | 'Kinesiología' | 'Oftalmología' | 'Otorrinolaringología';