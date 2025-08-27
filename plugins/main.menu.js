const handler = async (m, { conn, usedPrefix, command}) => {
  const { name, age, registered, exp, coin, joincount} = global.db.data.users[m.sender];
  const userName = name || m.pushName || 'Usuario';
  const isRegistered = registered? '✅ Sí': '❌ No';
  const level = Math.floor(exp / 100);
  const fecha = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
});

  const tags = {
  main: toSerifBold('🌸 𝖬𝖾𝗇𝗎 𝖾𝗇𝖼𝖺𝗇𝗍𝖺𝖽𝗈'),
  group: toSerifBold('👥 𝖬𝖺𝗀𝗂𝖺 𝗀𝗋𝗎𝗉𝖺𝗅'),
  serbot: toSerifBold('🪄 𝖲𝗎𝖻 𝖡𝗈𝗍𝗌 & 𝖢𝗅𝗈𝗇𝖾𝗌'),
  tools: toSerifBold('🔧 𝖧𝖾𝖈𝗁𝗂𝗓𝗈𝗌 𝗎́𝗍𝗂𝗅𝗂𝗌'),
  kawaii: toSerifBold('🎀 𝖠𝗇𝗂𝗆𝖾 & 𝖪𝖺𝗐𝖺𝗂𝗂'),
  descargas: toSerifBold('📥 𝖣𝖾𝗌𝖼𝖺𝗋𝗀𝖺𝗌 𝗆𝖺́𝗀𝗂𝖼𝖺𝗌')
};

  const menu = `
╭─〔 𝖳𝗁𝖾-𝖿𝖾𝖽𝖾_𝖨𝖠: Menú Principal 〕─╮
📅 Fecha: ${fecha}
👤 Usuario: ${userName}
🎂 Edad: ${age || 'No definida'}
🧾 Registrado: ${isRegistered}
╰─────────────────────╯

📂 Categorías disponibles:

${Object.entries(tag).map(([k, v]) => `• ${v} → *${usedPrefix}menu ${k}*`).join('\n')}

> © ⍴᥆ᥕᥱrᥱძ ᑲᥡ 𝖣𝖾𝗏𝖥𝖾𝖽𝖾𝟣𝟥ㅤ🍁
`;

  await conn.sendMessage(m.chat, {
    text: menu.trim(),
    contextInfo: {
      externalAdReply: {
        title: '✦ Panel de Comandos ✦',
        body: 'Explora las funciones de The-fede_IA',
        thumbnailUrl: 'https://files.catbox.moe/r4w38m.jpg',
        sourceUrl: 'https://github.com/',
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
}
}
}, { quoted: m});
};

handler.command = ['menu', 'help', 'ayuda'];
handler.tags = ['main'];
handler.help = ['menu', 'help'];
handler.register = false;

export default handler;
