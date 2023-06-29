import { Injectable } from '@angular/core';
import { Crud } from '../shared/services/Crud';
import { Inventario } from '../models/Inventario';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class InventarioService extends Crud<
  Inventario,
  string,
  Omit<
    Inventario,
    'idInventario' | 'idAlmacenNavigation' | 'idMaterialNavigation'
  >
> {
  constructor(http: HttpClient) {
    const resourceUrl = `${environment.apiBaseUrl}${environment.inventariosEndpoint}`;
    super(http, resourceUrl);
  }
}
