import { Component } from '@angular/core';
import { Factura } from '../../environment/Factura';
import { FacturaService } from '../../Service/factura.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-facturas-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './facturas-list.component.html',
  styleUrl: './facturas-list.component.css'
})
export class FacturasListComponent {
  facturas: Factura[] = [];

  constructor(private facturaService: FacturaService, private router: Router) { }

  ngOnInit(): void {
    this.loadFacturas();
  }

  loadFacturas() {
    this.facturaService.obtenerFacturas().subscribe(facturas => {
      this.facturas = facturas;
    }, error => {
      console.error('Error loading facturas', error);
    });
  }

  verFactura(id: number) {
    if (id) {
      this.router.navigate(['/factura', id]);
    } else {
      console.error('Factura ID is undefined');
    }
  }
}
