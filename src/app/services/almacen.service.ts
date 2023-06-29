import { Injectable } from '@angular/core';
import { Crud } from '../shared/services/Crud';
import { Almacen } from '../models/Almacen';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Inventario } from '../models/Inventario';

@Injectable({
  providedIn: 'root',
})
export class AlmacenService extends Crud<Almacen, string> {
  constructor(http: HttpClient) {
    const resourceUrl = `${environment.apiBaseUrl}${environment.almacenesEndpoint}`;
    super(http, resourceUrl);
  }

  getByLocation(location: string): Observable<Almacen> {
    return this.http.get<Almacen>(`${this.resourceUrl}by-location/${location}`);
  }
}
