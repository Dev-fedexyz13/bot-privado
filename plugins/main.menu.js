import fetch from 'node-fetch';
import moment from 'moment-timezone';

const toSerifBold = text => text.replace(/[a-zA-Z]/g, c =>
  String.fromCodePoint(c.codePointAt(0) + (c>= 'a'? 0x1D3A: 0x1D3A)));

const tags = {
  main: toSerifBold('🌸 Menú Encantado'),
  tools: toSerifBold('🔧 Hechizos Útiles'),
  kawaii: toSerifBold('🎀 Anime & Kawaii'),
  group: toSerifBold('👥 Magia Grupal')
};

const defaultMenu = {
  before: `
╭─〔 𝖳𝗁𝖾-𝖿𝖾𝖽𝖾_𝖨𝖠 〕─╮
👤 Nombre: *%name*
🎀 Nivel: *%level*
📈 Registro: *%totalreg*
🕐 Activo: *%muptime*
╰────────────────╯
%readmore`.trim(),
  header: '\n`%category 乂`\n',
  body: '.🍂.𖦹˙ %cmd',
  footer: '\n',
  after: ''
};

let handler = async (m, { conn, usedPrefix}) => {
  const name = await conn.getName(m.sender);
  const level = global.db.data.users[m.sender]?.level || 0;
  const totalreg = Object.keys(global.db.data.users).length;
  const muptime = clockString(process.uptime() * 1000);

  const help = Object.values(global.plugins).filter(p =>!p.disabled).map(p => ({
    help: Array.isArray(p.help)? p.help: [p.help],
    tags: Array.isArray(p.tags)? p.tags: [p.tags]
}));

  const { before, header, body, footer, after} = defaultMenu;

  let menuText = [
    before,
...Object.keys(tags).map(tag =>
      `${header.replace(/%category/g, tags[tag])}` +
      help.filter(p => p.tags.includes(tag)).map(p =>
        p.help.map(cmd => body.replace(/%cmd/g, usedPrefix + cmd)).join('\n')
).join('\n') + footer
),
    after
  ].join('\n');

  const replace = {
    name,
    level,
    totalreg,
    muptime,
    readmore: String.fromCharCode(8206).repeat(4001)
};

  const text = menuText.replace(/%(\w+)/g, (_, key) => replace[key] || '');

  const imageURL = 'https://files.catbox.moe/r4w38m.jpg';
  const imgBuffer = await fetch(imageURL).then(res => res.buffer());

  await conn.sendMessage(m.chat, {
    image: imgBuffer,
    caption: text,
    contextInfo: {
      mentionedJid: [m.sender]
}
}, { quoted: m});
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu'];
handler.register = false;

export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
