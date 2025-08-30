import { getRandomChannel} from './lib/utils.js' // Asegúrate de tener esta función disponible

export async function setupGlobals(conn) {
  global.creador = 'wa.me/5491156178758'
  global.ofcbot = `${conn.user.jid.split('@')[0]}`

  // Nombres visuales
  global.namechannel = '˚🌑｡ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 | 𝖢𝖺𝗇𝖺𝗅 𝖮𝖿𝗂𝖼𝗂𝖺𝗅 ˚⚔｡'
  global.namechannel2 = '˚🌑｡ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 | 𝖢𝖺𝗇𝖺𝗅 𝖮𝖿𝗂𝖼𝗂𝖺𝗅 ˚⚔｡'
  global.namegrupo = '˚🌑｡ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 | 𝖢𝖺𝗇𝖺𝗅 𝖮𝖿𝗂𝖼𝗂𝖺𝗅 ˚⚔｡'
  global.namecomu = '˚🌑｡ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍 - 𝖬𝖣 ˚⚔｡'
  global.listo = '˚🌑｡ *Aquí tienes ฅ^•ﻌ•^ฅ*'

  // Canales oficiales
  global.canalIdM = [
    '120363401404146384@newsletter',
    '120363401404146384@newsletter'
  ]

  global.canalNombreM = [
    '˚🌑｡ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 | 𝖢𝗁𝖺𝗇𝗇𝖾𝗅 𝖮𝖿𝗂𝖼𝗂𝖺𝗅 ˚⚔｡',
    '˚🌑｡ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 | 𝖢𝗁𝖺𝗇𝗇𝖾𝗅 𝖮𝖿𝗂𝖼𝗂𝖺𝗅 ˚⚔｡'
  ]

  // Canal aleatorio para redirección o promoción
  global.channelRD = await getRandomChannel()
}
