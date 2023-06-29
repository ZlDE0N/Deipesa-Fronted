import { Almacen } from './Almacen';
import { Proveedor } from './Proveedor';

export interface Ciudad {
  id: number;
  name: string;

  almacenes: Almacen[];
  proveedores: Proveedor[];
}
