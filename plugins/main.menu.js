import fs from 'fs';
import fetch from 'node-fetch';
import moment from 'moment-timezone';
import { join} from 'path';

let handler = async (m, { conn, text, command, usedPrefix}) => {
  try {
    await m.react('🌑');

    const who = m.mentionedJid?.[0] || (m.fromMe? conn.user.jid: m.sender);
    const perfil = await conn.profilePictureUrl(who, 'image').catch(() => 'https://qu.ax/QGAVS.jpg');
    const fecha = moment().tz('America/Lima').format('DD/MM/YYYY');
    const hora = moment().tz('America/Lima').format('HH:mm:ss');
    const saludo = ucapan();
    const taguser = '@' + m.sender.split('@')[0];
    const video = ['https://files.cloudkuimages.guru/videos/9yNRmc4K.mp4'].getRandom();

    const menu = `
˚🌑｡ *𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍-𝖬𝖣* te saluda...
${taguser}, ${saludo}

╭─「 𝖨𝖣𝖤𝖭𝖳𝖨𝖣𝖠𝖣 」─╮
│ 🕶️ *Bot:* 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍-𝖬𝖣
│ 🧠 *Versión:* 1.1.1 (Beta)
│ 🕰️ *Hora:* ${hora}
│ 📆 *Fecha:* ${fecha}
│ 👤 *Creador:* 𝖣𝖾𝗏-𝖿𝖾𝖽𝖾𝗑𝗒𝗓
╰────────────────────╯

🩸 *Estado:* Operativo
⚔️ *Clan:* Uchiha Protocol
📡 *Modo:* Silencio estratégico

˚📂｡

╭─「 𝖨𝖭𝖥𝖮 」─╮
🍁 ${usedPrefix}menu
🍁 ${usedPrefix}unreg
🍁 ${usedPrefix}reg user.17
╰──────────────╯

˚🔍｡

╭─「 𝖲𝖤𝖠𝖱𝖢𝖧 」─╮
🍁 ${usedPrefix}tiktoks
🍁 ${usedPrefix}tiktoksearch
🍁 ${usedPrefix}ytsearch
╰──────────────╯

˚🖼｡

╭─「 𝖨𝖬Á𝖦𝖤𝖭𝖤𝖲 」─╮
🍁 ${usedPrefix}imagen
🍁 ${usedPrefix}img
🍁 ${usedPrefix}wallpaper
╰──────────────╯

˚🧾｡

╭─「 𝖤𝖲𝖳𝖠𝖣𝖮 」─╮
🍁 ${usedPrefix}status
🍁 ${usedPrefix}ping
🍁 ${usedPrefix}tiempo
╰──────────────╯
`.trim();

    await conn.sendMessage(m.chat, {
      video: { url: video},
      caption: menu,
      buttons: [
        {
          buttonId: `${usedPrefix}reg SINNOMBRE.17`,
          buttonText: { displayText: '🌑 𝖵𝖤𝖱𝖨𝖥𝖨𝖢𝖠𝖱'},
          type: 1
}
      ],
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 999,
        externalAdReply: {
          title: '🌑 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍-𝖬𝖣 | Inteligencia desde las sombras',
          thumbnailUrl: perfil,
          mediaType: 1,
          renderLargerThumbnail: false
}
},
      gifPlayback: true,
      gifAttribution: 0
}, { quoted: null});

} catch (e) {
    await m.reply(`⚠️ *Error al enviar el menú.*\n\n${e}`);
}
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'help', 'menú', 'allmenú', 'allmenu', 'menucompleto'];
handler.register = false;

export default handler;

// 🕰️ Saludo contextual
function ucapan() {
  const time = moment.tz('America/Lima').format('HH');
  if (time>= 5 && time < 11) return 'Bᴜᴇɴᴀ Mᴀᴅʀᴜɢᴀᴅᴀ 🏙️';
  if (time>= 11 && time < 17) return 'Bᴜᴇɴ Dɪ́ᴀ 🏞️';
  if (time>= 17 && time < 20) return 'Hᴇʀᴍᴏsᴀ Tᴀʀᴅᴇ 🌆';
  return 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃';
}

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000);
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60;
  let s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}
