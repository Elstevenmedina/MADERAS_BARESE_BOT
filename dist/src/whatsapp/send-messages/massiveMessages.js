"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMassiveMessages = void 0;
const cron_1 = require("cron");
const whatsappMessage_1 = __importDefault(require("../../models/whatsappMessage"));
const initWhatsapp_1 = require("../initWhatsapp");
const client_1 = __importDefault(require("../../models/client"));
exports.sendMassiveMessages = new cron_1.CronJob('* 2 * * * *', async () => {
    const messages = await whatsappMessage_1.default.find({ Estado: 'Pendiente' });
    const clients = await client_1.default.find();
    for (const message of messages) {
        for (const users of message.Usuarios) {
            const clientFound = clients.find((client) => client._id.toString() === users);
            const whatsappNumber = (clientFound !== null && clientFound !== undefined) ? clientFound.Contacto1 : null;
            if (whatsappNumber !== null) {
                // sendMessage(whatsappNumber, message.Contenido)
                (0, initWhatsapp_1.sendMessage)('584242449255@c.us', message.Contenido);
            }
        }
        await whatsappMessage_1.default.findByIdAndUpdate(message._id, {
            Estado: 'Enviado'
        });
    }
});
