import { Component, OnInit } from '@angular/core';
import { Ciudad } from 'src/app/models/Ciudad';
import { Cliente } from 'src/app/models/Cliente';
import {
  TableAction,
  TableColumn,
  TableRowAction,
} from 'src/app/shared/components/paginated-table/paginated-table.component';
import { Observable, lastValueFrom } from 'rxjs';
import { CiudadService } from 'src/app/services/ciudad.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ContactEditDialogComponent,
  ContactEditDialogData,
} from '../contact-edit-dialog/contact-edit-dialog.component';
import { BaseEditDialogResult } from 'src/app/shared/components/edit-dialog/edit-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
  ConfirmDialogResult,
} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-agenda-contactos-managua',
  templateUrl: './agenda-contactos-managua.component.html',
  styleUrls: ['./agenda-contactos-managua.component.css'],
})
export class AgendaContactosManaguaComponent implements OnInit {
  tableColumns: TableColumn<Cliente>[] = [
    {
      propertyName: 'idCliente',
      header: 'ID',
      sortable: true,
    },
    {
      propertyName: 'cedula',
      header: 'Cedula',
      sortable: true,
    },
    {
      propertyName: 'nombres',
      header: 'Nombres',
      sortable: true,
    },
    {
      propertyName: 'apellidos',
      header: 'Apellidos',
      sortable: true,
    },
    {
      propertyName: 'telefono',
      header: 'Telefono',
      sortable: true,
    },
    {
      propertyName: 'direccion',
      header: 'Direccion',
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

  tableActions: TableAction<Cliente>[] = [
    {
      icon: 'add',
      label: 'Agregar contacto',
      color: 'primary',
      action: () => this.onAddContact(),
    },
  ];

  rowActions: TableRowAction<Cliente>[] = [
    {
      icon: 'edit',
      tooltip: 'Editar',
      color: 'primary',
      action: (cliente: Cliente) => this.onEditContact(cliente),
    },
    {
      icon: 'delete',
      tooltip: 'Eliminar',
      color: 'warn',
      action: (cliente: Cliente) => this.onDeleteContact(cliente),
    },
  ];

  city$!: Observable<Ciudad>;
  contacts$!: Observable<Cliente[]>;

  constructor(
    private ciudadService: CiudadService,
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.city$ = this.ciudadService.getByName('managua');
    const city = await lastValueFrom(this.city$);
    this.contacts$ = this.clienteService.getByCity(city.id);
  }

  async onAddContact() {
    const city = await lastValueFrom(this.city$);
    const dialogRef = this.dialog.open<
      ContactEditDialogComponent,
      ContactEditDialogData,
      BaseEditDialogResult<Cliente>
    >(ContactEditDialogComponent, {
      data: {
        cityId: city.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.snackBar.open('Contacto agregado exitosamente', 'Ok', {
          duration: 2000,
        });
        this.loadData();
      } else if (result?.success === false) {
        this.snackBar.open('Error al agregar contacto', 'Ok', {
          duration: 2000,
        });
      }
    });
  }

  async onEditContact(cliente: Cliente) {
    const city = await lastValueFrom(this.city$);
    const dialogRef = this.dialog.open<
      ContactEditDialogComponent,
      ContactEditDialogData,
      BaseEditDialogResult<Cliente>
    >(ContactEditDialogComponent, {
      data: {
        cityId: city.id,
        id: cliente.idCliente,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.snackBar.open('Contacto actualizado exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.loadData();
      } else if (result?.success === false) {
        this.snackBar.open('Error al actualizar contacto', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  onDeleteContact(cliente: Cliente): void {
    const dialogRef = this.dialog.open<
      ConfirmDialogComponent,
      ConfirmDialogData,
      ConfirmDialogResult
    >(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar contacto',
        message: `¿Está seguro que desea eliminar el contacto ${cliente.nombres} ${cliente.apellidos}?`,
        cancelColor: 'primary',
        cancelIcon: 'cancel',
        confirmColor: 'warn',
        confirmIcon: 'warning',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed) {
        this.clienteService.delete(cliente.idCliente).subscribe((response) => {
          if (response.ok) {
            this.snackBar.open('Contacto eliminado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.loadData();
          } else {
            this.snackBar.open('Error al eliminar contacto', 'Cerrar', {
              duration: 3000,
            });
          }
        });
      }
    });
  }
}
