let handler = async (m, { conn, command, text}) => {
  const user = global.db.data.users[m.sender];

  if (command === 'id' || command === 'mid') {
    if (!user.registered) {
      return conn.reply(m.chat, `❌ 𝖳𝗎 𝗎𝗌𝗎𝖺𝗋𝗂𝗈 𝗇𝗈 𝖾𝗌𝗍𝖺́ 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝖺𝖽𝗈.\n📝 𝖴𝗌𝖺 *.reg nombre.edad* 𝗉𝖺𝗋𝖺 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝖺𝗋𝗍𝖾.`, m);
}

    const info = `*乂 𝖨𝖣 - 𝖣𝖤 𝖱𝖤𝖦𝖨𝖲𝖳𝖱𝖮 乂*\n\n` +
      `👤 *Nombre:* ${user.name}\n` +
      `🎂 *Edad:* ${user.age} años\n` +
      `📱 *Número:* ${m.sender.split('@')[0]}\n` +
      `🆔 *ID de registro:* ${user.regid}\n\n` +
      `🤖 *𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣*`;

    return conn.reply(m.chat, info, m);
}

  if (command === 'unreg') {
    if (!user.registered) {
      return conn.reply(m.chat, `❌ 𝖳𝗎 𝗎𝗌𝗎𝖺𝗋𝗂𝗈 𝗇𝗈 𝖾𝗌𝗍𝖺́ 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝖺𝖽𝗈.\n📝 𝖴𝗌𝖺 *.reg nombre.edad* 𝗉𝖺𝗋𝖺 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝖺𝗋𝗍𝖾.`, m);
}

    if (!text) {
      return conn.reply(m.chat, `📌 𝖯𝖺𝗋𝖺 𝖾𝗅𝗂𝗆𝗂𝗇𝖺𝗋 𝗍𝗎 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝗈, 𝖾𝗌𝖼𝗋𝗂𝖻𝖾 𝗍𝗎 𝖨𝖣 𝖽𝖾 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝗈.\n📎 𝖤𝗃𝖾𝗆𝗉𝗅𝗈: *.unreg 4521d7f6d1a8df94cc60*`, m);
}

    if (text!== user.regid) {
      return conn.reply(m.chat, `🚫 𝖤𝗅 𝖨𝖣 𝗇𝗈 𝖼𝗈𝗂𝗇𝖼𝗂𝖽𝖾 𝖼𝗈𝗇 𝗍𝗎 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝗈.\n🔐 𝖵𝖾𝗋𝗂𝖿𝗂𝖼𝖺 𝗊𝗎𝖾 𝗁𝖺𝗓 𝖾𝗌𝖼𝗋𝗂𝗍𝗈 𝖻𝗂𝖾𝗇 𝗍𝗎 𝖨𝖣.`, m);
}

    // Eliminar datos del usuario
    user.registered = false;
    user.name = '';
    user.age = 0;
    user.regid = '';
    user.gender = '';
    user.email = '';

    return conn.reply(m.chat, `✅ 𝖳𝗎 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝗈 𝗁𝖺 𝗌𝗂𝖽𝗈 𝖾𝗅𝗂𝗆𝗂𝗇𝖺𝖽𝗈 𝖾𝗑𝗂𝗍𝗈𝗌𝖺𝗆𝖾𝗇𝗍𝖾.\n🗑️ 𝖧𝖺𝗌𝗍𝖺 𝗅𝖺 𝗉𝗋𝗈𝗑𝗂𝗆𝖺, 𝖺𝗆𝗂𝗀𝗈.`, m);
}
};

handler.help = ['unreg <ID>', 'id'];
handler.tags = ['rg'];
handler.command = ['unreg', 'id', 'mid'];
handler.register = true;

export default handler;
