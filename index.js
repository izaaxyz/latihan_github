// Import library whatsapp-web.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal')
const mime = require('mime-types');

// Inisialisasi client dengan strategi autentikasi lokal (menyimpan sesi)
const client = new Client({
    authStrategy: new LocalAuth()
});

// Event untuk menampilkan QR code agar Anda bisa autentikasi dari ponsel
client.on('qr', (qr) => {
    qrcode.generate(qr, {small:true});
});

// Event ketika client sudah siap digunakan
client.on('ready', () => {
    console.log('WhatsApp Bot sudah siap!');
});

// Event untuk menangani pesan masuk
client.on('message', async (message) => {
    console.log(`Pesan diterima dari ${message.from}: ${message.body}`);

    // Contoh logika: jika pesan yang diterima adalah "hai", bot akan membalas dengan sapaan
    if (message.body.toLowerCase() === 'hai') {
        message.reply('Halo, bagaimana kabar Anda?');
        return;
    }

    if (message.body.toLowerCase() === 's' && message.hasMedia) {
            const media = await message.downloadMedia();
            const mimetype = media.mimetype;

            if (mimetype.startsWith('image/') || mimetype === "image/gif" || mimetype.startsWith('video/')) {
                await message.reply(media, undefined, {
                    sendMediaAsSticker:true,
                    sendMediaAsSticker: true,
                    stickerAuthor: "Hisui-san",
                    stickerName: "Bot-Hisui 🤖"
                });
                console.log("Stiker berhasil dikirim dengan watermark.")
                
            }else {
                await message.reply('Kirim gambar atau GIF untuk dibuat stiker');
            }
            return;
        }else if(!message.body.toLowerCase() === 's'){
            message.reply('pake "s" dong!');
        }


    message.reply('Terima kasih atas pesan anda.');
});

// Inisialisasi koneksi ke WhatsApp
client.initialize();
