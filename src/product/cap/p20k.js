const { MessageMedia } = require('whatsapp-web.js');
const path = require('path');

module.exports.handleOrder = async (client, message, order, adminNumber) => {
    // Kirim pesan ke customer
    const promptEmailMessage = `
👑 Terimakasih Telah Order di Kinasih 👑

Capcut 1 Tahun Sharing

Email : milocubewxx@gmail.com
Pass : Bacarulesnya!


—: login email, bukan gmail/google/fb/tiktok!
—: bisa untuk laptop/pc via scan QR! tergantung device support/tidak! tidak disarankan ya!
—: kapasitas hanya 100g hapus hasil editan jika sudah tidak terpakai 
—: hanya untuk 1x login. 
—: kalau bisa sekali edit langsung export ya, takutnya nanti kelogout sendiri, soalnya sharing sama orang lain
—: hasil export bisa dilihat orang lain

*Garansi 3 Bulan`;
    await message.reply(promptEmailMessage);

};

