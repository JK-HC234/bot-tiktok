const fetch = require('node-fetch');

async function tiktok(url) {
  const res = await fetch(`https://api.tiklydown.me/api/download?url=${encodeURIComponent(url)}`);
  const json = await res.json();
  if (!json.status || !json.result) throw new Error('No se pudo obtener el video.');
  return {
    video: json.result.video[0],
    video_sd: json.result.video[1],
    music: json.result.music,
    title: json.result.title || 'Video TikTok'
  };
}

module.exports = { tiktok };