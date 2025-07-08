import { Categoria } from "../categorias/categorias-response";

export class ProductoResponse {
    idProducto: number;
    nombre: string;
    stock: number;
    precio: number;
    categoria: Categoria;
}
