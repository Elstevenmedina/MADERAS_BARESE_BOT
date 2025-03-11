"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccountingBook = void 0;
const accountingBook_1 = __importDefault(require("../models/accountingBook"));
const moment_1 = require("../moment");
const updateAccountingBook = async (documentNumber, type, client, year, month, egress, income) => {
    try {
        const accountingBook = await accountingBook_1.default.findOne({ Anio: year, NumeroMes: month });
        const total = (accountingBook !== undefined && accountingBook !== null)
            ? +(accountingBook.TotalGeneral + income - egress).toFixed(2)
            : +(income - egress).toFixed(2);
        const day = {
            Numero: documentNumber,
            Cliente: client,
            Tipo: type,
            Ingreso: income,
            Egreso: egress,
            Saldo: total
        };
        if (accountingBook !== undefined && accountingBook !== null) {
            const totalIncome = +(accountingBook.TotalIngreso + income).toFixed(2);
            const totalEgress = +(accountingBook.TotalEgreso + egress).toFixed(2);
            await accountingBook_1.default.findByIdAndUpdate(accountingBook._id, {
                TotalIngreso: totalIncome,
                TotalEgreso: totalEgress,
                TotalGeneral: total,
                $push: { dia: day }
            });
            return true;
        }
        else {
            console.log('Entro aqui');
            const monthTextual = (0, moment_1.getMonth)(month);
            const newAccountingBook = new accountingBook_1.default({
                Anio: year,
                Mes: monthTextual,
                NumeroMes: month,
                TotalIngreso: income,
                TotalEgreso: egress,
                TotalGeneral: total,
                dia: day
            });
            await newAccountingBook.save();
            return true;
        }
    }
    catch (err) {
        console.log(err);
        return true;
    }
};
exports.updateAccountingBook = updateAccountingBook;
