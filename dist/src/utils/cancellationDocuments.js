"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancellationDocument = void 0;
const deliveryNote_1 = __importDefault(require("../models/deliveryNote"));
const noteRefund_1 = __importDefault(require("../models/noteRefund"));
const notesRefundAmount_1 = __importDefault(require("../models/notesRefundAmount"));
const paymentclients_1 = __importDefault(require("../models/paymentclients"));
const cancellationDeliveryNote_1 = require("./cancellationDeliveryNote");
const cancellationRefundNote_1 = require("./cancellationRefundNote");
const cancellationAmountRefundNote_1 = require("./cancellationAmountRefundNote");
const cancellationPaymentNote_1 = require("./cancellationPaymentNote");
const cancellationDocument = async (numberDocument) => {
    const deliveryNote = await deliveryNote_1.default.findOne({ Numero: numberDocument });
    if (deliveryNote !== undefined && deliveryNote !== null) {
        return await (0, cancellationDeliveryNote_1.cancellationDeliveryNote)(deliveryNote);
    }
    const noteRefund = await noteRefund_1.default.findOne({ Numero: numberDocument });
    if (noteRefund !== undefined && noteRefund !== null) {
        return await (0, cancellationRefundNote_1.cancellationRefundNote)(noteRefund);
    }
    const noteRefundAmount = await notesRefundAmount_1.default.findOne({ Numero: numberDocument });
    if (noteRefundAmount !== undefined && noteRefundAmount !== null) {
        return await (0, cancellationAmountRefundNote_1.cancellationAmountRefundNote)(noteRefundAmount);
    }
    const PaymentNote = await paymentclients_1.default.findOne({ Numero: numberDocument });
    if (PaymentNote !== undefined && PaymentNote !== null) {
        return await (0, cancellationPaymentNote_1.cancellationPaymentNote)(PaymentNote);
    }
    return false;
};
exports.cancellationDocument = cancellationDocument;
