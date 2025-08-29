import {
  readdirSync, statSync, unlinkSync, existsSync, readFileSync,
  watch, rmSync, promises as fsPromises
} from 'fs';
const fs = {...fsPromises, existsSync};
import path, { join} from 'path';
import ws from 'ws';

let handler = async (m, { conn, command, usedPrefix}) => {
  const isDelete = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command);
  const isStop = /^(stop|pausarai|pausarbot)$/i.test(command);
  const isList = /^(bots|sockets|socket)$/i.test(command);

  const reportError = async (e) => {
    await m.reply('✦ Ocurrió un error inesperado.');
    console.error('[The-fede_IA] Error:', e);
};

  switch (true) {
    case isDelete: {
      const who = m.mentionedJid?.[0] || (m.fromMe? conn.user.jid: m.sender);
      const uniqid = who.split('@')[0];
      const sessionPath = `./${jadi}/${uniqid}`;

      if (!fs.existsSync(sessionPath)) {
        await conn.sendMessage(m.chat, {
          text: `✦ No se encontró ninguna sesión activa.\n\nPuedes crear una usando:\n*${usedPrefix}jadibot*\n\nO vincular directamente con tu ID:\n*${usedPrefix}jadibot* \`\`\`${uniqid}\`\`\``
}, { quoted: m});
        return;
}

      if (global.conn.user.jid!== conn.user.jid) {
        return conn.sendMessage(m.chat, {
          text: `✦ Este comando solo puede ejecutarse desde el *Bot Principal*.\n\n📎 [Solicitar acceso](https://api.whatsapp.com/send/?phone=${global.conn.user.jid.split('@')[0]}&text=${usedPrefix + command})`
}, { quoted: m});
}

      await conn.sendMessage(m.chat, { text: `✦ Tu sesión como *Sub-Bot* ha sido eliminada.`}, { quoted: m});

      try {
        fs.rmSync(sessionPath, { recursive: true, force: true});
        await conn.sendMessage(m.chat, { text: `✦ Sesión cerrada y datos eliminados correctamente.`}, { quoted: m});
} catch (e) {
        reportError(e);
}
      break;
}

    case isStop: {
      if (global.conn.user.jid === conn.user.jid) {
        return conn.reply(m.chat, `✦ Este comando solo aplica a *Sub-Bots*. Si deseas convertirte en uno, contacta al número principal.`, m);
}

      await conn.reply(m.chat, `✦ ${botname} ha sido desactivado.`, m);
      conn.ws.close();
      break;
}

    case isList: {
      const activeBots = global.conns.filter(c =>
        c.user && c.ws.socket && c.ws.socket.readyState!== ws.CLOSED
);

      const formatUptime = (ms) => {
        const sec = Math.floor(ms / 1000) % 60;
        const min = Math.floor(ms / 60000) % 60;
        const hr = Math.floor(ms / 3600000) % 24;
        const day = Math.floor(ms / 86400000);
        return `${day}d ${hr}h ${min}m ${sec}s`;
};

      const list = activeBots.map((bot, i) => {
        const jid = bot.user.jid.replace(/[^0-9]/g, '');
        const name = bot.user.name || 'Sub-Bot';
        const uptime = bot.uptime? formatUptime(Date.now() - bot.uptime): 'Desconocido';
        return `• 「 ${i + 1} 」\n📎 wa.me/${jid}?text=${usedPrefix}code\n👤 Usuario: ${name}\n🕑 Online: ${uptime}`;
}).join('\n\n──────────────────────\n\n');

      const total = activeBots.length;
      const response = `
🍁 LISTA DE *SUB-BOTS* ACTIVOS

🍁 Puedes solicitar acceso para que el bot se una a tu grupo.

⚠️ Cada Sub-Bot opera de forma independiente. El número principal no se responsabiliza por su uso indebido.

📌 Sub-Bots conectados: ${total}

${list || '🍁 No hay Sub-Bots disponibles en este momento.'}
`.trim();

      await conn.sendMessage(m.chat, {
        text: response,
        mentions: conn.parseMention(response)
}, { quoted: m});
      break;
}
}
};

handler.tags = ['serbot'];
handler.help = ['sockets', 'deletesesion', 'pausarai'];
handler.command = ['deletesesion', 'deletebot', 'deletesession', 'deletesesaion',
  'stop', 'pausarai', 'pausarbot',
  'bots', 'sockets', 'socket'
];

export default handler;
