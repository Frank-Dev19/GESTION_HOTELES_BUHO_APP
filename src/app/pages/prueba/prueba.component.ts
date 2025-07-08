import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TipoHabitaciones } from '../../models/tipoHabitaciones/tipoHabitaciones-response';
import { HabitacionesResponse } from '../../models/habitaciones/habitaciones-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { habitacionesDeleteRequest, habitacionesSaveRequest, listarPorTipoHabitaciones } from '../../models/habitaciones/habitaciones-request';
import { TipoHabitacionesService } from '../../services/tipoHabitaciones.service';
import { HabitacionesService } from '../../services/habitaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-prueba',
    standalone: false,
    templateUrl: './prueba.component.html',
    styleUrl: './prueba.component.scss'
})
export class pruebaComponent {

    // tipoHabitaciones: TipoHabitaciones[] = [];
    // habitaciones: HabitacionesResponse[] = [];
    // selectedTipoHabitacion: number = 0;
    // selectedTipoHabitacionId: number | null = null;
    // @ViewChild('AddTipoHabitaciones') modalTemplateTipoHabitaciones!: TemplateRef<any>;
    // @ViewChild('AddHabitaciones') modalTemplateHabitaciones!: TemplateRef<any>;
    // tipoHabitacionesForm: FormGroup;
    // habitacionesForm: FormGroup;
    // modalTitulo: string = "Agregar Habitacion / Tipo habitaciones";
    // tipohabitacionEditando: TipoHabitaciones | null = null;;
    // habitacionEditando: habitacionesSaveRequest | null = null;
    // modalHabitacion = "Agregar Habitación";

    // constructor(
    //     private tipoHabitacionesService: TipoHabitacionesService,
    //     private habitacionesService: HabitacionesService,
    //     private modalService: NgbModal,
    //     private fb: FormBuilder
    // ) {

    //     this.tipoHabitacionesForm = this.fb.group({
    //         descripcion: ['', Validators.required],
    //         precio: ['', Validators.required],
    //         capacidad: ['', Validators.required]
    //     });

    //     this.habitacionesForm = this.fb.group({
    //         numero: ['', Validators.required],
    //         estado: ['', Validators.required],
    //         tipoHabitacionSeleccionada: ['', Validators.required]
    //     });

    // }

    // ngOnInit(): void {
    //     this.cargarTipoHabitaciones();
    //     this.cargarHabitaciones();
    // }

    // cargarTipoHabitaciones(): void {
    //     this.tipoHabitacionesService.ListarTipoHabitaciones().subscribe({
    //         next: (tipoHabitaciones) => {
    //             this.tipoHabitaciones = tipoHabitaciones;
    //         },
    //         error: (error) => {
    //             console.error('Error al cargar tipo de habitaciones', error);
    //         }
    //     })
    // }


    // cargarHabitaciones(): void {
    //     this.habitacionesService.ListarHabitaciones().subscribe({
    //         next: (habitaciones) => {
    //             this.habitaciones = habitaciones;
    //         },
    //         error: (error) => {
    //             console.error('Error al cargar todas las habitaciones', error);
    //         }
    //     })
    // }


    // guardarHabitaciones(): void {
    //     if (this.habitacionesForm.invalid) {
    //         return;
    //     }
    //     const tipoHabitaciones: TipoHabitaciones = { idTipoHabitacion: Number(this.selectedTipoHabitacionId), descripcion: null, precio: null, capacidad: null };

    //     const habitacionesSaveRequest: habitacionesSaveRequest = {
    //         idHabitacion: this.habitacionEditando?.idHabitacion ?? null,
    //         numero: this.habitacionesForm.value.numero,
    //         estado: this.habitacionesForm.value.estado,
    //         tipoHabitacion: tipoHabitaciones
    //     };

    //     this.habitacionesService.GuardarHabitaciones(habitacionesSaveRequest).subscribe({
    //         next: (response) => {
    //             if (response) {
    //                 this.modalService.dismissAll();

    //             }
    //         },
    //         error: (error) => {
    //             console.error('Error al guardar habitaciones', error);
    //         }
    //     });
    // }


