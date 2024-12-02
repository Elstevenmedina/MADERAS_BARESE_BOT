import { CronJob } from 'cron'
import { sendMessage } from '../initWhatsapp'
import { getExpiredDeliveryNotes } from '../../utils/getExpiredDeliveryNotes'
import { getClientDebt } from '../../utils/getClientDebt'
import sellersModel from '../../models/sellers'

export const sendMessagesSellers = new CronJob('01 01 13 * * mon', async () => { //0 0 13 * * mon - '01 01 13 * * mon'
    try {
        console.log('Sending messages to sellers')
        const notes = await getExpiredDeliveryNotes()
        const clientDebt = await getClientDebt(notes)
        const contentMessage: string = '*Mensaje automático*\n\n *Hola, estimado vendedor, le saludamos de Maderas Barese y le hacemos informe de sus cuentas por cobrar:*\n\n'
        let message: string = ''
        const dataByClient:any[] = []
        for (const client of clientDebt) {
            const validation = dataByClient.find((data) => data._idSeller === client._idSeller)
            if (validation) {
                dataByClient.forEach((data) => {
                    if (data._idSeller === client._idSeller) {
                        data.notas.push(client)
                    }
                })
            }else{
                const seller = await sellersModel.findById(client._idSeller).select('phoneNumber')
                if(seller){

                    dataByClient.push({
                        _idSeller: client._idSeller,
                        phoneNumber: seller.phoneNumber,
                        notas:[{
                            Cliente: client.Cliente,
                            CantidadNotas: client.CantidadNotas,
                            Neto: client.Neto,
                            Saldo: client.Saldo,
                        }],
                    })
                }
            }
        }

        for (const data of dataByClient) {
            message = contentMessage
            let totalDebt: number | string = 0
            for (const note of data.notas) {
                totalDebt += note.Saldo
                message += `*${note.Cliente.trim()}*\nCantidad de notas: ${note.CantidadNotas}\nNeto: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+note.Neto.toFixed(2))}\nSaldo: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+note.Saldo.toFixed(2))}\n\n`
            }
            totalDebt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+totalDebt.toFixed(2))
            message += `\n\n*Total de deuda vencida: ${totalDebt}*`
            const whatsappNumber = `58${+data.phoneNumber}@c.us`
            console.log(whatsappNumber)
            sendMessage(whatsappNumber, message)
        }


    } catch (err) {
        console.error(err)
    }
})
