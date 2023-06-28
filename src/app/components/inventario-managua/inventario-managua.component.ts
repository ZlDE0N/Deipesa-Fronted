import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/models/Material';
import { TableColumn } from 'src/app/shared/components/paginated-table/paginated-table.component';

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

  displayedColumns: string[] = this.tableColumns.map((c) => c.propertyName);

  constructor() {}

  ngOnInit(): void {}

  dataSource = [];

  onCreateMaterial() {
    // Lógica para crear un nuevo material
  }

  onEdit(materialId: number) {
    // Lógica para editar el material con el ID proporcionado
  }

  onDelete(materialId: number) {
    // Lógica para eliminar el material con el ID proporcionado
  }
}
