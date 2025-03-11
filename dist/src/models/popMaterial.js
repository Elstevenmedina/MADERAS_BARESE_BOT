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
const popMaterialSchema = new mongoose_1.Schema({
    Codigo: { type: String, require: true },
    Descripcion: { type: String, require: true },
    TipoProducto: { type: String, default: 'Material POP' },
    Cantidad: { type: String, require: true },
    CostoFOB: { type: Number, require: true },
    CostoFOBSB: { type: Number, require: true },
    CostoSB: { type: Number, require: true },
    PrecioVentaSB: { type: Number, require: true },
    PrecioGranMayor: { type: Number, require: true },
    PrecioMayor: { type: Number, require: true },
    PrecioDetal: { type: Number, require: true },
    HistorialMovimiento: [
        {
            FechaMovimiento: { type: String, require: true },
            CantidadAnterior: { type: Number, require: true },
            CantidadMovida: { type: Number, require: true },
            CantidadNueva: { type: Number, require: true },
            Comentario: { type: String, require: true },
            Timestamp: { type: Number, require: true },
            CodigoMovimiento: { type: String, require: true },
            TipoMovimiento: { type: String, require: true }
        }
    ],
    HistorialMovimientoB: [
        {
            FechaMovimiento: { type: String, require: true },
            CantidadAnterior: { type: Number, require: true },
            CantidadMovida: { type: Number, require: true },
            CantidadNueva: { type: Number, require: true },
            Comentario: { type: String, require: true },
            Timestamp: { type: Number, require: true },
            CodigoMovimiento: { type: String, require: true },
            TipoMovimiento: { type: String, require: true }
        }
    ]
});
const PopMaterialModel = mongoose_1.default.model('material POP', popMaterialSchema);
exports.default = PopMaterialModel;
