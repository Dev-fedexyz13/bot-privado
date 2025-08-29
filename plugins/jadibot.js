import {
  readdirSync, statSync, unlinkSync, existsSync, readFileSync,
  watch, rmSync, promises as fsPromises
} from 'fs'
const fs = {...fsPromises, existsSync}
import path, { join} from 'path'
import ws from 'ws'

let handler = async (m, { conn, command, usedPrefix}) => {
  const deco = '𖣣ֶㅤ֯⌗ 🌑 ׄ'
  const botname = '𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣'

  const isDelete = /^(deletebot|eliminarsession|delbot)$/i.test(command)
  const isStop = /^(stop|pausarai|pausarbot)$/i.test(command)
  const isList = /^(bots|sockets|socket)$/i.test(command)

  const reportError = async (e) => {
    await m.reply(`${deco} ⚠︎ 𝖤𝗋𝗋𝗈𝗋 𝗂𝗇𝖾𝗌𝗉𝖾𝗋𝖺𝖽𝗈.`)
    console.error(`[${botname}] Error:`, e)
}

  switch (true) {
    case isDelete: {
      const who = m.mentionedJid?.[0] || (m.fromMe? conn.user.jid: m.sender)
      const uniqid = who.split('@')[0]
      const sessionPath = `./${jadi}/${uniqid}`

      if (!fs.existsSync(sessionPath)) {
        await conn.sendMessage(m.chat, {
          text: `${deco} ✧ 𝖭𝗈 𝗌𝖾 𝖾𝗇𝖼𝗈𝗇𝗍𝗋ó 𝗇𝗂𝗇𝗀𝗎𝗇𝖺 𝗌𝖾𝗌𝗂𝗈𝗇 𝖺𝖼𝗍𝗂𝗏𝖺.\n\nPuedes crear una con:\n*${usedPrefix}jadibot*\nO vincular con tu ID:\n*${usedPrefix}jadibot* \`\`\`${uniqid}\`\`\``,
}, { quoted: m})
        return
}

      if (global.conn.user.jid!== conn.user.jid) {
        return conn.sendMessage(m.chat, {
          text: `${deco} ✧ 𝖤𝗌𝗍𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈 𝗌𝗈𝗅𝗈 𝗉𝗎𝖾𝖽𝖾 𝖾𝗃𝖾𝖼𝗎𝗍𝖺𝗋𝗌𝖾 𝖽𝖾𝗌𝖽𝖾 𝖾𝗅 *Bot Principal*.\n\n📎 [Solicitar acceso](https://wa.me/${global.conn.user.jid.split('@')[0]}?text=${usedPrefix + command})`,
}, { quoted: m})
}

      await conn.sendMessage(m.chat, {
        text: `${deco} ✧ 𝖳𝗎 𝗌𝖾𝗌𝗂𝗈𝗇 𝖼𝗈𝗆𝗈 *Sub-Bot* 𝗁𝖺 𝗌𝗂𝖽𝗈 𝖾𝗅𝗂𝗆𝗂𝗇𝖺𝖽𝗈.`,
}, { quoted: m})

      try {
        fs.rmSync(sessionPath, { recursive: true, force: true})
        await conn.sendMessage(m.chat, {
          text: `${deco} ✧ 𝖲𝖾𝗌𝗂𝗈𝗇 𝖼𝖾𝗋𝗋𝖺𝖽𝖺 𝗒 𝖽𝖺𝗍𝗈𝗌 𝖾𝗅𝗂𝗆𝗂𝗇𝖺𝖽𝗈𝗌 𝖼𝗈𝗋𝗋𝖾𝖼𝗍𝖺𝗆𝖾𝗇𝗍𝖾.`,
}, { quoted: m})
} catch (e) {
        reportError(e)
}
      break
}

    case isStop: {
      if (global.conn.user.jid === conn.user.jid) {
        return conn.reply(m.chat, `${deco} ✧ 𝖤𝗌𝗍𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈 𝗌𝗈𝗅𝗈 𝖺𝗉𝗅𝗂𝖼𝖺 𝖺 *Sub-Bots*.`, m)
}

      await conn.reply(m.chat, `${deco} ✧ ${botname} 𝗁𝖺 𝗌𝗂𝖽𝗈 𝖽𝖾𝗌𝖺𝖼𝗍𝗂𝗏𝖺𝖽𝗈.`, m)
      conn.ws.close()
      break
}

    case isList: {
      const activeBots = global.conns.filter(c =>
        c.user && c.ws.socket && c.ws.socket.readyState!== ws.CLOSED
)

      const formatUptime = (ms) => {
        const sec = Math.floor(ms / 1000) % 60
        const min = Math.floor(ms / 60000) % 60
        const hr = Math.floor(ms / 3600000) % 24
        const day = Math.floor(ms / 86400000)
        return `${day}d ${hr}h ${min}m ${sec}s`
}

      const list = activeBots.map((bot, i) => {
        const jid = bot.user.jid.replace(/[^0-9]/g, '')
        const name = bot.user.name || 'Sub-Bot'
        const uptime = bot.uptime? formatUptime(Date.now() - bot.uptime): 'Desconocido'
        return `• 「 ${i + 1} 」\n📎 wa.me/${jid}?text=${usedPrefix}code\n👤 Usuario: ${name}\n🕑 Online: ${uptime}`
}).join('\n\n──────────────────────\n\n')

      const total = activeBots.length
      const response = `
╭─·˚₊· ꒰🌑꒱ *「 𝖫𝖨𝖲𝖳𝖠 𝖣𝖤 𝖲𝖴𝖡-𝖡𝖮𝖳𝖲 」* ࣪𑁍⃪࣭۪໑𖤐

𖣣ֶㅤ֯⌗ 🌑 ׄ *𝖢𝖮𝖭𝖤𝖢𝖳𝖠𝖣𝖮𝖲:* ${total}
𖣣ֶㅤ֯⌗ 🌑 ׄ *𝖡𝖮𝖳:* ${botname}

${list || `${deco} ✧ 𝖭𝗈 𝗁𝖺𝗒 𝖲𝗎𝖻-𝖡𝗈𝗍𝗌 𝖽𝗂𝗌𝗉𝗈𝗇𝗂𝖻𝗅𝖾𝗌 𝖾𝗇 𝖾𝗌𝗍𝖾 𝗆𝗈𝗆𝖾𝗇𝗍𝗈.`}`.trim()

      await conn.sendMessage(m.chat, {
        image: { url: 'https://files.cloudkuimages.guru/images/CB6cHqTy.jpg'},
        caption: response,
        mentions: conn.parseMention(response),
        buttons: [
          {
            buttonId: `${usedPrefix}code`,
            buttonText: { displayText: '🌑 𝖢𝖮𝖣𝖤'},
            type: 1
}
        ]
}, { quoted: m})
      break
}
}
}

handler.tags = ['serbot']
handler.help = ['deletebot', 'eliminarsession', 'delbot', 'stop', 'bots']
handler.command = [
  'deletebot', 'eliminarsession', 'delbot',
  'stop', 'pausarai', 'pausarbot',
  'bots', 'sockets', 'socket'
]

export default handler
