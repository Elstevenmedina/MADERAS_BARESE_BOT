import { CronJob } from 'cron'
import { sendMessage } from '../../initWhatsapp'
import { ManagementWhatsappNumbers } from '../../../enums/ManagementWhatsappNumbers'
import { getExpiredDeliveryNotes } from '../../../utils/getExpiredDeliveryNotes'

export const sendClientDebt = new CronJob('0 0 12 * * mon', async () => {
  let notes = await getExpiredDeliveryNotes()
  notes.sort((a, b) => (a.Saldo > b.Saldo) ? -1 : 1)

  let message = '*Reporte de deudas vencidas de clientes*\n\n'

  let totalDebt: number | string = 0

  notes = notes.reduce((acc: typeof notes, current) => {
    const existingClient = acc.find(item => item.Cliente === current.Cliente);
    if (existingClient) {
      existingClient.Neto += current.Neto;
      existingClient.Saldo += current.Saldo;
      existingClient.CantidadTotal += current.CantidadTotal;
    } else {
      acc.push({ ...current });
    }
    return acc;
  }, []);
  
  
  for (const note of notes) {
    totalDebt += note.Saldo
    
    message += `*${note.Cliente.trim()}*\nNeto: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+note.Neto.toFixed(2))}\nSaldo: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+note.Saldo.toFixed(2))}\n\n`
  }
  
  totalDebt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+totalDebt.toFixed(2))
  
  message += `\n\n*Total de deuda vencida: ${totalDebt}*`

  sendMessage(ManagementWhatsappNumbers.Management1, message)
})
