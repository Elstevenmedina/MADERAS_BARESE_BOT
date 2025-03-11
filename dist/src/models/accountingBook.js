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
const accountingBookSchema = new mongoose_1.Schema({
    Anio: { type: Number, require: true },
    Mes: { type: String, require: true },
    NumeroMes: { type: Number, require: true },
    TotalIngreso: { type: Number, require: true },
    TotalEgreso: { type: Number, require: true },
    TotalGeneral: { type: Number, require: true },
    dia: [{
            Timestamp: { type: Number, defualt: Date.now() },
            Fecha: { type: String, require: true },
            Numero: { type: String, require: true },
            Cliente: { type: String, require: true },
            Tipo: { type: String, require: true },
            Ingreso: { type: Number, require: true },
            Egreso: { type: Number, require: true },
            Saldo: { type: Number, require: true }
        }]
});
const AccountingBookModel = mongoose_1.default.model('libroContable', accountingBookSchema);
exports.default = AccountingBookModel;
