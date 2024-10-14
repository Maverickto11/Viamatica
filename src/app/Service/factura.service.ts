import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  guardarFactura(factura: Factura): Observable<any> {
    return this.http.post(this.apiUrl, factura);
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
}
