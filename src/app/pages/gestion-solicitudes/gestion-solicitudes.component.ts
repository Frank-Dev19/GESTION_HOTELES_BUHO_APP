import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Interfaces
interface Huesped {
  nombre: string
  documento: string
  email: string
  telefono: string
}

interface HabitacionOcupada {
  numero: string
  huesped: Huesped
  checkIn: Date
  checkOut: Date
  tipoHabitacion: string
}

interface ServicioSolicitud {
  servicioId: number
  cantidad: number
}

interface SolicitudServicio {
  id: number
  numeroHabitacion: string
  servicios: ServicioSolicitud[]
  estado: "pendiente" | "en_proceso" | "completada" | "cancelada"
  prioridad: "normal" | "alta" | "urgente"
  fechaSolicitud: Date
  fechaCompletado?: Date
  empleadoAsignado?: string
  observaciones?: string
  total: number
}

interface CategoriaServicio {
  id: number
  nombre: string
  icono: string
}

interface Servicio {
  id: number
  categoriaId: number
  nombre: string
  descripcion: string
  precio: number
  activo: boolean
}

interface Empleado {
  id: number
  nombre: string
  area: string
}


@Component({
  selector: 'app-gestion-solicitudes',
  standalone: false,
  templateUrl: './gestion-solicitudes.component.html',
  styleUrl: './gestion-solicitudes.component.scss'
})
export class GestionSolicitudesComponent implements OnInit {

  // Formularios
  solicitudForm: FormGroup

  // Variables de control
  habitacionSeleccionada: HabitacionOcupada | null = null
  filtroEstado = ""
  categoriaServicioActiva = 1

  // Servicios seleccionados para nueva solicitud
  serviciosSeleccionados: ServicioSolicitud[] = []

  // Datos de ejemplo - Habitaciones ocupadas
  habitacionesOcupadas: HabitacionOcupada[] = [
    {
      numero: "101",
      huesped: {
        nombre: "Juan Pérez García",
        documento: "12345678",
        email: "juan.perez@email.com",
        telefono: "987654321",
      },
      checkIn: new Date("2024-01-15T15:00:00"),
      checkOut: new Date("2024-01-18T12:00:00"),
      tipoHabitacion: "Estándar",
    },
    {
      numero: "205",
      huesped: {
        nombre: "María González López",
        documento: "87654321",
        email: "maria.gonzalez@email.com",
        telefono: "987123456",
      },
      checkIn: new Date("2024-01-14T16:30:00"),
      checkOut: new Date("2024-01-20T11:00:00"),
      tipoHabitacion: "Superior",
    },
    {
      numero: "301",
      huesped: {
        nombre: "Carlos Rodríguez Silva",
        documento: "11223344",
        email: "carlos.rodriguez@email.com",
        telefono: "987789123",
      },
      checkIn: new Date("2024-01-16T14:00:00"),
      checkOut: new Date("2024-01-19T12:00:00"),
      tipoHabitacion: "Suite",
    },
    {
      numero: "102",
      huesped: {
        nombre: "Ana Martínez Torres",
        documento: "55667788",
        email: "ana.martinez@email.com",
        telefono: "987456789",
      },
      checkIn: new Date("2024-01-15T17:00:00"),
      checkOut: new Date("2024-01-17T10:00:00"),
      tipoHabitacion: "Estándar",
    },
  ]

  // Categorías de servicios
  categoriasServicios: CategoriaServicio[] = [
    { id: 1, nombre: "Comidas", icono: "fas fa-utensils" },
    { id: 2, nombre: "Bebidas", icono: "fas fa-glass-martini-alt" },
    { id: 3, nombre: "Servicios de Habitación", icono: "fas fa-concierge-bell" },
    { id: 4, nombre: "Spa y Bienestar", icono: "fas fa-spa" },
    { id: 5, nombre: "Entretenimiento", icono: "fas fa-tv" },
  ]

