import { Component } from '@angular/core';
import { FacturaService } from '../Service/factura.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  nombreUsuario: string = ''; // Inicializa como cadena vacía
  clave: string = ''; 

  constructor(private authService: FacturaService) {}

  onSubmit() {
    this.authService.login(this.nombreUsuario, this.clave).subscribe(
      response => {
        // Manejar la respuesta del servidor
        console.log('Login exitoso', response);
      },
      error => {
        // Manejar el error
        console.error('Error en login', error);
      }
    );
  }
}