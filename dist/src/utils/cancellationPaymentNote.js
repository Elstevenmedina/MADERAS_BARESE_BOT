"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancellationPaymentNote = void 0;
const deliveryNote_1 = __importDefault(require("../models/deliveryNote"));
const paymentclients_1 = __importDefault(require("../models/paymentclients"));
const cancellationRequest_1 = __importDefault(require("../models/cancellationRequest"));
const newActivity_1 = require("./newActivity");
const updateClientAccount_1 = require("./updateClientAccount");
const cancellationPaymentNote = async (paymentNote) => {
    try {
        const cancellationRequest = await cancellationRequest_1.default.findOne({ NumeroDocumento: paymentNote.Numero }).select('Usuario _idUsuario Motivo');
        if (cancellationRequest !== null && cancellationRequest !== undefined) {
            await (0, newActivity_1.newActivity)(cancellationRequest.Usuario, cancellationRequest._idUsuario, 'Facturación', `Anulo la nota de pago #${paymentNote.Numero}`);
            for (const note of paymentNote.Notas) {
                const deliveryNote = await deliveryNote_1.default.findOne({ Numero: note.Nota }).select('Saldo');
                if (deliveryNote !== undefined && deliveryNote !== null) {
                    const balance = +(deliveryNote.Saldo + note.Pago).toFixed(2);
                    await deliveryNote_1.default.findByIdAndUpdate(deliveryNote._id, {
                        Saldo: balance,
                        Estado: 'Por cobrar'
                    });
                }
            }
            await paymentclients_1.default.findOneAndUpdate({ Numero: paymentNote.Numero }, {
                Estado: 'Anulado',
                ComentarioAnulacion: cancellationRequest.Motivo
            });
            const argumentsUpdateCliente = {
                client: paymentNote.Cliente,
                rif: paymentNote.RIF,
                documentType: 'Nota de pago',
                documentNumber: paymentNote.Numero,
                date: paymentNote.Fecha,
                dueDate: '',
                credit: 0,
                debit: paymentNote.PagadoTotal,
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
exports.cancellationPaymentNote = cancellationPaymentNote;
