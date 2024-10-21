const { MessageMedia } = require('whatsapp-web.js');
const path = require('path');

module.exports.handleOrder = async (client, message, order, adminNumber) => {
    // Kirim pesan ke customer
    const promptEmailMessage = `
👑 Terimakasih Telah Order di Kinasih 👑

Scribd Premium 2 Bulan Sharing

Email : quebricuyeyo-8133@yopmail.com
Pass : Masuk#1234

Note : Login langsung, tidak usah login gmail,
Dilarang mengubah informasi akun apapun !
butuh otp =>
    buka https://yopmail.com lalu masukkan emailnya`;
    await message.reply(promptEmailMessage);

};

