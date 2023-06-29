import { Ciudad } from './Ciudad';

export interface Proveedor {
  idproveedor: string;
  ciudadId: number;
  nombreProveedor?: string;
  direccion?: string;
  telefono?: string;
  correo?: string;

  ciudad?: Ciudad;
}
