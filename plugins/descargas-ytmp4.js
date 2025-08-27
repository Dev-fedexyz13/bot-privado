import axios from 'axios';

const MAX = 280 * 1024 * 1024;
let isBusy = false;

const isValid = u => /youtu\.?be/.test(u);
const format = b => ['B','KB','MB','GB'].reduce((r, u, i) => b < 1024 ** (i + 1)? r || `${(b / 1024 ** i).toFixed(2)} ${u}`: r, '');

const getSize = async u => parseInt((await axios.head(u)).headers['content-length'], 10);

const fetchMedia = async (id, type) => {
  const h = { referer: 'https://id.ytmp3.mobi/'};
  const i = await (await fetch(`https://d.ymcdn.org/api/v1/init?p=${type}&_=${Date.now()}`, { headers: h})).json();
  const c = await (await fetch(`${i.convertURL}&v=${id}&f=${type}&_=${Date.now()}`, { headers: h})).json();
  for (let j = 0; j < 3; j++) {
    const p = await (await fetch(c.progressURL, { headers: h})).json();
    if (p.progress === 3) return { url: c.downloadURL, title: p.title};
    await new Promise(r => setTimeout(r, 1000));
}
  throw 'No se pudo convertir';
};

const handler = async (m, { conn, text, command}) => {
  if (!text ||!isValid(text)) return m.reply('🔗 Enlace inválido');
  if (isBusy) return m.reply('⏳ Espera, estoy procesando otro archivo');
  isBusy = true;

  try {
    const id = text.match(/(?:v=|\/)([\w\-_]{11})/)?.[1];
    const type = command.includes('mp3')? 'y': 'v';
    const { url, title} = await fetchMedia(id, type);
    const size = await getSize(url);
    if (size> MAX) throw '📦 Archivo demasiado grande';

    const caption = `🎶 *${title}*\n📦 *${format(size)}*\n🤖 *𝖳𝗁𝖾-𝖿𝖾𝖽𝖾_𝖨𝖠*`;
    const buffer = await fetch(url).then(r => r.buffer());

    await conn.sendFile(m.chat, buffer, `${title}.${type === 'y'? 'mp3': 'mp4'}`, caption, m, null, {
      mimetype: type === 'y'? 'audio/mpeg': 'video/mp4',
      asDocument: size> 70 * 1024 * 1024,
      filename: `${title}.${type === 'y'? 'mp3': 'mp4'}`
});

} catch (e) {
    m.reply(`❌ ${e}`);
} finally {
    isBusy = false;
}
};

handler.command = ['ytmp3', 'ytmp4'];
handler.tags = ['descargas'];
handler.black = true;

export default handler;
