import mongoose, { Schema } from 'mongoose'
import { type PaymentNote } from '../interfaces'

const paymentclientsSchema = new Schema({
  number: { type: String, required: true },
  _idClient : { type: String, required: true },
  client: { type: String, required: true },
  totalAmount : { type: Number, required: true },
  subtotal : { type: Number, required: true },
  notes: [{ type: String, required: true }],
  status: { type: String, required: true },
  createdAt: { type: Date, required: true },
})

const paymentclientsModel = mongoose.model('paymentclients', paymentclientsSchema)

export default paymentclientsModel
