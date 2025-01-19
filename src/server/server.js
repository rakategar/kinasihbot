const qrcode = require("qrcode-terminal");
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const axios = require("axios");
const path = require("path");
const pricelists = require("../product/pricelist");

// URL JSON Server dan path database
const JSON_SERVER_URL = "http://localhost:5000/orders";

// Inisialisasi klien WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(),
});

// Tampilkan QR code untuk login
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Ketika klien siap (setelah login)
client.on("ready", () => {
  console.log(`
        
██╗  ██╗██╗███╗   ██╗ █████╗ ███████╗██╗██╗  ██╗    ██████╗  ██████╗ ████████╗
██║ ██╔╝██║████╗  ██║██╔══██╗██╔════╝██║██║  ██║    ██╔══██╗██╔═══██╗╚══██╔══╝
█████╔╝ ██║██╔██╗ ██║███████║███████╗██║███████║    ██████╔╝██║   ██║   ██║   
██╔═██╗ ██║██║╚██╗██║██╔══██║╚════██║██║██╔══██║    ██╔══██╗██║   ██║   ██║   
██║  ██╗██║██║ ╚████║██║  ██║███████║██║██║  ██║    ██████╔╝╚██████╔╝   ██║   
╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═╝    ╚═════╝  ╚═════╝    ╚═╝   
                                                                              

        Client is ready! ✨`);
});

// Objek untuk menyimpan data pesanan sementara
const orderData = {};
let isBotActive = true;

const emojis = ["😍", "🤩", "🥳", "😁", "😎"];

