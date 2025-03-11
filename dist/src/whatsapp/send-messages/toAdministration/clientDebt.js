"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendClientDebt = void 0;
const cron_1 = require("cron");
const initWhatsapp_1 = require("../../initWhatsapp");
const ManagementWhatsappNumbers_1 = require("../../../enums/ManagementWhatsappNumbers");
const getExpiredDeliveryNotes_1 = require("../../../utils/getExpiredDeliveryNotes");
exports.sendClientDebt = new cron_1.CronJob('0 0 12 * * mon', async () => {
    let notes = await (0, getExpiredDeliveryNotes_1.getExpiredDeliveryNotes)();
    notes.sort((a, b) => (a.Saldo > b.Saldo) ? -1 : 1);
    let message = '*Reporte de deudas vencidas de clientes*\n\n';
    let totalDebt = 0;
    notes = notes.reduce((acc, current) => {
        const existingClient = acc.find(item => item.Cliente === current.Cliente);
        if (existingClient) {
            existingClient.Neto += current.Neto;
            existingClient.Saldo += current.Saldo;
            existingClient.CantidadTotal += current.CantidadTotal;
        }
        else {
            acc.push(Object.assign({}, current));
        }
        return acc;
    }, []);
    for (const note of notes) {
        totalDebt += note.Saldo;
        message += `*${note.Cliente.trim()}*\nNeto: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+note.Neto.toFixed(2))}\nSaldo: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+note.Saldo.toFixed(2))}\n\n`;
    }
    totalDebt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+totalDebt.toFixed(2));
    message += `\n\n*Total de deuda vencida: ${totalDebt}*`;
    (0, initWhatsapp_1.sendMessage)(ManagementWhatsappNumbers_1.ManagementWhatsappNumbers.Management1, message);
});
