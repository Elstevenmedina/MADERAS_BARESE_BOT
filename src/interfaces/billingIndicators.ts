interface Months {
  Codigo: string
  Mes: string
  Anio: string
  NumeroMes: string
  MontoGeneral: string
  UtlidadesGeneral: string
}

export interface BillingIndicators {
  _id: string
  MontoGeneral: string
  UtlidadesGeneral: string
  FacturadoGranMayor: string
  FacturadoMayor: string
  FacturadoDetal: string
  Meses: Months[]
}
