import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventario-managua',
  templateUrl: './inventario-managua.component.html',
  styleUrls: ['./inventario-managua.component.css']
})
export class InventarioManaguaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  dataSource = [
    {
      idMaterial: 1,
      nombreMaterial: 'Material 1',
      unidadDeMedida: 'Unidad 1',
      descripcion: 'Descripción 1',
      marca: 'Marca 1',
      pvu: 10
    },
    {
      idMaterial: 2,
      nombreMaterial: 'Material 2',
      unidadDeMedida: 'Unidad 2',
      descripcion: 'Descripción 2',
      marca: 'Marca 2',
      pvu: 20
    },
    // Agrega más objetos de datos según sea necesario
  ];

  displayedColumns: string[] = ['id', 'name', 'measurementUnit', 'description', 'brand', 'pvu', 'actions'];

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
