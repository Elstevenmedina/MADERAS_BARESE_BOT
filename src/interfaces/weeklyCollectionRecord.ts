export interface NotesCollection {
  Cliente: string
  MontoCancelado: number
  Neto: number
  Numero: string
  Saldo: string
}

export interface Pays {
  Comentario: string
  Fecha: string
  Monto: number
}

export interface WeeklyCollectionRecord {
  Almacen: string
  Fecha: string
  Notas: NotesCollection[]
  Numero: number
  PagadoTotal: number
  Pagos: Pays[]
  Timestamp: string
}
