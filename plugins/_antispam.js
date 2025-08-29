const spamTracker = new Map()

export async function before(m, { conn}) {
  if (!m.message ||!m.chat ||!m.sender || m.isGroup) return

  const id = `${m.chat}:${m.sender}`
  const now = Date.now()
  const limit = 10 // número de mensajes para considerar spam
  const windowMs = 10000 // tiempo en milisegundos (10 segundos)

  if (!spamTracker.has(id)) {
    spamTracker.set(id, { count: 1, timestamp: now, messages: [m.key.id]})
    return
}

  const data = spamTracker.get(id)

  if (now - data.timestamp < windowMs) {
    data.count++
    data.messages.push(m.key.id)

    if (data.count>= limit) {
      for (const msgId of data.messages) {
        await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: msgId}})
}

      await conn.reply(m.chat, `╭─「 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 」\n│ ˚🌑｡ Usuario @${m.sender.split('@')[0]} fue detectado haciendo *spam*.\n│ ✦ Mensajes eliminados: ${data.count}\n╰───────────────`, null, { mentions: [m.sender]})

      spamTracker.delete(id)
} else {
      spamTracker.set(id, data)
}
} else {
    spamTracker.set(id, { count: 1, timestamp: now, messages: [m.key.id]})
}
}
