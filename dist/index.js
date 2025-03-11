"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./src/database");
const dotenv_1 = __importDefault(require("dotenv"));
const toClients_1 = require("./src/whatsapp/send-messages/toClients");
const dailyClosing_1 = require("./src/whatsapp/send-messages/toAdministration/dailyClosing");
const toSellers_1 = require("./src/whatsapp/send-messages/toSellers");
const clientDebt_1 = require("./src/whatsapp/send-messages/toAdministration/clientDebt");
const notificationMessages_1 = require("./src/whatsapp/send-messages/toAdministration/notificationMessages");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const DB_HOST = 'mongodb+srv://maderasbaresebd:dREn3bZgEg16tlEV@maderasbaresse.oantw.mongodb.net/maderas';
(0, database_1.initDB)(DB_HOST);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    toClients_1.sendMessagesClients.start();
    dailyClosing_1.sendDailyClosing.start();
    toSellers_1.sendMessagesSellers.start();
    clientDebt_1.sendClientDebt.start();
    notificationMessages_1.sendNotificaronMessages.start();
});
