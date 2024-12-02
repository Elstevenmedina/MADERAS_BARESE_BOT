interface Documents {
  TipoDocumento: string
  NumeroDocumento: string
  Fecha: string
  FechaVencimiento: string
  Debe: number
  Haber: number
  Saldo: number
}

export interface AccountStatus {
  Cliente: string
  _idCliente: string
  RIF: string
  DebeTotal: number
  HaberTotal: number
  SaldoTotal: number
  Items: Documents[]
}
