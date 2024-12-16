import { CronJob } from 'cron'
import { sendMessage } from '../../initWhatsapp'
import { ManagementWhatsappNumbers } from '../../../enums/ManagementWhatsappNumbers'
import NotificationMessagesModel from '../../../models/notificacionMessages'

export const sendNotificaronMessages = new CronJob('* * * * *', async () => { //3 01 01 21 * * *
    const notificationMessage = await NotificationMessagesModel.findOne({status:'Pendiente'})

    if(!notificationMessage) return
    await notificationMessage.updateOne({status: 'Enviado'})
    sendMessage(ManagementWhatsappNumbers.Management1, notificationMessage.message)
})
