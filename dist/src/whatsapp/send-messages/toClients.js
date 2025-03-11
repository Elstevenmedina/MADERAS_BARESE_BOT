"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessagesClients = void 0;
const cron_1 = require("cron");
const initWhatsapp_1 = require("../initWhatsapp");
const getExpiredDeliveryNotes_1 = require("../../utils/getExpiredDeliveryNotes");
const getClientDebt_1 = require("../../utils/getClientDebt");
exports.sendMessagesClients = new cron_1.CronJob('01 01 13 * * mon', async () => {
    try {
        console.log('Sending messages to clients');
        const notes = await (0, getExpiredDeliveryNotes_1.getExpiredDeliveryNotes)();
        const clientDebt = await (0, getClientDebt_1.getClientDebt)(notes);
        const contentMessage = '*Mensaje automático*\n\n *Hola, estimado cliente, le saludamos de Maderas Barese y le hacemos informe de su estado de cuenta:*\n\n';
        for (const client of clientDebt) {
            let message = contentMessage;
            const quantity = client.CantidadNotas;
            const total = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+client.Neto.toFixed(2));
            const balance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+client.Saldo.toFixed(2));
            message += `\nCantidad de notas: ${quantity}\nNeto: ${total}\nSaldo:${balance}\n\n Si ya usted cancelo su deuda hacer caso omiso de este mensaje.`;
            const numeroCliente = +client.NumeroTelefonico;
            const whatsappNumber = `58${numeroCliente}@c.us`;
            (0, initWhatsapp_1.sendMessage)(whatsappNumber, message);
        }
    }
    catch (err) {
        console.error(err);
    }
});
