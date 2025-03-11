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
const notesRefundAmountSchema = new mongoose_1.Schema({
    Celular: { type: String, require: true },
    Cliente: { type: String, require: true },
    Comentario: { type: String, require: true },
    Direccion: { type: String, require: true },
    Documento: { type: String, require: true },
    EstadoGeneral: { type: String, default: 'Procesada' },
    EstadoLibro: { type: String, default: 'Sin incluir' },
    Fecha: { type: String, require: true },
    NotaEntrega: { type: Number, require: true },
    PrecioActualNota: { type: Number, require: true },
    Productos: [{
            NotaEntrega: { type: String, require: true },
            Precio: { type: Number, require: true }
        }],
    Recibo: { type: Number, require: true },
    Timestamp: { type: Number, require: true },
    Titulo: { type: String, require: true }
});
const NotesRefundAmountModel = mongoose_1.default.model('notasDevolucionPorMonto', notesRefundAmountSchema);
exports.default = NotesRefundAmountModel;
