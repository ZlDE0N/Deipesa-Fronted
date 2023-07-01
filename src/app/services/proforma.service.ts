import { Injectable } from '@angular/core';
import { Crud } from '../shared/services/Crud';
import { Proforma } from '../models/Proforma';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProformaService extends Crud<
  Proforma,
  number,
  Omit<Proforma, 'id'>,
  Proforma
> {
  constructor(http: HttpClient) {
    const resourceUrl = `${environment.apiBaseUrl}${environment.proformasEndpoint}`;
    super(http, resourceUrl);
  }
}
