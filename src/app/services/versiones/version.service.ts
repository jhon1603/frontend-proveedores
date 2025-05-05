import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Version } from '../../interfaces/versiones/version.model';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private apiUrl = 'http://localhost:8080/version';

  constructor(private http: HttpClient) {}

  obtenerVersion(): Observable<Version> {
    return this.http.get<Version>(this.apiUrl);
  }
}
