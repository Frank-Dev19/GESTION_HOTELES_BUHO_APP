import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasService } from '../../services/categorias.service';
import { ProductosService } from '../../services/productos.service';
import { Categoria } from '../../models/categorias/categorias-response';
import { ProductoResponse } from '../../models/productos/productos-response';
import { listarPorCategoria } from '../../models/productos/productos-request';
import { ProductosSaveRequest, ProductosDeleteRequest } from '../../models/productos/productos-request';

@Component({
  selector: 'app-categorias-productos',
  standalone: false,
  templateUrl: './categorias-productos.component.html',
  styleUrl: './categorias-productos.component.scss'
})
export class CategoriasProductosComponent implements OnInit {

  categorias: Categoria[] = [];
  productos: ProductoResponse[] = [];
  selectedCategory: number = 0; // Categoria seleccionada
  selectedCategoriaId: number | null = null; // Para almacenar el idCategoria seleccionado
  @ViewChild('AddProducts') modalTemplateProducts!: TemplateRef<any>;
  @ViewChild('AddCategories') modalTemplateCategories!: TemplateRef<any>;
  categoriaForm: FormGroup;
  productoForm: FormGroup;
  modalTitulo: string = 'Agregar Categoría/Producto';
  categoriaEditando: Categoria | null = null;
  ProductoEditando: ProductosSaveRequest | null = null;
  modalProducto = "AddProducts";

  constructor(
    private categoriasService: CategoriasService,
    private productosService: ProductosService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.categoriaForm = this.fb.group({
      descripcion: ['', Validators.required]
      //productoSeleccionado: ['', Validators.required]
    });

    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      stock: ['', Validators.required],
      precio: ['', Validators.required],
      categoriaSeleccionada: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarProductos();

  }

  guardarProducto(): void {
    if (this.productoForm.invalid) {
      return;
    }
    const categoria: Categoria = { idCategoria: Number(this.selectedCategoriaId), descripcion: null };

    const productoSaveRequest: ProductosSaveRequest = {
      idProducto: this.ProductoEditando?.idProducto ?? null,
      nombre: this.productoForm.value.nombre,
      stock: this.productoForm.value.stock,
      precio: this.productoForm.value.precio,
      categoria: categoria
    };

    this.productosService.GuardarProductos(productoSaveRequest).subscribe({
      next: (response) => {
        if (response) {
          this.modalService.dismissAll();
          this.buscarProductosPorCategoria();
        }
      },
      error: (error) => {
        console.error('Error al guardar producto:', error);
      }
    });
  }

  guardarCategoria(): void {
    if (this.categoriaForm.invalid) {
      return;
    }

    const categoriaRequest: Categoria = {
      idCategoria: this.categoriaEditando?.idCategoria ?? null,
      descripcion: this.categoriaForm.value.descripcion
    };

    this.categoriasService.GuardarCategorias(categoriaRequest).subscribe({
      next: (response) => {
        if (response) {
          this.modalService.dismissAll();
          this.cargarCategorias();
        }
      },
      error: (error) => {
        console.error('Error al guardar categoría/producto:', error);
      }
    });
  }



  cargarCategorias(): void {
    this.categoriasService.ListarCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  cargarProductos(): void {
    this.productosService.ListarProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        //console.log(productos);
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }

  buscarProductosPorCategoria(): void {
    console.log(this.selectedCategoriaId);
    if (this.selectedCategoriaId) {
      // Aquí aseguramos que solo se pasa el idCategoria sin envolverlo
      const listarrequest: listarPorCategoria = { idCategoria: Number(this.selectedCategoriaId) };  // Aseguramos que se envíe como número

      const request: listarPorCategoria[] = [listarrequest];

      console.log(request);  // Revisa que la consola muestre la estructura correcta del request
      this.productosService.ListarProductosPorCategoria(request).subscribe({
        next: (productos) => {
          this.productos = productos;
        },
        error: (error) => {
          console.error('Error al cargar productos:', error);
        }
      });
    } else {
      alert('Por favor, seleccione una categoría');
    }
  }

  openModal(modalTemplate: TemplateRef<any>, categoria?: Categoria, producto?: ProductoResponse): void {
    if (categoria) {
      this.modalTitulo = 'Editar Categoría';
      this.categoriaEditando = categoria;
      this.categoriaForm.patchValue({
        descripcion: categoria.descripcion
      });
    }
    if (producto) {
      this.modalTitulo = 'Editar Categoría';
      this.ProductoEditando = producto;
      this.productoForm.patchValue({
        nombre: producto.nombre,
        stock: producto.stock,
        precio: producto.precio,
      })
      this.selectedCategoriaId = producto.categoria.idCategoria;
      console.log(producto)
    }
    else {
      this.modalTitulo = 'Agregar Categoría/Producto';
      this.categoriaEditando = null;
      this.categoriaForm.reset();
      this.productoForm.reset();
    }

    this.modalService.open(modalTemplate, { size: 'lg' });
    //console.log(producto)
  }


  editarProducto(producto: ProductoResponse): void {
    this.openModal(this.modalTemplateProducts, null, producto)
    //console.log(producto)
  }

  editarCategoria(categoriaId: number): void {

    const categoria = this.categorias.find(c => c.idCategoria === categoriaId);
    console.log(categoriaId);
    console.log(categoria);
    this.openModal(this.modalTemplateCategories, categoria, null)
  }



  eliminarProducto(producto: ProductoResponse): void {
    if (confirm(`¿Está seguro que desea eliminar el producto ${producto.nombre}?`)) {

      const deleteRequest: ProductosDeleteRequest = { idProducto: producto.idProducto }

      const requestArray: ProductosDeleteRequest[] = [deleteRequest];

      this.productosService.EliminarProductos(requestArray).subscribe({
        next: (response) => {
          this.cargarProductos();
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
        }
      });
    }
  }

  actualizar(): void {
    this.cargarCategorias();
  }
}
