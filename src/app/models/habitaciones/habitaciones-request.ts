import { TipoHabitaciones } from "../tipoHabitaciones/tipoHabitaciones-response";

export class habitacionesSaveRequest {
    idHabitacion: number;
    numero: number;
    estado: string;
    tipoHabitacion: TipoHabitaciones;
}

export class habitacionesDeleteRequest {
    idHabitacion: number;
}

export class listarPorTipoHabitaciones {
    idTipoHabitacion: number;
}