import { CategoriaServicio } from "./categoriaServicios-response";

export class ServicioResponse {
    idServicio: number;
    categoriaServicio: CategoriaServicio;
    nombre: string;
    descripcion: string;
    precio: number;
    imagenServicio: string;
    activo: boolean;
}

export class Servicio {
    idServicio: number;
    categoriaServicio: CategoriaServicio;
    nombre: string;
    descripcion: string;
    precio: number;
    imagenServicio: string;
    activo: boolean;
}