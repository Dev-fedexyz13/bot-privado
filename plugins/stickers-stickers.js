const fs = require('fs');

let handler = async (m, { client}) => {
  const quoted = m.quoted || m;
  const mime = (quoted.msg || quoted).mimetype || '';
  const isImage = /image/.test(mime);
  const isVideo = /video/.test(mime);
  const stickerAuthor = 'The-fede_IA';
  const stickerPack = '✦ Stickers ✦';

  try {
    if (isImage) {
      const media = await quoted.download();
      const sticker = await client.sendImageAsSticker(m.chat, media, m, {
        packname: stickerPack,
        author: stickerAuthor,
});
      fs.unlinkSync(sticker);
      await m.react('🖼️');
} else if (isVideo) {
      const duration = (quoted.msg || quoted).seconds || 0;
      if (duration> 20) {
        return m.reply('✦ El video es demasiado largo. Máximo permitido: 20 segundos.');
}

      const media = await quoted.download();
      const sticker = await client.sendVideoAsSticker(m.chat, media, m, {
        packname: stickerPack,
        author: stickerAuthor,
});
      await new Promise(resolve => setTimeout(resolve, 2000));
      fs.unlinkSync(sticker);
      await m.react('🎬');
} else {
      m.reply(`✦ Para crear un sticker, responde a una *imagen* o *video corto* y usa el comando *${m.command || '!s'}*`);
}
} catch (error) {
    console.error('[The-fede_IA] Error al generar sticker:', error);
    m.reply('✦ Ocurrió un error al procesar el sticker. Intenta nuevamente.');
}
};

handler.command = ['sticker', 's'];
handler.tags = ['stickers'];
handler.help = ['sticker', 's'];
handler.register = true;
handler.group = true;

module.exports = handler;
