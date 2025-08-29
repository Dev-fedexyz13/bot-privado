import { WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata}) {
  if (!m.isGroup ||!m.messageStubType) return true

  const stubParams = m.messageStubParameters || []
  if (!Array.isArray(stubParams) || stubParams.length === 0) return true

  const chat = global.db.data.chats[m.chat] || {}
  if (typeof chat.welcome === 'undefined') chat.welcome = true
  if (!chat.welcome) return true

  const userJid = stubParams[0]
  const username = userJid.split('@')[0]
  const mention = '@' + username
  const memberCount = groupMetadata.participants?.length || 0

  let avatar
  try {
    avatar = await conn.profilePictureUrl(userJid, 'image')
} catch {
    avatar = 'https://i.imgur.com/8B4QYQY.png'
}

  const guildName = encodeURIComponent(groupMetadata.subject)
  const backgroundUrl = encodeURIComponent('https://files.catbox.moe/rjn0iq.jpg')
  const apiBase = 'https://api.siputzx.my.id/api/canvas'

  async function fetchImage(url) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('Error al generar imagen')
      return await res.buffer()
} catch (e) {
      console.error('[Itachi Bot] Error en la API de imagen:', e)
      const fallbackRes = await fetch(avatar)
      return await fallbackRes.buffer()
}
}

  // Bienvenida
  if (
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD ||
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_INVITE
) {
    const defaultWelcome = `
👋 ¡Hola ${mention}!
Bienvenido(a) a *${groupMetadata.subject}*

Soy *Itachi Bot*, tu asistente virtual en este grupo.

Por favor, evita escribir al privado del bot. Está en desarrollo.
`

    const welcomeText = (chat.welcomeText || defaultWelcome)
.replace('@user', mention)
.replace('@subject', groupMetadata.subject)
.replace('@desc', groupMetadata.desc?.toString() || 'Sin descripción')

    const welcomeApiUrl = `${apiBase}/welcomev2?username=${username}&guildName=${guildName}&memberCount=${memberCount}&avatar=${encodeURIComponent(avatar)}&background=${backgroundUrl}`
    const imgBuffer = await fetchImage(welcomeApiUrl)

    await conn.sendMessage(m.chat, {
      image: imgBuffer,
      caption: welcomeText,
      mentions: [userJid]
})
}

  // Despedida
  else if (
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE ||
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE
) {
    const defaultBye = `
${mention} ha salido del grupo.

Esperamos que regreses pronto a *${groupMetadata.subject}*.
Ahora somos ${memberCount} miembros. ¡Te extrañaremos!
`

    const byeText = (chat.byeText || defaultBye)
.replace('@user', mention)
.replace('@subject', groupMetadata.subject)

    const goodbyeApiUrl = `${apiBase}/goodbyev2?username=${username}&guildName=${guildName}&memberCount=${memberCount}&avatar=${encodeURIComponent(avatar)}&background=${backgroundUrl}`
    const imgBuffer = await fetchImage(goodbyeApiUrl)

    await conn.sendMessage(m.chat, {
      image: imgBuffer,
      caption: byeText,
      mentions: [userJid]
})
}

  return true
}
