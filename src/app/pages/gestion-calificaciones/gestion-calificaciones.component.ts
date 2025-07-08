import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Interfaces
interface Huesped {
  nombre: string
  habitacion: string
  fechaEstadia: Date
  codigoValidacion: string
}

interface AspectosCalificacion {
  nombre: string
  icono: string
  calificacion: number
}

interface Review {
  id: number
  nombreHuesped: string
  habitacion: string
  fechaReview: Date
  calificacion: number
  comentario: string
  motivoVisita?: string
  recomendaria: boolean
  aspectos?: AspectosCalificacion[]
  votosUtiles?: number
}

interface DistribucionEstrellas {
  estrellas: number
  cantidad: number
  porcentaje: number
}


@Component({
  selector: 'app-gestion-calificaciones',
  standalone: false,
  templateUrl: './gestion-calificaciones.component.html',
  styleUrl: './gestion-calificaciones.component.scss'
})
export class GestionCalificacionesComponent implements OnInit {

  // Formularios
  validacionForm: FormGroup
  reviewForm: FormGroup

  // Variables de control
  mostrarFormularioReview = false
  validandoCodigo = false
  codigoValido = false
  codigoInvalido = false
  mensajeValidacion = ""
  huespedValidado: Huesped | null = null

  // Calificación
  calificacionSeleccionada = 0
  starHover = 0

  // Aspectos específicos
  aspectosCalificacion: AspectosCalificacion[] = [
    { nombre: "Limpieza", icono: "fas fa-broom", calificacion: 0 },
    { nombre: "Servicio", icono: "fas fa-concierge-bell", calificacion: 0 },
    { nombre: "Ubicación", icono: "fas fa-map-marker-alt", calificacion: 0 },
    { nombre: "Comodidad", icono: "fas fa-bed", calificacion: 0 },
    { nombre: "Relación Calidad-Precio", icono: "fas fa-dollar-sign", calificacion: 0 },
    { nombre: "WiFi", icono: "fas fa-wifi", calificacion: 0 },
  ]

  // Filtros y ordenamiento
  filtroCalificacion = 0
  ordenamiento = "reciente"

  // Datos de ejemplo - Huéspedes válidos
  huespedes: Huesped[] = [
    {
      nombre: "Juan Pérez García",
      habitacion: "101",
      fechaEstadia: new Date("2024-01-15"),
      codigoValidacion: "ABC123",
    },
    {
      nombre: "María González López",
      habitacion: "205",
      fechaEstadia: new Date("2024-01-14"),
      codigoValidacion: "DEF456",
    },
    {
      nombre: "Carlos Rodríguez Silva",
      habitacion: "301",
      fechaEstadia: new Date("2024-01-16"),
      codigoValidacion: "GHI789",
    },
    {
      nombre: "Ana Martínez Torres",
      habitacion: "102",
      fechaEstadia: new Date("2024-01-13"),
      codigoValidacion: "JKL012",
    },
  ]

