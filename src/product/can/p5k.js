const { MessageMedia } = require("whatsapp-web.js");
const path = require("path");

module.exports.handleOrder = async (client, message, order, adminNumber) => {
  const emojis = ["😍", "🤩", "🥳", "😁", "😎"];

  // Kirim pesan ke customer
  const promptEmailMessage = `Kirim email yang akan digunakan premium yaa, \nemail saja tidak usah password. Nanti akan dikirim undangan lewat gmail.`;
  await message.reply(promptEmailMessage);

  // Tambahkan reaksi 🤔 pada prompt email
  await message.react("🤔");

  // Fungsi untuk menangani email customer
  const handleEmailResponse = async (emailMessage) => {
    if (
      emailMessage.from === message.from &&
      emailMessage.body.includes("@gmail.com")
    ) {
      const emailToAdmin = `Email yang diberikan oleh ${order.customerName} untuk ${order.product}: ${emailMessage.body}`;

      // Kirim email ke admin
      await client.sendMessage(adminNumber, emailToAdmin);

      // Balas ke customer
      await emailMessage.reply(
        "Email kamu sudah diterima. tunggu konfirmasi Admin ya Terima kasih !"
      );

      // React dengan emoji acak pada pesan email
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      await emailMessage.react(randomEmoji);

      // Hapus listener setelah email diterima
      client.removeListener("message", handleEmailResponse);
    }
  };

  // Tambahkan listener sekali saja
  client.on("message", handleEmailResponse);
};
