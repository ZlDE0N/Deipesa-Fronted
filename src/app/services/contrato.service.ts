import { Injectable } from '@angular/core';
import { Contrato } from '../models/Contrato';
import { Crud } from '../shared/services/Crud';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ContratoService extends Crud<
  Contrato,
  number,
  Omit<Contrato, 'id'>,
  Contrato
> {
  constructor(http: HttpClient) {
    const resourceUrl = `${environment.apiBaseUrl}${environment.contratosEndpoint}`;
    super(http, resourceUrl);
  }
}
