import { Injectable } from '@angular/core';
import { Material } from '../shared/models/Material';
import { BaseCrudService } from '../shared/services/BaseCrudService';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaterialService extends BaseCrudService<Material, string> {
  constructor(http: HttpClient) {
    const resourceUrl = `${environment.apiBaseUrl}${environment.materialesEndpoint}`;
    super(resourceUrl, http);
  }

  getAllWithOrderDetails(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.resourceUrl}with-order-details`);
  }
}
