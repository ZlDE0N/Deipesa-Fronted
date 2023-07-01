import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  resourceUrl!: string;

  constructor(private http: HttpClient) {
    this.resourceUrl = `${environment.apiBaseUrl}${environment.reportesEndpoint}`;
  }

  getInventoryReportByCityId(cityId: number) {
    return this.http.get(`${this.resourceUrl}inventory/by-city/${cityId}`, {
      responseType: 'blob',
    });
  }
}
