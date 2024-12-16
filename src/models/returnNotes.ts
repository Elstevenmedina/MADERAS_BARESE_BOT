import mongoose, { Schema } from 'mongoose'

const returnNotes = new Schema({
    createdAt: { type: Date, required: true },
    totalAmount : { type: Number, required: true },
})

const returnNotesModel = mongoose.model('returnnotes', returnNotes)

export default returnNotesModel
