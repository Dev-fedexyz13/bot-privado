import yts from 'yt-search'

var handler = async (m, { text, conn, args, command, usedPrefix}) => {

  if (!text) return conn.reply(m.chat, `🌑 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 » Por favor, ingresa una búsqueda válida en YouTube.`, m)

  conn.reply(m.chat, '🌑 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 » Buscando resultados, espera un momento...', m)

  let results = await yts(text)
  let tes = results.all

  let teks = results.all.map(v => {
    switch (v.type) {
      case 'video': return `╭─❖─「 🌑 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 」─❖─╮

𖣐 𝖡𝖴𝖲𝖰𝖴𝖤𝖣𝖠 ⬭ *${text}*

> ☁️ 𝖳𝖨𝖳𝖴𝖫𝖮 » *${v.title}*
> 🍬 𝖢𝖠𝖭𝖠𝖫 » *${v.author.name}*
> 🕝 𝖣𝖴𝖱𝖠𝖢𝖨𝖮𝖭 » *${v.timestamp}*
> 📆 𝖲𝖴𝖡𝖨𝖣𝖮 » *${v.ago}*
> 👀 𝖵𝖨𝖲𝖳𝖠𝖲 » *${v.views}*
> 🔗 𝖤𝖭𝖫𝖠𝖢𝖤 » ${v.url}

╰─◇───────────────◇─╯`
}
}).filter(v => v).join('\n\n••••••••••••••••••••••••••••••••••••\n\n')

  conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, fkontak, m)
}

handler.help = ['ytsearch']
handler.tags = ['buscador']
handler.command = ['ytbuscar', 'ytsearch', 'yts']
handler.register = true
handler.coin = 1

export default handler
