export async function before(m, { conn, isOwner, isROwner}) {
  try {
    if (m.isBaileys && m.fromMe) return true;
    if (!m.message || typeof m.text!== 'string') return false;

    const bot = global.db.data.settings[conn.user.jid] || {};
    const user = global.db.data.users[m.sender] || {};
    const gremioOficial = global.gp1 || 'https://chat.whatsapp.com/tu-enlace-grupo';

    // 🚫 Si el usuario ya está bloqueado, no se desbloquea automáticamente
    if (user.bloqueado) {
      // Si el bot fue desbloqueado manualmente, lo vuelve a bloquear al primer mensaje
      await conn.updateBlockStatus(m.chat, 'block').catch(() => {});
      user.bloqueado = true;
      user.tiempoBloqueo = Date.now();

      return false;
}

    // 🚫 Bloqueo inmediato si antiPrivado está activado
    if (!m.isGroup && bot.antiprivado &&!isOwner &&!isROwner) {
      await conn.sendMessage(m.chat, {
        text: `
╭─❖─「 🕷️ 𝖲𝖾𝗇𝗍𝖾𝗇𝖼𝗂𝖺 𝖢𝗈𝗌𝗆𝗂𝖼𝖺 🕷️ 」─❖─╮
🩸 𝖴𝗌𝗎𝖺𝗋𝗂𝗈: @${usuario}
⚠️ Has invocado el grimorio sin autorización.

🔒 𝖤𝗌𝗍𝖺𝖽𝗈: *𝖡𝖫𝖮𝖰𝖴𝖤𝖠𝖣𝖮 𝖯𝖤𝖱𝖬𝖠𝖭𝖤𝖭𝖳𝖤*
🕰️ Todos los canales mágicos han sido sellados.

🔮 Busca redención en el gremio oficial:
🌐 ${gp1}
╰─◇───────────────◇─╯
🦋 *𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 * te observa desde las sombras...`.trim(),
        mentions: [m.sender]
});

      await conn.updateBlockStatus(m.chat, 'block').catch(() => {});
      Object.assign(user, {
        bloqueado: true,
        tiempoBloqueo: Date.now()
});

      return false;
}

    return true;

} catch (e) {
    console.error('[❌ ERROR EN SISTEMA ANTIPRIVADO - 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣]', e);
    return true;
}
    }
