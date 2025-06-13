import { tiktok } from './lib/downloader.js';

export default async function handler(sock, m) {
  if (!m.message) return;
  const from = m.key.remoteJid;
  const body = m.message.conversation || m.message.extendedTextMessage?.text || '';
  const isCommand = body.startsWith('http');

  if (isCommand && body.includes('tiktok.com')) {
    const url = body.trim();
    await sock.sendMessage(from, { text: '⏳ Descargando video, espera un momento...' });

    try {
      const result = await tiktok(url);
      const buttons = [
        { buttonId: `hd|${url}`, buttonText: { displayText: '🎥 HD' }, type: 1 },
        { buttonId: `sd|${url}`, buttonText: { displayText: '📱 SD' }, type: 1 },
        { buttonId: `mp3|${url}`, buttonText: { displayText: '🎵 Audio' }, type: 1 },
      ];
      const buttonMessage = {
        text: '✅ Elige la calidad:',
        footer: 'Bot TikTok by JAHSEH',
        buttons,
        headerType: 1,
      };
      await sock.sendMessage(from, buttonMessage);
    } catch (e) {
      console.error(e);
      await sock.sendMessage(from, { text: '❌ Error al descargar el video.' });
    }
  }

  if (m.message.buttonsResponseMessage) {
    const [type, url] = m.message.buttonsResponseMessage.selectedButtonId.split('|');
    try {
      const result = await tiktok(url);
      if (type === 'hd') {
        await sock.sendMessage(from, {
          video: { url: result.video },
          caption: '✅ Video en HD'
        });
      } else if (type === 'sd') {
        await sock.sendMessage(from, {
          video: { url: result.video_sd },
          caption: '✅ Video en SD'
        });
      } else if (type === 'mp3') {
        await sock.sendMessage(from, {
          audio: { url: result.music },
          mimetype: 'audio/mp4'
        });
      }
    } catch (e) {
      console.error(e);
      await sock.sendMessage(from, { text: '❌ Error al descargar el contenido.' });
    }
  }
}