import express, { type Express } from 'express'
import { initDB } from './src/database'
import dotenv from 'dotenv'
import { sendMessagesClients } from './src/whatsapp/send-messages/toClients'
import { sendDailyClosing } from './src/whatsapp/send-messages/toAdministration/dailyClosing'
import { sendMessagesSellers } from './src/whatsapp/send-messages/toSellers'
import { sendClientDebt } from './src/whatsapp/send-messages/toAdministration/clientDebt'
import { sendNotificaronMessages } from './src/whatsapp/send-messages/toAdministration/notificationMessages'

dotenv.config()

const app: Express = express()
const port: number = 3000

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const DB_HOST = 'mongodb+srv://maderasbaresebd:dREn3bZgEg16tlEV@maderasbaresse.oantw.mongodb.net/maderas'

initDB(DB_HOST)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
  sendMessagesClients.start()
  sendDailyClosing.start()
  sendMessagesSellers.start()
  sendClientDebt.start()
  sendNotificaronMessages.start()
})
