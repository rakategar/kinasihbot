const { MessageMedia } = require('whatsapp-web.js');
const path = require('path');

module.exports.handleOrder = async (client, message, order, adminNumber) => {
    // Kirim pesan ke customer
    const promptEmailMessage = `
👑 Terimakasih Telah Order di Kinasih 👑

WeTV 3 Bulan Sharing

email : hati@babydoll.my.id
Pass : masukaja

Note :
Login menggunakan nomor hp
Dilarang mengubah informasi akun apapun !
Login hanya 1 Device !`;
    await message.reply(promptEmailMessage);

   

   
};

