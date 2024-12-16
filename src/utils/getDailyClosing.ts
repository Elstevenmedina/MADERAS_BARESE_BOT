import deliveryNotesModel from '../models/deliveryNote'
import paymentclientsModel from '../models/paymentclients'
import returnNotesModel from '../models/returnNotes'
import { getDate, getDateFormatted } from '../moment'

const returnFormatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

interface ReturnValueDailyClosing {
  amountSold: string
  amountCollected: string
  accountsCollect: string
  refundAmount: string
}

export const getDailyClosing = async (): Promise<ReturnValueDailyClosing> => {
  const date = getDate()
  const dateFormatted = getDateFormatted()
  const deliveryNotes = await deliveryNotesModel.find({ date:dateFormatted }).select('totalAmount')
  const allDeliveryNotes = await deliveryNotesModel.find({ status:'Por cobrar' }).select('balance')
  
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  
  let paymentNotes = await paymentclientsModel.find({
    createdAt: { $gte: startOfDay, $lte: endOfDay }
  })

  let refundNotes = await returnNotesModel.find({
    createdAt: { $gte: startOfDay, $lte: endOfDay }
  })

  let amountSold = 0
  let amountCollected = 0
  let accountsCollect = 0
  let refundAmount = 0

  for (const deliveryNote of deliveryNotes) {
    amountSold = +(amountSold + deliveryNote.totalAmount).toFixed(2)
  }

  for (const deliveryNote of allDeliveryNotes) {
    accountsCollect = +(accountsCollect + deliveryNote.balance).toFixed(2)
  }

  for (const note of paymentNotes) {
    amountCollected = +(amountCollected + note.totalAmount).toFixed(2)
  }

  for(const note of refundNotes) {
    refundAmount = +(refundAmount + note.totalAmount).toFixed(2)
  }



  const dailyClosing = {
    amountSold: returnFormatUSD(amountSold),
    amountCollected: returnFormatUSD(amountCollected),
    accountsCollect: returnFormatUSD(accountsCollect),
    refundAmount: returnFormatUSD(refundAmount),
  }


  return dailyClosing
}
