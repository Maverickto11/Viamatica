import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../environment/Factura';
import { Category } from '../environment/Category';
import { Product } from '../environment/Product';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private apiUrl = 'https://localhost:7090/api/Factura'; // Reemplaza con la URL de tu API
  private api = 'https://localhost:7090/api'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  login(nombreUsuario: string, clave: string): Observable<any> {
    return this.http.post(`${this.api}/Usuarios/login`, { nombreUsuario, clave });
  }

  obtenerFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.apiUrl);
  }

  obtenerFacturaPorId(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.apiUrl}/${id}`);
  }

  /*obternerCategoria(): Observable<any> {
    return this.http.get(`${this.api}/categoria`);
  }*/

    getCategories(): Observable<Category[]> {
      return this.http.get<Category[]>(`${this.api}/categoria`); // Ajusta la ruta según tu API
    }
  
   getProductsByCategoryId(categoryId: number): Observable<Category> {
      return this.http.get<Category>(`${this.api}/categoria/${categoryId}`); // Ajusta la ruta según tu API
    }

    addProductToCart(product: any): Observable<any> {
      return this.http.post(`${this.api}/Carrito/add`, product);
    }

    // Obtener los productos del carrito
  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/Carrito`);
  }

  getProductsByCategoryIds(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/Carrito/${id}`);
  }
  removeProductFromCart(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.api}/Carrito/${cartItemId}`);
  }

  getCartById(cartId: any): Observable<any> {
    return this.http.get<any>(`${this.api}/Carrito/${cartId}`);
  }

  
  
}
