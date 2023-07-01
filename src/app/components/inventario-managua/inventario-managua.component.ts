import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/models/Material';
import {
  TableAction,
  TableColumn,
  TableRowAction,
} from 'src/app/shared/components/paginated-table/paginated-table.component';
import { Observable, pipe, map, lastValueFrom } from 'rxjs';
import { Almacen } from 'src/app/models/Almacen';
import { AlmacenService } from 'src/app/services/almacen.service';
import { Inventario } from 'src/app/models/Inventario';
import { MatDialog } from '@angular/material/dialog';
import {
  InventoryEditDialogComponent,
  InventoryEditDialogData,
} from '../inventory-edit-dialog/inventory-edit-dialog.component';
import { BaseEditDialogResult } from 'src/app/shared/components/edit-dialog/edit-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
  ConfirmDialogResult,
} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { InventarioService } from 'src/app/services/inventario.service';
import { Ciudad } from 'src/app/models/Ciudad';
import { CiudadService } from 'src/app/services/ciudad.service';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-inventario-managua',
  templateUrl: './inventario-managua.component.html',
  styleUrls: ['./inventario-managua.component.css'],
})
export class InventarioManaguaComponent implements OnInit {
  tableColumns: TableColumn<Inventario>[] = [
    {
      propertyName: 'idInventario',
      header: 'ID',
      sortable: true,
    },
    {
      propertyName: 'materialName',
      header: 'Material',
      sortable: true,
      valueGetter: (row: Inventario) =>
        row.idMaterialNavigation?.nombreMaterial ?? 'N/A',
    },
    {
      propertyName: 'cantidad',
      header: 'Cantidad',
      sortable: true,
    },
    {
      propertyName: 'tipoInventario',
      header: 'Tipo de inventario',
      sortable: true,
    },
    {
      propertyName: 'stockMinimo',
      header: 'Stock mínimo',
      sortable: true,
    },
    {
      propertyName: 'pvu',
      header: 'PVU',
      sortable: true,
      valueGetter: (row: Inventario) =>
        row.idMaterialNavigation?.pvu?.toLocaleString('es-NI', {
          style: 'currency',
          currency: 'NIO',
          maximumFractionDigits: 2,
        }) ?? 'N/A',
    },
  ];

  tableActions: TableAction<Inventario>[] = [
    {
      icon: 'download',
      label: 'Generar reporte',
      color: 'accent',
      action: (rows: Inventario[]) => this.getReport(rows),
    },
  ];

  displayedColumns: string[] = this.tableColumns.map((c) => c.propertyName);

  warehouse$!: Observable<Almacen>;
  inventories$!: Observable<Inventario[]>;
  city$!: Observable<Ciudad>;

  constructor(
    private almacenService: AlmacenService,
    private inventoryService: InventarioService,
    private reporteService: ReporteService,
    private citiesService: CiudadService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.city$ = this.citiesService.getByName('Managua');
    const city = await lastValueFrom(this.city$);
    this.warehouse$ = this.almacenService.getByLocation(city.id);
    this.inventories$ = this.warehouse$.pipe(map((w) => w.inventarios));
  }

  async onCreateMaterial() {
    const warehouse = await lastValueFrom(this.warehouse$);

    const dialogRef = this.dialog.open<
      InventoryEditDialogComponent,
      InventoryEditDialogData,
      BaseEditDialogResult<Inventario>
    >(InventoryEditDialogComponent, {
      data: {
        idAlmacen: warehouse.idAlmacen,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.loadData();
        this.snackBar.open('Material agregado', 'Cerrar', {
          duration: 3000,
        });
      } else if (result?.success === false) {
        this.snackBar.open('No se pudo agregar el material', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  async onEditMaterial(inventory: Inventario) {
    const warehouse = await lastValueFrom(this.warehouse$);

    const dialogRef = this.dialog.open<
      InventoryEditDialogComponent,
      InventoryEditDialogData,
      BaseEditDialogResult<Inventario>
    >(InventoryEditDialogComponent, {
      data: {
        idAlmacen: warehouse.idAlmacen,
        id: inventory.idInventario,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.loadData();
        this.snackBar.open('Material actualizado', 'Cerrar', {
          duration: 3000,
        });
      } else if (result?.success === false) {
        this.snackBar.open('No se pudo actualizar el material', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  async onDeleteInventory(inventory: Inventario) {
    const dialogRef = this.dialog.open<
      ConfirmDialogComponent,
      ConfirmDialogData,
      ConfirmDialogResult
    >(ConfirmDialogComponent, {
      data: {
        title: `Eliminar material ${inventory.idMaterialNavigation?.nombreMaterial} de inventario`,
        message: `¿Está seguro que desea eliminar el material ${inventory.idMaterialNavigation?.nombreMaterial}?`,
        cancelColor: 'warn',
        confirmColor: 'primary',
        cancelIcon: 'cancel',
        confirmIcon: 'warning',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed) {
        this.inventoryService
          .delete(inventory.idInventario)
          .subscribe((result) => {
            if (result.ok) {
              this.loadData();
              this.snackBar.open('Material eliminado con exito', 'Cerrar', {
                duration: 3000,
              });
            } else {
              this.snackBar.open(
                'No se ha podido eliminar el material',
                'Cerrar',
                {
                  duration: 3000,
                }
              );
            }
          });
      }
    });
  }

  async getReport(rows: Inventario[]) {
    const city = await lastValueFrom(this.city$);
    this.reporteService
      .getInventoryReportByCityId(city.id)
      .subscribe((data) => {
        const blob = new Blob([data], { type: 'application/pdf' });

        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `Inventario de ${city.name}.pdf`;
        link.click();
      });
  }
}
