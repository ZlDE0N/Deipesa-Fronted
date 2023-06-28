import { HttpParams } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';

export class Pagination {
  pageIndex = 0;
  pageSize = 10;
  defaultSortColumn = 'id';
  defaultSortOrder: 'asc' | 'desc' = 'asc';
  defaultFilterColumn = '';
  filterQuery?: string;
  sort?: MatSort;

  constructor(init?: Partial<Pagination>) {
    Object.assign(this, init);
  }

  public toHttpParams(): HttpParams {
    let params = new HttpParams()
      .set('pageIndex', this.pageIndex)
      .set('pageSize', this.pageSize)
      .set('sortColumn', this.sort ? this.sort.active : this.defaultSortColumn)
      .set(
        'sortOrder',
        this.sort ? this.sort.direction : this.defaultSortOrder
      );

    if (this.filterQuery) {
      params = params
        .set('filterColumn', this.defaultFilterColumn)
        .set('filterQuery', this.filterQuery);
    }

    return params;
  }
}
