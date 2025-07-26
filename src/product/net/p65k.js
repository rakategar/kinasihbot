const { MessageMedia } = require("whatsapp-web.js");
const path = require("path");

module.exports.handleOrder = async (client, message, order, adminNumber) => {
  // Kirim pesan ke customer
  const promptEmailMessage = `
٬٬ netflix sharing 2 bulan 1u ✶

🧾 note / reminders :
▾ sebelum login hapus cache aplikasi netflix terlebih dahulu.
▾ garansi 28-30h.
▾ jangan terlalu sering pindah device, karena bisa membuat akun kereset.

✎ email: merahtopi516@gmail.com
      password: buset123
profile: E
           ✶ pin: 5252
🧾 garansi berlaku jika mengikuti7 RULES WAJIB ini :
▾ maximum hanya 1 device
▾ dilarang ubah pass, bill, email, no hp, plan. Denda 500k
▾ dilarang akses menggunakan vpn.
▾ email terganti? denda 500k.
▾ jika terkena limit silahkan download film&nonton offline.
▾ silahkan klik notnow bila ada notifikasi pembayaran.`;
  await message.reply(promptEmailMessage);
};
