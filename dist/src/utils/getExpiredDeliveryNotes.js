"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpiredDeliveryNotes = void 0;
const deliveryNote_1 = __importDefault(require("../models/deliveryNote"));
const parseDateString = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
};
const getExpiredDeliveryNotes = async () => {
    const deliveryNotes = await deliveryNote_1.default.find({ status: 'Por cobrar' }).sort({ number: -1 });
    let totalNet = 0;
    let totalBalance = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deliveryNotesFormatted = deliveryNotes.filter((note) => {
        const dueDate = parseDateString(note.dueDate);
        if (dueDate <= today) {
            totalBalance = +(totalBalance + note.balance).toFixed(2);
            return true;
        }
    }).map((note) => {
        totalNet = totalNet + note.totalAmount;
        totalBalance = totalBalance + note.balance;
        return {
            _idSeller: note._idSeller,
            Cliente: note.client,
            Vendedor: note.seller,
            Neto: note.totalAmount,
            Saldo: note.balance,
            CantidadTotal: note.totalQuantity
        };
    });
    return deliveryNotesFormatted;
};
exports.getExpiredDeliveryNotes = getExpiredDeliveryNotes;
