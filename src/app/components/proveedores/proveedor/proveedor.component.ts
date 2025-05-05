import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { ProveedorService } from '../../../services/proveedores/proveedor.service';
import { Proveedor } from '../../../interfaces/proveedores/proveedor.model';
import { FormsModule } from '@angular/forms';

declare const bootstrap: any;

@Component({
  selector: 'app-proveedor',
  standalone: true,
  imports: [CommonModule, ScrollingModule , HttpClientModule, FormsModule],
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})

export class ProveedorComponent implements OnInit {
  proveedores: Proveedor[] = [];
  paginaActual: number = 0;
  totalPaginas: number = 0;
  tamanioPagina: number = 10;
  totalElementos: number = 0;
  errorMensaje: string = '';
  nuevoProveedor = {
    nombre: '',
    rfc: '',
    direccion: ''
  };
  mensajeExito: string = '';
  mensajeError: string = '';
  cargando: boolean = false;

  @ViewChild(CdkVirtualScrollViewport)
  viewport!: CdkVirtualScrollViewport;

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit(): void {
    console.log('Entrando a método ngOnInit().');
    this.reiniciarScroll();
  }

  reiniciarScroll(): void {
    this.paginaActual = 0;
    this.totalPaginas = 0;
    this.proveedores = [];
    this.obtenerProveedores();
  }
  
  obtenerProveedores(): void {
    console.log('Entrando a método obtenerProveedores().');
    console.log('this.cargando :: ', this.cargando);
    console.log('this.paginaActual :: ', this.paginaActual);
    console.log('this.totalPaginas :: ', this.totalPaginas);
    
    if (this.cargando) return;
    if (this.totalPaginas > 0 && this.paginaActual >= this.totalPaginas) return;
    
    this.cargando = true;
      
    this.proveedorService.listarProveedores(this.paginaActual, this.tamanioPagina).subscribe({
      next: (response) => {
        console.log('Respuesta paginada:', response);
        this.proveedores = [...response.content];
        this.totalPaginas = response.totalPages;
        this.cargando = false;
      },
      error: err => {
        console.error('Error al cargar proveedores', err);
        this.cargando = false;
      }
    });
  }

  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina >= 0 && nuevaPagina < this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      this.obtenerProveedores();
    }
  }

  obtenerRangoPaginas(): number[] {
    return Array(this.totalPaginas).fill(0).map((_, i) => i);
  }

  agregarProveedor(): void {
    console.log("Entrando a método :: agregarProveedor().")
    if (!this.nuevoProveedor.nombre || !this.nuevoProveedor.rfc || !this.nuevoProveedor.direccion) {
      console.log('Formulario incompleto. No se insertará el proveedor.');
      return;
    }

    this.proveedorService.agregarProveedor(this.nuevoProveedor).subscribe({
      next: () => {
        this.obtenerProveedores();
        this.nuevoProveedor = { nombre: '', rfc: '', direccion: '' };
        const modal = document.getElementById('modalProveedor');
        if (modal) (bootstrap as any).Modal.getInstance(modal)?.hide();
        this.mensajeExito = 'Proveedor agregado con éxito.';
        this.mensajeError = '';
      },
      error: err => {
        if (err.status === 400) {
          this.errorMensaje = 'Ya existe un proveedor con ese nombre.';          
          this.ngOnInit();
        } else {
          this.errorMensaje = '';
          this.mensajeError = '';
        }
        this.mensajeExito = '';
      }
    });
    this.obtenerProveedores();
  }

  eliminar(id: number): void {
    this.proveedorService.eliminarProveedor(id).subscribe(() => {
      this.mensajeExito = 'Proveedor eliminado con éxito.';
      this.obtenerProveedores();
    });
  }

  onScroll(): void {
    console.log('Entrando al método onScroll().');
    const end = this.viewport.measureScrollOffset('bottom');
    console.log('ScrollOffset bottom:', end);

    if (end < 200 && !this.cargando && this.paginaActual + 1 < this.totalPaginas) {
      this.paginaActual++;
      this.cargarProveedoresScroll();
    }
  }  

  cargarProveedoresScroll(): void {
    console.log('Entrando al método cargarProveedoresScroll().');
    console.log('this.paginaActual :: ', this.paginaActual);
    console.log('this.tamanioPagina :: ', this.tamanioPagina);

    this.cargando = true;
    this.proveedorService.listarProveedores(this.paginaActual, this.tamanioPagina).subscribe({
      next: data => {
        console.log('Respuesta paginada:', data);

        this.proveedores = [...this.proveedores, ...data.content];
        this.totalPaginas = data.totalPages;
        this.cargando = false;
      },
      error: err => {
        this.errorMensaje = 'Error al cargar más proveedores.';
        this.cargando = false;
      }
    });
  }
}
