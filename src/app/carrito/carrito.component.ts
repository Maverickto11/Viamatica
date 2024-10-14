import { Component } from '@angular/core';
import { FacturaService } from '../Service/factura.service';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  cartItems: any[] = []; // Aquí guardamos los elementos del carrito
  total: number = 0; // Variable para almacenar el total

  constructor(private categoriaService: FacturaService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.categoriaService.getCartItems().subscribe(items => {
      this.cartItems = items; // Supongamos que este método devuelve los elementos del carrito
      this.calculateTotal(); // Calcula el total al cargar los elementos del carrito
    }, error => {
      console.error('Error al cargar el carrito', error);
    });
  }

  // Método para calcular el total sumando solo los precios de los productos
  calculateTotal(): void {
    this.total = this.cartItems.reduce((accumulator, item) => {
      return accumulator + item.Precio; // Sumar el precio de cada item
    }, 0);
  }

  // Método para eliminar un producto del carrito
  removeProduct(cartItem: any): void {
    this.categoriaService.removeProductFromCart(cartItem.CartItemId).subscribe(() => {
      console.log('Producto eliminado del carrito:', cartItem.Nombre);
      this.cartItems = this.cartItems.filter(item => item.CartItemId !== cartItem.CartItemId); // Actualiza la lista local
      this.calculateTotal(); // Recalcula el total después de eliminar un producto
    }, error => {
      console.error('Error al eliminar del carrito', error);
    });
  }
  
   // Método mejorado para crear una factura en PDF con mejor diseño
   proceedToPayment(): void {
    const factura = {
      Items: this.cartItems.map(item => ({
        Nombre: item.Nombre,
        Precio: item.Precio
      })),
      Total: this.total
    };

    // Crear un documento PDF usando jsPDF
    const doc = new jsPDF();

    // Encabezado de la factura
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text('Factura de Compra', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(100);

    // Línea separadora
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    // Agregar detalle de productos como tabla
    let yPosition = 40;
    doc.setFontSize(14);
    doc.setTextColor(0);

    // Crear cabecera de la tabla
    doc.text('Producto', 20, yPosition);
    doc.text('Precio', 160, yPosition);
    yPosition += 10;

    // Dibujar la línea debajo del encabezado
    doc.setLineWidth(0.3);
    doc.line(20, yPosition, 190, yPosition);
    yPosition += 10;

    // Agregar los productos al PDF
    this.cartItems.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.Nombre}`, 20, yPosition);
      doc.text(`${item.Precio.toFixed(2)}€`, 160, yPosition, { align: 'right' });
      yPosition += 10;

      // Dibujar una línea separadora entre productos
      doc.setLineWidth(0.2);
      doc.line(20, yPosition, 190, yPosition);
      yPosition += 10;
    });

    // Agregar el total al final de la tabla
    yPosition += 10;
    doc.setFontSize(16);
    doc.setTextColor(40, 120, 40);
    doc.text(`Total: ${this.total.toFixed(2)}€`, 160, yPosition, { align: 'right' });

    // Opcional: añadir una firma o agradecimiento
    yPosition += 20;
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Gracias por tu compra!', 105, yPosition, { align: 'center' });

    // Guardar el PDF
    doc.save('factura_mejorada.pdf');

    console.log('Factura creada en PDF con un mejor diseño');
  }
}