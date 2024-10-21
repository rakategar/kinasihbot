const { MessageMedia } = require('whatsapp-web.js');
const path = require('path');

module.exports.handleOrder = async (client, message, order, adminNumber) => {
    // Kirim pesan ke customer
    const promptEmailMessage = `
👑 Terimakasih Telah Order di Kinasih 👑

Terimakasih telah order di Kinasih !
Viu Premium sharing 2 Bulan 

EMAIL : LissaZumwalt322@kencurr.my.id
PSWRD : masuk123

NOTE : Silakan login langsung tanpa menggunakan Gmail.
DILARANG MENGGANTI INFORMASI AKUN APAPUN`;
    await message.reply(promptEmailMessage);

   

};

