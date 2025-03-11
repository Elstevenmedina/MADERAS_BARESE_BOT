"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClientAccount = void 0;
const accountStatus_1 = __importDefault(require("../models/accountStatus"));
const updateClientAccount = async ({ client, rif, documentType, documentNumber, date, dueDate, credit, debit, cancellation }) => {
    const clientAccount = await accountStatus_1.default.findOne({ Cliente: client });
    const lastBalance = (clientAccount !== undefined && clientAccount !== null) ? clientAccount.SaldoTotal : 0;
    const balance = +(lastBalance + debit - credit).toFixed(2);
    const document = {
        TipoDocumento: `${cancellation} ${documentType}`,
        NumeroDocumento: documentNumber,
        Fecha: date,
        FechaVencimiento: dueDate,
        Debe: debit,
        Haber: credit,
        Saldo: balance
    };
    if (clientAccount !== undefined && clientAccount !== null) {
        const totalDebit = +(clientAccount.DebeTotal + document.Debe).toFixed(2);
        const totalCredit = +(clientAccount.HaberTotal + document.Haber).toFixed(2);
        const updatedAccount = await accountStatus_1.default.findByIdAndUpdate(clientAccount._id, {
            DebeTotal: totalDebit,
            HaberTotal: totalCredit,
            SaldoTotal: balance,
            $push: { Items: document }
        }, { new: true });
        if (updatedAccount === undefined || updatedAccount === null)
            throw new Error('Error al actualizar el estado de la cuenta');
        return updatedAccount;
    }
    else {
        const newStatus = new accountStatus_1.default({
            Cliente: client,
            RIF: rif,
            DebeTotal: document.Debe,
            HaberTotal: document.Haber,
            SaldoTotal: document.Saldo,
            Items: [document]
        });
        return await newStatus.save();
    }
};
exports.updateClientAccount = updateClientAccount;
