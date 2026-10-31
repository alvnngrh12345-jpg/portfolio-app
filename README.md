# Modern Personal Portfolio & Admin Dashboard

Website personal portfolio modern, minimalis, dan profesional untuk mahasiswa/developer dengan **Halaman Publik Dinamis** dan **Admin Dashboard Terintegrasi Supabase**.

---

## 🚀 Fitur Utama

### 1. Halaman Portfolio Publik
- **Navbar Sticky**: Smooth scrolling ke target section, indikator aktif, download CV, dan mobile drawer menu.
- **Hero Section**: Foto profil, nama, keahlian, headline dinamis, tombol Call-to-Action, dan social media links.
- **About Me**: Narasi personal mendalam, filosofi kerja, dan riwayat pendidikan formal.
- **Technical Skills**: Filter kategori (Languages, Frontend, Backend, Database, Tools & DevOps) dengan bar penguasaan persentase.
- **Projects Showcase**: Filter kategori proyek, badge featured/published, thumbnail modern, link GitHub & Live Demo, serta Modal Detail Proyek.
- **Experience & Education Timeline**: Linimasa vertikal pengalaman kerja, magang industri, dan organisasi kampus.
- **Certificates Gallery**: Kartu sertifikat resmi dengan modal preview dokumen dan verifikasi tautan kredensial.
- **Contact Form**: Formulir pengiriman pesan yang langsung menyimpan data ke tabel `messages` Supabase dengan toast notifikasi instan.
- **Footer**: Brand info, copyright, quick links, dan tautan sosial media.
- **AOS (Animate On Scroll)**: Animasi transisi masuk halus di seluruh section dengan dukungan `prefers-reduced-motion`.

### 2. Admin Dashboard (/admin)
- **Supabase Authentication**: Login aman via email dan password dengan perlindungan Protected Route.
- **Dashboard Overview**: Ringkasan statistik (Total Proyek, Skills, Pesan, Sertifikasi, Pengalaman), proyek terbaru, dan pesan masuk terbaru.
- **Profile & About Management**: Mengubah identitas, headline, narasi, bio, kontak, serta upload foto profil dan file CV ke Supabase Storage.
- **Skills Management**: CRUD lengkap untuk menambah, mengedit, dan menghapus keahlian teknis beserta level penguasaan.
- **Projects Management**: CRUD proyek dengan upload thumbnail gambar ke Supabase Storage, tagging teknologi, dan switch featured/published.
- **Experience & Education Management**: CRUD linimasa rekam jejak kerja, kepengurusan organisasi, dan riwayat akademik.
- **Certificates Management**: CRUD sertifikat dengan upload bukti kredensial dan link verifikasi eksternal.
- **Messages Inbox**: Membaca pesan masuk dari pengunjung website, menandai sudah/belum dibaca, menghapus pesan, dan tombol balas via email.
- **Website Settings**: Mengatur SEO metadata, judul website, meta description, warna aksen, favicon, dan kontak utama.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, AOS (Animate On Scroll), React Router DOM v7.
- **Backend & Database**: Supabase (PostgreSQL, Supabase Auth, Supabase Storage, Row Level Security).
- **Design System**: shadcn-inspired reusable UI primitives (`Button`, `Card`, `Input`, `Textarea`, `Badge`, `Modal`, `Toast`).

---

## ⚙️ Panduan Menjalankan Proyek

### 1. Instalasi Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Menyiapkan Supabase Backend
1. Buat proyek baru di [Supabase Console](https://supabase.com).
2. Buka menu **SQL Editor** -> **New Query**.
3. Buka file [`supabase/schema.sql`](./supabase/schema.sql), salin seluruh isinya, dan klik tombol **Run**.
   * Script ini otomatis membuat seluruh 10 tabel, Row Level Security (RLS) policies, Storage Buckets (`profile-images`, `project-images`, `certificates`, `documents`), serta seed data awal.
4. Buka menu **Authentication** -> **Users** -> **Add User** -> **Create User** untuk membuat akun admin pertama Anda (masukkan email dan password admin).

### 3. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Isi dengan kredensial dari dashboard Supabase Anda (**Project Settings** -> **API**):
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> **Catatan Mode Demo:** Jika kredensial Supabase belum diisi, aplikasi secara otomatis berjalan dalam mode fallback/demo menggunakan data dummy yang tersimpan di `src/constants/initialData.ts`. Anda dapat langsung mencoba login admin menggunakan email apa saja dan password minimal 6 karakter.

### 4. Menjalankan Aplikasi (Development Server)
```bash
npm run dev
```
Akses aplikasi melalui browser di `http://localhost:5173`.
Untuk mengakses halaman admin, kunjungi `http://localhost:5173/admin/login` atau klik icon perisai di navbar.

### 5. Build Produksi
```bash
npm run build
```
Hasil build yang telah dioptimasi dengan code-splitting akan berada di folder `dist/`.
