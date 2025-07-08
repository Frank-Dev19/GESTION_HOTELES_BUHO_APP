export class ClientesSaveRequest {
    idCliente: number;
    nombreCompleto: string;
    dni: string;
    fechaRegistro: string;
}

export class ClientesDeleteRequest {
    idCliente: number
}