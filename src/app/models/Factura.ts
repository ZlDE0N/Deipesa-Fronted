export interface Factura {
  idFactura: string;
  idCliente?: string;
  fechaFactura?: Date;
  impuesto?: number;
  descuento?: number;
  total?: number;
}
