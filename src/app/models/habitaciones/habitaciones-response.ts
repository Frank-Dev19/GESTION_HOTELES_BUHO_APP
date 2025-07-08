import { TipoHabitaciones } from "../tipoHabitaciones/tipoHabitaciones-response";

export class HabitacionesResponse {
    idHabitacion: number;
    numero: number;
    estado: string;
    tipoHabitacion: TipoHabitaciones;
}

// export class Habitacion {
//     idHabitacion: number;
//     numero: number;
//     estado: string;
//     tipo_habitacion: TipoHabitaciones;
// }