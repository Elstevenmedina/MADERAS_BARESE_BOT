"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMovementProduct = void 0;
const products_1 = __importDefault(require("../models/products"));
const moment_1 = require("../moment");
const newMovementProduct = async (products, numberDocument, type, description) => {
    var _a;
    const typeMovement = (type === 1) ? 'Carga' : 'Descarga';
    for (const product of products) {
        const productInfo = await products_1.default.findOne({ Codigo: product.Codigo }).select('Cantidad');
        if (productInfo !== undefined && productInfo !== null) {
            product.Cantidad2 = (_a = product.Cantidad2) !== null && _a !== void 0 ? _a : product.Cantidad;
            const quantity = (type === 1) ? productInfo.Cantidad + +product.Cantidad2 : productInfo.Cantidad - +product.Cantidad2;
            const HistoryMovement = {
                FechaMovimiento: (0, moment_1.getDate)(),
                TipoMovimiento: typeMovement.toUpperCase(),
                CantidadAnterior: productInfo.Cantidad,
                CantidadMovida: +product.Cantidad2,
                CantidadNueva: quantity,
                Comentario: `${description} #${numberDocument}`,
                Timestamp: Date.now()
            };
            await products_1.default.findByIdAndUpdate(productInfo._id, {
                Cantidad: quantity,
                $push: { HistorialMovimiento: HistoryMovement }
            });
        }
    }
};
exports.newMovementProduct = newMovementProduct;
