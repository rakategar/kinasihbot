const { MessageMedia } = require('whatsapp-web.js');
const path = require('path');

module.exports.handleOrder = async (client, message, order, adminNumber) => {
    // Kirim pesan ke customer
    const promptEmailMessage = `
👑 Terimakasih Telah Order di Kinasih 👑

Lightroom Premium Account 1 Tahun

email : Fylson@prmum.my.id
pass : Photogenic123

NOTES : saat sudah login jangan lupa matikan sinkron galeri, agar foto yg di upload nantinya tidak tercampur & masuk ke akun.
caranya : klik icon cloud pojok kanan atas - pilih pause/jeda sinkronisasi - kalo udah muncul tulisan resume artinya sinkron otomatis telah off.

‼SYARAT & KETENTUAN :

1. dilarang otak atik email, password, username dll.
2. akun bersama = galeri tercampur. pastikan pakai saat kamu butuh & langsung hapus setelah selesai.
3. garansi 3 bulan sedari tanggal pembelian.
4. dilarang menyebarkan ke teman/saudara/keluarga. beli 1x = dipakai sendiri 1 device!

🎴TUTORIAL LOGIN :

1. Dilarang menambahkan email/nomor recovery ke akun adobe! jika butuh verif kabari seller & wajib janjian.
2. Buka apk lightroom, klik continue with adobe. BUKAN login with apple/google/facebook!
3. Masukkan email & pass yang sudah diberikan di bawah, harap copas saja biar tidak typo.
4. Jika terkena verif tolong jangan spam karena bisa bikin akun ke lock (no garansi apabila ke lock!) harap hubungi seller & janjian untuk login apabila kena verif.

MELANGGAR = DENDA 500K‼`;
    await message.reply(promptEmailMessage);

};

