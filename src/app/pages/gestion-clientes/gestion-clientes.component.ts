import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ClientesResponse } from '../../models/clientes/clientes-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientesSaveRequest, ClientesDeleteRequest } from '../../models/clientes/clientes-request';
import { ClienteService } from '../../services/clientes.service';


@Component({
  selector: 'app-gestion-clientes',
  standalone: false,
  templateUrl: './gestion-clientes.component.html',
  styleUrl: './gestion-clientes.component.scss'
})
export class GestionClientesComponent implements OnInit {

  clientes: ClientesResponse[] = [];
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;
  clienteForm: FormGroup;
  modalTitulo: string = 'Agregar Usuario';
  clienteEditando: ClientesResponse | null = null;

  constructor(
    private clientesService: ClienteService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.clienteForm = this.fb.group({

      nombreCompleto: ['', Validators.required],
      dni: ['', Validators.required],
      fechaRegistro: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clientesService.ListarUsuarios().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        console.log("si llego ga");
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
      }
    });
  }

  openModal(modalTemplate: TemplateRef<any>, cliente?: ClientesResponse): void {
    if (cliente) {
      this.modalTitulo = 'Editar Usuario';
      this.clienteEditando = cliente;
      this.clienteForm.patchValue({
        nombreCompleto: cliente.nombreCompleto,
        dni: cliente.dni,
        fechaRegistro: cliente.fechaRegistro,

      });
      //this.usuarioForm.get('password')?.clearValidators();
      //this.usuarioForm.get('password')?.updateValueAndValidity();
    } else {
      this.modalTitulo = 'Agregar Usuario';
      this.clienteEditando = null;
      this.clienteForm.reset();
      //this.usuarioForm.get('password')?.setValidators([Validators.required]);
      //this.usuarioForm.get('password')?.updateValueAndValidity();
    }

    this.modalService.open(modalTemplate, { size: 'lg' }).result.then(
      (result) => {
        console.log('Modal cerrado con:', result);
      },
      (reason) => {
        console.log('Modal descartado:', reason);
        this.clienteForm.reset();
      }
    );
  }

  guardarCliente(): void {
    if (this.clienteForm.invalid) {
      return;
    }

    const clienteRequest: ClientesSaveRequest = {
      idCliente: this.clienteEditando?.idCliente ?? null,
      nombreCompleto: this.clienteForm.value.nombreCompleto,
      dni: this.clienteForm.value.dni,
      fechaRegistro: this.clienteForm.value.fechaRegistro,

    };

    //const requestArray: UsuariosSaveRequest[] = [usuarioRequest];

    this.clientesService.GuardarClientes(clienteRequest).subscribe({
      next: (response) => {
        // if (response) {
        this.modalService.dismissAll();
        this.cargarClientes();
        this.clienteForm.reset();
        this.clienteEditando = null; // Reseteamos la edición
        // }
      },
      error: (error) => {
        console.error('Error al guardar cliente:', error);
      }
    });
    // this.modalService.dismissAll();
    // this.cargarUsuarios();
  }

  editarCliente(cliente: ClientesResponse): void {
    this.openModal(this.modalTemplate, cliente);
  }

  eliminarCliente(cliente: ClientesResponse): void {
    if (confirm(`¿Está seguro que desea eliminar al usuario ${cliente.nombreCompleto}?`)) {
      const deleteRequest: ClientesDeleteRequest = {
        idCliente: cliente.idCliente
      };

      const requestArray: ClientesDeleteRequest[] = [deleteRequest];

      this.clientesService.EliminarClientes(requestArray).subscribe({
        next: (response) => {
          if (response) {
            this.cargarClientes();
          }
        },
        error: (error) => {
          console.error('Error al eliminar cliente:', error);
        }
      });
    }
  }

  actualizar() {
    this.cargarClientes();
  }
  // get modalTemplate(): TemplateRef<any> {
  //   // Esto se resuelve con ViewChild en la implementación real
  //   return {} as TemplateRef<any>;
  // }


}