  // Reviews existentes
  reviews: Review[] = [
    {
      id: 1,
      nombreHuesped: "Roberto Silva",
      habitacion: "205",
      fechaReview: new Date("2024-01-10"),
      calificacion: 5,
      comentario:
        "Excelente experiencia en el hotel. El personal fue muy amable y las instalaciones estaban impecables. La habitación era cómoda y la vista espectacular. Definitivamente regresaré.",
      motivoVisita: "placer",
      recomendaria: true,
      aspectos: [
        { nombre: "Limpieza", icono: "fas fa-broom", calificacion: 5 },
        { nombre: "Servicio", icono: "fas fa-concierge-bell", calificacion: 5 },
        { nombre: "Ubicación", icono: "fas fa-map-marker-alt", calificacion: 4 },
      ],
      votosUtiles: 12,
    },
    {
      id: 2,
      nombreHuesped: "Carmen López",
      habitacion: "101",
      fechaReview: new Date("2024-01-08"),
      calificacion: 4,
      comentario:
        "Muy buena estadía en general. El desayuno estuvo delicioso y el personal muy atento. Solo mejoraría el WiFi que a veces era lento.",
      motivoVisita: "negocios",
      recomendaria: true,
      aspectos: [
        { nombre: "Servicio", icono: "fas fa-concierge-bell", calificacion: 5 },
        { nombre: "Comodidad", icono: "fas fa-bed", calificacion: 4 },
        { nombre: "WiFi", icono: "fas fa-wifi", calificacion: 2 },
      ],
      votosUtiles: 8,
    },
    {
      id: 3,
      nombreHuesped: "Miguel Torres",
      habitacion: "301",
      fechaReview: new Date("2024-01-05"),
      calificacion: 3,
      comentario:
        "La habitación estaba bien pero esperaba más por el precio. El servicio de habitaciones fue lento y tuvimos algunos inconvenientes con el aire acondicionado.",
      motivoVisita: "familia",
      recomendaria: false,
      aspectos: [
        { nombre: "Relación Calidad-Precio", icono: "fas fa-dollar-sign", calificacion: 2 },
        { nombre: "Servicio", icono: "fas fa-concierge-bell", calificacion: 3 },
        { nombre: "Comodidad", icono: "fas fa-bed", calificacion: 3 },
      ],
      votosUtiles: 3,
    },
    {
      id: 4,
      nombreHuesped: "Laura Jiménez",
      habitacion: "102",
      fechaReview: new Date("2024-01-03"),
      calificacion: 5,
      comentario:
        "¡Increíble hotel! Desde el momento que llegamos nos trataron como reyes. Las instalaciones son de primera y la ubicación perfecta para explorar la ciudad.",
      motivoVisita: "pareja",
      recomendaria: true,
      aspectos: [
        { nombre: "Limpieza", icono: "fas fa-broom", calificacion: 5 },
        { nombre: "Ubicación", icono: "fas fa-map-marker-alt", calificacion: 5 },
        { nombre: "Servicio", icono: "fas fa-concierge-bell", calificacion: 5 },
      ],
      votosUtiles: 15,
    },
    {
      id: 5,
      nombreHuesped: "Diego Morales",
      habitacion: "203",
      fechaReview: new Date("2024-01-01"),
      calificacion: 2,
      comentario:
        "Desafortunadamente nuestra experiencia no fue la esperada. La habitación tenía problemas de ruido y el servicio al cliente no fue el mejor. Esperamos mejoras.",
      motivoVisita: "solo",
      recomendaria: false,
      votosUtiles: 2,
    },
  ]

  // Reviews filtradas
  reviewsFiltradas: Review[] = []

  constructor(private formBuilder: FormBuilder) {
    // Inicializar formularios
    this.validacionForm = this.formBuilder.group({
      codigoValidacion: ["", [Validators.required, Validators.minLength(6)]],
    })

    this.reviewForm = this.formBuilder.group({
      comentario: ["", [Validators.required, Validators.maxLength(500)]],
      motivoVisita: [""],
      recomendaria: [false],
    })
  }

  ngOnInit(): void {
    this.filtrarReviews()
  }

  // Validación de código
  validarCodigo(): void {
    if (this.validacionForm.valid) {
      this.validandoCodigo = true
      const codigo = this.validacionForm.get("codigoValidacion")?.value.toUpperCase()

      // Simular validación con delay
      setTimeout(() => {
        const huesped = this.huespedes.find((h) => h.codigoValidacion === codigo)

        if (huesped) {
          this.codigoValido = true
          this.codigoInvalido = false
          this.mensajeValidacion = `¡Código válido! Bienvenido ${huesped.nombre}`
          this.huespedValidado = huesped

          setTimeout(() => {
            this.mostrarFormularioReview = true
          }, 1500)
        } else {
          this.codigoValido = false
          this.codigoInvalido = true
          this.mensajeValidacion = "Código inválido. Verifica tu código de validación."
        }

        this.validandoCodigo = false
      }, 1500)
    }
  }

  // Gestión de calificación
  seleccionarCalificacion(calificacion: number): void {
    this.calificacionSeleccionada = calificacion
  }

  obtenerDescripcionCalificacion(calificacion: number): string {
    const descripciones = {
      0: "Selecciona tu calificación",
      1: "Muy malo",
      2: "Malo",
      3: "Regular",
      4: "Bueno",
      5: "Excelente",
    }
    return descripciones[calificacion as keyof typeof descripciones] || ""
  }

