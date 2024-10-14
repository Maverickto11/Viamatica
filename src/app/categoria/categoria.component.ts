import { Component } from '@angular/core';
import { Factura } from '../environment/Factura';
import { FacturaService } from '../Service/factura.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Category } from '../environment/Category';
import { Product } from '../environment/Product';
import { ProductoComponent } from "../producto/producto.component";
@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, ProductoComponent],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {
  categorias: any[] = [];

  constructor(private categoriaService: FacturaService, private router: Router) {}


  categories: Category[] = [];
  selectedProducts: Product[] = [];

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoriaService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
  
  selectCategory(categoryId: number): void {
    this.router.navigate(['/productos', categoryId]); // Navega a la ruta de productos
  }



  /*ngOnInit(): void {
    this.cargarCategorias();
  }
  cargarCategorias() {
    this.categoriaService.obternerCategoria().subscribe(
      (data) => {
        this.categorias = data; // Ajusta según la estructura de respuesta de tu API
      },
      (error) => {
        console.error('Error al obtener categorías', error);
      }
    );
  }

  verMas(CategoriaId: number): void {
    this.router.navigate(['/productos', CategoriaId]); // Navegar a la ruta de productos
  }*/
}
