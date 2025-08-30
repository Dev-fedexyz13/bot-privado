import { WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, groupMetadata}) {
  if (!m.isGroup ||!m.messageStubType) return true

  const stubParams = m.messageStubParameters || []
  if (!Array.isArray(stubParams) || stubParams.length === 0) return true

  const chat = global.db.data.chats[m.chat] || {}
  if (typeof chat.welcome === 'undefined') chat.welcome = true
  if (!chat.welcome) return true

  const userJid = stubParams[0]
  const username = userJid.split('@')[0]
  const mention = '@' + username
  const groupName = groupMetadata.subject
  const memberCount = groupMetadata.participants?.length || 0

  let avatar
  try {
    avatar = await conn.profilePictureUrl(userJid, 'image')
} catch {
    avatar = 'https://i.imgur.com/8B4QYQY.png'
}

  const encodedAvatar = encodeURIComponent(avatar)
  const encodedGroupName = encodeURIComponent(groupName)
  const background = encodeURIComponent('https://files.catbox.moe/rjn0iq.jpg')
  const guildIcon = background // usando el mismo fondo como ícono

  async function fetchImage(url) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('No se pudo generar la imagen')
      return await res.buffer()
} catch (e) {
      console.error('[Itachi Bot] Error al generar imagen:', e)
      const fallback = await fetch(avatar)
      return await fallback.buffer()
}
}

  // Solo despedida
  if (
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE ||
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE
) {
    const byeText = `HASTA LUEGO ${mention}`
    const apiUrl = `https://api.siputzx.my.id/api/canvas/welcomev1?username=${username}&guildName=${encodedGroupName}&guildIcon=${guildIcon}&memberCount=${memberCount}&avatar=${encodedAvatar}&background=${background}&quality=80`
    const img = await fetchImage(apiUrl)

    await conn.sendMessage(m.chat, {
      image: img,
      caption: byeText,
      mentions: [userJid]
})
}

  return true
}
