import { Component } from '@angular/core';
import { FacturaService } from '../Service/factura.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Category } from '../environment/Category';
import { Product } from '../environment/Product';
import { CarritoComponent } from '../carrito/carrito.component';
import { CartServiceComponent } from '../carrito/cart-service/cart-service.component';
 
@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  cartItems: any[] = [];
products: Product[] = [];
categories: any;
constructor(private categoriaService: FacturaService, private route: ActivatedRoute, ) {}


  ngOnInit(): void {
    const categoryId = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID de la categoría
    this.loadFactura(categoryId);
    this.loadCartItems();
  }

  loadFactura(id: number) {
    this.categoriaService.getProductsByCategoryId(id).subscribe(categories => {
      console.log('Factura recibida:', categories);
      this.categories = categories;
    }, error => {
      console.error('Error loading factura', error);
    });
  }

  isProductInCart(productId: number): boolean {
    return this.cartItems.some(item => item.ProductoId === productId);
  }

  loadCartItems(): void {
    this.categoriaService.getCartItems().subscribe(items => {
      this.cartItems = items; // Supongamos que este método devuelve los elementos del carrito
    });
  }
    // Método para agregar o eliminar del carrito
 
    toggleCartItem(product: any): void {
      const existingItemIndex = this.cartItems.findIndex(item => item.ProductoId === product.ProductoId);
    
      if (existingItemIndex !== -1) {
        // Si el producto ya está en el carrito, eliminarlo
        const cartItemId = this.cartItems[existingItemIndex].CartItemId; // Obtén el ID del carrito del producto existente
        this.categoriaService.removeProductFromCart(cartItemId).subscribe(() => {
          console.log('Producto eliminado del carrito:');
          // Elimina el producto del array local
          this.cartItems.splice(existingItemIndex, 1); 
          this.loadCartItems(); // Vuelve a cargar los elementos del carrito
        }, error => {
          console.error('Error al eliminar del carrito', error);
        });
      } else {
        // Si el producto no está en el carrito, agregarlo
        const cartItem = {
          ProductoId: product.ProductoId,
          Nombre: product.Nombre,
          Precio: product.Precio,
          ImagenUrl: product.ImagenUrl,
          Cantidad: 1 // Puedes ajustar la cantidad si es necesario
        };
    
        this.categoriaService.addProductToCart(cartItem).subscribe(() => {
          console.log('Producto agregado al carrito');
          this.cartItems.push(cartItem); // Agrega el producto al array local
          this.loadCartItems(); // Vuelve a cargar los elementos del carrito
        }, error => {
          console.error('Error al agregar al carrito', error);
        });
      }
    }
    
    
  
}