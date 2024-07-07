import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { Material } from 'src/app/models/Material';
import { MaterialEditDialogComponent } from '../material-edit-dialog/material-edit-dialog.component';
import {
  BaseEditDialogData,
  BaseEditDialogResult,
} from 'src/app/shared/components/edit-dialog/edit-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
  ConfirmDialogResult,
} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { TableAction, TableColumn, TableRowAction } from 'src/app/shared/components/paginated-table/paginated-table.component';

@Component({
  selector: 'app-materiales-table',
  templateUrl: './materiales-table.component.html',
  styleUrls: ['./materiales-table.component.css'],
})
export class MaterialesTableComponent implements OnInit {
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
      valueGetter: (material: Material) => {
        return material.pvu?.toLocaleString('es-NI', {
          style: 'currency',
          currency: 'NIO',
        });
      },
    },
  ];

  tableActions: TableAction<Material>[] = [
    {
      label: 'Agregar tipo Material',
      icon: 'add',
      color: 'primary',
      action: () => this.onAdd(),
    },
  ];

  rowActions: TableRowAction<Material>[] = [
    {
      tooltip: 'Editar',
      icon: 'edit',
      color: 'primary',
      action: (material: Material) => this.onEdit(material),
    },
    {
      tooltip: 'Eliminar',
      icon: 'delete',
      color: 'warn',
      action: (material: Material) => this.onDelete(material),
    },
  ];

  displayedColumns: string[] = [
    ...this.tableColumns.map((column) => column.propertyName),
    'actions',
  ];

  materiales: Material[] = [
    {
      idMaterial: '1', // Ejemplo usando idMaterial como string
      nombreMaterial: 'Material de ejemplo',
      unidadDeMedida: 'Unidad',
      descripcion: 'Descripción del material',
      marca: 'Marca del material',
      pvu: 100.50,
      detalleOrdenCompras: [],
      inventarios: [],
    },
    {
      idMaterial: '2', // Ejemplo usando idMaterial como string
      nombreMaterial: 'Material 2',
      unidadDeMedida: 'Unidad',
      descripcion: 'Descripción del material 2',
      marca: 'Marca 2',
      pvu: 200.75,
      detalleOrdenCompras: [],
      inventarios: [],
    },
    // Agrega más materiales según sea necesario
  ];

  materiales$: Observable<Material[]> = of(this.materiales);

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  onAdd(): void {
    const dialogRef: MatDialogRef<MaterialEditDialogComponent, BaseEditDialogResult<Material>> = this.dialog.open(
      MaterialEditDialogComponent,
      {
        data: {
          // Puedes pasar datos necesarios aquí si MaterialEditDialogComponent lo requiere
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.snackBar.open('Material agregado', 'Aceptar', {
          duration: 3000,
        });
      } else if (result?.success === false) {
        this.snackBar.open('Error al agregar material', 'Aceptar', {
          duration: 3000,
        });
      }
    });
  }

  onEdit(material: Material): void {
    const dialogRef: MatDialogRef<MaterialEditDialogComponent, BaseEditDialogResult<Material>> = this.dialog.open(
      MaterialEditDialogComponent,
      {
        data: {
          id: material.idMaterial.toString(), // Asegúrate de pasar el ID como string si es requerido por MaterialEditDialogComponent
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.snackBar.open('Material editado', 'Aceptar', {
          duration: 3000,
        });
      } else if (result?.success === false) {
        this.snackBar.open('Error al editar material', 'Aceptar', {
          duration: 3000,
        });
      }
    });
  }

  onDelete(material: Material): void {
    const dialogRef: MatDialogRef<ConfirmDialogComponent, ConfirmDialogResult> = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          title: 'Eliminar material',
          message: `¿Está seguro que desea eliminar el material "${material.nombreMaterial}"?`,
          cancelColor: 'primary',
          cancelIcon: 'cancel',
          confirmColor: 'warn',
          confirmIcon: 'warning',
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed) {
        this.materiales = this.materiales.filter((m) => m.idMaterial !== material.idMaterial);
        this.materiales$ = of(this.materiales); // Actualizar el Observable de materiales
        this.snackBar.open(
          `Material "${material.nombreMaterial}" eliminado`,
          'Aceptar',
          {
            duration: 3000,
          }
        );
      }
    });
  }
}
