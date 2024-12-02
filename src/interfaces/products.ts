export interface Vehicles {
  Desde: number
  Hasta: number
  Marca: string
  Modelo: string
  TipoVehiculo: string
}

export interface HistoryMovement {
  CantidadAnterior: number
  CantidadMovida: number
  CantidadNueva: number
  Comentario: string
  FechaMovimiento: string
  Timestamp: number
  TipoMovimiento: string
}

export interface HistoryMovementB {
  CantidadAnterior: number
  CantidadMovida: number
  CantidadNueva: number
  Comentario: string
  FechaMovimiento: string
  Timestamp: number
  TipoMovimiento: string
}

export interface Product {
  Almacen: string
  Alto: number
  Ancho: number
  BackOrder: number
  Cantidad: number
  CantidadImportada: number
  CantidadProduccion: number
  CantidadTransito: number
  CantidadVendida: number
  Codigo: string
  CodigoG: string
  Costo: number
  CostoFOB: number
  CostoFOBSB: number
  CostoSB: number
  Descripcion: string
  Familia: string
  HistorialMovimiento: HistoryMovement[]
  HistorialMovimientoB: HistoryMovementB[]
  Largo: number
  Nombre: string
  Peso: number
  Posicion: string
  PrecioDetal: number
  PrecioGranMayor: number
  PrecioMayor: number
  PrecioVentaSB: number
  Proveedor: string
  TipoProducto: string
  Unidades: number
  Vehiculos: Vehicles[]
}
