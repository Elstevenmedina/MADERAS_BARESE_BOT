import { type HistoryMovement, type HistoryMovementB } from './products'

export interface PopMaterial {
  Codigo: string
  Descripcion: string
  TipoProducto: string
  Cantidad: string
  CostoFOB: number
  CostoFOBSB: number
  CostoSB: number
  PrecioVentaSB: number
  PrecioGranMayor: number
  PrecioMayor: number
  PrecioDetal: number
  HistorialMovimiento: HistoryMovement[]
  HistorialMovimientoB: HistoryMovementB[]
}
