import deliveryNotesModel from '../models/deliveryNote'
import DeliveryNoteModel from '../models/deliveryNote'
import paymentclientsModel from '../models/paymentclients'
import PaymentNoteModel from '../models/paymentclients'
import { getDate, getDateFormatted } from '../moment'

const returnFormatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

interface ReturnValueDailyClosing {
  amountSold: string
  amountCollected: string
  accountsCollect: string
}

export const getDailyClosing = async (): Promise<ReturnValueDailyClosing> => {
  const date = getDate()
  const dateFormatted = getDateFormatted()
  const deliveryNotes = await deliveryNotesModel.find({ date:dateFormatted }).select('totalAmount')
  const allDeliveryNotes = await deliveryNotesModel.find({ status:'Por cobrar' }).select('balance')
  let paymentNotes = await paymentclientsModel.find({status: {$ne:'Anulada'}})
  paymentNotes = paymentNotes.filter((note) => note.createdAt.toString().includes(date))


  let amountSold = 0
  let amountCollected = 0
  let accountsCollect = 0

  for (const deliveryNote of deliveryNotes) {
    amountSold = +(amountSold + deliveryNote.totalAmount).toFixed(2)
  }

  for (const deliveryNote of allDeliveryNotes) {
    accountsCollect = +(accountsCollect + deliveryNote.balance).toFixed(2)
  }

  for (const note of paymentNotes) {
    amountCollected = +(accountsCollect + note.totalAmount).toFixed(2)
  }



  const dailyClosing = {
    amountSold: returnFormatUSD(amountSold),
    amountCollected: returnFormatUSD(amountCollected),
    accountsCollect: returnFormatUSD(accountsCollect),
  }

  return dailyClosing
}
