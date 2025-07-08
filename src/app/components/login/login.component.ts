import { Component } from '@angular/core';
import { LoginService } from '../../services/login-service.service';
import { Router } from '@angular/router';
import { TriggerService } from '../../services/trigger-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private triggerService: TriggerService
  ) {
    //this.createForm();

    //createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    //}
  }



  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // Mostrar el loader antes de la solicitud
      this.triggerService.fireShowLoader();

      this.loginService.login(username, password).subscribe(
        (response) => {
          // Cuando la respuesta es exitosa, redirigir a la página principal
          setTimeout(() => {
            this.router.navigate(['/reservasHabitaciones']); // Delay de 100ms
          }, 100);
          this.triggerService.fireHideLoader();  // Ocultar el loader después de la respuesta exitosa
        },
        (error) => {
          // En caso de error, mostrar el mensaje de error y ocultar el loader
          this.errorMessage = 'Error en las credenciales o servicio no disponible';
          this.triggerService.fireHideLoader();
        }
      );
    }
  }
}
