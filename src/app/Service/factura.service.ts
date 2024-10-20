import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Category } from '../environment/Category';
import { Product } from '../environment/Product';
import { login } from '../environment/login';
import { Usuario } from '../environment/Usuario';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private apiUrl = 'www.maverick.somee.com/api/Factura'; // Reemplaza con la URL de tu API
  private api = 'www.maverick.somee.com/api'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

 


  login(correo: string, contrasena: string): Observable<any> {
    const loginRequest: login = {
      correo: correo,
      contrasena: contrasena,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Asegúrate de que el tipo de contenido sea JSON
    });

    return this.http.post(`${this.api}/Login/login`, loginRequest, { headers });
  }

  register(usuario: Usuario): Observable<any> {

    return this.http.post(`${this.api}/Login/register`, usuario);
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
