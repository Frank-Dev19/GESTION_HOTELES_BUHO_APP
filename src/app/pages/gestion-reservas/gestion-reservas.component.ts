import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HabitacionesResponse } from '../../models/habitaciones/habitaciones-response';
import { habitacionesSaveRequest, habitacionesDeleteRequest } from '../../models/habitaciones/habitaciones-request';
import { TipoHabitacionesService } from '../../services/tipoHabitaciones.service';
import { TipoHabitaciones } from '../../models/tipoHabitaciones/tipoHabitaciones-response';
import { HabitacionesService } from '../../services/habitaciones.service';


// Interfaces
interface Habitacion {
  id: number;
  nombre: string;
  precio: number;
  disponible: boolean;
}

interface CategoriaServicio {
  id: number;
  nombre: string;
  icono: string;
}

interface Servicio {
  id: number;
  categoriaId: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

interface ServicioSeleccionado {
  servicioId: number;
  cantidad: number;
}

interface Disponible {
  libre: boolean
}

@Component({
  selector: 'app-gestion-reservas',
  standalone: false,
  templateUrl: './gestion-reservas.component.html',
  styleUrl: './gestion-reservas.component.scss'
})
export class GestionReservasComponent implements OnInit {

  tipoHabitaciones: TipoHabitaciones[] = [];
  disponible: Disponible[] = [];
  habitaciones: HabitacionesResponse[] = [];

  disponibilidadPorTipo = new Map<number, boolean>();



  // Variables para fechas y huéspedes
  fechaEntrada: string;
  fechaSalida: string;
  cantidadHuespedes = 2;

  // Habitaciones de ejemplo
  habitacion1: Habitacion = {
    id: 1,
    nombre: 'Habitación Estándar',
    precio: 150,
    disponible: true
  };

  habitacion2: Habitacion = {
    id: 2,
    nombre: 'Habitación Superior',
    precio: 250,
    disponible: false
  };

  habitacion3: Habitacion = {
    id: 3,
    nombre: 'Suite Ejecutiva',
    precio: 350,
    disponible: true
  };

  // Habitación seleccionada
  habitacionSeleccionada: Habitacion | null = null;

  // Formulario para datos del cliente
  clienteForm: FormGroup;

  // Categorías de servicios
  categoriasServicios: CategoriaServicio[] = [
    { id: 1, nombre: 'Comidas', icono: 'fas fa-utensils' },
    { id: 2, nombre: 'Bebidas', icono: 'fas fa-glass-martini-alt' },
    { id: 3, nombre: 'Servicios de Habitación', icono: 'fas fa-concierge-bell' },
    { id: 4, nombre: 'Spa y Bienestar', icono: 'fas fa-spa' },
    { id: 5, nombre: 'Entretenimiento', icono: 'fas fa-tv' }
  ];

