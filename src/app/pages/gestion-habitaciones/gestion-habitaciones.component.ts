import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TipoHabitaciones, TipoHabitacionesResponse } from '../../models/tipoHabitaciones/tipoHabitaciones-response';
import { HabitacionesResponse } from '../../models/habitaciones/habitaciones-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { habitacionesDeleteRequest, habitacionesSaveRequest, listarPorTipoHabitaciones } from '../../models/habitaciones/habitaciones-request';
import { TipoHabitacionesService } from '../../services/tipoHabitaciones.service';
import { HabitacionesService } from '../../services/habitaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-gestion-habitaciones',
  standalone: false,
  templateUrl: './gestion-habitaciones.component.html',
  styleUrl: './gestion-habitaciones.component.scss'
})
export class GestionHabitacionesComponent implements OnInit {

  tipoHabitaciones: TipoHabitaciones[] = [];
  habitaciones: HabitacionesResponse[] = [];

  @ViewChild('modalCategoria') modalTemplateCategoria!: TemplateRef<any>;
  @ViewChild('modalHabitacion') modalTemplateHabitacion!: TemplateRef<any>;

  tipoHabitacionesForm: FormGroup;
  habitacionesForm: FormGroup;

  editandotipoHabitacion: TipoHabitaciones | null = null;
  editandoHabitacion: HabitacionesResponse | null = null;

  imagenPreview: string | null = null; // para vista previa si implementas imagen (opcional)

  constructor(
    private tipoHabitacionesService: TipoHabitacionesService,
    private habitacionesService: HabitacionesService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {

    this.tipoHabitacionesForm = this.fb.group({
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      capacidad: ['', [Validators.required, Validators.min(1)]],
      imagenUrl: [''] // si implementas imagen
    });

    this.habitacionesForm = this.fb.group({
      numero: ['', Validators.required],
      //capacidad: ['', Validators.required],
      estado: ['', Validators.required],
      tipoHabitacionId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarTipoHabitaciones();
    this.cargarHabitaciones();
  }

  cargarTipoHabitaciones(): void {
    this.tipoHabitacionesService.ListarTipoHabitaciones().subscribe({
      next: (tipos) => this.tipoHabitaciones = tipos,
      error: (e) => console.error('Error cargando tipos:', e)
    });
  }

  cargarHabitaciones(): void {
    this.habitacionesService.ListarHabitaciones().subscribe({
      next: (habitaciones) => this.habitaciones = habitaciones,
      error: (e) => console.error('Error cargando habitaciones:', e)
    });
  }

  // Filtra las habitaciones que pertenecen al tipoHabitacion con id especificado
  habitacionesPorCategoria(idTipoHabitacion: number): HabitacionesResponse[] {
    return this.habitaciones.filter(h => h.tipoHabitacion.idTipoHabitacion === idTipoHabitacion);
  }

  // MODAL CATEGORIA
  openModalCategoria(tipoHabitacion?: TipoHabitaciones) {
    this.editandotipoHabitacion = tipoHabitacion ?? null;
    if (tipoHabitacion) {
      this.tipoHabitacionesForm.patchValue({
        descripcion: tipoHabitacion.descripcion,
        precio: tipoHabitacion.precio,
        capacidad: tipoHabitacion.capacidad,
        imagenUrl: tipoHabitacion.imagenUrl || ''
      });
    } else {
      this.tipoHabitacionesForm.reset();
      console.log("si entrooooo");
      this.imagenPreview = null; // limpiar preview si usas imagen
    }
    this.modalService.open(this.modalTemplateCategoria, { size: 'lg' });
  }

  guardarTipoHabitacion() {
    if (this.tipoHabitacionesForm.invalid) return;

    const tipoHabitacion: TipoHabitaciones = {
      idTipoHabitacion: this.editandotipoHabitacion?.idTipoHabitacion ?? null,
      descripcion: this.tipoHabitacionesForm.value.descripcion,
      precio: this.tipoHabitacionesForm.value.precio,
      capacidad: this.tipoHabitacionesForm.value.capacidad,
      imagenUrl: this.tipoHabitacionesForm.value.imagenUrl // si implementas imagen
    };

    this.tipoHabitacionesService.GuardarTipoHabitaciones(tipoHabitacion).subscribe({
      next: () => {
        this.modalService.dismissAll();
        this.cargarTipoHabitaciones();
      },
      error: (e) => console.error('Error guardando tipo habitacion:', e)
    });
  }

  eliminarTipoHabitacion(tipoHabitacion: TipoHabitaciones) {
    if (confirm(`¿Seguro desea eliminar la categoría "${tipoHabitacion.descripcion}"?`)) {
      this.tipoHabitacionesService.EliminarTipoHabitaciones([{ idTipoHabitacion: tipoHabitacion.idTipoHabitacion }])
        .subscribe({
          next: () => this.cargarTipoHabitaciones(),
          error: (e) => console.error('Error eliminando tipo habitacion:', e)
        });
    }
  }

  // MODAL HABITACION
  openModalHabitacion(idTipoHabitacion?: number, habitacion?: HabitacionesResponse) {
    this.editandoHabitacion = habitacion ?? null;

    if (habitacion) {
      this.habitacionesForm.patchValue({
        numero: habitacion.numero,
        //capacidad: habitacion.,
        estado: habitacion.estado,
        tipoHabitacionId: habitacion.tipoHabitacion.idTipoHabitacion
      });
    } else {
      this.habitacionesForm.reset();
      if (idTipoHabitacion) {
        this.habitacionesForm.patchValue({ tipoHabitacionId: idTipoHabitacion });
      }
    }
    this.modalService.open(this.modalTemplateHabitacion, { size: 'lg' });
  }

  guardarHabitacion() {
    if (this.habitacionesForm.invalid) return;

    const habitacion: habitacionesSaveRequest = {
      idHabitacion: this.editandoHabitacion?.idHabitacion ?? null,
      numero: this.habitacionesForm.value.numero,
      estado: this.habitacionesForm.value.estado,
      //capacidad: this.habitacionesForm.value.capacidad,
      tipoHabitacion: { idTipoHabitacion: this.habitacionesForm.value.tipoHabitacionId, descripcion: null, precio: null, capacidad: null, imagenUrl: null }
    };

    this.habitacionesService.GuardarHabitaciones(habitacion).subscribe({
      next: () => {
        this.modalService.dismissAll();
        this.cargarHabitaciones();
      },
      error: (e) => console.error('Error guardando habitacion:', e)
    });
  }

  editarHabitacion(habitacion: HabitacionesResponse) {
    this.openModalHabitacion(undefined, habitacion);
  }

  eliminarHabitacion(habitacion: HabitacionesResponse) {
    if (confirm(`¿Seguro desea eliminar la habitación ${habitacion.numero}?`)) {
      this.habitacionesService.EliminarHabitaciones([{ idHabitacion: habitacion.idHabitacion }]).subscribe({
        next: () => this.cargarHabitaciones(),
        error: (e) => console.error('Error eliminando habitacion:', e)
      });
    }
  }


  onImagenSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validar tamaño (ejemplo: max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen es demasiado grande. Máximo 2MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        this.imagenPreview = base64;
        this.tipoHabitacionesForm.patchValue({ imagenUrl: base64 });
      };
      reader.readAsDataURL(file);
    }
  }

  eliminarImagenPreview(): void {
    this.imagenPreview = null;
    this.tipoHabitacionesForm.patchValue({ imagenUrl: '' });
  }




}
