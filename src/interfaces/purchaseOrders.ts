export interface ProductsPurchase {
  Cantidad: string
  Cantidad2: string
  Codigo: string
  Descripcion: string
  PrecioTotal: string
  PrecioTotal2: string
  PrecioUnidad: string
}

export interface PurchaseOrders {
  _idCliente: string
  _idUserClient: string
  _idVendedor: string
  CantidadTotal: number
  Cliente: string
  Estado: string
  Fecha: string
  Numero: string
  PrecioTotal: number
  Productos: ProductsPurchase[]
  Timestamp: number
  Vendedor: string
}
