import { Component, Input } from '@angular/core';
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
export class PaginatedTableComponent<T> {
  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();
  @Input() set rows(value: T[]) {
    this.dataSource.data = value;
  }

  @Input() columns: TableColumn<T>[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() tableActions: TableAction<T>[] = [];
  @Input() rowActions: TableRowAction<T>[] = [];
}
