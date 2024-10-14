import { Component } from '@angular/core';
import { FacturaService } from '../Service/factura.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Category } from '../environment/Category';
import { Product } from '../environment/Product';
 
@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {


  products: Product[] = [];
 categories!: Category;

  constructor(private categoriaService: FacturaService, private route: ActivatedRoute) {}


  ngOnInit(): void {
    const categoryId = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID de la categoría
    this.loadFactura(categoryId);
  }

 /* loadProducts(categoryId: number): void {
    this.categoriaService.getProductsByCategoryId(categoryId).subscribe(data => {
      this.products = data;
      console.log(this.products);
    });
  }*/
    loadFactura(id: number) {
      this.categoriaService.getProductsByCategoryId(id).subscribe(categories => {
        console.log('Factura recibida:', categories);
        this.categories = categories;
      }, error => {
        console.error('Error loading factura', error);
      });
    }
    

}