    // guardarTipoHabitacion(): void {
    //     if (this.tipoHabitacionesForm.invalid) {
    //         return;
    //     }

    //     const tipoHabitacionRquest: TipoHabitaciones = {
    //         idTipoHabitacion: this.tipohabitacionEditando?.idTipoHabitacion ?? null,
    //         descripcion: this.tipoHabitacionesForm.value.descripcion,
    //         precio: this.tipoHabitacionesForm.value.precio,
    //         capacidad: this.tipoHabitacionesForm.value.capacidad
    //     }

    //     this.tipoHabitacionesService.GuardarTipoHabitaciones(tipoHabitacionRquest).subscribe({
    //         next: (response) => {
    //             if (response) {
    //                 this.modalService.dismissAll();
    //                 this.cargarTipoHabitaciones();
    //             }
    //         },
    //         error: (error) => {
    //             console.error('Error al guardar la habitacion', error);
    //         }
    //     });
    // }


    // buscarHabitacionesPorTipo(): void {
    //     if (this.selectedTipoHabitacionId) {
    //         const listarrequest: listarPorTipoHabitaciones = { idTipoHabitacion: Number(this.selectedTipoHabitacionId) };

    //         const request: listarPorTipoHabitaciones[] = [listarrequest];

    //         this.habitacionesService.ListarHabitacionesPorTipo(request).subscribe({
    //             next: (habitaciones) => {
    //                 this.habitaciones = habitaciones;
    //             },
    //             error: (error) => {
    //                 console.error('Error al cargar habitaciones por tipo:', error);
    //             }
    //         });
    //     } else {
    //         alert('Porfavor seleccione un tipo de habitacion');
    //     }
    // }


    // openModal(modalTemplate: TemplateRef<any>, tipoHabitaciones?: TipoHabitaciones, habitaciones?: HabitacionesResponse): void {

    //     if (tipoHabitaciones) {
    //         this.modalTitulo = 'Editar Tipo Habitacion';
    //         this.tipohabitacionEditando = tipoHabitaciones;
    //         this.tipoHabitacionesForm.patchValue({
    //             descripcion: tipoHabitaciones.descripcion,
    //             precio: tipoHabitaciones.precio,
    //             capacidad: tipoHabitaciones.capacidad
    //         });
    //     }

    //     if (habitaciones) {
    //         this.modalTitulo = 'Editar Habitacion';
    //         this.habitacionEditando = habitaciones;
    //         this.habitacionesForm.patchValue({
    //             numero: habitaciones.numero,
    //             estado: habitaciones.estado
    //         })
    //     }
    //     else {
    //         this.modalTitulo = 'Agregar tipo/habitacion';
    //         this.tipohabitacionEditando = null;
    //         this.tipoHabitacionesForm.reset();
    //         this.habitacionesForm.reset();
    //     }

    //     this.modalService.open(modalTemplate, { size: 'lg' });
    // }

    // editarHabitacion(habitaciones: HabitacionesResponse): void {
    //     this.openModal(this.modalTemplateHabitaciones, null, habitaciones);
    // }

    // editarTipoHabitacion(tipoHabitacionId: number): void {
    //     const tipoHabitaciones = this.tipoHabitaciones.find(c => c.idTipoHabitacion === tipoHabitacionId);
    //     console.log(tipoHabitacionId);
    //     console.log(tipoHabitaciones);
    //     this.openModal(this.modalTemplateTipoHabitaciones, tipoHabitaciones, null);
    // }

    // eliminarHabitacion(habitacion: HabitacionesResponse): void {
    //     if (confirm('¿Está seguro que desea eliminar la habitación ${habitacion.numero}?')) {

    //         const deleteRequest: habitacionesDeleteRequest = { idHabitacion: habitacion.idHabitacion };
    //         const requestArray: habitacionesDeleteRequest[] = [deleteRequest];
    //         this.habitacionesService.EliminarHabitaciones(requestArray).subscribe({
    //             next: (response) => {
    //                 this.buscarHabitacionesPorTipo();
    //             },
    //             error: (error) => {
    //                 console.error('Error al eliminar la habitacion', error);
    //             }
    //         })

    //     }
    // }

    // actualizar(): void {
    //     this.cargarHabitaciones();
    // }

}