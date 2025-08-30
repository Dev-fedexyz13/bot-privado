// 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 | Catbox Uploader
import fetch from "node-fetch";
import crypto from "crypto";
import { FormData, Blob} from "formdata-node";
import { fileTypeFromBuffer} from "file-type";

let handler = async (m, { conn}) => {
  const quoted = m.quoted || m;
  const mime = (quoted.msg || quoted)?.mimetype || '';

  if (!mime) {
    return conn.reply(m.chat, `⚠️ 𝖯𝗈𝗋 𝖿𝖺𝗏𝗈𝗋, 𝗋𝖾𝗌𝗉𝗈𝗇𝖽𝖾 𝖺 𝗎𝗇 𝖺𝗋𝖼𝗁𝗂𝗏𝗈 𝗏𝖺́𝗅𝗂𝖽𝗈 (𝖨𝗆𝖺𝗀𝖾𝗇, 𝖵𝗂𝖽𝖾𝗈, 𝖾𝗍𝖼.).`, m);
}

  await m.react(rwait);

  try {
    const media = await quoted.download();
    const isPermanent = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    const link = await catbox(media);

    const caption = `*乂 𝖢 𝖠 𝖳 𝖡 𝖮 𝖷 - 𝖴 𝖯 𝖫 𝖮 𝖠 𝖣 𝖤 𝖱 乂*\n\n` +
      `📎 *𝖤𝗇𝗅𝖺𝖼𝖾:* ${link}\n` +
      `📦 *𝖳𝖺𝗆𝖺ñ𝗈:* ${formatBytes(media.length)}\n` +
      `⏳ *𝖤𝗑𝗉𝗂𝗋𝖺𝖼𝗂𝗈𝗇:* ${isPermanent? '𝖭𝗈 𝖾𝗑𝗉𝗂𝗋𝖺': '𝖣𝖾𝗌𝖼𝗈𝗇𝗈𝖼𝗂𝖽𝗈'}\n\n` +
      `🤖 *𝖦𝖾𝗇𝖾𝗋𝖺𝖽𝗈 𝗉𝗈𝗋 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣*`;

    await conn.sendFile(m.chat, media, 'upload.jpg', caption, m, fkontak);
    await m.react(done);

} catch (err) {
    await m.react(error);
    conn.reply(m.chat, `❌ 𝖤𝗋𝗋𝗈𝗋 𝖺𝗅 𝖼𝗋𝖾𝖺𝗋 𝖾𝗇𝗅𝖺𝖼𝖾:\n${err.message}`, m);
}
};

handler.help = ['catbox', 'tourl2'];
handler.tags = ['transformador'];
handler.command = ['catbox', 'tourl2'];
export default handler;

// Función para formatear tamaño de archivo
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}

// Función para subir a Catbox
async function catbox(content) {
  const { ext, mime} = (await fileTypeFromBuffer(content)) || {};
  const blob = new Blob([content.toArrayBuffer()], { type: mime});
  const formData = new FormData();
  const filename = crypto.randomBytes(5).toString("hex") + "." + ext;

  formData.append("reqtype", "fileupload");
  formData.append("fileToUpload", blob, filename);

  const response = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: formData,
    headers: {
      "User-Agent": "𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 Uploader/1.0"
}
});

  return await response.text();
    }
