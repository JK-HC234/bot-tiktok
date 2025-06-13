module.exports.ttdl = async (sock, msg) => {
  const from = msg.key.remoteJid;
  const data = msg.message.buttonsResponseMessage.selectedButtonId.split('|');
  const tipo = data[0];
  const url = data[1];

  if (tipo === 'mp3') {
    await sock.sendMessage(from, {
      document: { url },
      mimetype: 'audio/mpeg',
      fileName: 'audio.mp3'
    }, { quoted: msg });
  } else {
    await sock.sendMessage(from, {
      video: { url },
      caption: '✅ Aquí tienes tu video TikTok sin marca de agua.'
    }, { quoted: msg });
  }
};