  // Servicios disponibles
  servicios: Servicio[] = [
    // Comidas
    {
      id: 1,
      categoriaId: 1,
      nombre: "Desayuno Continental",
      descripcion: "Café, jugo, tostadas",
      precio: 25,
      activo: true,
    },
    {
      id: 2,
      categoriaId: 1,
      nombre: "Desayuno Americano",
      descripcion: "Huevos, tocino, tostadas",
      precio: 35,
      activo: true,
    },
    {
      id: 3,
      categoriaId: 1,
      nombre: "Almuerzo Ejecutivo",
      descripcion: "Entrada, plato principal, postre",
      precio: 45,
      activo: true,
    },
    {
      id: 4,
      categoriaId: 1,
      nombre: "Cena Gourmet",
      descripcion: "Menú degustación 3 tiempos",
      precio: 65,
      activo: true,
    },

    // Bebidas
    { id: 5, categoriaId: 2, nombre: "Botella de Agua", descripcion: "Agua mineral 500ml", precio: 5, activo: true },
    { id: 6, categoriaId: 2, nombre: "Refresco", descripcion: "Coca-Cola, Sprite, Fanta", precio: 8, activo: true },
    { id: 7, categoriaId: 2, nombre: "Cerveza Nacional", descripcion: "Cerveza local 330ml", precio: 12, activo: true },
    {
      id: 8,
      categoriaId: 2,
      nombre: "Vino de la Casa",
      descripcion: "Copa de vino tinto o blanco",
      precio: 18,
      activo: true,
    },

    // Servicios de Habitación
    {
      id: 9,
      categoriaId: 3,
      nombre: "Limpieza Adicional",
      descripcion: "Servicio de limpieza extra",
      precio: 30,
      activo: true,
    },
    {
      id: 10,
      categoriaId: 3,
      nombre: "Cambio de Sábanas",
      descripcion: "Cambio adicional de sábanas",
      precio: 20,
      activo: true,
    },
    {
      id: 11,
      categoriaId: 3,
      nombre: "Servicio de Lavandería",
      descripcion: "Lavado y planchado",
      precio: 40,
      activo: true,
    },

    // Spa y Bienestar
    {
      id: 12,
      categoriaId: 4,
      nombre: "Masaje Relajante",
      descripcion: "Masaje de 60 minutos",
      precio: 80,
      activo: true,
    },
    {
      id: 13,
      categoriaId: 4,
      nombre: "Tratamiento Facial",
      descripcion: "Limpieza e hidratación",
      precio: 70,
      activo: true,
    },
    { id: 14, categoriaId: 4, nombre: "Acceso a Sauna", descripcion: "Acceso por 2 horas", precio: 35, activo: true },

    // Entretenimiento
    {
      id: 15,
      categoriaId: 5,
      nombre: "Película Premium",
      descripcion: "Acceso a películas de estreno",
      precio: 15,
      activo: true,
    },
    {
      id: 16,
      categoriaId: 5,
      nombre: "Consola de Videojuegos",
      descripcion: "Alquiler de consola por día",
      precio: 50,
      activo: true,
    },
    {
      id: 17,
      categoriaId: 5,
      nombre: "Tour Guiado",
      descripcion: "Tour por la ciudad 4 horas",
      precio: 120,
      activo: true,
    },
  ]

  // Empleados disponibles
  empleados: Empleado[] = [
    { id: 1, nombre: "Pedro Sánchez", area: "Room Service" },
    { id: 2, nombre: "Laura Jiménez", area: "Housekeeping" },
    { id: 3, nombre: "Miguel Torres", area: "Concierge" },
    { id: 4, nombre: "Carmen Ruiz", area: "Spa" },
    { id: 5, nombre: "Roberto Díaz", area: "Mantenimiento" },
  ]

  // Solicitudes de servicios (datos de ejemplo)
  solicitudesServicios: SolicitudServicio[] = [
    {
      id: 1,
      numeroHabitacion: "101",
      servicios: [
        { servicioId: 1, cantidad: 2 },
        { servicioId: 5, cantidad: 2 },
      ],
      estado: "pendiente",
      prioridad: "normal",
      fechaSolicitud: new Date("2024-01-16T08:30:00"),
      empleadoAsignado: "Pedro Sánchez",
      observaciones: "Sin azúcar en el café",
      total: 60,
    },
    {
      id: 2,
      numeroHabitacion: "205",
      servicios: [
        { servicioId: 12, cantidad: 1 },
        { servicioId: 14, cantidad: 1 },
      ],
      estado: "en_proceso",
      prioridad: "alta",
      fechaSolicitud: new Date("2024-01-16T10:15:00"),
      empleadoAsignado: "Carmen Ruiz",
      total: 115,
    },
    {
      id: 3,
      numeroHabitacion: "301",
      servicios: [{ servicioId: 4, cantidad: 2 }],
      estado: "completada",
      prioridad: "normal",
      fechaSolicitud: new Date("2024-01-16T19:00:00"),
      fechaCompletado: new Date("2024-01-16T20:30:00"),
      empleadoAsignado: "Pedro Sánchez",
      observaciones: "Mesa junto a la ventana",
      total: 130,
    },
    {
      id: 4,
      numeroHabitacion: "102",
      servicios: [
        { servicioId: 9, cantidad: 1 },
        { servicioId: 10, cantidad: 1 },
      ],
      estado: "pendiente",
      prioridad: "urgente",
      fechaSolicitud: new Date("2024-01-16T07:00:00"),
      observaciones: "Derrame en la alfombra",
      total: 50,
    },
  ]

