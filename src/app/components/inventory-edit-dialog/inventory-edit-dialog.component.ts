import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Inventario } from 'src/app/models/Inventario';
import { Material } from 'src/app/models/Material';
import { InventarioService } from 'src/app/services/inventario.service';
import { MaterialService } from 'src/app/services/material.service';
import {
  EditDialogComponent,
  BaseEditDialogData,
  BaseEditDialogResult,
} from 'src/app/shared/components/edit-dialog/edit-dialog.component';

export interface InventoryEditDialogData extends BaseEditDialogData<string> {
  idAlmacen: string;
}
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({
  length: 5,
});

@Component({
  selector: 'app-inventory-edit-dialog',
  templateUrl: './inventory-edit-dialog.component.html',
  styleUrls: ['./inventory-edit-dialog.component.css'],
})
export class InventoryEditDialogComponent
  extends EditDialogComponent<Inventario, string>
  implements OnInit
{
  materials$!: Observable<Material[]>;

  constructor(
    inventoryService: InventarioService,
    private materialService: MaterialService,
    @Inject(MAT_DIALOG_DATA) private dialogData: InventoryEditDialogData,
    dialogRef: MatDialogRef<
      InventoryEditDialogComponent,
      BaseEditDialogResult<Inventario>
    >
  ) {
    super(dialogData, dialogRef);

    this.service = inventoryService;
    this.title = 'Nuevo material en inventario';

    this.form = new FormGroup({
      idMaterial: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(1),
      ]),
      cantidad: new FormControl('', Validators.required),
      tipoInventario: new FormControl('', Validators.required),
      stockMinimo: new FormControl('', Validators.required),
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.materials$ = this.materialService.getAll();
  }

  override getFormData(): Inventario {
    const data = <Inventario>{
      idAlmacen: this.dialogData.idAlmacen,
      idMaterial: this.form.get('idMaterial')?.value,
      cantidad: this.form.get('cantidad')?.value,
      tipoInventario: this.form.get('tipoInventario')?.value,
      stockMinimo: this.form.get('stockMinimo')?.value,
    };

    if (this.data.id) {
      data.idInventario = this.data.id;
    } else {
      data.idInventario = uid();
    }

    return data;
  }

  override getId(model: Inventario): string {
    return model.idInventario;
  }

  override updateTitle(data: Inventario): void {
    this.title = `Editar material en inventario con id ${data.idInventario}`;
  }
}
