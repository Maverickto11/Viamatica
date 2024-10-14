import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FacturaFormComponent } from './factura-form/factura-form.component';
import { NavigationComponent } from "./Factura-Lista/navigation/navigation.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FacturaFormComponent, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'factura-app';
}
