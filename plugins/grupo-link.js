let handler = async (m, { conn}) => {
  if (!m.isGroup) {
    return conn.reply(m.chat, `❌ 𝖤𝗌𝗍𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈 𝗌𝗈𝗅𝗈 𝗉𝗎𝖾𝖽𝖾 𝗎𝗌𝖺𝗋𝗌𝖾 𝖾𝗇 𝗀𝗋𝗎𝗉𝗈𝗌.`, m)
}

  const groupMetadata = await conn.groupMetadata(m.chat)
  const botNumber = conn.user.id.split(':')[0]
  const botInfo = groupMetadata.participants.find(p => p.id.includes(botNumber))

  if (!botInfo ||!botInfo.admin) {
    return conn.reply(m.chat, `🔒 𝖭𝗈 𝗌𝗈𝗒 𝖺𝖽𝗆𝗂𝗇 𝖾𝗇 𝖾𝗌𝗍𝖾 𝗀𝗋𝗎𝗉𝗈. 𝖭𝖾𝖼𝖾𝗌𝗂𝗍𝗈 𝗉𝖾𝗋𝗆𝗂𝗌𝗈𝗌 𝗉𝖺𝗋𝖺 𝗈𝖻𝗍𝖾𝗇𝖾𝗋 𝖾𝗅 𝖾𝗇𝗅𝖺𝖼𝖾.`, m)
}

  try {
    const inviteCode = await conn.groupInviteCode(m.chat)
    const link = `https://chat.whatsapp.com/${inviteCode}`
    const groupName = groupMetadata.subject

    const message = `*乂 𝖫𝖨𝖭𝖪 - 𝖣𝖤 𝖦𝖱𝖴𝖯𝖮乂*\n\n` +
      `📍 *Nombre:* ${groupName}\n` +
      `🔗 *Enlace:* ${link}\n\n` +
      `🧩 *𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 | Dev-Fedexyz13*`

    conn.reply(m.chat, message, m)
} catch (e) {
    conn.reply(m.chat, `❌ 𝖭𝗈 𝗉𝗎𝖾𝖽𝗈 𝗈𝖻𝗍𝖾𝗇𝖾𝗋 𝖾𝗅 𝖾𝗇𝗅𝖺𝖼𝖾. 𝖯𝗋𝗈𝖻𝖺𝖻𝗅𝖾𝗆𝖾𝗇𝗍𝖾 𝖾𝗅 𝗀𝗋𝗎𝗉𝗈 𝗍𝗂𝖾𝗇𝖾 𝗋𝖾𝗌𝗍𝗋𝗂𝖼𝖼𝗂𝗈𝗇 𝗈 𝖾𝗅 𝖻𝗈𝗍 𝗇𝗈 𝗍𝗂𝖾𝗇𝖾 𝗉𝖾𝗋𝗆𝗂𝗌𝗈𝗌.`, m)
}
}

handler.help = ['link']
handler.tags = ['grupo']
handler.command = ['link']
handler.group = true
handler.botAdmin = true

export default handler
