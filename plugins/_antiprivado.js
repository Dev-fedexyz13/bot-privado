export async function before(m, { conn, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return true
  if (m.isGroup ||!m.message) return false

  const textoPermitido = ['PIEDRA', 'PAPEL', 'TIJERA', 'serbot', 'jadibot']
  if (textoPermitido.some(txt => m.text?.includes(txt))) return true

  const chat = global.db.data.chats[m.chat]
  const bot = global.db.data.settings[conn.user.jid] || {}

  if (m.chat === '120363402097425674@newsletter) return true

  if (bot.antiPrivate &&!isOwner &&!isROwner) {
    const usuario = m.sender.split('@')[0]
    const mensaje = `
╭─「 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 」
│ ✘ Hola @${usuario}, los comandos en privado están *desactivados*.
│ ✦ Has sido *bloqueado* por intentar usar el bot fuera de los grupos.
│ ✐ Únete al grupo oficial para usar mis funciones:
│ ${gp1}
╰───────────────`
    await m.reply(mensaje.trim(), false, { mentions: [m.sender]})
    await conn.updateBlockStatus(m.chat, 'block')
}

  return false
}
