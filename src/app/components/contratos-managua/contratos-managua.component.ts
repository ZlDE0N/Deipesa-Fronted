import { Component, OnInit } from '@angular/core';
import { Contrato } from 'src/app/models/Contrato';
import {
  TableAction,
  TableColumn,
  TableRowAction,
} from 'src/app/shared/components/paginated-table/paginated-table.component';
import { Observable, lastValueFrom } from 'rxjs';
import { Ciudad } from 'src/app/models/Ciudad';
import { CiudadService } from 'src/app/services/ciudad.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ContratoEditDialogComponent,
  ContratoEditDialogData,
} from '../contrato-edit-dialog/contrato-edit-dialog.component';
import { BaseEditDialogResult } from 'src/app/shared/components/edit-dialog/edit-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
  ConfirmDialogResult,
} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-contratos-managua',
  templateUrl: './contratos-managua.component.html',
  styleUrls: ['./contratos-managua.component.css'],
})
export class ContratosManaguaComponent implements OnInit {
  tableColumns: TableColumn<Contrato>[] = [
    {
      propertyName: 'id',
      header: 'ID',
      sortable: true,
    },
    {
      propertyName: 'clienteNombre',
      header: 'Cliente',
      sortable: true,
      valueGetter: (contrato: Contrato) => {
        let value = contrato.cliente?.nombres
          ? contrato.cliente.nombres + ' '
          : '';
        value += contrato.cliente?.apellidos ?? '';
        return value || 'N/A';
      },
    },
    {
      propertyName: 'clienteId',
      header: 'Cliente ID',
      sortable: true,
      valueGetter: (contrato: Contrato) => contrato.cliente?.idCliente ?? 'N/A',
    },
    {
      propertyName: 'nombre',
      header: 'Nombre',
      sortable: true,
    },
    {
      propertyName: 'nombreAcordado',
      header: 'Nombre Acordado',
      sortable: true,
    },
    {
      propertyName: 'fecha',
      header: 'Fecha',
      sortable: true,
      valueGetter: (contrato: Contrato) =>
        new Date(contrato.fecha).toLocaleDateString('es-NI'),
    },
  ];

  displayedColumns = [
    ...this.tableColumns.map((c) => c.propertyName),
    'actions',
  ];

  tableActions: TableAction<Contrato>[] = [
    {
      icon: 'add',
      label: 'Agregar contrato',
      color: 'primary',
      action: () => this.onAddContract(),
    },
  ];

  rowActions: TableRowAction<Contrato>[] = [
    {
      icon: 'edit',
      tooltip: 'Editar',
      color: 'primary',
      action: (row: Contrato) => this.onEditContract(row),
    },
    {
      icon: 'open_in_new',
      tooltip: 'Ir a drive',
      color: 'accent',
      action: (row: Contrato) => this.goToContract(row),
    },
    {
      icon: 'delete',
      tooltip: 'Eliminar',
      color: 'warn',
      action: (row: Contrato) => this.onDeleteContract(row),
    },
  ];

  city$!: Observable<Ciudad>;
  contracts$!: Observable<Contrato[]>;

  constructor(
    private ciudadService: CiudadService,
    private contratoService: ContratoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.city$ = this.ciudadService.getByName('managua');
    const city = await lastValueFrom(this.city$);
    this.contracts$ = this.contratoService.getByCity(city.id);
  }

  async onAddContract() {
    const city = await lastValueFrom(this.city$);
    const dialogRef = this.dialog.open<
      ContratoEditDialogComponent,
      ContratoEditDialogData,
      BaseEditDialogResult<Contrato>
    >(ContratoEditDialogComponent, {
      data: {
        cityId: city.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.snackBar.open('Contrato agregado', 'Cerrar', {
          duration: 2000,
        });
        this.loadData();
      } else if (result?.success === false) {
        this.snackBar.open('Error agregando contrato', 'Cerrar', {
          duration: 2000,
        });
      }
    });
  }

  async onEditContract(row: Contrato) {
    const city = await lastValueFrom(this.city$);
    const dialogRef = this.dialog.open<
      ContratoEditDialogComponent,
      ContratoEditDialogData,
      BaseEditDialogResult<Contrato>
    >(ContratoEditDialogComponent, {
      data: {
        cityId: city.id,
        id: row.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.snackBar.open('Contrato editado', 'Cerrar', {
          duration: 2000,
        });
        this.loadData();
      } else if (result?.success === false) {
        this.snackBar.open('Error editando contrato', 'Cerrar', {
          duration: 2000,
        });
      }
    });
  }

  onDeleteContract(row: Contrato): void {
    const dialogRef = this.dialog.open<
      ConfirmDialogComponent,
      ConfirmDialogData,
      ConfirmDialogResult
    >(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar contrato',
        message: `¿Está seguro que desea eliminar el contrato ${row.id}?`,
        cancelColor: 'primary',
        confirmColor: 'warn',
        cancelIcon: 'cancel',
        confirmIcon: 'warning',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed) {
        this.contratoService.delete(row.id).subscribe((result) => {
          if (result.ok) {
            this.snackBar.open('Contrato eliminado', 'Cerrar', {
              duration: 2000,
            });
            this.loadData();
          } else {
            this.snackBar.open('Error eliminando contrato', 'Cerrar', {
              duration: 2000,
            });
          }
        });
      }
    });
  }

  goToContract(row: Contrato): void {
    window.open(row.url, '_blank');
  }
}
