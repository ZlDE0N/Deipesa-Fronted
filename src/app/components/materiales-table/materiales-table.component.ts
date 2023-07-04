import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Material } from 'src/app/models/Material';
import { MaterialService } from 'src/app/services/material.service';
import {
  TableAction,
  TableColumn,
  TableRowAction,
} from 'src/app/shared/components/paginated-table/paginated-table.component';
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
      action: (materiales: Material[]) => this.onAdd(),
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

  materiales$!: Observable<Material[]>;

  constructor(
    private materialService: MaterialService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.materiales$ = this.materialService.getAll();
  }

  onAdd(): void {
    const dialogRef = this.dialog.open<
      MaterialEditDialogComponent,
      BaseEditDialogData<string>,
      BaseEditDialogResult<Material>
    >(MaterialEditDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.snackBar.open('Material agregado', 'Aceptar', {
          duration: 3000,
        });
        this.loadData();
      } else if (result?.success === false) {
        this.snackBar.open('Error al agregar material', 'Aceptar', {
          duration: 3000,
        });
      }
    });
  }

  onEdit(material: Material): void {
    const dialogRef = this.dialog.open<
      MaterialEditDialogComponent,
      BaseEditDialogData<string>,
      BaseEditDialogResult<Material>
    >(MaterialEditDialogComponent, {
      data: {
        id: material.idMaterial,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.snackBar.open('Material editado', 'Aceptar', {
          duration: 3000,
        });
        this.loadData();
      } else if (result?.success === false) {
        this.snackBar.open('Error al editar material', 'Aceptar', {
          duration: 3000,
        });
      }
    });
  }

  onDelete(material: Material): void {
    const dialogRef = this.dialog.open<
      ConfirmDialogComponent,
      ConfirmDialogData,
      ConfirmDialogResult
    >(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar material',
        message: `¿Está seguro que desea eliminar el material "${material.nombreMaterial}"?`,
        cancelColor: 'primary',
        cancelIcon: 'cancel',
        confirmColor: 'warn',
        confirmIcon: 'warning',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed) {
        this.materialService.delete(material.idMaterial).subscribe({
          next: (data) => {
            this.snackBar.open(
              `Material "${material.nombreMaterial}" eliminado`,
              'Aceptar',
              {
                duration: 3000,
              }
            );
            this.loadData();
          },
          error: (err) => {
            this.snackBar.open('Error al eliminar material', 'Aceptar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}
