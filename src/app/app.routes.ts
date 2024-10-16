import { Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'productos/:id', loadComponent: () => import('./producto/producto.component').then(m => m.ProductoComponent)},
{path: 'categoria', loadComponent: () => import('./categoria/categoria.component').then(m => m.CategoriaComponent)},
{path: 'carrito', loadComponent: () => import('./carrito/carrito.component').then(m => m.CarritoComponent)},
{path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)},
{path: 'registro', loadComponent: () => import('./login/registro/registro.component').then(m => m.RegistroComponent)},

];
