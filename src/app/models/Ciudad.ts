import { Almacen } from './Almacen';
import { Cliente } from './Cliente';
import { Proforma } from './Proforma';
import { Proveedor } from './Proveedor';

export interface Ciudad {
  id: number;
  name: string;

  almacenes?: Almacen[];
  proveedores?: Proveedor[];
  clientes?: Cliente[];
  proformas?: Proforma[];
}
