import { exec} from 'child_process';

let handler = async (m, { conn}) => {
  const emojiStart = '🔄';
  const emojiSuccess = '✅';
  const emojiUpToDate = '📦';
  const emojiError = '❌';

  const botOficialJID = '5491137612743@s.whatsapp.net';
  const creadorJID = '5491156178758@s.whatsapp.net';

  const esBotOficial = conn.user.jid === botOficialJID;
  const esCreador = m.sender === creadorJID;

  if (!esBotOficial &&!esCreador) {
    return m.reply(`${emojiError} 𝖤𝗌𝗍𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈 𝖾𝗌 𝖾𝗑𝖼𝗅𝗎𝗌𝗂𝗏𝗈 𝖽𝖾𝗅 𝖡𝗈𝗍 𝖮𝖿𝗂𝖼𝗂𝖺𝗅 𝗈 𝖽𝖾𝗅 𝖢𝗋𝖾𝖺𝖽𝗈𝗋.\n🕷️ 𝖫𝗈𝗌 𝗌𝗎𝖻𝖻𝗈𝗍𝗌 𝗇𝗈 𝗉𝗎𝖾𝖽𝖾𝗇 𝖾𝗃𝖾𝖼𝗎𝗍𝖺𝗋 𝖺𝖼𝗍𝗎𝖺𝗅𝗂𝗓𝖺𝖼𝗂𝗈𝗇.`);
}

  await m.reply(`${emojiStart} 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 está verificando actualizaciones...`);

  exec('git update-ref -d refs/remotes/origin/main', () => {
    exec('git reset --hard', () => {
      exec('git pull', (err, stdout) => {
        if (err) {
          return conn.reply(m.chat, `${emojiError} 𝖤𝗋𝗋𝗈𝗋: No se pudo completar la actualización.\n📎 Razón: ${err.message}`, m);
}

        if (stdout.includes('Already up to date.')) {
          return conn.reply(m.chat, `${emojiUpToDate} 𝖤𝗅 𝖻𝗈𝗍 ya está completamente actualizado.`, m);
}

        conn.reply(m.chat, `${emojiSuccess} 𝖠𝖼𝗍𝗎𝖺𝗅𝗂𝗓𝖺𝖼𝗂𝗈́𝗇 completada con éxito.\n\n🧾 Detalles:\n${stdout}`, m);
});
});
});
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update'];
handler.rowner = true;

export default handler;
