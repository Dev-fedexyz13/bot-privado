let handler = async (m, { conn, isAdmin, isBotAdmin, isOwner}) => {
  if (!m.isGroup) return;
  const chat = global.db.data.chats[m.chat];
  if (!chat.antiLink) return;

  const linkRegex = /(https?:\/\/[^\s]+|chat\.whatsapp\.com\/[^\s]+)/i;
  if (!linkRegex.test(m.text)) return;

  if (isAdmin || isOwner) return; // No actúa contra admins ni el owner
  if (!isBotAdmin) return conn.reply(m.chat, `⚠️ 𝖭𝗈 𝗌𝗈𝗒 𝖺𝖽𝗆𝗂𝗇, 𝗇𝗈 𝗉𝗎𝖾𝖽𝗈 𝖾𝗅𝗂𝗆𝗂𝗇𝖺𝗋 𝗆𝖾𝗇𝗌𝖺𝗃𝖾𝗌.`, m);

  await conn.reply(m.chat, `🚫 *𝖤𝗇𝗅𝖺𝖼𝖾 𝖽𝖾𝗍𝖾𝖼𝗍𝖺𝖽𝗈*\n\n✦ 𝖫𝖺 𝖿𝗎𝗇𝖼𝗂𝗈𝗇 *𝖠𝖭𝖳𝖨𝖫𝖨𝖭𝖪* 𝖾𝗌𝗍𝖺́ 𝖺𝖼𝗍𝗂𝗏𝖺.\n✦ 𝖤𝗅 𝗎𝗌𝗎𝖺𝗋𝗂𝗈 será eliminado.`, m);

  await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
};

export default handler;
