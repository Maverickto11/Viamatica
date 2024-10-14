import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart-service',
  standalone: true,
  imports: [],
  templateUrl: './cart-service.component.html',
  styleUrl: './cart-service.component.css'
})
export class CartServiceComponent {

  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  
  constructor() {}

  setCartItems(items: any[]) {
    this.cartItemsSubject.next(items);
  }

  addItem(item: any) {
    const currentItems = this.cartItemsSubject.getValue();
    currentItems.push(item);
    this.setCartItems(currentItems);
  }

  removeItem(productId: number) {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item.ProductoId !== productId);
    this.setCartItems(updatedItems);
  }
}
