import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorComponent } from './components/proveedores/proveedor/proveedor.component';

const routes: Routes = [
  { path: '', redirectTo: 'proveedores', pathMatch: 'full' },
  { path: 'proveedores', component: ProveedorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
