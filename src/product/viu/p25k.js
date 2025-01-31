const { MessageMedia } = require('whatsapp-web.js');
const path = require('path');

module.exports.handleOrder = async (client, message, order, adminNumber) => {
    // Kirim pesan ke customer
    const promptEmailMessage = `
👑 Terimakasih Telah Order di Kinasih 👑

Terimakasih telah order di Kinasih !
Viu Premium sharing 3 Bulan 

EMAIL : Monniedecapua@skynomad.biz.id
PSWRD : masuk123

NOTE : Silakan login langsung tanpa menggunakan Gmail.
DILARANG MENGGANTI INFORMASI AKUN APAPUN`;
    await message.reply(promptEmailMessage);

   

   
};

