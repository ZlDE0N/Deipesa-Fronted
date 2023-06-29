import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Material } from '../models/Material';
import { PaginatedCrud } from '../shared/services/PaginatedCrud';

@Injectable({
  providedIn: 'root',
})
export class MaterialService extends PaginatedCrud<
  Material,
  string,
  Omit<Material, 'idMaterial'>,
  Omit<Material, 'idMaterial'>
> {
  constructor(http: HttpClient) {
    const resourceUrl = `${environment.apiBaseUrl}${environment.materialesEndpoint}`;
    super(http, resourceUrl);
  }

  getAllWithOrderDetails(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.resourceUrl}with-order-details`);
  }
}
