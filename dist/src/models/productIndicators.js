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
const productIndicatorsSchema = new mongoose_1.Schema({
    AmortiguadoresFacturados: { type: String, require: true },
    BasesFacturados: { type: String, require: true },
    BootFacturados: { type: String, require: true },
    AmortiguadoresCantidad: { type: String, require: true },
    BasesCantidad: { type: String, require: true },
    BootCantidad: { type: String, require: true },
    MesesAmortiguadores: [{
            Codigo: { type: String, require: true },
            Mes: { type: String, require: true },
            Anio: { type: String, require: true },
            NumeroMes: { type: String, require: true },
            MontoGeneral: { type: String, require: true },
            Cantidad: { type: String, require: true }
        }],
    MesesBases: [{
            Codigo: { type: String, require: true },
            Mes: { type: String, require: true },
            Anio: { type: String, require: true },
            NumeroMes: { type: String, require: true },
            MontoGeneral: { type: String, require: true },
            Cantidad: { type: String, require: true }
        }],
    MesesBoots: [{
            Codigo: { type: String, require: true },
            Mes: { type: String, require: true },
            Anio: { type: String, require: true },
            NumeroMes: { type: String, require: true },
            MontoGeneral: { type: String, require: true },
            Cantidad: { type: String, require: true }
        }]
});
const ProductIndicatorsModel = mongoose_1.default.model('indicadores_productos', productIndicatorsSchema);
exports.default = ProductIndicatorsModel;
