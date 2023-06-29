import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { Crud } from '../../services/Crud';

export interface BaseEditDialogData<IdType = number> {
  id?: IdType;
}

export interface BaseEditDialogResult<Model> {
  success: boolean;
  resource: Model;
}

@Component({ template: '' })
export abstract class EditDialogComponent<Model, IdType = number>
  extends FormComponent
  implements OnInit
{
  service!: Crud<Model, IdType>;
  title!: string;
  isBusy = false;
  resource?: Model;

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: BaseEditDialogData<IdType>,
    protected dialogRef: MatDialogRef<
      EditDialogComponent<Model, IdType>,
      BaseEditDialogResult<Model>
    >
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.data?.id) {
      this.getResource(this.data.id);
    }
  }

  getResource(id: IdType): void {
    this.isBusy = true;
    this.service.getById(id).subscribe({
      next: (resource) => {
        this.resource = resource;
        this.form.patchValue(resource!);
        this.updateTitle(resource);
      },
      error: (error) => {
        console.error(error);
        this.dialogRef.close();
      },
      complete: () => (this.isBusy = false),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const data = this.getFormData();

    if (this.data?.id) {
      this.updateResource(data);
    } else {
      this.createResource(data);
    }
  }

  createResource(data: Model): void {
    this.isBusy = true;
    this.service.create(data).subscribe({
      next: () =>
        this.dialogRef.close({
          success: true,
          resource: data,
        }),
      error: (error) => {
        console.error(error);
        this.dialogRef.close({
          success: false,
          resource: data,
        });
      },
      complete: () => (this.isBusy = false),
    });
  }

  updateResource(data: Model): void {
    this.isBusy = true;
    this.service.update(this.getId(data), data).subscribe({
      next: () =>
        this.dialogRef.close({
          success: true,
          resource: data,
        }),
      error: (error) => {
        console.error(error);
        this.dialogRef.close({
          success: false,
          resource: data,
        });
      },
      complete: () => (this.isBusy = false),
    });
  }

  abstract getFormData(): Model;
  abstract getId(model: Model): IdType;
  abstract updateTitle(data: Model): void;
}
