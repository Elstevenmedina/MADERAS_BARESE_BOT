"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const accountStatusSchema = new mongoose_1.Schema({
    Cliente: { type: String, require: true },
    _idCliente: { type: String, require: true },
    RIF: { type: String, require: true },
    DebeTotal: { type: Number, require: true },
    HaberTotal: { type: Number, require: true },
    SaldoTotal: { type: Number, require: true },
    Items: [{
            TipoDocumento: { type: String, require: true },
            NumeroDocumento: { type: String, require: true },
            Fecha: { type: String, require: true },
            FechaVencimiento: { type: String, require: true },
            Debe: { type: Number, require: true },
            Haber: { type: Number, require: true },
            Saldo: { type: Number, require: true }
        }]
});
const AccountStatusModel = mongoose_1.default.model('estadosCuentas', accountStatusSchema);
exports.default = AccountStatusModel;
