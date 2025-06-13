const { getInfo } = require('../lib/tiktok');

module.exports.tiktok = async (sock, msg, args) => {
  const from = msg.key.remoteJid;
  const q = args[0];
  if (!q) return sock.sendMessage(from, { text: '❗ Envía un enlace de TikTok.
Ejemplo: .tiktok https://vm.tiktok.com/xyz' }, { quoted: msg });

  try {
    const res = await getInfo(q);
    const buttons = [
      { buttonId: `hd|${res.video_hd}`, buttonText: { displayText: '📽 HD' }, type: 1 },
      { buttonId: `sd|${res.video_sd}`, buttonText: { displayText: '📱 SD' }, type: 1 },
      { buttonId: `mp3|${res.audio}`, buttonText: { displayText: '🎧 Audio' }, type: 1 }
    ];
    await sock.sendMessage(from, {
      text: `✅ Video encontrado: *${res.title}*`,
      buttons,
      headerType: 1
    }, { quoted: msg });
  } catch (err) {
    console.error(err);
    sock.sendMessage(from, { text: '❌ Error al obtener el video TikTok.' }, { quoted: msg });
  }
};
