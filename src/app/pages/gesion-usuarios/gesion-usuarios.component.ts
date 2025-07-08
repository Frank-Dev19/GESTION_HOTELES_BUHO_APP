import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuariosResponse } from '../../models/usuarios/usuarios-response';
import { UsuariosDeleteRequest, UsuariosSaveRequest } from '../../models/usuarios/usuarios-request';


@Component({
  selector: 'app-gesion-usuarios',
  standalone: false,
  templateUrl: './gesion-usuarios.component.html',
  styleUrl: './gesion-usuarios.component.scss'
})
export class GesionUsuariosComponent implements OnInit {

  usuarios: UsuariosResponse[] = [];
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;
  usuarioForm: FormGroup;
  modalTitulo: string = 'Agregar Usuario';
  usuarioEditando: UsuariosResponse | null = null;

  constructor(
    private usuariosService: UsuariosService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.usuarioForm = this.fb.group({

      username: ['', Validators.required],
      password: ['', Validators.required],
      fullName: ['', Validators.required],
      dni: ['', Validators.required],
      celular: ['', Validators.required],
      email: ['', Validators.required],
      estado: ['', Validators.required],
      role: ['LIMPIEZA', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.ListarUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        console.log("si llego ga");
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  openModal(modalTemplate: TemplateRef<any>, usuario?: UsuariosResponse): void {
    if (usuario) {
      this.modalTitulo = 'Editar Usuario';
      this.usuarioEditando = usuario;
      this.usuarioForm.patchValue({
        fullName: usuario.fullName,
        username: usuario.username,
        dni: usuario.dni,
        celular: usuario.celular,
        email: usuario.email,
        estado: usuario.estado,
        role: usuario.role
      });
      this.usuarioForm.get('password')?.clearValidators();
      this.usuarioForm.get('password')?.updateValueAndValidity();
    } else {
      this.modalTitulo = 'Agregar Usuario';
      this.usuarioEditando = null;
      this.usuarioForm.reset({
        rol: 'USER'
      });
      this.usuarioForm.get('password')?.setValidators([Validators.required]);
      this.usuarioForm.get('password')?.updateValueAndValidity();
    }

    this.modalService.open(modalTemplate, { size: 'lg' }).result.then(
      (result) => {
        console.log('Modal cerrado con:', result);
      },
      (reason) => {
        console.log('Modal descartado:', reason);
        this.usuarioForm.reset();
      }
    );
  }

  guardarUsuario(): void {
    if (this.usuarioForm.invalid) {
      return;
    }

    const usuarioRequest: UsuariosSaveRequest = {
      id: this.usuarioEditando?.id ?? null,
      username: this.usuarioForm.value.username,
      password: this.usuarioForm.value.password,
      fullName: this.usuarioForm.value.fullName,
      dni: this.usuarioForm.value.dni,
      celular: this.usuarioForm.value.celular,
      email: this.usuarioForm.value.email,
      estado: this.usuarioForm.value.estado,
      role: this.usuarioForm.value.role
    };

    //const requestArray: UsuariosSaveRequest[] = [usuarioRequest];

    this.usuariosService.GuardarUsuarios(usuarioRequest).subscribe({
      next: (response) => {
        // if (response) {
        this.modalService.dismissAll();
        this.cargarUsuarios();
        this.usuarioForm.reset();
        this.usuarioEditando = null; // Reseteamos la edición
        // }
      },
      error: (error) => {
        console.error('Error al guardar usuario:', error);
      }
    });
    // this.modalService.dismissAll();
    // this.cargarUsuarios();
  }

  editarUsuario(usuario: UsuariosResponse): void {
    this.openModal(this.modalTemplate, usuario);
  }

  eliminarUsuario(usuario: UsuariosResponse): void {
    if (confirm(`¿Está seguro que desea eliminar al usuario ${usuario.fullName}?`)) {
      const deleteRequest: UsuariosDeleteRequest = {
        id: usuario.id
      };

      const requestArray: UsuariosDeleteRequest[] = [deleteRequest];

      this.usuariosService.EliminarUsuarios(requestArray).subscribe({
        next: (response) => {
          if (response) {
            this.cargarUsuarios();
          }
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
        }
      });
    }
  }

  actualizar() {
    this.cargarUsuarios();
  }
  // get modalTemplate(): TemplateRef<any> {
  //   // Esto se resuelve con ViewChild en la implementación real
  //   return {} as TemplateRef<any>;
  // }



}