client.on("message", async (message) => {
  if (message.body.toLowerCase() === "kinasih off") {
    isBotActive = false;
    await message.reply("Ncen wes kakean duit");
    await message.react("🤔");
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    await message.react(randomEmoji); // React dengan emoji 🤔
    console.log("Bot dinonaktifkan oleh pengguna.");
    return; // Hentikan eksekusi setelah bot off
  }

  // Tangani perintah "kinasih on"
  if (message.body.toLowerCase() === "kinasih on") {
    isBotActive = true;
    await message.reply("Anjay lagi BU");
    await message.react("🤔");
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    await message.react(randomEmoji); // React dengan emoji 🤔
    console.log("Bot diaktifkan kembali oleh pengguna.");
    return; // Hentikan eksekusi setelah bot on
  }

  // Jika bot sedang tidak aktif, hentikan eksekusi
  if (!isBotActive) {
    return; // Bot tidak merespon pesan apapun
  }
  if (message.from.includes("@g.us")) {
    return; // Menghentikan eksekusi jika pesan dari grup
  }

  const msg = message.body.toLowerCase().trim();
  const contact = await message.getContact();
  const customerName = contact.pushname || "Customer";

  // Cek apakah pesan berisi perintah pembelian (produk_kode)
  if (msg.includes("_")) {
    const [product, code] = msg.split("_");
    const selectedProduct = pricelists[product]?.find(
      (item) => item.code === code
    );

    if (selectedProduct) {
      const invoiceMessage = `Silakan lakukan payment di Qris ini!
Qris support all payment tanpa admin yaa..

Produk: ${selectedProduct.description}
Kode Produk: ${selectedProduct.code} dengan harga ${selectedProduct.price}

*Jika sudah payment ketik (konfirmasi kinasih)*`;

      const media = MessageMedia.fromFilePath(
        path.join(__dirname, "../../public/qris.jpg")
      );
      await message.reply(invoiceMessage);
      await client.sendMessage(message.from, media);
      await message.react("🤔");
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      await message.react(randomEmoji); // React dengan emoji 🤔
      orderData[message.from] = {
        customerName,
        product: selectedProduct.description,
        code: selectedProduct.code,
        price: selectedProduct.price,
        success: 0,
      };
    }
  }

  // Proses konfirmasi pembayaran
  else if (msg.includes("konfirmasi kinasih")) {
    const order = orderData[message.from];
    if (order) {
      const adminNumber = "62895378394020@c.us";

      const adminMessage = `Konfirmasi pembayaran dari customer:
Nomor: ${message.from.replace("@c.us", "")}
Nama: ${order.customerName}
Produk: ${order.product}
Kode Produk: ${order.code}
Harga: ${order.price}`;

      try {
        const response = await axios.post(JSON_SERVER_URL, {
          customerName: order.customerName,
          phoneNumber: message.from,
          product: order.product,
          code: order.code,
          price: order.price,
          success: 0,
        });
        const orderId = response.data.id;
        orderData[message.from].id = orderId;

        const fullAdminMessage = `${adminMessage}\nOrder ID: ${orderId}`;
        await client.sendMessage(adminNumber, fullAdminMessage);
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        await message.react(randomEmoji);
        await message.reply("Terima kasih, pembayaran kamu sedang diproses.");

        // Jalankan script berdasarkan produk
        try {
          const productModule = require(`../product/${order.product
            .toLowerCase()
            .slice(0, 3)}/p${order.price.toLowerCase()}.js`);
          await productModule.handleOrder(client, message, order, adminNumber);
        } catch (err) {
          if (err.code === "MODULE_NOT_FOUND") {
            console.log(
              `Modul untuk produk ${order.product} dengan harga ${order.price} tidak ditemukan. Melanjutkan tanpa menjalankan modul produk.`
            );
          } else {
            console.error(`Terjadi kesalahan saat memuat modul produk:`, err);
          }
        }
      } catch (error) {
        console.error("Gagal menyimpan pesanan ke database:", error);
      }
    } else {
      await message.reply("Tidak ada pesanan yang ditemukan untuk konfirmasi.");
    }
  }
  // Proses konfirmasi pesanan selesai dari admin (!done {id})
  else if (msg.startsWith("!done")) {
    const [command, id] = msg.split(" ");

    if (id) {
      try {
        const response = await axios.get(`${JSON_SERVER_URL}?id=${id}`);
        const order = response.data[0];

        if (order) {
          await axios.patch(`${JSON_SERVER_URL}/${order.id}`, { success: 1 });
          console.log(`Order ID ${id} telah diupdate menjadi sukses.`);

          const finishedMessage = `Haii ${order.customerName}! Pesanan Anda untuk Produk ${order.product}_${order.code}_${order.id} telah selesai. Terima kasih yaa ✨\n\nmintol promotin yaa barangkali temennya butuh 😇`;
          await client.sendMessage(order.phoneNumber, finishedMessage);
          const pamflete = MessageMedia.fromFilePath(
            path.join(__dirname, "../../public/pamflet.jpg")
          );
          await client.sendMessage(order.phoneNumber, pamflete);

          await message.reply(
            `Pesanan dengan ID: ${id} telah selesai dan dikonfirmasi ke pelanggan.`
          );
        } else {
          await message.reply(`Pesanan dengan ID: ${id} tidak ditemukan.`);
        }
      } catch (error) {
        console.error(
          "Gagal mengambil atau mengupdate pesanan dari database:",
          error
        );
        await message.reply(
          `Terjadi kesalahan saat memproses pesanan dengan ID: ${id}.`
        );
      }
    } else {
      await message.reply("ID tidak valid. Gunakan format: !done {id}.");
    }
  }
  // Tangani pesan produk jika tidak ada perintah pembelian
  else {
    const matchedProduct = Object.keys(pricelists).find((product) =>
      msg.includes(product)
    );

    if (matchedProduct) {
      const pricelist = pricelists[matchedProduct]
        .map((item) => `${item.code}. ${item.description} - ${item.price}`)
        .join("\n");
      const responseMessage = `Haii ${customerName}, Selamat Datang di Kinasih Media Store ✨

Ini pricelist untuk ${matchedProduct}:
${pricelist}

*Ingin beli produknya? ketik ${matchedProduct}_{kode produk}*

Jika ingin melihat pricelist lainnya, kunjungi website kami di https://kinasihku.com yaa!

Pesan ini dibalas oleh bot Kinasihku!`;

      await message.reply(responseMessage);
      console.log(
        `Auto-reply sent to ${message.from} for product: ${matchedProduct}`
      );
    } else if (msg.includes("kinasihku") || msg.includes("kinasih")) {
      const welcomeMessage = `Hai ${customerName}, Selamat Datang di Kinasih Media Store ✨

Untuk Pricelist terbaru dan Payment kunjungi web Kita yaa

https://www.kinasihku.com 📍

Happy Shopping !! 🛍

*Pesan ini dijawab oleh bot Kinasihku!*`;

      await message.reply(welcomeMessage);
    }
  }
});

// Inisialisasi klien WhatsApp
client.initialize();
