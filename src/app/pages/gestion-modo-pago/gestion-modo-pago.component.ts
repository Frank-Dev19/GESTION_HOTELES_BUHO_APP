import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModoPagoService } from '../../services/modoPago.service';
import { ModoPagoResponse } from '../../models/modoPago/modoPago-response';
import { ModoPagoSaveRequest, ModoPagoDeleteRequest } from '../../models/modoPago/modoPago-request';

@Component({
  selector: 'app-gestion-modo-pago',
  standalone: false,
  templateUrl: './gestion-modo-pago.component.html',
  styleUrl: './gestion-modo-pago.component.scss'
})
export class GestionModoPagoComponent implements OnInit {

  modoPagos: ModoPagoResponse[] = [];
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;
  modoPagoForm: FormGroup;
  modalTitulo: string = 'Agregar Modo de Pago';
  modoPagoEditando: ModoPagoResponse | null = null;

  constructor(
    private modoPagoService: ModoPagoService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.modoPagoForm = this.fb.group({
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarModoPago();
  }

  cargarModoPago(): void {
    this.modoPagoService.ListarModoPago().subscribe({
      next: (modoPago) => {
        this.modoPagos = modoPago;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  openModal(modalTemplate: TemplateRef<any>, modoPago?: ModoPagoResponse): void {
    if (modoPago) {
      this.modalTitulo = 'Editar Modo de Pago'
      this.modoPagoEditando = modoPago;
      this.modoPagoForm.patchValue({
        descripcion: modoPago.descripcion
      });
    } else {
      this.modalTitulo = 'Agregar Modo de Pago'
      this.modoPagoEditando = null;
    }

    this, this.modalService.open(modalTemplate, { size: 'lg' }).result.then(
      (result) => {
        console.log('Modal cerrado con:', result);
      },
      (reason) => {
        console.log('Modal descartado:', reason);
        this.modoPagoForm.reset();
      }
    );
  }

  guardarModoPago(): void {
    if (this.modoPagoForm.invalid) {
      return;
    }

    const modoPagoRequest: ModoPagoSaveRequest = {
      idModoPago: this.modoPagoEditando?.idModoPago ?? null,
      descripcion: this.modoPagoForm.value.descripcion,
    };

    this.modoPagoService.GuardarModoPago(modoPagoRequest).subscribe({
      next: (response) => {
        // if (response) {
        this.modalService.dismissAll();
        this.cargarModoPago();
        this.modoPagoForm.reset();
        this.modoPagoEditando = null; // Reseteamos la edición
        // }
      },
      error: (error) => {
        console.error('Error al guardar el Modo Pago:', error);
      }
    });
  }

  editarModoPago(modoPago: ModoPagoResponse): void {
    this.openModal(this.modalTemplate, modoPago);
  }

  eliminarModoPago(modoPago: ModoPagoResponse): void {
    if (confirm(`¿Está seguro que desea eliminar el modo de pago ${modoPago.descripcion}?`)) {
      const deleteRequest: ModoPagoDeleteRequest = {
        idModoPago: modoPago.idModoPago
      };

      const requestArray: ModoPagoDeleteRequest[] = [deleteRequest];

      this.modoPagoService.EliminarModoPago(requestArray).subscribe({
        next: (response) => {
          if (response) {
            console.log("si entro ");
            this.cargarModoPago();
          }
        },
        error: (error) => {
          console.error('Error al eliminar modo de pago:', error);
        }
      });
    }
  }


  actualizar(): void {
    this.cargarModoPago();
  }

}
