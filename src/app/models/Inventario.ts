import { Almacen } from './Almacen';
import { Material } from './Material';

export interface Inventario {
  idInventario: string;
  idAlmacen?: string;
  idMaterial?: string;
  cantidad?: string;
  tipoInventario?: string;
  stockMinimo?: string;
  idAlmacenNavigation?: Almacen;
  idMaterialNavigation?: Material;
}
