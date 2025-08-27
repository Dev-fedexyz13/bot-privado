import fetch from 'node-fetch';

const toSerifBold = (text) => {
  const map = {
    a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴',
    h: '𝗵', i: '𝗶', j: '𝗷', k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻',
    o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', s: '𝘀', t: '𝘁', u: '𝘂',
    v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇',
    A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚',
    H: '𝗛', I: '𝗜', J: '𝗝', K: '𝗞', L: '𝗟', M: '𝗠', N: '𝗡',
    O: '𝗢', P: '𝗣', Q: '𝗤', R: '𝗥', S: '𝗦', T: '𝗧', U: '𝗨',
    V: '𝗩', W: '𝗪', X: '𝗫', Y: '𝗬', Z: '𝗭'
};
  return text.split('').map(c => map[c] || c).join('');
};

const tags = {
  main: toSerifBold('🌸 𝖬𝖾𝗇𝗎 𝖾𝗇𝖼𝖺𝗇𝗍𝖺𝖽𝗈'),
  group: toSerifBold('👥 𝖬𝖺𝗀𝗂𝖺 𝗀𝗋𝗎𝗉𝖺𝗅'),
  serbot: toSerifBold('🪄 𝖲𝗎𝖻 𝖡𝗈𝗍𝗌 & 𝖢𝗅𝗈𝗇𝖾𝗌'),
  tools: toSerifBold('🔧 𝖧𝖾𝖈𝗁𝗂𝗓𝗈𝗌 𝗎́𝗍𝗂𝗅𝗂𝗌'),
  kawaii: toSerifBold('🎀 𝖠𝗇𝗂𝗆𝖾 & 𝖪𝖺𝗐𝖺𝗂𝗂'),
  descargas: toSerifBold('📥 𝖣𝖾𝗌𝖼𝖺𝗋𝗀𝖺𝗌 𝗆𝖺́𝗀𝗂𝖼𝖺𝗌')
};

const defaultMenu = {
  before: `
╭──●〔 𝖳𝗁𝖾-𝖿𝖾𝖽𝖾_𝖨𝖠 〕●──╮
👤 Nombre: *%name*
🎀 Nivel: *%level*
📈 Registro: *%totalreg*
🕐 Activo: *%muptime*
╰───────────────╯
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
