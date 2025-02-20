const { MessageMedia } = require("whatsapp-web.js");
const path = require("path");

module.exports.handleOrder = async (client, message, order, adminNumber) => {
  // Kirim pesan ke customer
  const promptEmailMessage = `
👑 Terimakasih Telah Order di Kinasih 👑

WeTV 3 Bulan Sharing

email : 85234337767
Pass : kinasihku1


Note :
Login menggunakan nomor hp
Dilarang mengubah informasi akun apapun !
Login hanya 1 Device !`;
  await message.reply(promptEmailMessage);
};
