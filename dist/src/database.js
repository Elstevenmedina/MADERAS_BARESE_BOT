"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const initDB = (DB_HOST) => {
    const connectWithRetry = () => {
        mongoose_1.default.connect(DB_HOST)
            .then(db => { console.log('DB is connected'); })
            .catch(err => {
            console.error(`Error connecting to DB: ${err}`);
            console.log('Retrying connection in 5 seconds...');
            setTimeout(connectWithRetry, 5000);
        });
    };
    connectWithRetry();
};
exports.initDB = initDB;
