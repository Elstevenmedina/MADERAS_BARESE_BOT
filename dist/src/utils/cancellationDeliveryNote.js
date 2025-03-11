"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancellationDeliveryNote = void 0;
const deliveryNote_1 = __importDefault(require("../models/deliveryNote"));
const noteRefund_1 = __importDefault(require("../models/noteRefund"));
const paymentclients_1 = __importDefault(require("../models/paymentclients"));
const cancellationRequest_1 = __importDefault(require("../models/cancellationRequest"));
const newActivity_1 = require("./newActivity");
const updateDashboard_1 = require("./updateDashboard");
const moment_1 = require("../moment");
const updateProducts_1 = require("./updateProducts");
const updateAccountingBook_1 = require("./updateAccountingBook");
const updateClientAccount_1 = require("./updateClientAccount");
const MovementTypes_1 = require("../enums/MovementTypes");
const cancellationDeliveryNote = async (deliveryNote) => {
    try {
        const cancellationRequest = await cancellationRequest_1.default.findOne({ NumeroDocumento: deliveryNote.Numero });
        if (cancellationRequest !== undefined && cancellationRequest !== null) {
            await (0, newActivity_1.newActivity)(cancellationRequest.Usuario, cancellationRequest._idUsuario, 'Facturación', `Anulo la nota de entrega #${deliveryNote.Numero}`);
            await (0, updateDashboard_1.updateDashboard)(deliveryNote.Productos, (0, moment_1.getDate)(), deliveryNote.Numero, deliveryNote.TipoPrecio, deliveryNote.Neto);
            await (0, updateDashboard_1.updateProductsDashboard)(deliveryNote.Productos, (0, moment_1.getDate)());
            await (0, updateProducts_1.newMovementProduct)(deliveryNote.Productos, deliveryNote.Numero, MovementTypes_1.MovementTypes.Add, 'Carga por anulación de nota de entrega');
            const historyNote = deliveryNote.HistorialPago;
            for (const history of historyNote) {
                const paymentNote = await paymentclients_1.default.findOne({ Numero: history.Recibo });
                const comment = `Anulación de nota de entrega asociada #${deliveryNote.Numero} `;
                if (paymentNote !== undefined && paymentNote !== null) {
                    await paymentclients_1.default.findOneAndUpdate({ Numero: history.Recibo }, {
                        Estado: 'Anulado',
                        ComentarioAnualcion: comment
                    });
                }
                else {
                    await noteRefund_1.default.findOneAndUpdate({ Numero: history.Recibo }, {
                        Estado: 'Anulado',
                        ComentarioAnualcion: comment
                    });
                }
            }
            await deliveryNote_1.default.findOneAndUpdate({ Numero: deliveryNote.Numero }, {
                Estado: 'Anulado',
                Saldo: 0,
                ComentarioAnualcion: cancellationRequest.Motivo,
                FechaAnulacion: (0, moment_1.getDate)()
            });
            await (0, updateAccountingBook_1.updateAccountingBook)(deliveryNote.Numero, 'Anulación nota de entrega', deliveryNote.Cliente, deliveryNote.Anio, deliveryNote.Mes, deliveryNote.Neto, 0);
            const argumentsUpdateCliente = {
                client: deliveryNote.Cliente,
                rif: deliveryNote.RIF,
                documentType: 'Nota de entrega',
                documentNumber: deliveryNote.Numero,
                date: deliveryNote.Fecha,
                dueDate: deliveryNote.Vencimiento,
                credit: deliveryNote.Neto,
                debit: 0,
                cancellation: 'Anulación'
            };
            await (0, updateClientAccount_1.updateClientAccount)(argumentsUpdateCliente);
            return true;
        }
        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};
exports.cancellationDeliveryNote = cancellationDeliveryNote;
