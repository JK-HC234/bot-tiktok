const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const path = require('path');
const { tiktok } = require('./comandos/tiktok');
const { ttdl } = require('./comandos/ttdl');

const { state, saveState } = useSingleFileAuthState('./session.json');

async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on('creds.update', saveState);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    const args = text.trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === '.tiktok') {
      await tiktok(sock, msg, args);
    }

    if (msg.message.buttonsResponseMessage) {
      await ttdl(sock, msg);
    }
  });
}

startBot();
