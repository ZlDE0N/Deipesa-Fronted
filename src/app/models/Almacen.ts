import { Ciudad } from './Ciudad';
import { Inventario } from './Inventario';

export interface Almacen {
  idAlmacen: string;
  ciudadId: number;
  nombreAlmacen?: string;
  ubicacion?: string;
  telefono?: string;
  capacidad?: string;
  inventarios: Inventario[];

  ciudad?: Ciudad;
}
