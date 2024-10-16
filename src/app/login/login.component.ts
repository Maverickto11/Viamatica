import { Component } from '@angular/core';
import { FacturaService } from '../Service/factura.service';
import { FormBuilder, FormGroup, FormsModule, NgModel, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { login } from '../environment/login';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  correo: string = '';
  contrasena: string = '';
  errorMessage: string = '';
  mostrarNavbar: boolean = true;

  constructor(private fb: FormBuilder, private authService: FacturaService, private router: Router) {
    // Inicializa el formulario con validaciones
  }


  onLogin() {
    this.authService.login(this.correo, this.contrasena).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso:', response);
        this.router.navigate(['/categoria']);
      },
      (error) => {
        // Verifica si el error es de autenticación
        if (error.status === 401) {
          console.error('Credenciales incorrectas:', error.error.mensaje);
          // Aquí puedes mostrar un mensaje de error en la UI
          this.errorMessage = "Correo o contraseña incorrectos";
        } else {
          console.error('Error en el inicio de sesión:', error);
          this.errorMessage = "Ocurrió un error. Inténtalo nuevamente.";
        }
      }
    );
  }
}
