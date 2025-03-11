"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCancellationsRequest = void 0;
const cancellationRequest_1 = __importDefault(require("../../../models/cancellationRequest"));
const cron_1 = require("cron");
const ManagementWhatsappNumbers_1 = require("../../../enums/ManagementWhatsappNumbers");
exports.sendCancellationsRequest = new cron_1.CronJob('* * * * *', async () => {
    try {
        let cancellationRequests = await cancellationRequest_1.default.find({ Estado: 'Pendiente' });
        cancellationRequests = cancellationRequests ? [cancellationRequests] : [];
        const whatsappNumber = ManagementWhatsappNumbers_1.ManagementWhatsappNumbers.Management1;
        for (const request of cancellationRequests) {
            const message = `*Nueva solicitud de anulación*\n\n
            *Tipo de documento*: ${request.TipoDocumento}\n
            *Número de documento*: ${request.NumeroDocumento}\n
            *Motivo de anulación*: ${request.Motivo}\n
            *Usuario*: ${request.Usuario}\n\n
            Para aprobar la anulación escribe: *Anular ${request.NumeroDocumento}*
            `;
            //sendMessage(whatsappNumber, message)
        }
    }
    catch (err) {
        console.log(err);
    }
});
