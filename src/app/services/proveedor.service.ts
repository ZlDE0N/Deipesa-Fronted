import { Injectable } from '@angular/core';
import { BaseCrudService } from '../shared/services/BaseCrudService';
import { Proveedor } from '../shared/models/Proveedor';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService extends BaseCrudService<Proveedor, string> {
  constructor(http: HttpClient) {
    const resourceUrl = `${environment.apiBaseUrl}${environment.proveedoresEndpoint}`;
    super(resourceUrl, http);
  }
}
