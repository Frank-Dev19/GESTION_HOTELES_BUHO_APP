import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"

import { ServicioResponse } from '../../models/servicios/servicios-response';
import { ServiciosSaveRequest, ServiciosDeleteRequest } from '../../models/servicios/servicios-request';

import { CategoriaServicioResponse, CategoriaServicio } from '../../models/servicios/categoriaServicios-response';
import { CategoriaServicioSaveRequest, CategoriaServicioDeleteRequest } from '../../models/servicios/categoriaServicios-request';

import { CategoriasServiciosService } from '../../services/categoriasServicios.service';
import { ServiciosService } from '../../services/servicios.service';


// Interfaces
// interface CategoriaServicio {
//   id: number
//   nombre: string
//   icono: string
// }

// interface Servicio {
//   id: number
//   categoriaId: number
//   nombre: string
//   descripcion: string
//   precio: number
//   imagen: string
//   activo: boolean
// }



@Component({
  selector: 'app-gestion-servicios.component',
  standalone: false,
  templateUrl: './gestion-servicios.component.component.html',
  styleUrl: './gestion-servicios.component.component.scss'
})
export class GestionServiciosComponentComponent implements OnInit {

  @ViewChild('modalServicio') modalTemplateServicio!: TemplateRef<any>;
  @ViewChild('modalCategoria') modalTemplateCategoria!: TemplateRef<any>;

  // Formularios
  servicioForm: FormGroup;
  categoriaForm: FormGroup;

  // Variables de control
  modalTitulo = "Agregar Servicio";
  servicioEditando: ServicioResponse = null;
  categoriaEditando: CategoriaServicioResponse = null;
  categoriaFiltro: number | string = "";

  // Variables para imagen
  imagenPreview: string | null = null;
  archivoImagen: File | null = null;

  idCategoriaServicioSeleccionada: number | null = null;

  iconoSeleccionado: string | null = null;
  // Categorías de servicios
  categoriasServicios: CategoriaServicio[] = [];

  // Servicios (esta es la propiedad donde guardaremos los servicios obtenidos desde el backend)
  servicios: ServicioResponse[] = [];

