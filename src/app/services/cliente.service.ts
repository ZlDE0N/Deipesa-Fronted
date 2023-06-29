import { Injectable } from '@angular/core';
import { Crud } from '../shared/services/Crud';
import { Cliente } from '../models/Cliente';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService extends Crud<Cliente, string, Cliente, Cliente> {
  constructor(http: HttpClient) {
    const resourceUrl = `${environment.apiBaseUrl}${environment.clientesEndpoint}`;
    super(http, resourceUrl);
  }

  getByCity(cityId: number): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.resourceUrl}by-city/${cityId}`);
  }
}
