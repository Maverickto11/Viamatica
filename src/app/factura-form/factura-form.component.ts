import { Component, ElementRef, ViewChild } from '@angular/core';
import { FacturaService } from '../Service/factura.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Factura } from '../environment/Factura';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-factura-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './factura-form.component.html',
  styleUrls: ['./factura-form.component.css']
})
export class FacturaFormComponent {
  factura: Factura = {
    FacturaId: 0,
    ClienteNombre: '',
    Detalles: [],
    BaseImponibleIVA0: 0,
    BaseImponibleIVA12: 0,
    IVA: 0,
    TotalPagar: 0
  };
  today: Date = new Date();

  @ViewChild('facturaContent') facturaContent!: ElementRef;

  constructor(private facturaService: FacturaService) { }

  agregarDetalle() {
    this.factura.Detalles.push({
      Descripcion: '',
      Cantidad: 1,
      PrecioUnitario: 0,
      IVA: 12,
      Subtotal: 0
    });
  }

  eliminarDetalle(index: number) {
    this.factura.Detalles.splice(index, 1);
    this.calcularTotales();
  }

  calcularTotales() {
    let baseImponibleIVA0 = 0;
    let baseImponibleIVA12 = 0;
    let iva = 0;

    this.factura.Detalles.forEach(detalle => {
      detalle.Subtotal = detalle.Cantidad * detalle.PrecioUnitario;
      if (detalle.IVA === 0) {
        baseImponibleIVA0 += detalle.Subtotal;
      } else if (detalle.IVA === 12) {
        baseImponibleIVA12 += detalle.Subtotal;
        iva += detalle.Subtotal * 0.12;
      }
    });

    this.factura.BaseImponibleIVA0 = baseImponibleIVA0;
    this.factura.BaseImponibleIVA12 = baseImponibleIVA12;
    this.factura.IVA = iva;
    this.factura.TotalPagar = baseImponibleIVA0 + baseImponibleIVA12 + iva;
  }

  guardarFactura() {
    this.calcularTotales();
    this.facturaService.guardarFactura(this.factura).subscribe(response => {
      // Manejar la respuesta del backend
      alert('Factura guardada exitosamente');
      this.limpiarFormulario();
    }, error => {
      // Manejar el error
      alert('Ocurrió un error al guardar la factura');
    });
  }

  limpiarFormulario() {
    this.factura = {
      FacturaId: 0,
      ClienteNombre: '',
      Detalles: [],
      BaseImponibleIVA0: 0,
      BaseImponibleIVA12: 0,
      IVA: 0,
      TotalPagar: 0
    };
  }
}
 
