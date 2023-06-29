import { Inventario } from './Inventario';

export interface Almacen {
  idAlmacen: string;
  nombreAlmacen?: string;
  ubicacion?: string;
  telefono?: string;
  capacidad?: string;
  inventarios: Inventario[];
}
