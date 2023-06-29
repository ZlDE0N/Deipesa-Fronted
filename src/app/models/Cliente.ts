import { Ciudad } from './Ciudad';
import { Contrato } from './Contrato';

export interface Cliente {
  idCliente: string;
  ciudadId: number;
  cedula?: string;
  nombres?: string;
  apellidos?: string;
  telefono?: string;
  direccion?: string;
  correo?: string;
  ciudad?: Ciudad;
  contratos?: Contrato[];
}
