const axios = require('axios');

module.exports.getInfo = async (url) => {
  const { data } = await axios.get(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
  if (!data || !data.data || !data.data.play) throw 'No se pudo obtener el video';

  return {
    title: data.data.title || 'Video TikTok',
    video_hd: data.data.play,
    video_sd: data.data.play || data.data.wmplay,
    audio: data.data.music
  };
};
