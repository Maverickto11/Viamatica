import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit{
  mostrarNavbar: boolean = true;
  constructor(private router: Router) {}
  mostrarMenuMovil = false; 
  ngOnInit(): void {
    // Detectar cambios en la ruta
    this.router.events.subscribe(() => {
      const rutaActual = this.router.url;
      // Ocultar la barra de navegación en la página de login y registro
      if (rutaActual === '/login' || rutaActual === '/registro') {
        this.mostrarNavbar = false;
      } else {
        this.mostrarNavbar = true;
      }
    });
  }
  toggleMenuMovil() {
    this.mostrarMenuMovil = !this.mostrarMenuMovil;
  }
}
