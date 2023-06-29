import { Injectable } from '@angular/core';
import { Crud } from '../shared/services/Crud';
import { Ciudad } from '../models/Ciudad';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CiudadService extends Crud<
  Ciudad,
  number,
  Omit<Ciudad, 'id'>,
  Ciudad
> {
  constructor(http: HttpClient) {
    const resourceUrl = `${environment.apiBaseUrl}${environment.ciudadesEndpoint}`;
    super(http, resourceUrl);
  }

  getByName(name: string): Observable<Ciudad> {
    return this.http.get<Ciudad>(`${this.resourceUrl}by-name/${name}`);
  }
}
