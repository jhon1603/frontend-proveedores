import { Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { ProveedorComponent } from './components/proveedores/proveedor/proveedor.component';

export const routes: Routes = [
  { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },  // Redirección por defecto
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'proveedores', component: ProveedorComponent }
];