  // Solicitudes filtradas
  solicitudesFiltradas: SolicitudServicio[] = []

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) {
    // Inicializar formulario
    this.solicitudForm = this.formBuilder.group({
      prioridad: ["normal", Validators.required],
      empleadoAsignado: [""],
      observaciones: [""],
    })
  }

  ngOnInit(): void {
    this.filtrarSolicitudes()
  }

  // Seleccionar habitación
  seleccionarHabitacion(habitacion: HabitacionOcupada): void {
    this.habitacionSeleccionada = habitacion
    this.filtrarSolicitudes()
  }

  // Actualizar habitaciones
  actualizarHabitaciones(): void {
    // Aquí iría la lógica para recargar desde el servidor
    this.filtrarSolicitudes()
  }

  // Filtrar solicitudes
  filtrarSolicitudes(): void {
    let solicitudes = [...this.solicitudesServicios]

    // Filtrar por habitación seleccionada
    if (this.habitacionSeleccionada) {
      solicitudes = solicitudes.filter((s) => s.numeroHabitacion === this.habitacionSeleccionada!.numero)
    }

    // Filtrar por estado
    if (this.filtroEstado) {
      solicitudes = solicitudes.filter((s) => s.estado === this.filtroEstado)
    }

    // Ordenar por fecha (más recientes primero)
    solicitudes.sort((a, b) => b.fechaSolicitud.getTime() - a.fechaSolicitud.getTime())

    this.solicitudesFiltradas = solicitudes
  }

  // Abrir modal
  openModal(template: TemplateRef<any>): void {
    this.resetearFormularioSolicitud()
    this.modalService.open(template, { centered: true, size: "xl" })
  }

  // Resetear formulario de solicitud
  resetearFormularioSolicitud(): void {
    this.serviciosSeleccionados = []
    this.categoriaServicioActiva = 1
    this.solicitudForm.reset({
      prioridad: "normal",
    })
  }

  // Ver historial
  verHistorial(): void {
    // Abrir modal de historial
    // this.modalService.open(this.modalHistorial, { centered: true, size: 'lg' });
  }

  // Obtener historial de habitación
  obtenerHistorialHabitacion(): SolicitudServicio[] {
    if (!this.habitacionSeleccionada) return []

    return this.solicitudesServicios
      .filter((s) => s.numeroHabitacion === this.habitacionSeleccionada!.numero)
      .sort((a, b) => b.fechaSolicitud.getTime() - a.fechaSolicitud.getTime())
  }

  // Gestión de servicios para nueva solicitud
  seleccionarCategoriaServicio(categoriaId: number): void {
    this.categoriaServicioActiva = categoriaId
  }

  serviciosPorCategoria(): Servicio[] {
    return this.servicios.filter((s) => s.categoriaId === this.categoriaServicioActiva && s.activo)
  }

  tieneServicio(servicioId: number): boolean {
    return this.serviciosSeleccionados.some((s) => s.servicioId === servicioId)
  }

  cantidadServicio(servicioId: number): number {
    const servicio = this.serviciosSeleccionados.find((s) => s.servicioId === servicioId)
    return servicio ? servicio.cantidad : 0
  }

  incrementarServicio(servicioId: number): void {
    const index = this.serviciosSeleccionados.findIndex((s) => s.servicioId === servicioId)

    if (index !== -1) {
      this.serviciosSeleccionados[index].cantidad++
    } else {
      this.serviciosSeleccionados.push({
        servicioId: servicioId,
        cantidad: 1,
      })
    }
  }

  decrementarServicio(servicioId: number): void {
    const index = this.serviciosSeleccionados.findIndex((s) => s.servicioId === servicioId)

    if (index !== -1) {
      if (this.serviciosSeleccionados[index].cantidad > 1) {
        this.serviciosSeleccionados[index].cantidad--
      } else {
        this.serviciosSeleccionados.splice(index, 1)
      }
    }
  }

  eliminarServicio(servicioId: number): void {
    this.serviciosSeleccionados = this.serviciosSeleccionados.filter((s) => s.servicioId !== servicioId)
  }

  calcularTotalServicios(): number {
    return this.serviciosSeleccionados.reduce((total, item) => {
      const servicio = this.obtenerServicio(item.servicioId)
      return total + servicio.precio * item.cantidad
    }, 0)
  }

  // Guardar nueva solicitud
  guardarSolicitud(modal: any): void {
    if (this.solicitudForm.valid && this.serviciosSeleccionados.length > 0 && this.habitacionSeleccionada) {
      const formData = this.solicitudForm.value

      const nuevaSolicitud: SolicitudServicio = {
        id: this.generarNuevoId(),
        numeroHabitacion: this.habitacionSeleccionada.numero,
        servicios: [...this.serviciosSeleccionados],
        estado: "pendiente",
        prioridad: formData.prioridad,
        fechaSolicitud: new Date(),
        empleadoAsignado: formData.empleadoAsignado || undefined,
        observaciones: formData.observaciones || undefined,
        total: this.calcularTotalServicios(),
      }

      this.solicitudesServicios.push(nuevaSolicitud)
      this.filtrarSolicitudes()
      modal.close()
      this.resetearFormularioSolicitud()
    }
  }

  // Editar solicitud
  editarSolicitud(solicitud: SolicitudServicio): void {
    // Implementar lógica de edición
    console.log("Editar solicitud:", solicitud)
  }

  // Cancelar solicitud
  cancelarSolicitud(solicitud: SolicitudServicio): void {
    if (confirm(`¿Está seguro de cancelar la solicitud #${solicitud.id}?`)) {
      solicitud.estado = "cancelada"
      this.filtrarSolicitudes()
    }
  }

  // Cambiar estado de solicitud
  cambiarEstado(solicitud: SolicitudServicio, nuevoEstado: "pendiente" | "en_proceso" | "completada"): void {
    solicitud.estado = nuevoEstado

    if (nuevoEstado === "completada") {
      solicitud.fechaCompletado = new Date()
    }

    this.filtrarSolicitudes()
  }

  // Funciones de cálculo y utilidades
  contarSolicitudesPorEstado(estado: string): number {
    if (estado === "completada") {
      // Contar solo las completadas hoy
      const hoy = new Date()
      hoy.setHours(0, 0, 0, 0)

      return this.solicitudesServicios.filter((s) => {
        if (s.estado !== "completada" || !s.fechaCompletado) return false
        const fechaCompletado = new Date(s.fechaCompletado)
        fechaCompletado.setHours(0, 0, 0, 0)
        return fechaCompletado.getTime() === hoy.getTime()
      }).length
    }

    return this.solicitudesServicios.filter((s) => s.estado === estado).length
  }

  contarSolicitudesUrgentes(): number {
    const ahora = new Date()
    return this.solicitudesServicios.filter((s) => {
      if (s.estado === "completada" || s.estado === "cancelada") return false

      const tiempoTranscurrido = ahora.getTime() - s.fechaSolicitud.getTime()
      const minutosTranscurridos = tiempoTranscurrido / (1000 * 60)

      return s.prioridad === "urgente" || minutosTranscurridos > 60
    }).length
  }

  contarSolicitudesPendientesPorHabitacion(numeroHabitacion: string): number {
    return this.solicitudesServicios.filter(
      (s) => s.numeroHabitacion === numeroHabitacion && (s.estado === "pendiente" || s.estado === "en_proceso"),
    ).length
  }

  calcularTotalCuenta(numeroHabitacion: string): number {
    return this.solicitudesServicios
      .filter((s) => s.numeroHabitacion === numeroHabitacion && s.estado === "completada")
      .reduce((total, s) => total + s.total, 0)
  }

  calcularTotalSolicitud(solicitud: SolicitudServicio): number {
    return solicitud.servicios.reduce((total, item) => {
      const servicio = this.obtenerServicio(item.servicioId)
      return total + servicio.precio * item.cantidad
    }, 0)
  }

  calcularTiempoTranscurrido(fechaSolicitud: Date): string {
    const ahora = new Date()
    const diferencia = ahora.getTime() - fechaSolicitud.getTime()
    const minutos = Math.floor(diferencia / (1000 * 60))

    if (minutos < 60) {
      return `${minutos} min`
    } else {
      const horas = Math.floor(minutos / 60)
      const minutosRestantes = minutos % 60
      return `${horas}h ${minutosRestantes}m`
    }
  }

  esUrgente(solicitud: SolicitudServicio): boolean {
    if (solicitud.prioridad === "urgente") return true

    const ahora = new Date()
    const tiempoTranscurrido = ahora.getTime() - solicitud.fechaSolicitud.getTime()
    const minutosTranscurridos = tiempoTranscurrido / (1000 * 60)

    return minutosTranscurridos > 60
  }

  // Helpers
  obtenerTextoEstado(estado: string): string {
    const estados: { [key: string]: string } = {
      pendiente: "Pendiente",
      en_proceso: "En Proceso",
      completada: "Completada",
      cancelada: "Cancelada",
    }
    return estados[estado] || estado
  }

  obtenerServicio(servicioId: number): Servicio {
    return this.servicios.find((s) => s.id === servicioId) || this.servicios[0]
  }

  obtenerNombreServicio(servicioId: number): string {
    const servicio = this.obtenerServicio(servicioId)
    return servicio ? servicio.nombre : "Servicio no encontrado"
  }

  obtenerPrecioServicio(servicioId: number): number {
    const servicio = this.obtenerServicio(servicioId)
    return servicio ? servicio.precio : 0
  }

  generarNuevoId(): number {
    return Math.max(...this.solicitudesServicios.map((s) => s.id), 0) + 1
  }


}
