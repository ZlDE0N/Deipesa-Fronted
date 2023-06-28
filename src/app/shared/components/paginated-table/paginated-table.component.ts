import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export type TableColumn<T> = {
  propertyName: string;
  header: string;
  sortable?: boolean;
  valueGetter?: (row: T) => any;
};

export interface TableRowAction<T> {
  icon: string;
  tooltip: string;
  color: 'primary' | 'accent' | 'warn';
  action: (row: T) => void;
}

export interface TableAction<T> {
  label: string;
  color: 'primary' | 'accent' | 'warn';
  action: (rows: T[]) => void;
  icon?: string;
}

@Component({
  selector: 'app-paginated-table',
  templateUrl: './paginated-table.component.html',
  styleUrls: ['./paginated-table.component.css'],
})
export class PaginatedTableComponent<T> implements AfterViewInit {
  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();

  // Table data
  @Input() set rows(value: T[]) {
    this.dataSource.data = value;
  }
  @Input() columns: TableColumn<T>[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() tableActions: TableAction<T>[] = [];
  @Input() rowActions: TableRowAction<T>[] = [];
  @Input() stickyHeader = false;
  @Input() tableClasses = '';

  // Pagination data
  @Input() paginatorClasses = '';
  @Input() pageSizeOptions = [5, 10, 25, 50];
  @Output() pagination: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() sort: EventEmitter<Sort> = new EventEmitter<Sort>();

  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;

  // Filtering data
  @Input() filtering = true;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.matSort;
    this.dataSource.paginator = this.matPaginator;
  }

  emitPageEvent(event: PageEvent) {
    this.pagination.emit(event);
  }

  emitSortEvent(event: Sort) {
    this.sort.emit(event);
  }

  applyFilter(event: any) {
    const { value } = event.target;
    this.dataSource.filter = value?.trim().toLowerCase() ?? '';
  }
}
