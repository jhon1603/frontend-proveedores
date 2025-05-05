import { Component, OnInit } from '@angular/core';
import { VersionService } from '../../services/versiones/version.service';
import { Version } from '../../interfaces/versiones/version.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})

export class BienvenidaComponent {
  version: string = '';

  constructor(private versionService: VersionService, private router: Router) {}

  ngOnInit(): void {
    this.versionService.obtenerVersion().subscribe({
      next: (data: Version) => {
        this.version = data.descripcion;
      },
      error: (err) => {
        console.error('Error al obtener versión:', err);
        this.version = 'Desconocida';
      }
    });
  }

  continuar(): void {
    this.router.navigate(['/proveedores']);
  }
  
}
