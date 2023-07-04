import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  EditDialogComponent,
  BaseEditDialogResult,
  BaseEditDialogData,
} from 'src/app/shared/components/edit-dialog/edit-dialog.component';
import ShortUniqueId from 'short-unique-id';
import { Material } from 'src/app/models/Material';
import { MaterialService } from 'src/app/services/material.service';
import { Observable, Subject, map } from 'rxjs';

const uid = new ShortUniqueId({
  length: 5,
});

@Component({
  selector: 'app-material-edit-dialog',
  templateUrl: './material-edit-dialog.component.html',
  styleUrls: ['./material-edit-dialog.component.css'],
})
export class MaterialEditDialogComponent
  extends EditDialogComponent<Material, string>
  implements OnInit
{
  constructor(
    private materialService: MaterialService,
    @Inject(MAT_DIALOG_DATA) private dialogData: BaseEditDialogData<string>,
    dialogRef: MatDialogRef<
      MaterialEditDialogComponent,
      BaseEditDialogResult<Material>
    >
  ) {
    super(dialogData, dialogRef);

    this.service = materialService;
    this.title = 'Nuevo Material';
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.form = new FormGroup(
      {
        nombreMaterial: new FormControl('', [Validators.required]),
        unidadDeMedida: new FormControl('', [Validators.required]),
        descripcion: new FormControl('', [Validators.required]),
        marca: new FormControl('', [Validators.required]),
        pvu: new FormControl<number | null>(null, [
          Validators.required,
          Validators.min(1),
        ]),
      },
      {
        asyncValidators: [this.checkMaterialDuplicity()],
      }
    );
  }

  checkMaterialDuplicity(): AsyncValidatorFn {
    return (): Observable<ValidationErrors | null> => {
      const resource = this.getFormData();
      console.log('The resource is here');
      return this.materialService.checkDuplicity(resource).pipe(
        map((isDupe) => {
          return isDupe ? { isDupe: true } : null;
        })
      );
    };
  }

  override getFormData(): Material {
    const data = <Material>{
      nombreMaterial: this.form.get('nombreMaterial')?.value,
      unidadDeMedida: this.form.get('unidadDeMedida')?.value,
      descripcion: this.form.get('descripcion')?.value,
      marca: this.form.get('marca')?.value,
      pvu: +this.form.get('pvu')?.value,
    };

    if (this.data?.id) {
      data.idMaterial = this.data.id;
    } else {
      data.idMaterial = uid();
    }

    return data;
  }

  override getId(model: Material): string {
    return model.idMaterial;
  }

  override updateTitle(material: Material): void {
    this.title = `Editar cliente - ${material.nombreMaterial}`;
  }
}
