"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSellerDebt = void 0;
const clients_1 = __importDefault(require("../models/clients"));
const getSellerDebt = async (notes) => {
    const clientDebt = [];
    try {
        for (const note of notes) {
            const clientData = clientDebt.find((data) => data.Cliente === note.Cliente);
            if (clientData !== null && clientData !== undefined) {
                clientData.CantidadNotas += 1;
                clientData.Neto += note.Neto;
                clientData.Saldo += note.Saldo;
            }
            else {
                try {
                    const client = await clients_1.default.findOne({ enterprise: note.Cliente }).select('mainPhoneNumber');
                    if (client !== null && client !== undefined) {
                        clientDebt.push({
                            Cliente: note.Cliente,
                            CantidadNotas: 1,
                            Neto: note.Neto,
                            Saldo: note.Saldo,
                            NumeroTelefonico: +client.mainPhoneNumber
                        });
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    return clientDebt;
};
exports.getSellerDebt = getSellerDebt;
