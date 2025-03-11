"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newActivity = void 0;
const historyActivity_1 = __importDefault(require("../models/historyActivity"));
const moment_1 = require("../moment");
const newActivity = async (user, _idUser, systemSection, action) => {
    const fullDate = (0, moment_1.getFullDate)();
    const newHistoryActivity = new historyActivity_1.default({
        Fecha: fullDate,
        Timestamp: Date.now(),
        Usuario: user,
        _idUsuario: _idUser,
        SeccionSistema: systemSection,
        Accion: action
    });
    return await newHistoryActivity.save();
};
exports.newActivity = newActivity;
