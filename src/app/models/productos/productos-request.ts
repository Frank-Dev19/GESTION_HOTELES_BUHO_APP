import { Categoria } from "../categorias/categorias-response";

export class ProductosSaveRequest {
    idProducto: number;
    nombre: string;
    stock: number;
    precio: number;
    categoria: Categoria;
}

export class ProductosDeleteRequest {
    idProducto: number;
}

export class listarPorCategoria {
    idCategoria: number;
}