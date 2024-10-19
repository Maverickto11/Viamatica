import { Component } from '@angular/core';
import { FacturaService } from '../../Service/factura.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  errorMessage: string = '';

  usuario = {
    nombre: '',
    correo: '',
    contrasena: ''
  }

  constructor(private authService: FacturaService) {}


  registrar() {
    this.authService.register(this.usuario).subscribe(
        response => {
            console.log('Registro exitoso:', response);
            this.errorMessage = "Registro exitoso";
        },
        error => {
            console.error('Error en el registro:', error);
            this.errorMessage = "Ocurrió un error. Inténtalo nuevamente.";
        }
    );
  }
}