  // Servicios disponibles
  servicios: Servicio[] = [
    // Comidas
    {
      id: 1,
      categoriaId: 1,
      nombre: 'Desayuno Continental',
      descripcion: 'Café, jugo, tostadas, mermelada y mantequilla',
      precio: 25,
      imagen: '../../../assets/img/calamarFrito.jpg'
    },
    {
      id: 2,
      categoriaId: 1,
      nombre: 'Desayuno Americano',
      descripcion: 'Huevos, tocino, tostadas, café y jugo',
      precio: 35,
      imagen: '../../../assets/img/calamarFrito.jpg'
    },
    {
      id: 3,
      categoriaId: 1,
      nombre: 'Almuerzo Ejecutivo',
      descripcion: 'Entrada, plato principal y postre',
      precio: 45,
      imagen: '../../../assets/img/calamarFrito.jpg'
    },
    {
      id: 4,
      categoriaId: 1,
      nombre: 'Cena Gourmet',
      descripcion: 'Menú degustación de 3 tiempos',
      precio: 65,
      imagen: '../../../assets/img/calamarFrito.jpg'
    },

    // Bebidas
    {
      id: 5,
      categoriaId: 2,
      nombre: 'Botella de Agua',
      descripcion: 'Agua mineral 500ml',
      precio: 5,
      imagen: '../../../assets/img/calamarFrito.jpg'
    },
    {
      id: 6,
      categoriaId: 2,
      nombre: 'Refresco',
      descripcion: 'Coca-Cola, Sprite, Fanta (350ml)',
      precio: 8,
      imagen: '../../../assets/img/calamarFrito.jpg'
    },
    {
      id: 7,
      categoriaId: 2,
      nombre: 'Cerveza Nacional',
      descripcion: 'Cerveza local (330ml)',
      precio: 12,
      imagen: '../../../assets/img/calamarFrito.jpg'
    },
    {
      id: 8,
      categoriaId: 2,
      nombre: 'Vino de la Casa',
      descripcion: 'Copa de vino tinto o blanco',
      precio: 18,
      imagen: '../../../assets/img/calamarFrito.jpg'
    },

    // Servicios de Habitación
    {
      id: 9,
      categoriaId: 3,
      nombre: 'Limpieza Adicional',
      descripcion: 'Servicio de limpieza extra',
      precio: 30,
      imagen: '../../../assets/img/calamarFrito.jpg'
    },
    {
      id: 10,
      categoriaId: 3,
      nombre: 'Cambio de Sábanas',
      descripcion: 'Cambio adicional de sábanas y toallas',
      precio: 20,
      imagen: '../../../assets/img/calamarFrito.jpg'
    },
    {
      id: 11,
      categoriaId: 3,
      nombre: 'Servicio de Lavandería',
      descripcion: 'Lavado y planchado de ropa',
      precio: 40,
      imagen: '../../../assets/img/calamarFrito.jpg'
    },

    // Spa y Bienestar
    {
      id: 12,
      categoriaId: 4,
      nombre: 'Masaje Relajante',
      descripcion: 'Masaje de 60 minutos',
      precio: 80,
      imagen: '../../../assets/img/calamarFrito.jpg'
    },
    {
      id: 13,
      categoriaId: 4,
      nombre: 'Tratamiento Facial',
      descripcion: 'Limpieza e hidratación facial',
      precio: 70,
      imagen: '../../../assets/img/calamarFrito.jpg'
    },
    {
      id: 14,
      categoriaId: 4,
      nombre: 'Acceso a Sauna',
      descripcion: 'Acceso por 2 horas',
      precio: 35,
      imagen: '../../../assets/img/calamarFrito.jpg'
    },

    // Entretenimiento
    {
      id: 15,
      categoriaId: 5,
      nombre: 'Película Premium',
      descripcion: 'Acceso a películas de estreno',
      precio: 15,
      imagen: '../../../assets/img/calamarFrito.jpg'
    },
    {
      id: 16,
      categoriaId: 5,
      nombre: 'Consola de Videojuegos',
      descripcion: 'Alquiler de consola por día',
      precio: 50,
      imagen: '../../../assets/img/calamarFrito.jpg'
    },
    {
      id: 17,
      categoriaId: 5,
      nombre: 'Tour Guiado',
      descripcion: 'Tour por la ciudad (4 horas)',
      precio: 120,
      imagen: '../../../assets/img/calamarFrito.jpg'
    }
  ];

  // Servicios seleccionados
  serviciosSeleccionados: ServicioSeleccionado[] = [];

  // Categoría de servicio activa
  categoriaServicioActiva: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private tipoHabitacionesService: TipoHabitacionesService,
    private habitacionesService: HabitacionesService
  ) {
    // Inicializar fechas con valores por defecto (hoy y mañana)
    const hoy = new Date();
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);

    this.fechaEntrada = this.formatDate(hoy);
    this.fechaSalida = this.formatDate(manana);

