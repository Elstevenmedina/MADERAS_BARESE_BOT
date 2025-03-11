"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const { Client } = require('whatsapp-web.js');
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const whatsapp_web_js_1 = require("whatsapp-web.js");
let init = false;
const client = new Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});
client.on('qr', (qr) => {
    qrcode_terminal_1.default.generate(qr, { small: true });
});
client.on('ready', () => {
    init = true;
    console.log('Client is ready!');
});
client.initialize();
const sendMessage = (numberWhatsapp, message) => {
    if (init === false) {
        throw new Error('Client is not initialized');
    }
    else {
        client.sendMessage(numberWhatsapp, message);
    }
};
exports.sendMessage = sendMessage;
