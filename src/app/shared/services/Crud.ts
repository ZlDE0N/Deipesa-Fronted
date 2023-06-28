import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class Crud<
  Model,
  IdType,
  CreateDto = Partial<Model>,
  UpdateDto = Partial<Model>
> {
  constructor(protected http: HttpClient, protected resourceUrl: string) {}

  getById(id: IdType): Observable<Model> {
    return this.http.get<Model>(`${this.resourceUrl}${id}`);
  }

  getAll(): Observable<Model> {
    return this.http.get<Model>(`${this.resourceUrl}`);
  }

  create(newResource: CreateDto): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.resourceUrl}`, newResource);
  }

  update(
    id: IdType,
    updatedResource: UpdateDto
  ): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.resourceUrl}${id}`, updatedResource);
  }

  delete(id: IdType): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}${id}`);
  }
}
