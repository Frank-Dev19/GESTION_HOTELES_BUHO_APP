//import { Categoria } from "../categorias/categorias-response";
import { CategoriaServicio } from "./categoriaServicios-response";
export class ServiciosSaveRequest {
    idServicio: number;
    categoriaServicio: CategoriaServicio;
    nombre: string;
    descripcion: string;
    precio: number;
    imagenServicio: string;
    activo: boolean;

}


export class ServiciosDeleteRequest {
    idServicio: number;
}

export class listarPorCategoriaServicio {
    idCategoriaServicio: number;
}