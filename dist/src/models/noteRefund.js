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
const noteRefundSchema = new mongoose_1.Schema({
    CantidadTotal: { type: Number, require: true },
    Cliente: { type: String, require: true },
    Comentario: { type: String, require: true },
    ComentarioAnualcion: { type: String, default: '' },
    Direccion: { type: String, require: true },
    Estado: { type: String, default: 'Procesado' },
    Fecha: { type: String, require: true },
    NotaEntrega: { type: Number, require: true },
    Numero: { type: Number, require: true },
    PrecioActualNota: { type: Number, require: true },
    Productos: [{
            Codigo: { type: String, require: true },
            Cantidad: { type: Number, require: true },
            Valor: { type: Number, require: true }
        }],
    RIF: { type: String, require: true },
    Telefono: { type: String, require: true },
    Timestamp: { type: Number, default: Date.now() },
    ValorTotal: { type: Number, require: true }
});
const NoteRefundModel = mongoose_1.default.model('notasDevoluciones', noteRefundSchema);
exports.default = NoteRefundModel;
