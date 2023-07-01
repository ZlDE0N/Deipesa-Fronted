import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ciudad } from 'src/app/models/Ciudad';
import { Proforma } from 'src/app/models/Proforma';
import { ProformaService } from 'src/app/services/proforma.service';
import {
  EditDialogComponent,
  BaseEditDialogResult,
  BaseEditDialogData,
} from 'src/app/shared/components/edit-dialog/edit-dialog.component';
import { Observable } from 'rxjs';
import { CiudadService } from 'src/app/services/ciudad.service';

@Component({
  selector: 'app-proforma-edit-dialog',
  templateUrl: './proforma-edit-dialog.component.html',
  styleUrls: ['./proforma-edit-dialog.component.css'],
})
export class ProformaEditDialogComponent
  extends EditDialogComponent<Proforma, number>
  implements OnInit
{
  ciudades$!: Observable<Ciudad[]>;

  constructor(
    proformaService: ProformaService,
    private ciudadService: CiudadService,
    @Inject(MAT_DIALOG_DATA) data: BaseEditDialogData<number>,
    dialogRef: MatDialogRef<
      ProformaEditDialogComponent,
      BaseEditDialogResult<Proforma>
    >
  ) {
    super(data, dialogRef);

    this.service = proformaService;
    this.title = 'Nueva proforma';

    this.form = new FormGroup({
      ciudadId: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(1),
      ]),
      nombre: new FormControl<string>('', Validators.required),
      fecha: new FormControl<string>('', [Validators.required]),
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.ciudades$ = this.ciudadService.getAll();
  }

  override getFormData(): Proforma {
    const data = <Proforma>{
      ciudadId: this.form.get('ciudadId')?.value,
      nombre: this.form.get('nombre')?.value,
      fecha: this.form.get('fecha')?.value,
    };

    if (this.data?.id) {
      data.id = this.data.id;
    }

    return data;
  }

  override getId(model: Proforma): number {
    return model.id;
  }

  override updateTitle(proforma: Proforma): void {
    this.title = `Editar proforma - ${proforma.nombre}`;
  }
}
