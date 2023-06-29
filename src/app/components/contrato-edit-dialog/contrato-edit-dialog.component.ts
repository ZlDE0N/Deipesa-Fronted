import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  EditDialogComponent,
  BaseEditDialogResult,
  BaseEditDialogData,
} from 'src/app/shared/components/edit-dialog/edit-dialog.component';
import ShortUniqueId from 'short-unique-id';
import { Contrato } from 'src/app/models/Contrato';
import { ContratoService } from 'src/app/services/contrato.service';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

export interface ContratoEditDialogData extends BaseEditDialogData<number> {
  cityId: number;
}

const uid = new ShortUniqueId({
  length: 5,
});

@Component({
  selector: 'app-contrato-edit-dialog',
  templateUrl: './contrato-edit-dialog.component.html',
  styleUrls: ['./contrato-edit-dialog.component.css'],
})
export class ContratoEditDialogComponent
  extends EditDialogComponent<Contrato, number>
  implements OnInit
{
  clients$!: Observable<Cliente[]>;

  constructor(
    contratoService: ContratoService,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) private dialogData: ContratoEditDialogData,
    dialogRef: MatDialogRef<
      ContratoEditDialogComponent,
      BaseEditDialogResult<Contrato>
    >
  ) {
    super(dialogData, dialogRef);

    this.service = contratoService;
    this.title = 'Nuevo contrato';

    this.form = new FormGroup({
      clienteId: new FormControl('', [Validators.required]),
      nombre: new FormControl('', Validators.required),
      nombreAcordado: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadData();
  }

  loadData() {
    this.clients$ = this.clienteService.getByCity(this.dialogData.cityId);
  }

  override getFormData(): Contrato {
    const data = <Contrato>{
      clienteId: this.form.get('clienteId')?.value,
      nombre: this.form.get('nombre')?.value,
      nombreAcordado: this.form.get('nombreAcordado')?.value,
      fecha: this.form.get('fecha')?.value,
    };

    if (this.data.id) {
      data.id = this.data.id;
    }

    return data;
  }

  override getId(model: Contrato): number {
    return model.id;
  }

  override updateTitle(data: Contrato): void {
    this.title = `Editar contrato con id #${data.id}`;
  }

  getClientDisplay(client: Cliente): string {
    let value = client.nombres ? `${client.nombres} ` : '';
    value += client.apellidos ? `${client.apellidos} ` : '';
    value += client.cedula ? `(${client.cedula})` : '';
    return value || 'N/A';
  }
}
