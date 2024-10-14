import { Routes } from '@angular/router';
import { FacturaFormComponent } from './factura-form/factura-form.component';

export const routes: Routes = [
  //{path: '', redirectTo: 'facturas', pathMatch: 'full'},
  {path: 'inicio', loadComponent: () => import('./factura-form/factura-form.component').then(m => m.FacturaFormComponent)},
  {path: 'facturas', loadComponent: () => import('./Factura-Lista/facturas-list/facturas-list.component').then(m => m.FacturasListComponent)},
  {path: 'factura/:id', loadComponent: () => import('./factura-detail/factura-detail.component').then(m => m.FacturaDetailComponent)},
  {path: 'productos/:id', loadComponent: () => import('./producto/producto.component').then(m => m.ProductoComponent)},
{path: 'categoria', loadComponent: () => import('./categoria/categoria.component').then(m => m.CategoriaComponent)}
];
