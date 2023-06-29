import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialService } from 'src/app/services/material.service';
import {
  EditDialogComponent,
  BaseEditDialogData,
  BaseEditDialogResult,
} from 'src/app/shared/components/edit-dialog/edit-dialog.component';
import ShortUniqueId from 'short-unique-id';
import { Proveedor } from 'src/app/models/Proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';

export interface ProveedorEditDialogData extends BaseEditDialogData<string> {
  ciudadId: number;
}

const uid = new ShortUniqueId({
  length: 5,
});

@Component({
  selector: 'app-proveedor-edit-dialog',
  templateUrl: './proveedor-edit-dialog.component.html',
  styleUrls: ['./proveedor-edit-dialog.component.css'],
})
export class ProveedorEditDialogComponent
  extends EditDialogComponent<Proveedor, string>
  implements OnInit
{
  constructor(
    proveedorService: ProveedorService,
    private materialService: MaterialService,
    @Inject(MAT_DIALOG_DATA) private dialogData: ProveedorEditDialogData,
    dialogRef: MatDialogRef<
      ProveedorEditDialogComponent,
      BaseEditDialogResult<Proveedor>
    >
  ) {
    super(dialogData, dialogRef);

    this.service = proveedorService;
    this.title = 'Nuevo proveedor';

    this.form = new FormGroup({
      nombreProveedor: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override getFormData(): Proveedor {
    const data = <Proveedor>{
      ciudadId: this.dialogData.ciudadId,
      nombreProveedor: this.form.get('nombreProveedor')?.value,
      direccion: this.form.get('direccion')?.value,
      telefono: this.form.get('telefono')?.value,
      correo: this.form.get('correo')?.value,
    };

    if (this.data.id) {
      data.idproveedor = this.data.id;
    } else {
      data.idproveedor = uid();
    }

    return data;
  }

  override getId(model: Proveedor): string {
    return model.idproveedor;
  }

  override updateTitle(data: Proveedor): void {
    this.title = `Editar proveedor con id "${data.idproveedor}"`;
  }
}
