import { DetalleOrdenCompra } from './DetalleOrdenCompra';

export interface Material {
  idMaterial: string;
  nombreMaterial?: string;
  unidadDeMedida?: string;
  descripcion?: string;
  marca?: string;
  pvu?: number;
  detalleOrdenCompras: DetalleOrdenCompra[];
}
