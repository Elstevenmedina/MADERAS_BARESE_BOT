"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDailyClosing = void 0;
const deliveryNote_1 = __importDefault(require("../models/deliveryNote"));
const paymentclients_1 = __importDefault(require("../models/paymentclients"));
const returnNotes_1 = __importDefault(require("../models/returnNotes"));
const moment_1 = require("../moment");
const returnFormatUSD = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};
const getDailyClosing = async () => {
    const date = (0, moment_1.getDate)();
    const dateFormatted = (0, moment_1.getDateFormatted)();
    const deliveryNotes = await deliveryNote_1.default.find({ date: dateFormatted }).select('totalAmount');
    const allDeliveryNotes = await deliveryNote_1.default.find({ status: 'Por cobrar' }).select('balance');
    let datePaymentArray = dateFormatted.split('/');
    datePaymentArray = datePaymentArray.reverse();
    let datePayment = datePaymentArray.join('-');
    let paymentNotes = await paymentclients_1.default.find({ realDatePayment: datePayment });
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    let refundNotes = await returnNotes_1.default.find({
        createdAt: { $gte: startOfDay, $lte: endOfDay }
    });
    let amountSold = 0;
    let amountCollected = 0;
    let accountsCollect = 0;
    let refundAmount = 0;
    for (const deliveryNote of deliveryNotes) {
        amountSold = +(amountSold + deliveryNote.totalAmount).toFixed(2);
    }
    for (const deliveryNote of allDeliveryNotes) {
        accountsCollect = +(accountsCollect + deliveryNote.balance).toFixed(2);
    }
    for (const note of paymentNotes) {
        amountCollected = +(amountCollected + note.totalAmount).toFixed(2);
    }
    for (const note of refundNotes) {
        refundAmount = +(refundAmount + note.totalAmount).toFixed(2);
    }
    const dailyClosing = {
        amountSold: returnFormatUSD(amountSold),
        amountCollected: returnFormatUSD(amountCollected),
        accountsCollect: returnFormatUSD(accountsCollect),
        refundAmount: returnFormatUSD(refundAmount),
    };
    return dailyClosing;
};
exports.getDailyClosing = getDailyClosing;
