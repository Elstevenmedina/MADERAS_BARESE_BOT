"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeeklyClosing = void 0;
const moment_1 = __importDefault(require("moment"));
const paymentNote_1 = __importDefault(require("../models/paymentNote"));
const deliveryNote_1 = __importDefault(require("../models/deliveryNote"));
const Stores_1 = require("./Stores");
const weeklyCollectionRecord_1 = __importDefault(require("../models/weeklyCollectionRecord"));
const moment_2 = require("../moment");
const getWeeklyClosing = async () => {
    const today = (0, moment_1.default)();
    let paymentNotes = [];
    for (let i = 0; i < 7; i++) {
        const date = today.clone().subtract(i, 'days');
        const dateNote = date.format('DD/MM/YYYY');
        const paymentNoteSearched = await paymentNote_1.default.find({ Fecha: dateNote }).lean();
        paymentNotes = [...paymentNotes, ...paymentNoteSearched];
    }
    const notesStoreA = [];
    const notesStoreB = [];
    for (const note of paymentNotes) {
        for (const deliveryNote of note.Notas) {
            const deliveryNoteBase = await deliveryNote_1.default.findOne({ Numero: deliveryNote.Nota }).select('Almacen Cliente Neto Saldo');
            if (deliveryNoteBase !== null && deliveryNoteBase !== undefined) {
                if (deliveryNoteBase.Almacen === Stores_1.Stores.StoreA) {
                    notesStoreA.push({
                        Numero: +deliveryNote.Nota,
                        Cliente: deliveryNoteBase.Cliente,
                        Neto: deliveryNoteBase.Neto,
                        MontoCancelado: deliveryNote.Pago,
                        Saldo: deliveryNoteBase.Saldo
                    });
                }
                else {
                    notesStoreB.push({
                        Numero: +deliveryNote.Nota,
                        Cliente: deliveryNoteBase.Cliente,
                        Neto: deliveryNoteBase.Neto,
                        MontoCancelado: deliveryNote.Pago,
                        Saldo: deliveryNoteBase.Saldo
                    });
                }
            }
        }
    }
    notesStoreA.sort((a, b) => a.Numero - b.Numero);
    notesStoreB.sort((a, b) => a.Numero - b.Numero);
    const numberBase = 120230000001;
    const weeklyCollections = [];
    if (notesStoreA.length > 0) {
        const lastWeeklyCollection = await weeklyCollectionRecord_1.default.findOne().sort({ Numero: -1 });
        const Number = (lastWeeklyCollection !== null && lastWeeklyCollection !== undefined) ? lastWeeklyCollection.Numero + 1 : numberBase;
        const PaidTotal = notesStoreA.reduce((accumulator, note) => {
            return +(accumulator + note.MontoCancelado).toFixed(2);
        }, 0);
        const newWeeklyCollection = new weeklyCollectionRecord_1.default({
            Numero: Number,
            Almacen: Stores_1.Stores.StoreA,
            Fecha: (0, moment_2.getDate)(),
            PagadoTotal: PaidTotal,
            Notas: notesStoreA
        });
        await newWeeklyCollection.save();
        weeklyCollections.push(newWeeklyCollection);
    }
    if (notesStoreB.length > 0) {
        const lastWeeklyCollection = await weeklyCollectionRecord_1.default.findOne().sort({ Numero: -1 });
        const Number = (lastWeeklyCollection !== null && lastWeeklyCollection !== undefined) ? lastWeeklyCollection.Numero + 1 : numberBase;
        const PaidTotal = notesStoreA.reduce((accumulator, note) => {
            return +(accumulator + note.MontoCancelado).toFixed(2);
        }, 0);
        const newWeeklyCollection = new weeklyCollectionRecord_1.default({
            Numero: Number,
            Almacen: Stores_1.Stores.StoreB,
            Fecha: (0, moment_2.getDate)(),
            PagadoTotal: PaidTotal,
            Notas: notesStoreB
        });
        await newWeeklyCollection.save();
        weeklyCollections.push(newWeeklyCollection);
    }
    return weeklyCollections;
};
exports.getWeeklyClosing = getWeeklyClosing;
