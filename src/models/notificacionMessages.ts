import mongoose, { Schema } from 'mongoose'
import { type DeliveryNote } from '../interfaces'

const notificationMessages = new Schema({
    status: { type: String, required: true },
    message: { type: String, required: true },
})

const NotificationMessagesModel = mongoose.model('notificationmovements', notificationMessages)

export default NotificationMessagesModel
