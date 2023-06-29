import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/models/Material';
import {
  TableAction,
  TableColumn,
  TableRowAction,
} from 'src/app/shared/components/paginated-table/paginated-table.component';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-inventario-managua',
  templateUrl: './inventario-managua.component.html',
  styleUrls: ['./inventario-managua.component.css'],
})
export class InventarioManaguaComponent implements OnInit {
  tableColumns: TableColumn<Material>[] = [
    {
      propertyName: 'idMaterial',
      header: 'ID',
      sortable: true,
    },
    {
      propertyName: 'nombreMaterial',
      header: 'Nombre',
      sortable: true,
    },
    {
      propertyName: 'unidadDeMedida',
      header: 'Unidad de medida',
      sortable: true,
    },
    {
      propertyName: 'descripcion',
      header: 'Descripción',
      sortable: true,
    },
    {
      propertyName: 'marca',
      header: 'Marca',
      sortable: true,
    },
    {
      propertyName: 'pvu',
      header: 'PVU',
      sortable: true,
      valueGetter: (row) =>
        row.pvu?.toLocaleString('es-NI', {
          style: 'currency',
          currency: 'NIO',
          maximumFractionDigits: 2,
        }),
    },
  ];

  tableActions: TableAction<Material>[] = [
    {
      label: 'Agregar material',
      icon: 'add',
      color: 'primary',
      action: () => {
        console.log('Agregar material');
      },
    },
  ];

  rowActions: TableRowAction<Material>[] = [
    {
      icon: 'edit',
      tooltip: 'Editar',
      color: 'primary',
      action: (row: Material) => console.log('Edit', row),
    },
    {
      icon: 'delete',
      tooltip: 'Eliminar',
      color: 'warn',
      action: (row: Material) => console.log('Delete', row),
    },
  ];

  displayedColumns: string[] = [
    ...this.tableColumns.map((c) => c.propertyName),
    'actions',
  ];

  materials$!: Observable<Material[]>;

  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
    this.materials$ = this.materialService.getAll();
  }
}
