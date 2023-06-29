import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  EditDialogComponent,
  BaseEditDialogResult,
  BaseEditDialogData,
} from 'src/app/shared/components/edit-dialog/edit-dialog.component';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import ShortUniqueId from 'short-unique-id';

export interface ContactEditDialogData extends BaseEditDialogData<string> {
  cityId: number;
}

const uid = new ShortUniqueId({
  length: 5,
});

@Component({
  selector: 'app-contact-edit-dialog',
  templateUrl: './contact-edit-dialog.component.html',
  styleUrls: ['./contact-edit-dialog.component.css'],
})
export class ContactEditDialogComponent
  extends EditDialogComponent<Cliente, string>
  implements OnInit
{
  constructor(
    clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) private dialogData: ContactEditDialogData,
    dialogRef: MatDialogRef<
      ContactEditDialogComponent,
      BaseEditDialogResult<Cliente>
    >
  ) {
    super(dialogData, dialogRef);

    this.service = clienteService;
    this.title = 'Nuevo contrato';

    this.form = new FormGroup({
      cedula: new FormControl('', [
        Validators.required,
        Validators.pattern(/\d{3}-\d{6}-\d{4}[A-Z]/),
      ]),
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  override getFormData(): Cliente {
    const data = <Cliente>{
      ciudadId: this.dialogData.cityId,
      cedula: this.form.get('cedula')?.value,
      nombres: this.form.get('nombres')?.value,
      apellidos: this.form.get('apellidos')?.value,
      telefono: this.form.get('telefono')?.value,
      direccion: this.form.get('direccion')?.value,
      correo: this.form.get('correo')?.value,
    };

    if (this.data.id) {
      data.idCliente = this.data.id;
    } else {
      data.idCliente = uid();
    }

    return data;
  }

  override getId(model: Cliente): string {
    return model.idCliente;
  }

  override updateTitle(client: Cliente): void {
    this.title = `Editar cliente - ${this.getClientDisplay(client)}`;
  }

  getClientDisplay(client: Cliente): string {
    let value = client.nombres ? `${client.nombres} ` : '';
    value += client.apellidos ? `${client.apellidos} ` : '';
    value += client.cedula ? `(${client.cedula})` : '';
    return value || 'N/A';
  }
}
