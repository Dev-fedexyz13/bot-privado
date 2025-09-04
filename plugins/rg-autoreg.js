import fs from 'fs';

let handler = async (m, { conn, command}) => {
  const nombres = [
    '𝖨𝗍𝖺𝖼𝗁𝗂', '𝖬𝖺𝖉𝖺𝗋𝖺', '𝖮𝖻𝗂𝗍𝗈', '𝖲𝖺𝗌𝗎𝗄𝖾', '𝖪𝖺𝗄𝖺𝗌𝗁𝗂',
    '𝖬𝗂𝗇𝖺𝗍𝗈', '𝖭𝖺𝗋𝗎𝗍𝗈', '𝖲𝗁𝗂𝗌𝗎𝗂', '𝖧𝖺𝗌𝗁𝗂𝗋𝖺𝗆𝖺', '𝖳𝗈𝖻𝗂𝗋𝖺𝗆𝖺',
    '𝖯𝖺𝗂𝗇', '𝖪𝗈𝗇𝖺𝗇', '𝖣𝖾𝗂𝖽𝖺𝗋𝖺', '𝖦𝖺𝖺𝗋𝖺', '𝖭𝖾𝗃𝗂'
  ];

  const nombreAleatorio = nombres[Math.floor(Math.random() * nombres.length)];
  const edadAleatoria = Math.floor(Math.random() * 51) + 10; // entre 10 y 60
  const nombreFinal = `${nombreAleatorio}.${edadAleatoria}`;

  global.db.data.users[m.sender] = {
    registered: true,
    name: nombreFinal,
    age: edadAleatoria,
    regTime: +new Date,
...global.db.data.users[m.sender]
};

  await m.reply(`✅ *𝖱𝖾𝗀𝗂𝗌𝗍𝗋𝗈 𝖠𝗎𝗍𝗈𝗆𝖺́𝗍𝗂𝖼𝗈*\n\n👤 *𝖭𝗈𝗆𝖻𝗋𝖾:* ${nombreFinal}\n🎂 *𝖤𝖽𝖺𝖽:* ${edadAleatoria} 𝖺𝗇̃𝗈𝗌\n📅 *𝖥𝖾𝖼𝗁𝖺:* ${new Date().toLocaleDateString()}\n\n🌑 *𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 te da la bienvenida al protocolo Uchiha.*`);
};

handler.command = ['reg'];
handler.register = true;

export default handler;
