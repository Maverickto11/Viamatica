import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FacturaService } from '../Service/factura.service';
import { Factura } from '../environment/Factura';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-factura-detail',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './factura-detail.component.html',
  styleUrl: './factura-detail.component.css'
})
export class FacturaDetailComponent {
  factura!: Factura;
  

  constructor(
    private route: ActivatedRoute,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadFactura(id);
  }

  loadFactura(id: number) {
    this.facturaService.obtenerFacturaPorId(id).subscribe(factura => {
      console.log('Factura recibida:', factura);
      this.factura = factura;
    }, error => {
      console.error('Error loading factura', error);
    });
  }
  
  agregarDetalle() {
    this.factura.Detalles.push({
      Descripcion: '',
      Cantidad: 1,
      PrecioUnitario: 0,
      IVA: 12,
      Subtotal: 0
    });
  }
  downloadFactura() {
    if (!this.factura) {
      console.error('Factura is not defined');
      return;
    }

    const pdf = new jsPDF();

    pdf.setFontSize(22);
    pdf.text('Factura', 14, 22);

    pdf.setFontSize(16);
    pdf.text(`Factura ID: ${this.factura.FacturaId}`, 14, 30);
    pdf.text(`Cliente: ${this.factura.ClienteNombre}`, 14, 36);

    const startY = 45;
    const rowHeight = 10;
    const columnWidths = [50, 30, 40, 20, 30];

    pdf.setFontSize(12);
    pdf.text(['Descripción', 'Cantidad', 'Precio Unitario', 'IVA', 'Subtotal'], 14, startY);

    this.factura.Detalles.forEach((detalle, index) => {
      const y = startY + (index + 1) * rowHeight;
      pdf.text(detalle.Descripcion || '', 14, y);
      pdf.text(detalle.Cantidad?.toString() || '', 14 + columnWidths[0], y);
      pdf.text(detalle.PrecioUnitario?.toFixed(2) || '', 14 + columnWidths[0] + columnWidths[1], y);
      pdf.text(detalle.IVA?.toString() || '', 14 + columnWidths[0] + columnWidths[1] + columnWidths[2], y);
      pdf.text(detalle.Subtotal?.toFixed(2) || '', 14 + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], y);
    });

    const totalY = startY + (this.factura.Detalles.length + 1) * rowHeight;
    pdf.text(`Base Imponible IVA 0%: ${this.factura.BaseImponibleIVA0?.toFixed(2) || ''}`, 14, totalY);
    pdf.text(`Base Imponible IVA 12%: ${this.factura.BaseImponibleIVA12?.toFixed(2) || ''}`, 14, totalY + rowHeight);
    pdf.text(`IVA 12%: ${this.factura.IVA?.toFixed(2) || ''}`, 14, totalY + 2 * rowHeight);
    pdf.text(`Total a Pagar: ${this.factura.TotalPagar?.toFixed(2) || ''}`, 14, totalY + 3 * rowHeight);

    pdf.save('Factura.pdf');
  }
}
