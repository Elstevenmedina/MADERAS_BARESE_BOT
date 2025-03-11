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
const purchaseOrderSchema = new mongoose_1.Schema({
    _idCliente: { type: String, require: true },
    _idUserClient: { type: String, require: true },
    _idVendedor: { type: String, require: true },
    CantidadTotal: { type: Number, require: true },
    Cliente: { type: String, require: true },
    Estado: { type: String, default: 'Pendiente' },
    Fecha: { type: String, require: true },
    Numero: { type: String, require: true },
    PrecioTotal: { type: Number, require: true },
    Productos: [
        {
            Codigo: { type: String, require: true },
            Descripcion: { type: String, require: true },
            Cantidad: { type: String, require: true },
            Cantidad2: { type: String, require: true },
            PrecioUnidad: { type: String, require: true },
            PrecioTotal: { type: String, require: true },
            PrecioTotal2: { type: String, require: true }
        }
    ],
    Timestamp: { type: Number, require: true },
    Vendedor: { type: String, require: true }
});
const PurchaseOrderModel = mongoose_1.default.model('ordenes Compras Clientes Vendedores', purchaseOrderSchema);
exports.default = PurchaseOrderModel;