    // Inicializar formulario
    this.clienteForm = this.formBuilder.group({
      tipoDocumento: ['dni', Validators.required],
      numeroDocumento: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      metodoPago: ['efectivo', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarTipoHabitaciones();
    // Buscar disponibilidad al iniciar
    this.buscarDisponibilidad();
    this.cargarHabitaciones();
    //this.disponibilidad();
  }


  cargarHabitaciones(): void {
    this.habitacionesService.ListarHabitaciones().subscribe({
      next: (habitaciones) => {
        this.habitaciones = habitaciones;

        // Calcular disponibilidad por tipo
        this.disponibilidadPorTipo.clear(); // limpiar datos previos
        console.log("trtrtr");
        for (const tipo of this.tipoHabitaciones) {
          console.log("gaaa");
          const hayDisponibles = habitaciones.some(
            h => h.tipoHabitacion.idTipoHabitacion === tipo.idTipoHabitacion && h.estado === 'disponible'
          );
          this.disponibilidadPorTipo.set(tipo.idTipoHabitacion, hayDisponibles);
        }
      },
      error: (e) => console.error('Error cargando habitaciones:', e)
    });
    console.log("fsdfsf");

  }

  // disponibilidad(tipoHabitacion): boolean {
  //   console.log(this.habitaciones);
  //   const disponibles = this.habitaciones.filter(h => h.tipoHabitacion.idTipoHabitacion === tipoHabitacion.idTipoHabitacion && h.estado === 'disponible');


  //   console.log("hay" + disponibles);
  //   return disponibles.length > 0;
  // }


  // Formatear fecha para input type="date"
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  cargarTipoHabitaciones(): void {
    this.tipoHabitacionesService.ListarTipoHabitaciones().subscribe({
      next: (tipos) => this.tipoHabitaciones = tipos,
      error: (e) => console.error("error al cargar el tipo de habitaciones: ", e)
    });
  }

  // Buscar disponibilidad de habitaciones
  buscarDisponibilidad(): void {
    // Aquí iría la lógica para consultar disponibilidad real
    // Por ahora solo simulamos cambios aleatorios
    this.habitacion1.disponible = Math.random() > 0.3;
    this.habitacion2.disponible = Math.random() > 0.7;
    this.habitacion3.disponible = Math.random() > 0.4;
  }

  // Actualizar disponibilidad
  actualizarDisponibilidad(): void {
    this.buscarDisponibilidad();
  }

  // Nueva reservación
  nuevaReservacion(): void {
    this.habitacionSeleccionada = null;
    this.serviciosSeleccionados = [];
    this.clienteForm.reset({
      tipoDocumento: 'dni',
      metodoPago: 'efectivo'
    });
    this.buscarDisponibilidad();
  }

  // Seleccionar habitación
  seleccionarHabitacion(habitacion: Habitacion): void {
    this.habitacionSeleccionada = habitacion;
    this.serviciosSeleccionados = [];
    this.categoriaServicioActiva = 1;
  }

  // Cancelar reserva
  cancelarReserva(): void {
    this.habitacionSeleccionada = null;
    this.serviciosSeleccionados = [];
  }

  // Calcular noches
  calcularNoches(): number {
    const entrada = new Date(this.fechaEntrada);
    const salida = new Date(this.fechaSalida);
    const diferencia = salida.getTime() - entrada.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
  }

  // Calcular total de servicios
  calcularTotalServicios(): number {
    return this.serviciosSeleccionados.reduce((total, item) => {
      const servicio = this.obtenerServicio(item.servicioId);
      return total + (servicio.precio * item.cantidad);
    }, 0);
  }

  // Calcular total
  calcularTotal(): number {
    if (!this.habitacionSeleccionada) return 0;
    const totalHabitacion = this.habitacionSeleccionada.precio * this.calcularNoches();
    const totalServicios = this.calcularTotalServicios();
    return totalHabitacion + totalServicios;
  }

  // Confirmar reserva
  confirmarReserva(confirmacionModal: TemplateRef<any>): void {
    if (this.clienteForm.valid && this.habitacionSeleccionada) {
      // Aquí iría la lógica para guardar la reserva
      // Luego mostramos el modal de confirmación
      this.modalService.open(confirmacionModal, { centered: true, size: 'lg' });

      // Marcamos la habitación como no disponible
      this.habitacionSeleccionada.disponible = false;
    }
  }

  // Generar número de reserva aleatorio
  generarNumeroReserva(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Seleccionar categoría de servicio
  seleccionarCategoriaServicio(categoriaId: number): void {
    this.categoriaServicioActiva = categoriaId;
  }

  // Obtener servicios por categoría
  serviciosPorCategoria(): Servicio[] {
    return this.servicios.filter(s => s.categoriaId === this.categoriaServicioActiva);
  }

  // Verificar si un servicio está seleccionado
  tieneServicio(servicioId: number): boolean {
    return this.serviciosSeleccionados.some(s => s.servicioId === servicioId);
  }

  // Obtener cantidad de un servicio
  cantidadServicio(servicioId: number): number {
    const servicio = this.serviciosSeleccionados.find(s => s.servicioId === servicioId);
    return servicio ? servicio.cantidad : 0;
  }

  // Incrementar cantidad de un servicio
  incrementarServicio(servicioId: number): void {
    const index = this.serviciosSeleccionados.findIndex(s => s.servicioId === servicioId);

    if (index !== -1) {
      // Si ya existe, incrementamos la cantidad
      this.serviciosSeleccionados[index].cantidad++;
    } else {
      // Si no existe, lo agregamos con cantidad 1
      this.serviciosSeleccionados.push({
        servicioId: servicioId,
        cantidad: 1
      });
    }
  }

  // Decrementar cantidad de un servicio
  decrementarServicio(servicioId: number): void {
    const index = this.serviciosSeleccionados.findIndex(s => s.servicioId === servicioId);

    if (index !== -1) {
      if (this.serviciosSeleccionados[index].cantidad > 1) {
        // Si hay más de 1, decrementamos
        this.serviciosSeleccionados[index].cantidad--;
      } else {
        // Si solo hay 1, lo eliminamos
        this.serviciosSeleccionados.splice(index, 1);
      }
    }
  }

  // Eliminar un servicio
  eliminarServicio(servicioId: number): void {
    this.serviciosSeleccionados = this.serviciosSeleccionados.filter(s => s.servicioId !== servicioId);
  }

  // Obtener un servicio por su ID
  obtenerServicio(servicioId: number): Servicio {
    return this.servicios.find(s => s.id === servicioId) || this.servicios[0];
  }
}
