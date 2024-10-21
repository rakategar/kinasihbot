const { MessageMedia } = require('whatsapp-web.js');
const path = require('path');

module.exports.handleOrder = async (client, message, order, adminNumber) => {
    // Kirim pesan ke customer
    const promptEmailMessage = `Kirim email yang akan digunakan premium yaa, \nemail saja tidak usah password. Nanti akan dikirim undangan lewat gmail.`;
    await message.reply(promptEmailMessage);

    // Fungsi untuk menangani email customer
    const handleEmailResponse = async (emailMessage) => {
        if (emailMessage.from === message.from && emailMessage.body.includes('@gmail.com')) {
            const emailToAdmin = `Email yang diberikan oleh ${order.customerName} untuk ${order.product}: ${emailMessage.body}`;
            
            // Kirim email ke admin
            await client.sendMessage(adminNumber, emailToAdmin);
            
            // Balas ke customer
            await emailMessage.reply('Email kamu sudah diterima. tunggu konfirmasi Admin ya Terima kasih !');
            
            // Hapus listener setelah email diterima
            client.removeListener('message', handleEmailResponse);
        }
    };

    // Tambahkan listener sekali saja
    client.on('message', handleEmailResponse);
};
