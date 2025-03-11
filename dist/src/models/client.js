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
const clientechema = new mongoose_1.Schema({
    _idVendedor: { type: String, require: true },
    Apellidos: { type: String, require: true },
    ApellidosVendedor: { type: String, require: true },
    Cedula: { type: String, require: true },
    Codigo: { type: Number, require: true },
    CodigoPostal: { type: String },
    CodigoZona: { type: String, require: true },
    Contacto1: { type: String, require: true },
    Contacto2: { type: String },
    Direccion: { type: String, require: true },
    email: { type: String, require: true },
    Empresa: { type: String, require: true },
    Estado: { type: String, default: 'Activo' },
    Nombres: { type: String, require: true },
    NombresVendedor: { type: String, require: true },
    NumeroAdministrativo: { type: String, require: true },
    RIF: { type: String, require: true },
    SaldoFavor: { type: Number, default: 0 },
    TipoPrecio: { type: String, require: true },
    Zona: { type: String, require: true }
});
const ClientModel = mongoose_1.default.model('clientes', clientechema);
exports.default = ClientModel;
