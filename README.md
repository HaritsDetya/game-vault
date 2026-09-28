# 🎮 GameVault - Personal Game Tracker & Wiki Platform

GameVault adalah platform cloud pribadi untuk mendokumentasikan perjalanan bermain game Anda lintas platform (PC, PlayStation, Nintendo Switch, Retro/Emulator, Xbox, dll.), mencatat ulasan, mengelola wishlist, serta menyimpan panduan dan checklist quest (*Personal Wiki*).

---

## ✨ Fitur Utama

- 🕹️ **Multi-Status Tracking:** Kategori game *Currently Playing*, *Completed*, *Wishlist*, *On Hold*, dan *Dropped*.
- 🔍 **Auto-Metadata Game:** Terhubung dengan RAWG Video Games Database untuk mengambil cover poster resolusi tinggi, developer, genre, dan tahun rilis otomatis (dilengkapi fallback database siap pakai).
- 📖 **Personal Game Wiki & Notes:** Ruang bebas untuk mencatat panduan *build*, strategi bos, lore, dan rahasia game.
- 🎯 **Quest & Trophy Checklist:** Buat target misi pribadi dan checklist trophy interaktif untuk setiap game.
- 📊 **Statistik Otomatis:** Menghitung total koleksi, jumlah tamat, estimasi jam bermain, dan rata-rata skor rating.
- 💾 **Backup & Restore (.JSON):** Ekspor dan impor seluruh data arsip Anda kapan saja untuk keamanan data.
- ☁️ **Siap Cloud ($0/Bulan):** Siap di-deploy ke Vercel dan diintegrasikan dengan Supabase (PostgreSQL).

---

## 🚀 Cara Menjalankan Secara Lokal

1. Buka terminal di folder proyek ini:
   ```bash
   cd C:\Users\ASUS\.gemini\antigravity\scratch\game-vault
   ```
2. Jalankan server pengembang (*development server*):
   ```bash
   npm run dev
   ```
3. Buka browser dan akses **[http://localhost:3000](http://localhost:3000)**.

---

## 🔑 Menghubungkan RAWG API Key (Gratis)

1. Kunjungi [rawg.io/apidocs](https://rawg.io/apidocs) dan daftar akun gratis.
2. Dapatkan API Key Anda (kuota gratis hingga 20.000 panggilan/bulan).
3. Di GameVault, klik tombol **Pengaturan** di pojok kanan atas.
4. Masukkan API Key Anda lalu klik **Simpan**.

---

## 🌐 Panduan Deploy ke Cloud (Akses di Mana Saja)

1. Buat repositori baru di akun [GitHub](https://github.com/) Anda dan push folder proyek ini:
   ```bash
   git add .
   git commit -m "feat: initial GameVault personal tracker"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo-name>.git
   git push -u origin main
   ```
2. Kunjungi [Vercel](https://vercel.com/) dan pilih **Add New Project**.
3. Import repositori GitHub Anda.
4. Klik **Deploy**. Website pribadi Anda langsung aktif dan dapat diakses dari browser HP atau komputer mana saja!
