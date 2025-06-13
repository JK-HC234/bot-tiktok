const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const { tiktok } = require('./lib/downloader.js');
const P = require('pino');
const fs = require('fs');

const { state, saveState } = useSingleFileAuthState('./session.json');

async function startBot() {
  const sock = makeWASocket({
    printQRInTerminal: true,
    auth: state,
    logger: P({ level: 'silent' })
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    const from = msg.key.remoteJid;

    if (text.startsWith('http') && text.includes('tiktok.com')) {
      try {
        const res = await tiktok(text);
        await sock.sendMessage(from, {
          text: 'Selecciona una calidad para descargar:',
          buttons: [
            { buttonId: `hd|${text}`, buttonText: { displayText: '🎥 HD' }, type: 1 },
            { buttonId: `sd|${text}`, buttonText: { displayText: '📺 SD' }, type: 1 },
            { buttonId: `mp3|${text}`, buttonText: { displayText: '🎧 Solo audio' }, type: 1 }
          ],
          footer: '🎬 Video encontrado',
          headerType: 1
        });
      } catch (e) {
        await sock.sendMessage(from, { text: '❌ Error al procesar el video.' });
      }
    }
  });

  sock.ev.on('creds.update', saveState);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || !msg.message.buttonsResponseMessage) return;

    const [type, url] = msg.message.buttonsResponseMessage.selectedButtonId.split('|');
    const from = msg.key.remoteJid;

    try {
      const res = await tiktok(url);
      let media = '';
      if (type === 'hd') media = res.video;
      if (type === 'sd') media = res.video_sd;
      if (type === 'mp3') media = res.music;

      await sock.sendMessage(from, { video: { url: media }, caption: '✅ Aquí tienes tu video' });
    } catch (e) {
      await sock.sendMessage(from, { text: '❌ Error al enviar el contenido.' });
    }
  });
}

startBot();