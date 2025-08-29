import { exec} from 'child_process';

let handler = async (m, { conn}) => {
  const emojiStart = '🔄';
  const emojiSuccess = '✅';
  const emojiUpToDate = '📦';
  const emojiError = '❌';
  const userName = m.pushName || 'usuario';

  await m.reply(`${emojiStart} 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 está verificando actualizaciones...`);

  // 🔧 Solución para subbots con error de referencia
  exec('git update-ref -d refs/remotes/origin/main', (delErr) => {
    if (delErr) console.warn('[𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣] No se pudo limpiar la referencia local:', delErr.message);

    exec('git pull', (err, stdout, stderr) => {
      if (err) {
        console.error('[𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣] Error al actualizar:', err);
        return conn.reply(m.chat, `${emojiError} 𝖤𝗋𝗋𝗈𝗋: No se pudo completar la actualización.\n📎 Razón: ${err.message}`, m);
}

      if (stderr) {
        console.warn('[𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣] Advertencia durante la actualización:', stderr);
}

      if (stdout.includes('Already up to date.')) {
        return conn.reply(m.chat, `${emojiUpToDate} 𝖤𝗅 𝖻𝗈𝗍 ya está completamente actualizado.`, m);
}

      conn.reply(m.chat, `${emojiSuccess} 𝖠𝖼𝗍𝗎𝖺𝗅𝗂𝗓𝖺𝖼𝗂𝗈́𝗇 completada con éxito.\n\n🧾 Detalles:\n${stdout}`, m);
});
});
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update'];
handler.rowner = true;

export default handler;
