"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveAnnulationConfirms = void 0;
const initWhatsapp_1 = require("../../initWhatsapp");
const cancellationDocuments_1 = require("../../../utils/cancellationDocuments");
const ManagementWhatsappNumbers_1 = require("../../../enums/ManagementWhatsappNumbers");
const receiveAnnulationConfirms = async (message) => {
    const bodyMessage = (message.body != null && message.body !== undefined) ? message.body.toLowerCase() : '';
    const from = message.from;
    const numberDocument = (message.body != null && message.body !== undefined) ? +message.body.split(' ')[1] : 0;
    if (bodyMessage.includes('anular') && from.includes(ManagementWhatsappNumbers_1.ManagementWhatsappNumbers.Management1)) {
        const isCancelled = await (0, cancellationDocuments_1.cancellationDocument)(numberDocument);
        if (isCancelled)
            (0, initWhatsapp_1.sendMessage)(from, `Documento #${numberDocument} anulado correctamente`);
    }
};
exports.receiveAnnulationConfirms = receiveAnnulationConfirms;
