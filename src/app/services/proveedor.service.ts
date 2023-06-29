import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Proveedor } from '../models/Proveedor';
import { Crud } from '../shared/services/Crud';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService extends Crud<Proveedor, string> {
  constructor(http: HttpClient) {
    const resourceUrl = `${environment.apiBaseUrl}${environment.proveedoresEndpoint}`;
    super(http, resourceUrl);
  }

  getByCity(cityId: number): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.resourceUrl}by-city/${cityId}`);
  }
}
