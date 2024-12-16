const { Client } = require('whatsapp-web.js');
import QRCodeTerminal from 'qrcode-terminal';
import { LocalAuth } from 'whatsapp-web.js';
let init: boolean = false


const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', (qr:any) => {
  QRCodeTerminal.generate(qr, { small: true });
});


client.on('ready', () => {
  init = true
  console.log('Client is ready!');
});

client.initialize();

export const sendMessage = (numberWhatsapp: string, message: string): void => {
  if (init === false) {
    throw new Error('Client is not initialized')
  } else {
    client.sendMessage(numberWhatsapp, message)
  }
}
