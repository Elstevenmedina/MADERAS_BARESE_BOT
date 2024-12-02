import mongoose, { Schema } from 'mongoose'
import { type PaymentNote } from '../interfaces'

const clientsSchema = new Schema({
    enterprise: { type: String, required: true },
    mainPhoneNumber: { type: String, required: true },
})

const clientsModel = mongoose.model<PaymentNote>('clients', clientsSchema)

export default clientsModel
