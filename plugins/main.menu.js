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

  const tag = {
    main: '🌸 𝖬𝖾𝗇𝗎 𝖾𝗇𝖼𝖺𝗇𝗍𝖺𝖽𝗈',
    group: '👥 𝖬𝖺𝗀𝗂𝖺 𝗀𝗋𝗎𝗉𝖺𝗅',
    serbot: '🪄 𝖲𝗎𝖻 𝖡𝗈𝗍𝗌 & 𝖢𝗅𝗈𝗇𝖾𝗌',
    tools: '🔧 𝖧𝖾𝖈𝗁𝗂𝗓𝗈𝗌 𝗎́𝗍𝗂𝗅𝗂𝗌',
    kawaii: '🎀 𝖠𝗇𝗂𝗆𝖾 & 𝖪𝖺𝗐𝖺𝗂𝗂',
    descargas: '📥 𝖣𝖾𝗌𝖼𝖺𝗋𝗀𝖺𝗌 𝗆𝖺́𝗀𝗂𝖼𝖺𝗌'
};

  const categoryFormat = {
    readmore: `%readmore`.trim(),
    header: '\n`%category 乂`\n',
    body: '.🍂.𖦹˙ %cmd %iscorazones %isPremium',
    footer: '\n',
    after: ``
};

  const menu = `
╭──●〔 Menú Principal 〕●──╮
📅 Fecha: ${fecha}
👤 Nombre: ${userName}
🎂 Edad: ${age || 'No definida'}
🧾 Registrado: ${isRegistered}
╰────────────────────╯

📂 Categorías disponibles:

${Object.entries(tag).map(([k, v]) => `• ${v} → *${usedPrefix}menu ${k}*`).join('\n')}

${categoryFormat.readmore}

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
