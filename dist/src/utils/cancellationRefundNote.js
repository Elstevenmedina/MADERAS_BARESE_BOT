"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancellationRefundNote = void 0;
const deliveryNote_1 = __importDefault(require("../models/deliveryNote"));
const noteRefund_1 = __importDefault(require("../models/noteRefund"));
const cancellationRequest_1 = __importDefault(require("../models/cancellationRequest"));
const updateProducts_1 = require("./updateProducts");
const updateAccountingBook_1 = require("./updateAccountingBook");
const updateClientAccount_1 = require("./updateClientAccount");
const MovementTypes_1 = require("../enums/MovementTypes");
const cancellationRefundNote = async (refundNote) => {
    const cancellationRequest = await cancellationRequest_1.default.findOne({ NumeroDocumento: refundNote.Numero });
    if (cancellationRequest !== null && cancellationRequest !== undefined) {
        const productsRefundNote = refundNote.Productos;
        await (0, updateProducts_1.newMovementProduct)(productsRefundNote, refundNote.Numero, MovementTypes_1.MovementTypes.Substract, 'Descarga por anulación de nota de devolución');
        const deliveryNoteInfo = await deliveryNote_1.default.findOne({ Numero: refundNote.Numero }).lean();
        if (deliveryNoteInfo !== undefined && deliveryNoteInfo !== null) {
            const productDeliveryNote = deliveryNoteInfo.Productos;
            const newProducts = [];
            const quantity2 = deliveryNoteInfo.CantidadTotal2 + refundNote.CantidadTotal;
            for (const product of productDeliveryNote) {
                const productFound = productsRefundNote.find((productRefund) => productRefund.Codigo === product.Codigo);
                if (productFound !== undefined && productFound !== null) {
                    product.Cantidad2 = (+product.Cantidad2 + +productFound.Cantidad).toFixed(2);
                    newProducts.push(product);
                }
                else {
                    newProducts.push(product);
                }
            }
            const balance = +(deliveryNoteInfo.Saldo + refundNote.ValorTotal).toFixed(2);
            const net2 = +(deliveryNoteInfo.Neto2 + refundNote.ValorTotal).toFixed(2);
            await deliveryNote_1.default.findOneAndUpdate({ Numero: deliveryNoteInfo.Numero }, {
                Productos: newProducts,
                Saldo: balance,
                CantidadTotal2: quantity2,
                Neto2: net2,
                Estado: 'Por cobrar'
            });
            await noteRefund_1.default.findOneAndUpdate({ Numero: refundNote.Numero }, {
                Estado: 'Anulado',
                ComentarioAnualcion: cancellationRequest.Motivo
            });
            await (0, updateAccountingBook_1.updateAccountingBook)(refundNote.Numero, 'Anulación de devolución', refundNote.Cliente, deliveryNoteInfo.Anio, deliveryNoteInfo.Mes, 0, refundNote.ValorTotal);
            const argumentsUpdateCliente = {
                client: refundNote.Cliente,
                rif: refundNote.RIF,
                documentType: 'Nota de devolución',
                documentNumber: refundNote.Numero,
                date: refundNote.Fecha,
                dueDate: '',
                credit: 0,
                debit: refundNote.ValorTotal,
                cancellation: 'Anulación'
            };
            await (0, updateClientAccount_1.updateClientAccount)(argumentsUpdateCliente);
            return true;
        }
    }
    return false;
};
exports.cancellationRefundNote = cancellationRefundNote;
