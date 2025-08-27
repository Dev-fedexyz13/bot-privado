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
    info: '📌 Información',
    tools: '🧰 Herramientas',
    fun: '🎮 Diversión',
    media: '🖼️ Multimedia',
    ai: '🧠 Inteligencia',
    group: '👥 Grupo',
    owner: '🔒 Propietario',
    premium: '💎 Premium'
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

📎 Usa *${usedPrefix}menu <categoría>* para ver comandos específicos.
🔧 Ejemplo: *${usedPrefix}menu ai*
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
