import { type ClientsDebt } from '../interfaces/clientDebt'
import { type DeliveryNoteDebt } from '../interfaces/DeliveryNoteDebt'
import clientsModel from '../models/clients'

export const getClientDebt = async (notes: DeliveryNoteDebt[]): Promise<ClientsDebt[]> => {
  const clientDebt: ClientsDebt[] = []
  try {
    for (const note of notes) {
      const clientData: ClientsDebt | undefined = clientDebt.find((data) => data.Cliente === note.Cliente)
      if (clientData !== null && clientData !== undefined) {
        clientData.CantidadNotas += 1
        clientData.Neto += note.Neto
        clientData.Saldo += note.Saldo
      } else {
        try {
          const client: { mainPhoneNumber: string } = await clientsModel.findOne({ enterprise: note.Cliente }).select('mainPhoneNumber')
          if (client !== null && client !== undefined) {
            clientDebt.push({
              _idSeller:note._idSeller,
              Vendedor:note.Vendedor,
              Cliente: note.Cliente,
              CantidadNotas: 1,
              Neto: note.Neto,
              Saldo: note.Saldo,
              NumeroTelefonico: +client.mainPhoneNumber
            })
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
  } catch (err) {
    console.log(err)
  }

  return clientDebt
}
