import { CronJob } from 'cron'
import { sendMessage } from '../initWhatsapp'
import { getExpiredDeliveryNotes } from '../../utils/getExpiredDeliveryNotes'
import { getClientDebt } from '../../utils/getClientDebt'

export const sendMessagesClients = new CronJob('01 01 13 * * mon', async () => { //0 0 13 * * mon - '01 01 13 * * mon'
  try {
    console.log('Sending messages to clients')
    const notes = await getExpiredDeliveryNotes()
    const clientDebt = await getClientDebt(notes)
    const contentMessage: string = '*Mensaje automático*\n\n *Hola, estimado cliente, le saludamos de Maderas Barese y le hacemos informe de su estado de cuenta:*\n\n'
    for (const client of clientDebt) {
      let message: string = contentMessage
      const quantity: number = client.CantidadNotas
      const total: string = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+client.Neto.toFixed(2))
      const balance: string = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+client.Saldo.toFixed(2))
      message += `\nCantidad de notas: ${quantity}\nNeto: ${total}\nSaldo:${balance}\n\n Si ya usted cancelo su deuda hacer caso omiso de este mensaje.`
      const numeroCliente = +client.NumeroTelefonico
      const whatsappNumber = `58${numeroCliente}@c.us`
      sendMessage(whatsappNumber, message)
    }
  } catch (err) {
    console.error(err)
  }
})
