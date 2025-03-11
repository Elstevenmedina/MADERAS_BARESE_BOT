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
const weeklyCollectionRecordSchema = new mongoose_1.Schema({
    Almacen: { type: String, require: true },
    Fecha: { type: String, require: true },
    Numero: { type: Number, require: true },
    Notas: [{
            Numero: { type: String, require: true },
            Cliente: { type: String, require: true },
            Neto: { type: Number, require: true },
            MontoCancelado: { type: Number },
            Saldo: { type: String, require: true }
        }],
    Pagos: [{
            Fecha: { type: String, require: true },
            Comentario: { type: String, require: true },
            Monto: { type: Number, require: true }
        }],
    PagadoTotal: { type: Number, require: true },
    Timestamp: { type: String, require: true }
});
const WeeklyCollectionRecordModel = mongoose_1.default.model('constancias semanales cobros', weeklyCollectionRecordSchema);
exports.default = WeeklyCollectionRecordModel;
