import axios from 'axios';

const MAX_FILE_SIZE = 280 * 1024 * 1024;
const HEAVY_FILE_THRESHOLD = 100 * 1024 * 1024;
const REQUEST_LIMIT = 3;
const REQUEST_WINDOW_MS = 10000;
const COOLDOWN_MS = 120000;

const requestTimestamps = [];
let isCooldown = false;
let isProcessingHeavy = false;

const isValidYouTubeUrl = url =>
  /youtu\.?be/.test(url);

const formatSize = bytes => {
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  while (bytes>= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
}
  return `${bytes.toFixed(2)} ${units[i]}`;
};

async function getSize(url) {
  const res = await axios.head(url, { timeout: 10000});
  return parseInt(res.headers['content-length'], 10);
}

async function ytdl(url) {
  const headers = { referer: 'https://id.ytmp3.mobi/'};
  const videoId = url.match(/(?:v=|\/)([\w\-_]{11})/)?.[1];
  if (!videoId) throw new Error('ID de video no encontrado');

  const init = await (await fetch(`https://d.ymcdn.org/api/v1/init?p=y&_=${Date.now()}`, { headers})).json();
  const convert = await (await fetch(`${init.convertURL}&v=${videoId}&f=mp3&_=${Date.now()}`, { headers})).json();

  for (let i = 0; i < 3; i++) {
    const res = await fetch(convert.progressURL, { headers});
    const info = await res.json();
    if (info.progress === 3) return { url: convert.downloadURL, title: info.title};
    await new Promise(r => setTimeout(r, 1000));
}

  throw new Error('No se pudo obtener la URL de descarga');
}

function checkRequestLimit() {
  const now = Date.now();
  requestTimestamps.push(now);
  while (requestTimestamps.length> 0 && now - requestTimestamps[0]> REQUEST_WINDOW_MS) {
    requestTimestamps.shift();
}
  if (requestTimestamps.length>= REQUEST_LIMIT) {
    isCooldown = true;
    setTimeout(() => {
      isCooldown = false;
      requestTimestamps.length = 0;
}, COOLDOWN_MS);
    return false;
}
  return true;
}

let handler = async (m, { conn, text, usedPrefix, command}) => {
  const react = emoji => m.react(emoji);

  if (!text) return conn.reply(m.chat, `🎧 Uso: ${usedPrefix}${command} <enlace de YouTube>`, m);
  if (!isValidYouTubeUrl(text)) return m.reply('🚫 Enlace inválido');

  if (isCooldown ||!checkRequestLimit()) return m.reply('⏳ Muchas solicitudes. Espera 2 minutos.');
  if (isProcessingHeavy) return m.reply('⚠️ Ya estoy procesando un archivo pesado.');

  await react('⏳');

  try {
    const { url, title} = await ytdl(text);
    const size = await getSize(url);
    if (size> MAX_FILE_SIZE) throw new Error('📦 El archivo supera el límite de 280 MB');

    if (size> HEAVY_FILE_THRESHOLD) {
      isProcessingHeavy = true;
      await conn.reply(m.chat, '💾 Descargando archivo grande...', m);
}

    const caption = `
╭─ 🎧 *𝖳𝗁𝖾-𝖿𝖾𝖽𝖾_𝖨𝖠* ─╮
│ 🧿 *Título:* ${title}
│ 📦 *Tamaño:* ${formatSize(size)}
│ 🔗 *Origen:* ${text}
╰────────────────╯`.trim();

    const buffer = await fetch(url).then(res => res.buffer());
    await conn.sendFile(
      m.chat,
      buffer,
      `${title}.mp3`,
      caption,
      m,
      null,
      {
        mimetype: 'audio/mpeg',
        asDocument: size> 70 * 1024 * 1024,
        filename: `${title}.mp3`
}
);

    await react('✅');
    isProcessingHeavy = false;
} catch (e) {
    await react('❌');
    isProcessingHeavy = false;
    return m.reply(`🧨 *ERROR:* ${e.message}`);
}
};

handler.help = ['ytmp3 <url>'];
handler.tags = ['descargas'];
handler.command = ['ytmp3'];
handler.black = true;

export default handler;
