const { MessageMedia } = require("whatsapp-web.js");
const path = require("path");

module.exports.handleOrder = async (client, message, order, adminNumber) => {
  // Kirim pesan ke customer
  const promptEmailMessage = `
👑 Terimakasih Telah Order di Kinasih 👑

Vidio Premier Platinum Private 1 Bulan alldev
email : crystalgay615@gmail.com
pswrd : masuk12345

✨ Silahkan login ke aplikasi Vidio premier seperti biasa menggunakan email ( tidak usah login gmail )
❌ Dilarang mengganti informasi akun seperti nama akun, password, dll.

silahkan bertanya kalau terdapat kendala`;
  await message.reply(promptEmailMessage);
};