  // Calificar aspectos específicos
  calificarAspecto(aspecto: AspectosCalificacion, calificacion: number): void {
    aspecto.calificacion = calificacion
  }

  // Guardar reseña
  guardarReview(): void {
    if (this.reviewForm.valid && this.calificacionSeleccionada > 0 && this.huespedValidado) {
      const formData = this.reviewForm.value

      const nuevaReview: Review = {
        id: this.generarNuevoId(),
        nombreHuesped: this.huespedValidado.nombre,
        habitacion: this.huespedValidado.habitacion,
        fechaReview: new Date(),
        calificacion: this.calificacionSeleccionada,
        comentario: formData.comentario,
        motivoVisita: formData.motivoVisita,
        recomendaria: formData.recomendaria,
        aspectos: this.aspectosCalificacion.filter((a) => a.calificacion > 0),
        votosUtiles: 0,
      }

      this.reviews.unshift(nuevaReview)
      this.filtrarReviews()

      // Mostrar mensaje de éxito y resetear
      alert("¡Gracias por tu reseña! Ha sido publicada exitosamente.")
      this.resetearFormularios()
    }
  }

  // Cancelar reseña
  cancelarReview(): void {
    this.resetearFormularios()
  }

  // Resetear formularios
  resetearFormularios(): void {
    this.mostrarFormularioReview = false
    this.codigoValido = false
    this.codigoInvalido = false
    this.mensajeValidacion = ""
    this.huespedValidado = null
    this.calificacionSeleccionada = 0
    this.starHover = 0

    this.validacionForm.reset()
    this.reviewForm.reset({ recomendaria: false })

    // Resetear aspectos
    this.aspectosCalificacion.forEach((aspecto) => {
      aspecto.calificacion = 0
    })
  }

  // Filtros y ordenamiento
  filtrarPorCalificacion(calificacion: number): void {
    this.filtroCalificacion = calificacion
    this.filtrarReviews()
  }

  ordenarReviews(): void {
    this.filtrarReviews()
  }

  filtrarReviews(): void {
    let reviewsFiltradas = [...this.reviews]

    // Filtrar por calificación
    if (this.filtroCalificacion > 0) {
      reviewsFiltradas = reviewsFiltradas.filter((r) => r.calificacion === this.filtroCalificacion)
    }

    // Ordenar
    switch (this.ordenamiento) {
      case "reciente":
        reviewsFiltradas.sort((a, b) => b.fechaReview.getTime() - a.fechaReview.getTime())
        break
      case "antiguo":
        reviewsFiltradas.sort((a, b) => a.fechaReview.getTime() - b.fechaReview.getTime())
        break
      case "mejor":
        reviewsFiltradas.sort((a, b) => b.calificacion - a.calificacion)
        break
      case "peor":
        reviewsFiltradas.sort((a, b) => a.calificacion - b.calificacion)
        break
    }

    this.reviewsFiltradas = reviewsFiltradas
  }

  // Estadísticas
  get promedioCalificaciones(): number {
    if (this.reviews.length === 0) return 0
    const suma = this.reviews.reduce((acc, review) => acc + review.calificacion, 0)
    return suma / this.reviews.length
  }

  get totalCalificaciones(): number {
    return this.reviews.length
  }

  get distribucionEstrellas(): DistribucionEstrellas[] {
    const distribucion = [5, 4, 3, 2, 1].map((estrellas) => {
      const cantidad = this.reviews.filter((r) => r.calificacion === estrellas).length
      const porcentaje = this.totalCalificaciones > 0 ? (cantidad / this.totalCalificaciones) * 100 : 0

      return {
        estrellas,
        cantidad,
        porcentaje,
      }
    })

    return distribucion
  }

  // Helpers
  obtenerTextoMotivo(motivo: string): string {
    const motivos: { [key: string]: string } = {
      negocios: "Viaje de Negocios",
      placer: "Vacaciones",
      familia: "Viaje Familiar",
      pareja: "Viaje en Pareja",
      solo: "Viaje Solo",
      otro: "Otro",
    }
    return motivos[motivo] || motivo
  }

  generarNuevoId(): number {
    return Math.max(...this.reviews.map((r) => r.id), 0) + 1
  }

}
