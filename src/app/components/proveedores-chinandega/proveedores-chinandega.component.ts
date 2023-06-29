import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, lastValueFrom } from 'rxjs';
import { Ciudad } from 'src/app/models/Ciudad';
import { Proveedor } from 'src/app/models/Proveedor';
import { CiudadService } from 'src/app/services/ciudad.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import {
  TableAction,
  TableColumn,
  TableRowAction,
} from 'src/app/shared/components/paginated-table/paginated-table.component';
import {
  ProveedorEditDialogComponent,
  ProveedorEditDialogData,
} from '../proveedor-edit-dialog/proveedor-edit-dialog.component';
import { BaseEditDialogResult } from 'src/app/shared/components/edit-dialog/edit-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
  ConfirmDialogResult,
} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-proveedores-chinandega',
  templateUrl: './proveedores-chinandega.component.html',
  styleUrls: ['./proveedores-chinandega.component.css'],
})
export class ProveedoresChinandegaComponent implements OnInit {
  tableColumns: TableColumn<Proveedor>[] = [
    {
      propertyName: 'idproveedor',
      header: 'ID',
      sortable: true,
    },
    {
      propertyName: 'nombreProveedor',
      header: 'Nombre',
      sortable: true,
    },
    {
      propertyName: 'direccion',
      header: 'Dirección',
      sortable: true,
    },
    {
      propertyName: 'telefono',
      header: 'Teléfono',
      sortable: true,
    },
    {
      propertyName: 'correo',
      header: 'Correo',
      sortable: true,
    },
  ];

  displayedColumns = [
    ...this.tableColumns.map((c) => c.propertyName),
    'actions',
  ];

  tableActions: TableAction<Proveedor>[] = [
    {
      icon: 'add',
      label: 'Agregar proveedor',
      color: 'primary',
      action: () => this.onAddProvider(),
    },
  ];

  rowActions: TableRowAction<Proveedor>[] = [
    {
      icon: 'edit',
      tooltip: 'Editar',
      color: 'primary',
      action: (row: Proveedor) => this.onEditProveedor(row),
    },
    {
      icon: 'delete',
      tooltip: 'Eliminar',
      color: 'warn',
      action: (row: Proveedor) => this.onDeleteProveedor(row),
    },
  ];

  city$!: Observable<Ciudad>;
  providers$!: Observable<Proveedor[]>;

  constructor(
    private proveedorService: ProveedorService,
    private ciudadService: CiudadService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.city$ = this.ciudadService.getByName('Chinandega');
    const city = await lastValueFrom(this.city$);
    this.providers$ = this.proveedorService.getByCity(city.id);
  }

  async onEditProveedor(row: Proveedor) {
    const city = await lastValueFrom(this.city$);
    const dialogRef = this.dialog.open<
      ProveedorEditDialogComponent,
      ProveedorEditDialogData,
      BaseEditDialogResult<Proveedor>
    >(ProveedorEditDialogComponent, {
      data: {
        id: row.idproveedor,
        ciudadId: city.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.loadData();
        this.snackBar.open('Proveedor actualizado', 'Cerrar', {
          duration: 3000,
        });
      } else if (result?.success === false) {
        this.snackBar.open('Proveedor no actualizado', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  onDeleteProveedor(row: Proveedor): void {
    const dialogRef = this.dialog.open<
      ConfirmDialogComponent,
      ConfirmDialogData,
      ConfirmDialogResult
    >(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar proveedor',
        message: `¿Está seguro que desea eliminar el proveedor ${row.nombreProveedor}?`,
        cancelColor: 'primary',
        cancelIcon: 'cancel',
        confirmColor: 'warn',
        confirmIcon: 'warning',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed) {
        this.proveedorService.delete(row.idproveedor).subscribe((res) => {
          if (res.ok) {
            this.loadData();
            this.snackBar.open('Proveedor eliminado', 'Cerrar', {
              duration: 3000,
            });
          } else {
            this.snackBar.open('Proveedor no eliminado', 'Cerrar', {
              duration: 3000,
            });
          }
        });
      }
    });
  }

  async onAddProvider() {
    const city = await lastValueFrom(this.city$);
    const dialogRef = this.dialog.open<
      ProveedorEditDialogComponent,
      ProveedorEditDialogData,
      BaseEditDialogResult<Proveedor>
    >(ProveedorEditDialogComponent, {
      data: {
        ciudadId: city.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.loadData();
        this.snackBar.open('Proveedor agregado', 'Cerrar', {
          duration: 3000,
        });
      } else if (result?.success === false) {
        this.snackBar.open('Proveedor no agregado', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }
}
