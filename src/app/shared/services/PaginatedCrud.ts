import { HttpClient } from '@angular/common/http';
import { Crud } from './Crud';
import { Pagination } from '../models/Pagination';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../models/dtos/PaginatedResult';

export abstract class PaginatedCrud<
  Model,
  IdType,
  CreateDto = Partial<Model>,
  UpdateDto = Partial<Model>
> extends Crud<Model, IdType, CreateDto, UpdateDto> {
  constructor(http: HttpClient, resourceUrl: string) {
    super(http, resourceUrl);
  }

  getPaginated(pagination: Pagination): Observable<PaginatedResponse<Model>> {
    const params = pagination.toHttpParams();
    return this.http.get<any>(this.resourceUrl + 'paginated', { params });
  }
}
