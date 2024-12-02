export interface ProductsRefund {
  Cantidad: string
  Codigo: string
  Valor: number
}

export interface NoteRefund {
  CantidadTotal: number
  Cliente: string
  Comentario: string
  ComentarioAnualcion: string
  Direccion: string
  Estado: string
  Fecha: string
  NotaEntrega: number
  Numero: number
  PrecioActualNota: number
  Productos: ProductsRefund[]
  RIF: string
  Telefono: string
  Timestamp: number
  ValorTotal: number
}
