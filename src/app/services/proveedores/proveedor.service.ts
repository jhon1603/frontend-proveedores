import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Se esta utilizando el patrón DI.
import { Proveedor } from '../../interfaces/proveedores/proveedor.model';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProveedorService {
  private apiUrl = 'http://localhost:8080/proveedores';

  constructor(private http: HttpClient) {}

  // Se esta utilizando el patrón Observer. 
  listarProveedores(pagina: number, tamaño: number): Observable<any> {
    console.log('Entrando a listarProveedores :: ProveedorService.component.ts');
    const params = new HttpParams()
      .set('page', pagina)
      .set('size', tamaño);
  
    return this.http.get<any>(this.apiUrl, { params }).pipe(
      catchError(error => {
        console.error('Error al obtener proveedores:', error);
        return throwError(() => new Error('No se pudieron cargar los proveedores.'));
      })
    );
  }

  agregarProveedor(proveedor: Proveedor): Observable<any> {
    return this.http.post(this.apiUrl, proveedor);
  }

  eliminarProveedor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
