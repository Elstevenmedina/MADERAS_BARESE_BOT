"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotificaronMessages = void 0;
const cron_1 = require("cron");
const initWhatsapp_1 = require("../../initWhatsapp");
const ManagementWhatsappNumbers_1 = require("../../../enums/ManagementWhatsappNumbers");
const notificacionMessages_1 = __importDefault(require("../../../models/notificacionMessages"));
exports.sendNotificaronMessages = new cron_1.CronJob('* * * * *', async () => {
    const notificationMessage = await notificacionMessages_1.default.findOne({ status: 'Pendiente' });
    if (!notificationMessage)
        return;
    await notificationMessage.updateOne({ status: 'Enviado' });
    (0, initWhatsapp_1.sendMessage)(ManagementWhatsappNumbers_1.ManagementWhatsappNumbers.Management1, notificationMessage.message);
});
