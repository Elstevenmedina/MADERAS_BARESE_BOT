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
const paymentNoteSchema = new mongoose_1.Schema({
    Cliente: { type: String, require: true },
    Comentario: { type: String, require: true },
    ComentarioAnualcion: { type: String, default: '' },
    Direccion: { type: String, require: true },
    Estado: { type: String, default: 'Procesado' },
    Fecha: { type: String, require: true },
    Numero: { type: Number, require: true },
    Notas: [{
            Nota: { type: String, require: true },
            Pendiente: { type: Number },
            Pago: { type: Number, require: true },
            Restante: { type: Number },
            Observacion: { type: String, require: true },
            Modalidad: { type: String, require: true },
            Destino: { type: String },
            Referencia: { type: String },
            Comentario: { type: String, require: true }
        }],
    PagadoTotal: { type: Number, require: true },
    Pendiente: { type: Number, require: true },
    RIF: { type: String, require: true },
    SaldoFavorInlcuido: { type: Number, require: true },
    SubTotal: { type: Number, require: true },
    Telefono: { type: String, require: true },
    Timestamp: { type: String, require: true }
});
const PaymentNoteModel = mongoose_1.default.model('notasPago', paymentNoteSchema);
exports.default = PaymentNoteModel;