  // Servicios filtrados
  serviciosFiltrados: any[] = [];
  //iconosCategorias: any[] = [];
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private serviciosService: ServiciosService,
    private categoriasServiciosService: CategoriasServiciosService
  ) {
    this.servicioForm = this.fb.group({
      nombre: ['', Validators.required],
      categoriaServicio: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      activo: [true, Validators.required]
    });

    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      icono: ['', Validators.required]
    });
  }

  iconosCategorias: any[] = [
    { descripcion: "gaaaa", icono: "fas fa-util" },
    { descripcion: "casa", icono: "fas fa-house" }
  ]

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarServicios(); // Cargar los servicios desde el backend al inicio
  }

  cargarCategorias(): void {
    this.categoriasServiciosService.ListarCategoriasServicio().subscribe({
      next: (categorias) => {
        this.categoriasServicios = categorias;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  cargarServicios(): void {
    this.serviciosService.ListarServicios().subscribe({
      next: (servicios) => {
        this.servicios = servicios; // Guardamos los servicios obtenidos en la propiedad 'servicios'
        this.filtrarServicios(); // Filtramos los servicios si es necesario
      },
      error: (error) => {
        console.error('Error al cargar servicios:', error);
      }
    });
  }

  // Filtrar servicios por categoría
  filtrarServicios(): void {
    if (this.categoriaFiltro === "") {
      this.serviciosFiltrados = this.servicios;
    } else {
      this.serviciosFiltrados = this.servicios.filter(s => s.categoriaServicio.idCategoriaServicio === Number(this.categoriaFiltro));
    }
  }

  // Abrir modal de servicio
  openModal(modal: TemplateRef<any>, servicio?: ServicioResponse, categoria?: CategoriaServicioResponse): void {

    if (categoria) {
      this.categoriaEditando = categoria;
      this.categoriaForm.patchValue({
        nombre: categoria.nombre,
        icono: categoria.icono
      });
    }
    if (servicio) {
      this.servicioEditando = servicio;
      this.modalTitulo = "Editar Servicio";
      // const categoriaServicio: CategoriaServicio = { idCategoriaServicio: servicio.categoriaServicio.idCategoriaServicio, nombre: servicio.categoriaServicio.nombre, icono: servicio.categoriaServicio.icono }
      this.idCategoriaServicioSeleccionada = servicio.categoriaServicio.idCategoriaServicio;
      //console.log("si entrooooo");
      //console.log(servicio);
      this.servicioForm.patchValue({
        nombre: servicio.nombre,
        categoriaServicio: servicio.categoriaServicio.nombre,
        precio: servicio.precio,
        descripcion: servicio.descripcion,
        activo: servicio.activo

      });
      this.imagenPreview = servicio.imagenServicio;
    }
    if (categoria == null && servicio == null) {
      this.servicioForm.reset();
      this.categoriaForm.reset();
      this.categoriaEditando = null;
      this.imagenPreview = null;
      this.servicioEditando = null;
      this.modalTitulo = "Agregar Servicio";
    }
    this.modalService.open(modal, { centered: true, size: 'lg' });
  }

  // Guardar nueva categoría
  guardarCategoria(): void {
    if (this.categoriaForm.valid) {
      const categoriaRequest: CategoriaServicioSaveRequest = {
        idCategoriaServicio: this.categoriaEditando?.idCategoriaServicio ?? null,
        nombre: this.categoriaForm.value.nombre,
        icono: this.categoriaForm.value.icono
      }

      this.categoriasServiciosService.GuardarCategoriasServicio(categoriaRequest).subscribe({
        next: () => {
          this.cargarCategorias(); // Recargar las categorías
          this.modalService.dismissAll(); // Cerrar el modal
        },
        error: (error) => {
          console.error('Error al guardar la categoría', error);
        }
      });
    }
  }

  // Guardar servicio
  guardarServicio(modal: any): void {
    if (this.servicioForm.invalid) return;

    const formData: ServiciosSaveRequest = this.servicioForm.value;
    formData.imagenServicio = this.imagenPreview || "";

    if (this.servicioEditando) {
      // Actualizar servicio
      formData.idServicio = this.servicioEditando?.idServicio ?? null;
      formData.categoriaServicio = { idCategoriaServicio: this.idCategoriaServicioSeleccionada, nombre: null, icono: null }
      //console.log(this.servicioEditando.categoriaServicio.idCategoriaServicio);
      this.serviciosService.GuardarServicios(formData).subscribe({
        next: () => {
          this.modalService.dismissAll();
          this.actualizarServicios();
        },
        error: (error) => {
          console.error('Error al guardar el servicio', error);
        }
      });
    } else {
      // Crear nuevo servicio
      formData.categoriaServicio = { idCategoriaServicio: this.idCategoriaServicioSeleccionada, nombre: null, icono: null }
      this.serviciosService.GuardarServicios(formData).subscribe({
        next: () => {
          this.modalService.dismissAll();
          this.actualizarServicios();
        },
        error: (error) => {
          console.error('Error al guardar el servicio', error);
        }
      });
    }
  }

  // Editar servicio
  editarServicio(servicio: ServicioResponse): void {
    this.servicioEditando = servicio;
    this.modalTitulo = "Editar Servicio";
    this.servicioForm.patchValue(servicio);
    this.imagenPreview = servicio.imagenServicio; // Asumiendo que el servicio tiene una propiedad imagenServicio
    this.openModal(this.modalTemplateServicio, servicio, null);
  }


  // Editar categoría
  editarCategoria(categoria: CategoriaServicioResponse): void {
    this.categoriaEditando = categoria;
    // this.categoriaForm.patchValue({
    //   nombre: categoria.nombre,
    //   icono: categoria.icono
    // });
    this.openModal(this.modalTemplateCategoria, null, categoria);
  }

  // Actualizar los servicios filtrados
  actualizarServicios(): void {
    this.cargarCategorias();
    this.cargarServicios();
    this.filtrarServicios();
  }

  // Obtener el nombre de la categoría por ID
  obtenerNombreCategoria(id: number): string {
    const categoria = this.categoriasServicios.find(c => c.idCategoriaServicio === id);
    return categoria ? categoria.nombre : '';
  }

  // Gestión de imagen
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Eliminar imagen previa
  eliminarImagenPreview(): void {
    this.imagenPreview = null;
    this.archivoImagen = null;
  }


  // Eliminar servicio
  eliminarServicio(servicio: any): void {
    if (confirm(`¿Estás seguro de eliminar el servicio "${servicio.nombre}"?`)) {
      this.serviciosService.EliminarServicios([{ idServicio: servicio.idServicio }]).subscribe({
        next: () => this.actualizarServicios(),
        error: (error) => {
          console.error('Error al eliminar servicio', error);
        }
      });
    }
  }

  // Eliminar categoría
  eliminarCategoria(categoria: any): void {
    if (confirm(`¿Estás seguro de eliminar la categoría "${categoria.nombre}"?`)) {
      this.categoriasServiciosService.EliminarCategoriasServicio([{ idCategoriaServicio: categoria.idCategoriaServicio }]).subscribe({
        next: () => {
          this.actualizarServicios()
        },
        error: (e) => {
          console.error("Error al eliminar la categoria del servicio", e);
        }
      })
    }
  }

}
