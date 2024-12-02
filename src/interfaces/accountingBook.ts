interface Days {
  Timestamp: number
  Fecha: string
  Numero: string
  Cliente: string
  Tipo: string
  Ingreso: number
  Egreso: number
  Saldo: number
}

export interface AccountingBook {
  Anio: number
  Mes: string
  NumeroMes: number
  TotalIngreso: number
  TotalEgreso: number
  TotalGeneral: number
  dia: Days[]
}
