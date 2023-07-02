import { Cliente } from './Cliente';

export interface Contrato {
  id: number;
  clienteId: string;
  nombre: string;
  nombreAcordado: string;
  fecha: string;
  url: string;
  cliente?: Cliente;
}
