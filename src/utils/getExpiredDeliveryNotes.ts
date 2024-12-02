import { type DeliveryNoteDebt } from '../interfaces'
import DeliveryNoteModel from '../models/deliveryNote'

const parseDateString = (dateString: string) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
}


export const getExpiredDeliveryNotes = async (): Promise<DeliveryNoteDebt[]> => {
  const deliveryNotes = await DeliveryNoteModel.find({ status: 'Por cobrar' }).sort({ number: -1 })
  
  let totalNet: number = 0
  let totalBalance: number = 0
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deliveryNotesFormatted = deliveryNotes.filter((note) => {
    const dueDate = parseDateString(note.dueDate);
    if(dueDate <= today){
        totalBalance = +(totalBalance + note.balance).toFixed(2)
        return true
    }
  }).map((note) => {
    totalNet = totalNet + note.totalAmount
    totalBalance = totalBalance + note.balance
    return {
      _idSeller: note._idSeller,
      Cliente: note.client,
      Vendedor: note.seller,
      Neto: note.totalAmount,
      Saldo: note.balance,
      CantidadTotal: note.totalQuantity
    }
  })

  return deliveryNotesFormatted
}
