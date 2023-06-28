export interface DetalleOrdenCompra {
  idDetalleOrdenCompra: string;
  idOrdenCompra?: string;
  idMaterial?: string;
  fechaFabricacion?: Date;
  cantidad?: string;
  pvu?: number;
  subTotal?: number;
}
