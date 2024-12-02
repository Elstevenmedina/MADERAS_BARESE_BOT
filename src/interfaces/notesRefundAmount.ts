export interface ProductsRefundAmount {
  NotaEntrega: string
  Precio: number
}

export interface NotesRefundAmount {
  Celular: string
  Cliente: string
  Comentario: string
  Direccion: string
  Documento: string
  EstadoGeneral: string
  EstadoLibro: string
  Fecha: string
  NotaEntrega: number
  PrecioActualNota: number
  Productos: ProductsRefundAmount[]
  Recibo: number
  Timestamp: number
  Titulo: string
}
