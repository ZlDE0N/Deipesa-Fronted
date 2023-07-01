import { Ciudad } from './Ciudad';

export interface Proforma {
  id: number;
  ciudadId: number;
  nombre: string;
  url: string;
  fecha: string;
  ciudad?: Ciudad;
}
