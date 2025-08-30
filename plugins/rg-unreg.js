// código creado por Dev-fedexyz13

let handler = async (m, { conn, text}) => {
  const user = global.db.data.users[m.sender];

  if (!user.registered) {
    return conn.reply(m.chat, `❌ 𝖳𝗎 𝗎𝗌𝗎𝖺𝗋𝗂𝗈 𝗇𝗈 𝖾𝗌𝗍𝖺́ 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝖺𝖽𝗈.`, m);
}

  if (!text) {
    return conn.reply(m.chat, `⚠️ 𝖯𝗈𝗋 𝖿𝖺𝗏𝗈𝗋, 𝖾𝗌𝖼𝗋𝗂𝖻𝖾 𝗍𝗎 𝖨𝖣 𝖽𝖾 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝗈.\n📌 𝖤𝗃𝖾𝗆𝗉𝗅𝗈: *.unreg 123456*`, m);
}

  if (text!== user.regid) {
    return conn.reply(m.chat, `🚫 𝖤𝗅 𝖨𝖣 𝗇𝗈 𝖼𝗈𝗂𝗇𝖼𝗂𝖽𝖾 𝖼𝗈𝗇 𝗍𝗎 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝗈.\n🔐 𝖵𝖾𝗋𝗂𝖿𝗂𝖼𝖺 𝗊𝗎𝖾 𝗁𝖺𝗓 𝖾𝗌𝖼𝗋𝗂𝗍𝗈 𝖻𝗂𝖾𝗇 𝗍𝗎 𝖨𝖣.`, m);
}

  user.registered = false;
  user.name = '';
  user.age = 0;
  user.regid = '';
  user.gender = '';
  user.email = '';

  return conn.reply(m.chat, `✅ 𝖳𝗎 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝗈 𝗁𝖺 𝗌𝗂𝖽𝗈 𝖾𝗅𝗂𝗆𝗂𝗇𝖺𝖽𝗈 𝖽𝖾 𝗆𝗂 𝖻𝖺𝗌𝖾 𝖽𝖾 𝖽𝖺𝗍𝗈𝗌.\n🗑️ 𝖧𝖺𝗌𝗍𝖺 𝗅𝖺 𝗉𝗋𝗈𝗑𝗂𝗆𝖺, 𝖺𝗆𝗂𝗀𝗈.`, m);
};

handler.help = ['unreg <ID>'];
handler.tags = ['rg'];
handler.command = ['unreg'];
handler.register = true;

export default handler;
