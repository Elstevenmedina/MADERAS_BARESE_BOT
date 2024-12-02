export interface ShockAbsorberMonthly {
  Codigo: string
  Mes: string
  Anio: string
  NumeroMes: string
  MontoGeneral: string | number
  Cantidad: string | number
}

export interface BasesMonthly {
  Codigo: string
  Mes: string
  Anio: string
  NumeroMes: string
  MontoGeneral: string | number
  Cantidad: string | number
}
export interface BootsMonthly {
  Codigo: string
  Mes: string
  Anio: string
  NumeroMes: string
  MontoGeneral: string | number
  Cantidad: string | number
}

export interface ProductIndicators {
  AmortiguadoresFacturados: string
  BasesFacturados: string
  BootFacturados: string
  AmortiguadoresCantidad: string
  BasesCantidad: string
  BootCantidad: string
  MesesAmortiguadores: ShockAbsorberMonthly[]
  MesesBases: BasesMonthly[]
  MesesBoots: BootsMonthly[]
}
