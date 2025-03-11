"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancellationAmountRefundNote = void 0;
const deliveryNote_1 = __importDefault(require("../models/deliveryNote"));
const notesRefundAmount_1 = __importDefault(require("../models/notesRefundAmount"));
const cancellationRequest_1 = __importDefault(require("../models/cancellationRequest"));
const newActivity_1 = require("./newActivity");
const updateAccountingBook_1 = require("./updateAccountingBook");
const updateClientAccount_1 = require("./updateClientAccount");
const cancellationAmountRefundNote = async (amountRefundNote) => {
    try {
        const cancellationRequest = await cancellationRequest_1.default.findOne({ NumeroDocumento: amountRefundNote.Recibo }).select('Usuario _idUsuario Motivo');
        if (cancellationRequest !== null && cancellationRequest !== undefined) {
            await (0, newActivity_1.newActivity)(cancellationRequest.Usuario, cancellationRequest._idUsuario, 'Facturación', `Anulo la nota de devolución #${amountRefundNote.Recibo}`);
            const deliveryNoteNumber = amountRefundNote.Productos[0].NotaEntrega;
            const totalPrice = amountRefundNote.Productos[0].Precio;
            const deliveryNoteInfo = await deliveryNote_1.default.findOne({ Numero: deliveryNoteNumber }).select('Neto2 Saldo Anio Mes');
            if (deliveryNoteInfo !== undefined && deliveryNoteInfo !== null) {
                const net2 = +(deliveryNoteInfo.Neto2 + totalPrice).toFixed(2);
                const balance = +(deliveryNoteInfo.Saldo + totalPrice).toFixed(2);
                await deliveryNote_1.default.findOneAndUpdate({ Numero: deliveryNoteNumber }, {
                    Neto2: net2,
                    Saldo: balance,
                    Estado: 'Por cobrar'
                });
                await notesRefundAmount_1.default.findOneAndUpdate({ Recibo: amountRefundNote.Recibo }, {
                    Estado: 'Anulada'
                });
                await (0, updateAccountingBook_1.updateAccountingBook)(amountRefundNote.Recibo, 'Anulación de devolución', amountRefundNote.Cliente, deliveryNoteInfo.Anio, deliveryNoteInfo.Mes, 0, totalPrice);
                const argumentsUpdateCliente = {
                    client: amountRefundNote.Cliente,
                    rif: deliveryNoteInfo.RIF,
                    documentType: 'Nota de devolución',
                    documentNumber: amountRefundNote.Recibo,
                    date: amountRefundNote.Fecha,
                    dueDate: '',
                    credit: 0,
                    debit: totalPrice,
                    cancellation: 'Anulación'
                };
                await (0, updateClientAccount_1.updateClientAccount)(argumentsUpdateCliente);
                return true;
            }
        }
        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};
exports.cancellationAmountRefundNote = cancellationAmountRefundNote;
