import mongoose, { Schema } from 'mongoose'
import { type DeliveryNote } from '../interfaces'

const deliveryNotes = new Schema<DeliveryNote>({
  dueDate: { type: String, required: true },
  _idSeller: { type: String, required: true },
  _idClient: { type: String, required: true },
  seller: { type: String, required: true },
  client: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  balance: { type: Number, required: true },
  totalQuantity: { type: Number, required: true },
  status: { type: String, required: true },
  phoneNumber: { type: String, required: true }
})

const deliveryNotesModel = mongoose.model('deliverynotes', deliveryNotes)

export default deliveryNotesModel
