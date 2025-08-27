import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) {
    throw `❗ Ingresa el nombre del video que deseas buscar.\n📌 Ejemplo: ${usedPrefix + command} Naruto openings`;
}

  const search = await yts(text);
  const videoInfo = search.all?.[0];

  if (!videoInfo) {
    throw '❗ No se encontraron resultados. Intenta con otro título o palabra clave.';
}

  const body = `\`\`\`
⚔️ 𝖳𝗁𝖾-𝖿𝖾𝖽𝖾_𝖨𝖠 — Descargas rápidas

🔍 Resultado encontrado:
🎬 *${videoInfo.title}*

Selecciona una opción para descargar:
🎧 Audio (.mp3)
📽️ Video (.mp4)
\`\`\``;

  await conn.sendMessage(
    m.chat,
    {
      image: { url: videoInfo.thumbnail},
      caption: body,
      footer: `𝖳𝗁𝖾-𝖿𝖾𝖽𝖾_𝖨𝖠 ⚔️ | 🤖 Bot de WhatsApp`,
      buttons: [
        { buttonId: `.ytmp3 ${videoInfo.url}`, buttonText: { displayText: '🎧 Descargar Audio'}},
        { buttonId: `.ytmp4 ${videoInfo.url}`, buttonText: { displayText: '📽️ Descargar Video'}},
      ],
      viewOnce: true,
      headerType: 4,
},
    { quoted: m}
);

  m.react('✅'); // Confirmación visual
};

handler.command = ['play', 'playvid', 'play2'];
handler.tags = ['descargas'];
handler.group = true;
handler.limit = 6;

export default handler;
