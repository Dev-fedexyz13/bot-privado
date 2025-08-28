import { search, download} from 'aptoide-scraper';

var handler = async (m, { conn, usedPrefix, command, text}) => {
  if (!text) {
    return conn.reply(m.chat, '🚩 *𝖨𝗇𝗀𝗋𝖾𝗌𝖺 𝗅𝖾 𝗇𝗈𝗆𝖻𝗋𝖾 𝖽𝖾 𝗅𝖺 𝖠𝖯𝖪 𝗊𝗎𝖾 𝖽𝖾𝗌𝖾𝖺𝗌 𝖻𝗎𝗌𝖼𝖺𝗋.*', m);
}

  try {
    await m.react(rwait);

    conn.reply(m.chat, '📦 *𝖤𝗇 𝗉𝗋𝗈𝗈𝗌𝖾𝗌𝗈 𝖽𝖾 𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝖺...*', m, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: null,
          mediaType: 1,
          showAdAttribution: true,
          title: '✦ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 ✦',
          body: '𝖣𝖾𝗌𝖼𝖺𝗋𝗀𝖺 𝖽𝖾 𝖠𝖯𝖪 𝖾𝗇 𝖿𝗈𝗋𝗆𝖺 𝖭𝗂𝗇𝗃𝖺',
          previewType: 0,
          thumbnail: icons,
          sourceUrl: channel
}
}
});

    let searchA = await search(text);
    let data5 = await download(searchA[0].id);

    let txt = `*乂 𝖠𝖯𝖳𝖮𝖨𝖣𝖤 - 𝖣𝖤𝖲𝖢𝖠𝖱𝖦𝖠𝖲 乂*\n\n`;
    txt += `🍟 *𝖭𝗈𝗆𝖻𝗋𝖾*: ${data5.name}\n`;
    txt += `🚩 *𝖯𝖺𝖼𝗄𝖺𝗀𝖾*: ${data5.package}\n`;
    txt += `🪴 *𝖴𝗅𝗍𝗂𝗆𝖺 𝖠𝖼𝗍𝗎𝖺𝗅𝗂𝗓𝖺𝖼𝗂𝗈𝗇*: ${data5.lastup}\n`;
    txt += `⚖ *𝖯𝖾𝗌𝗈*: ${data5.size}`;

    await conn.sendFile(m.chat, data5.icon, 'thumbnail.jpg', txt, m);
    await m.react(done);

    if (data5.size.includes('GB') || parseFloat(data5.size.replace(' MB', ''))> 999) {
      return await conn.reply(m.chat, '*𝖤𝗅 𝖺𝗋𝖼𝗁𝗂𝗏𝗈 𝖾𝗌 𝗆𝗎𝗒 𝗉𝖾𝗌𝖺𝖽𝗈 𝗉𝖺𝗋𝖺 𝖾𝗇𝗏𝗂𝖺𝗋.*', m, rcanal);
}

    await conn.sendMessage(m.chat, {
      document: { url: data5.dllink},
      mimetype: 'application/vnd.android.package-archive',
      fileName: `${data5.name}.apk`,
      caption: `📥 *𝖣𝖾𝗌𝖼𝖺𝗋𝗀𝖺 𝖼𝗈𝗆𝗉𝗅𝖾𝗍𝖺 𝖽𝖾 ${data5.name}*`,
      footer: '✨ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣',
      buttons: [
        { buttonId: '.menu', buttonText: { displayText: '˚🌑｡ 𝖬𝖤𝖭𝖴'}, type: 1}
      ],
      headerType: 1,
      contextInfo: {
        externalAdReply: {
          title: '✧ 𝖠𝖯𝖪 𝖫𝗂𝗌𝗍𝗈 ✧',
          body: '𝖳𝗎 𝖺𝗉𝗉 𝖾𝗌𝗍𝖺́ 𝗋𝖾𝖺𝖽𝗒 𝖿𝗈𝗋 𝗂𝗇𝗌𝗍𝖺𝗅𝗅',
          thumbnailUrl: data5.icon,
          sourceUrl: channel,
          mediaType: 1,
          showAdAttribution: true,
          renderLargerThumbnail: true
}
}
}, { quoted: fkontak});

} catch {
    return conn.reply(m.chat, '*𝖮𝖼𝗎𝗋𝗋𝗂𝗈́ 𝗎𝗇 𝖿𝖺𝗅𝗅𝗈 𝖾𝗇 𝗅𝖺 𝖻𝗎𝗌𝗊𝗎𝖾𝖽𝖺.*', m);
}
};

handler.tags = ['descargas'];
handler.help = ['apk'];
handler.command = ['apk', 'modapk'];
handler.register = true;
handler.estrellas = 1;

export default handler;
