"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessagesSellers = void 0;
const cron_1 = require("cron");
const initWhatsapp_1 = require("../initWhatsapp");
const getExpiredDeliveryNotes_1 = require("../../utils/getExpiredDeliveryNotes");
const getClientDebt_1 = require("../../utils/getClientDebt");
const sellers_1 = __importDefault(require("../../models/sellers"));
exports.sendMessagesSellers = new cron_1.CronJob('01 01 13 * * mon', async () => {
    try {
        console.log('Sending messages to sellers');
        const notes = await (0, getExpiredDeliveryNotes_1.getExpiredDeliveryNotes)();
        const clientDebt = await (0, getClientDebt_1.getClientDebt)(notes);
        const contentMessage = '*Mensaje automático*\n\n *Hola, estimado vendedor, le saludamos de Maderas Barese y le hacemos informe de sus cuentas por cobrar:*\n\n';
        let message = '';
        const dataByClient = [];
        for (const client of clientDebt) {
            const validation = dataByClient.find((data) => data._idSeller === client._idSeller);
            if (validation) {
                dataByClient.forEach((data) => {
                    if (data._idSeller === client._idSeller) {
                        data.notas.push(client);
                    }
                });
            }
            else {
                const seller = await sellers_1.default.findById(client._idSeller).select('phoneNumber');
                if (seller) {
                    dataByClient.push({
                        _idSeller: client._idSeller,
                        phoneNumber: seller.phoneNumber,
                        notas: [{
                                Cliente: client.Cliente,
                                CantidadNotas: client.CantidadNotas,
                                Neto: client.Neto,
                                Saldo: client.Saldo,
                            }],
                    });
                }
            }
        }
        for (const data of dataByClient) {
            message = contentMessage;
            let totalDebt = 0;
            for (const note of data.notas) {
                totalDebt += note.Saldo;
                message += `*${note.Cliente.trim()}*\nCantidad de notas: ${note.CantidadNotas}\nNeto: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+note.Neto.toFixed(2))}\nSaldo: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+note.Saldo.toFixed(2))}\n\n`;
            }
            totalDebt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+totalDebt.toFixed(2));
            message += `\n\n*Total de deuda vencida: ${totalDebt}*`;
            const whatsappNumber = `58${+data.phoneNumber}@c.us`;
            console.log(whatsappNumber);
            (0, initWhatsapp_1.sendMessage)(whatsappNumber, message);
        }
    }
    catch (err) {
        console.error(err);
    }
});
