import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../environment/Factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private apiUrl = 'https://localhost:7090/api/Factura'; // Reemplaza con la URL de tu API

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

  
}
