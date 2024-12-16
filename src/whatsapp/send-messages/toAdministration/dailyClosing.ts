import { CronJob } from 'cron'
import { sendMessage } from '../../initWhatsapp'
import { getDailyClosing } from '../../../utils/getDailyClosing'
import { ManagementWhatsappNumbers } from '../../../enums/ManagementWhatsappNumbers'

export const sendDailyClosing = new CronJob('0 21 * * *', async () => { //3 01 01 21 * * *
  const dailyClosing = await getDailyClosing()
  console.log('Enviando mensaje de cierre diario') 
  const message = `*Reporte de cierre diario*\n\n 
  *Monto vendido*: ${dailyClosing.amountSold}\n 
  *Monto cobrado*: ${dailyClosing.amountCollected}\n
  *Devoluciones*: ${dailyClosing.refundAmount}\n
  *Cuentas por cobrar*: ${dailyClosing.accountsCollect} \n\n`
  sendMessage(ManagementWhatsappNumbers.Management1, message)
})
