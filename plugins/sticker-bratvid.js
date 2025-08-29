import axios from 'axios'
import { sticker} from '../lib/sticker.js'

const deco = '𖣣ֶㅤ֯⌗ 🌑 ׄ'

const fetchStickerVideo = async (text) => {
  const response = await axios.get(`https://velyn.mom/api/maker/bratgif`, {
    params: { text},
    responseType: 'arraybuffer'
})
  if (!response.data) throw new Error(`${deco} 𝖤𝗋𝗋𝗈𝗋 𝖺𝗅 𝗈𝖻𝗍𝖾𝗇𝖾𝗋 𝖾𝗅 𝗏𝗂𝖽𝖾𝗈 𝖽𝖾 𝗅𝖺 𝖠𝖯𝖨.`)
  return response.data
}

let handler = async (m, { conn, text}) => {
  if (m.quoted && m.quoted.text) {
    text = m.quoted.text
} else if (!text) {
    return conn.sendMessage(m.chat, {
      text: `${deco} ✧ 𝖯𝗈𝗋 𝖿𝖺𝗏𝗈𝗋, 𝗋𝖾𝗌𝗉𝗈𝗇𝖽𝖾 𝖺 𝗎𝗇 𝗆𝖾𝗇𝗌𝖺𝗃𝖾 𝗈 𝖾𝗌𝖼𝗋𝗂𝖻𝖾 𝗎𝗇 𝗍𝖾𝗑𝗍𝗈 𝗉𝖺𝗋𝖺 𝖼𝗋𝖾𝖺𝗋 𝖾𝗅 𝖲𝗍𝗂𝖼𝗄𝖾𝗋.`,
}, { quoted: m})
}

  const userId = m.sender
  const packstickers = global.db.data.users[userId] || {}
  const texto1 = packstickers.text1 || global.packsticker
  const texto2 = packstickers.text2 || global.packsticker2

  try {
    const videoBuffer = await fetchStickerVideo(text)
    const stickerBuffer = await sticker(videoBuffer, null, texto1, texto2)

    await conn.sendMessage(m.chat, {
      sticker: stickerBuffer
}, { quoted: m})
} catch (e) {
    await conn.sendMessage(m.chat, {
      text: `${deco} ⚠︎ 𝖮𝖼𝗎𝗋𝗋𝗂ó 𝗎𝗇 𝖾𝗋𝗋𝗈𝗋:\n${e.message}`
}, { quoted: m})
}
}

handler.help = ['bratvid *<texto>*']
handler.tags = ['sticker']
handler.command = ['bratvid', 'bratv']

export default handler
