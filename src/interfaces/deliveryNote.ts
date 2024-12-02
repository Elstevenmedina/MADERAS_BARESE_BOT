

export interface DeliveryNote {
  dueDate: string,
  _idSeller: string,
  _idClient: string,
  seller: string,
  client: string,
  totalAmount:number
  totalQuantity:number
  balance:number
  status:string
  phoneNumber:string

}
