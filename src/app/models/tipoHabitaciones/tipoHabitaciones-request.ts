export class TipoHabitacionesSaveRequest {
    idTipoHabitacion: number;
    descripcion: string;
    precio: number;
    capacidad: number;
    imagenUrl: string;
}

export class TipoHabitacionesDeleteRequest {
    idTipoHabitacion: number;
}