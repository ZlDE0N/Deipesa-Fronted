import { DetalleOrdenCompra } from './DetalleOrdenCompra';
import { Inventario } from './Inventario';

export interface Material {
  idMaterial: string; // Cambiado a tipo number si idMaterial es un número
  nombreMaterial?: string;
  unidadDeMedida?: string;
  descripcion?: string;
  marca?: string;
  pvu?: number;
  detalleOrdenCompras: DetalleOrdenCompra[];
  inventarios: Inventario[];
}
