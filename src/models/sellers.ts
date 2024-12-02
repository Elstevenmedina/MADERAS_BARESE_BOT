import mongoose, { Schema } from 'mongoose'
import { type PaymentNote } from '../interfaces'

const sellersSchema = new Schema({
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
})

const sellersModel = mongoose.model('sellers', sellersSchema)

export default sellersModel
