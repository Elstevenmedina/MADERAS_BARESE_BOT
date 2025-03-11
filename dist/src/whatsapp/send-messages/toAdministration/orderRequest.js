"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderRequest = void 0;
const client_1 = __importDefault(require("../../../models/client"));
const orderRequest_1 = __importDefault(require("../../../models/orderRequest"));
const purchaseOrders_1 = __importDefault(require("../../../models/purchaseOrders"));
const cron_1 = require("cron");
const initWhatsapp_1 = require("../../initWhatsapp");
exports.sendOrderRequest = new cron_1.CronJob('59 * * * * *', async () => {
    try {
        let orderRequests = await orderRequest_1.default.findOne({ EstadoEnvio: 'Pendiente' });
        orderRequests = orderRequests ? [orderRequests] : [];
        for (const request of orderRequests) {
            let message = '*Solicitudes de ordenes de compra para revisión*\n\n';
            const order = await purchaseOrders_1.default.findOne({ Numero: request.NumeroOrden });
            if (order !== undefined && order !== null) {
                const client = order.Cliente;
                const totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.PrecioTotal);
                const clientData = await client_1.default.findOne({ Empresa: client }).select('NumeroAdministrativo');
                message += `*Cliente: ${client}*\n 
              Número: ${request.NumeroOrden}\n 
              Monto: ${totalPrice}:\n
              Enlace: https://app.thomsonparts.com/aprobar-rechazar-orden/${request.NumeroOrden} \n\n`;
                const whatsappNumber = `${clientData === null || clientData === void 0 ? void 0 : clientData.NumeroAdministrativo}@c.us`;
                console.log({
                    whatsappNumber,
                    message
                });
                await orderRequest_1.default.findByIdAndUpdate(request._id, { EstadoEnvio: 'Enviado' });
                (0, initWhatsapp_1.sendMessage)(whatsappNumber, message);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
});
