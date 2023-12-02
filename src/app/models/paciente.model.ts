import { historialMedico } from './historial.model';

export interface Paciente {
    id: string;
    name: string;
    age : number;
    cel: number;
    description:string;
    date: Date;
    alergias:string;
    historialMedico:historialMedico[];
}