import { Almacen } from './Almacen';
import { Cliente } from './Cliente';
import { Proveedor } from './Proveedor';

export interface Ciudad {
  id: number;
  name: string;

  almacenes?: Almacen[];
  proveedores?: Proveedor[];
  clientes?: Cliente[];
}
