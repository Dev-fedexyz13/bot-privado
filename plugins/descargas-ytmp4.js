import axios from 'axios';

const MAX = 280 * 1024 * 1024;
const HEAVY = 100 * 1024 * 1024;
let isBusy = false;

const isValid = url =>
  /youtu\.?be/.test(url);

const format = b => {
  const u = ['B','KB','MB','GB'];
  let i = 0;
  while (b>= 1024 && i < u.length - 1) b /= 1024, i++;
  return `${b.toFixed(2)} ${u[i]}`;
};

const getSize = async url => {
  const r = await axios.head(url);
  return parseInt(r.headers['content-length'], 10);
};

const ytdl = async url => {
  const id = url.match(/(?:v=|\/)([\w\-_]{11})/)?.[1];
  if (!id) throw 'ID inválido';
  const h = { referer: 'https://id.ytmp3.mobi/'};
  const i = await (await fetch(`https://d.ymcdn.org/api/v1/init?p=y&_=${Date.now()}`, { headers: h})).json();
  const c = await (await fetch(`${i.convertURL}&v=${id}&f=mp4&_=${Date.now()}`, { headers: h})).json();
  for (let j = 0; j < 3; j++) {
    const p = await (await fetch(c.progressURL, { headers: h})).json();
    if (p.progress === 3) return { url: c.downloadURL, title: p.title};
    await new Promise(r => setTimeout(r, 1000));
}
  throw 'No se pudo convertir';
};

const handler = async (m, { conn, text}) => {
  if (!text ||!isValid(text)) return m.reply('🔗 Enlace inválido');

  if (isBusy) return m.reply('⏳ Espera, estoy procesando otro archivo');
  isBusy = true;

  try {
    const { url, title} = await ytdl(text);
    const size = await getSize(url);
    if (size> MAX) throw '📦 Archivo demasiado grande';

    const caption = `🎬 *${title}*\n📦 *${format(size)}*\n🤖 *𝖳𝗁𝖾-𝖿𝖾𝖽𝖾_𝖨𝖠*`;
    const buffer = await fetch(url).then(r => r.buffer());

    await conn.sendFile(m.chat, buffer, `${title}.mp4`, caption, m, null, {
      mimetype: 'video/mp4',
      asDocument: size> HEAVY,
      filename: `${title}.mp4`
});

} catch (e) {
    m.reply(`❌ ${e}`);
} finally {
    isBusy = false;
}
};

handler.command = ['ytmp4'];
handler.tags = ['descargas'];
handler.black = true;

export default handler;
