import { Component, OnInit } from '@angular/core';
import { Proforma } from 'src/app/models/Proforma';
import {
  TableAction,
  TableColumn,
  TableRowAction,
} from 'src/app/shared/components/paginated-table/paginated-table.component';
import { Observable } from 'rxjs';
import { ProformaService } from 'src/app/services/proforma.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
  ConfirmDialogResult,
} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ProformaEditDialogComponent } from '../proforma-edit-dialog/proforma-edit-dialog.component';
import {
  BaseEditDialogData,
  BaseEditDialogResult,
} from 'src/app/shared/components/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-tabla-proformas',
  templateUrl: './tabla-proformas.component.html',
  styleUrls: ['./tabla-proformas.component.css'],
})
export class TablaProformasComponent implements OnInit {
  tableColumns: TableColumn<Proforma>[] = [
    {
      propertyName: 'id',
      header: 'ID',
      sortable: true,
    },
    {
      propertyName: 'ciudad.nombre',
      header: 'Ciudad',
      sortable: true,
      valueGetter: (proforma: Proforma) => proforma.ciudad?.name ?? 'N/A',
    },
    {
      propertyName: 'nombre',
      header: 'Nombre',
      sortable: true,
    },
    {
      propertyName: 'fecha',
      header: 'Fecha',
      sortable: true,
      valueGetter: (proforma: Proforma) =>
        new Date(proforma.fecha).toLocaleDateString(),
    },
  ];

  displayedColumns = [
    ...this.tableColumns.map((column) => column.propertyName),
    'actions',
  ];

  rowActions: TableRowAction<Proforma>[] = [
    {
      icon: 'edit',
      tooltip: 'Editar',
      color: 'primary',
      action: (proforma: Proforma) => this.onEdit(proforma),
    },
    {
      icon: 'open_in_new',
      tooltip: 'Ir a drive',
      color: 'accent',
      action: (proforma: Proforma) => this.onGoToDrive(proforma),
    },
    {
      icon: 'delete',
      tooltip: 'Eliminar',
      color: 'warn',
      action: (proforma: Proforma) => this.onDelete(proforma),
    },
  ];

  tableActions: TableAction<Proforma>[] = [
    {
      icon: 'add',
      label: 'Agregar proforma',
      color: 'primary',
      action: () => this.onAdd(),
    },
  ];

  proformas$!: Observable<Proforma[]>;

  constructor(
    private proformaService: ProformaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.proformas$ = this.proformaService.getAll();
  }

  onDelete(proforma: Proforma): void {
    const dialogRef = this.dialog.open<
      ConfirmDialogComponent,
      ConfirmDialogData,
      ConfirmDialogResult
    >(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar proforma',
        message: `¿Está seguro que desea eliminar la proforma ${proforma.nombre}?`,
        cancelColor: 'primary',
        cancelIcon: 'cancel',
        confirmColor: 'warn',
        confirmIcon: 'warning',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed) {
        this.proformaService.delete(proforma.id).subscribe((result) => {
          if (result.ok) {
            this.snackBar.open('Proforma eliminada correctamente', 'Cerrar', {
              duration: 3000,
            });
            this.loadData();
          } else {
            this.snackBar.open('Error al eliminar la proforma', 'Cerrar', {
              duration: 3000,
            });
          }
        });
      }
    });
  }

  onEdit(proforma: Proforma): void {
    const dialogRef = this.dialog.open<
      ProformaEditDialogComponent,
      BaseEditDialogData<number>,
      BaseEditDialogResult<Proforma>
    >(ProformaEditDialogComponent, {
      data: {
        id: proforma.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.snackBar.open('Proforma actualizada correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.loadData();
      } else if (result?.success === false) {
        this.snackBar.open('Error al actualizar la proforma', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  onAdd(): void {
    const dialogRef = this.dialog.open<
      ProformaEditDialogComponent,
      BaseEditDialogData<number>,
      BaseEditDialogResult<Proforma>
    >(ProformaEditDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.snackBar.open('Proforma agregada correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.loadData();
      } else if (result?.success === false) {
        this.snackBar.open('Error al agregar la proforma', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  onGoToDrive(proforma: Proforma): void {
    window.open(proforma.url, '_blank');
  }
}
