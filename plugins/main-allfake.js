var handler = m => m
handler.all = async function (m, { conn}) {

  // Verifica si el mensaje proviene de un canal permitido
  if (!global.canalIdM.includes(m.chat)) return

  // Tu lógica continúa aquí...
  global.getBuffer = async function getBuffer(url, options) {
    try {
      options = options || {}
      const res = await axios({
        method: 'get',
        url,
        headers: {
          'DNT': 1,
          'User-Agent': 'GoogleBot',
          'Upgrade-Insecure-Request': 1
},
...options,
        responseType: 'arraybuffer'
})
      return res.data
} catch (e) {
      console.log(`Error: ${e}`)
}
}

  global.getRandomChannel = function () {
    const canales = global.canalIdM || []
    if (!canales.length) return null
    const index = Math.floor(Math.random() * canales.length)
    return canales[index]
}

  global.creador = 'wa.me/5491156178758'
  global.ofcbot = `${conn.user.jid.split('@')[0]}`

  global.namechannel = '˚🌑｡ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 | 𝖢𝖺𝗇𝖺𝗅 𝖮𝖿𝗂𝖼𝗂𝖺𝗅 ˚⚔｡'
  global.namechannel2 = '˚🌑｡ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 | 𝖢𝖺𝗇𝖺𝗅 𝖮𝖿𝗂𝖼𝗂𝖺𝗅 ˚⚔｡'
  global.namegrupo = '˚🌑｡ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 | 𝖢𝖺𝗇𝖺𝗅 𝖮𝖿𝗂𝖼𝗂𝖺𝗅 ˚⚔｡'
  global.namecomu = '˚🌑｡ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍 - 𝖬𝖣 ˚⚔｡'
  global.listo = '˚🌑｡ *Aquí tienes ฅ^•ﻌ•^ฅ*'

  global.canalIdM = [
    '120363401404146384@newsletter',
    '120363401404146384@newsletter'
  ]

  global.canalNombreM = [
    '˚🌑｡ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 | 𝖢𝗁𝖺𝗇𝗇𝖾𝗅 𝖮𝖿𝗂𝖼𝗂𝖺𝗅 ˚⚔｡',
    '˚🌑｡ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 | 𝖢𝗁𝖺𝗇𝗇𝖾𝗅 𝖮𝖿𝗂𝖼𝗂𝖺𝗅 ˚⚔｡'
  ]

  global.channelRD = global.getRandomChannel()
}
