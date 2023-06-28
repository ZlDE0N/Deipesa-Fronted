import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventario-managua',
  templateUrl: './inventario-managua.component.html',
  styleUrls: ['./inventario-managua.component.css'],
})
export class InventarioManaguaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  dataSource = [];

  displayedColumns: string[] = [];

  onCreateMaterial() {
    // Lógica para crear un nuevo material
  }

  onEdit(materialId: number) {
    // Lógica para editar el material con el ID proporcionado
  }

  onDelete(materialId: number) {
    // Lógica para eliminar el material con el ID proporcionado
  }
}
