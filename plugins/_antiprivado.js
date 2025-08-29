export async function before(m, { conn, isOwner, isROwner}) {
  try {
    if (m.isBaileys && m.fromMe) return true
    if (!m.message || typeof m.text!== 'string') return false

    const bot = global.db.data.settings[conn.user.jid] || {}
    const user = global.db.data.users[m.sender] || {}
    const gremioOficial = global.gp1 || 'https://chat.whatsapp.com/tu-enlace-grupo'

    // 🛑 Si el usuario ya está marcado como bloqueado
    if (user.bloqueado) {
      await conn.updateBlockStatus(m.chat, 'block').catch(() => {})
      user.tiempoBloqueo = Date.now()
      return false
}

    // 🔒 Activación del sistema antiPrivado
    if (!m.isGroup && bot.antiprivado &&!isOwner &&!isROwner) {
      const usuario = m.sender.split('@')[0]
      const mensaje = `
╭─❖─「 🕷️ 𝖲𝖾𝗇𝗍𝖾𝗇𝖼𝗂𝖺 𝖢𝗈𝗌𝗆𝗂𝖼𝖺 🕷️ 」─❖─╮
🩸 𝖴𝗌𝗎𝖺𝗋𝗂𝗈: @${usuario}
⚠️ Has invocado el grimorio sin autorización.

🔒 𝖤𝗌𝗍𝖺𝖽𝗈: *𝖡𝖫𝖮𝖰𝖴𝖤𝖠𝖣𝖮 𝖯𝖤𝖱𝖬𝖠𝖭𝖤𝖭𝖳𝖤*
🕰️ Todos los canales mágicos han sido sellados.

🔮 Busca redención en el gremio oficial:
🌐 ${gremioOficial}
╰─◇───────────────◇─╯
🦋 *𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 * te observa desde las sombras...`.trim()

      await conn.sendMessage(m.chat, { text: mensaje, mentions: [m.sender]})
      await conn.updateBlockStatus(m.chat, 'block').catch(() => {})

      Object.assign(user, {
        bloqueado: true,
        tiempoBloqueo: Date.now()
})

      return false
}

    return true
} catch (e) {
    console.error('[❌ 𝖤𝖱𝖱𝖮𝖱 𝖤𝖭 𝖠𝖭𝖳𝖨𝖯𝖱𝖨𝖵𝖠𝖣𝖮 - 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣]', e)
    return true
}
}
