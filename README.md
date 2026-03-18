# Rhythm Game — Landing Page

Rhythm Game Android uygulamasinin tanitim ve waitlist sayfasi. Telefonundaki herhangi bir MP3'u yapay zeka ile ritim oyununa donustur.

## Teknoloji

| Katman | Teknoloji |
|--------|-----------|
| Frontend | Next.js 16, React 19, Tailwind CSS v4 |
| i18n | next-intl (Turkce / Ingilizce) |
| Backend | Next.js API Routes |
| Veritabani | SQLite (better-sqlite3) |
| Mail | Nodemailer + Gmail SMTP |
| Animasyon | Lottie (lottie-react), Canvas scrollytelling |
| Konteyner | Docker + Docker Compose |

## Ozellikler

- 192 frame canvas-tabanli scrollytelling animasyonu
- Waitlist kayit sistemi (email + onay maili)
- Toplu yayin bildirimi (tum listeye mail)
- Responsive tasarim (mobil, tablet, desktop)
- Turkce / Ingilizce dil destegi
- Lottie animasyonlu ikonlar
- Arkaplan muzik oynatici
- SEO + JSON-LD (FAQ schema)

---

## Hizli Baslangic (Docker)

### Gereksinimler

- [Docker](https://docs.docker.com/get-docker/) ve [Docker Compose](https://docs.docker.com/compose/install/)

### 1. Repoyu klonla

```bash
git clone https://github.com/acemersoy/Ritim-Oyunu-.git
cd Ritim-Oyunu-
```

### 2. Ortam degiskenlerini ayarla

`docker-compose.yml` dosyasindaki `environment` bolumunu kendi bilgilerinle guncelle:

```yaml
environment:
  - GMAIL_USER=senin-gmail@gmail.com
  - GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
  - NOTIFY_SECRET=guclu-bir-secret-key
```

> **Gmail App Password nasil alinir:**
> 1. [Google Hesap](https://myaccount.google.com/) → Guvenlik
> 2. 2 Adimli Dogrulamayi ac
> 3. Uygulama Sifreleri → Yeni sifre olustur
> 4. Olusturulan 16 haneli sifreyi `GMAIL_APP_PASSWORD` olarak yaz

### 3. Build et ve baslat

```bash
docker compose up --build -d
```

Uygulama **http://localhost:3000** adresinde calisir.

### Loglari izle

```bash
docker compose logs -f
```

### Durdur

```bash
# Uygulamayi durdur (veritabani korunur)
docker compose down

# Uygulamayi durdur + veritabanini sil
docker compose down -v
```

### Yeniden build et

Kod degisikligi yaptiktan sonra:

```bash
docker compose up --build -d
```

---

## Docker Compose Detaylari

```yaml
services:
  web:
    build: .            # Dockerfile ile multi-stage build
    ports:
      - "3000:3000"     # localhost:3000 uzerinden erisim
    volumes:
      - waitlist-data:/app/data   # SQLite DB kalici depolama
    restart: unless-stopped       # Crash durumunda otomatik yeniden baslar
```

**Volume:** `waitlist-data` adli Docker volume, SQLite veritabanini (`data/waitlist.db`) saklar. `docker compose down` ile container silinse bile veriler korunur. Veritabanini da silmek icin `docker compose down -v` kullanin.

**Dockerfile:** 3 asamali (multi-stage) build kullanir:
1. **deps** — `npm install` ile bagimliliklari yukler
2. **builder** — `npm run build` ile Next.js production build olusturur
3. **runner** — Sadece standalone ciktisi + public dosyalari kopyalar, hafif image olusturur

---

## Docker'siz Gelistirme

### Gereksinimler

- Node.js 20+
- npm

### Kurulum

```bash
npm install
```

### Ortam degiskenleri

Proje kokunde `.env.local` dosyasi olustur:

```env
GMAIL_USER=senin-gmail@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
NOTIFY_SECRET=guclu-bir-secret-key
```

### Calistir

```bash
# Gelistirme modu (hot-reload)
npm run dev

# Production build + calistir
npm run build
node .next/standalone/server.js
```

Uygulama **http://localhost:3000** adresinde calisir.

---

## API Endpointleri

### `POST /api/subscribe`

Waitlist'e email kaydeder ve onay maili gonderir.

```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "kullanici@ornek.com", "locale": "tr"}'
```

Yanit:
```json
{ "success": true, "already": false }
```

### `POST /api/notify-all`

Tum waitlist'e yayin bildirimi gonderir. Secret key gerektirir.

```bash
curl -X POST http://localhost:3000/api/notify-all \
  -H "Authorization: Bearer NOTIFY_SECRET_DEGERINIZ"
```

Yanit:
```json
{ "sent": 42, "failed": 0, "total": 42 }
```

---

## Proje Yapisi

```
src/
├── app/
│   ├── [locale]/          # i18n sayfalari (TR / EN)
│   ├── api/
│   │   ├── subscribe/     # Waitlist kayit endpoint
│   │   └── notify-all/    # Toplu bildirim endpoint
│   ├── globals.css        # Tema + animasyonlar
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # / → /tr yonlendirme
├── components/
│   ├── sections/          # Hero, Features, Problem, FAQ, CTA, vb.
│   ├── Footer.tsx         # 3 sutunlu footer + newsletter
│   ├── FloatingActions.tsx # Muzik oynatici + scroll-to-top
│   ├── LottieIcon.tsx     # Lottie animasyon wrapper
│   └── Scrollytelling.tsx # Canvas frame animasyonu
├── lib/
│   ├── db.ts              # SQLite veritabani
│   ├── mail.ts            # SMTP mail servisi
│   └── analytics.ts       # Google Analytics + Plausible
└── i18n/                  # Dil yapilandirmasi

messages/
├── tr.json                # Turkce ceviriler
└── en.json                # Ingilizce ceviriler

public/
├── scrollytelling/        # 192 PNG frame (canvas animasyonu)
├── screenshots/           # Oyun ici ekran goruntuleri
├── lottie/                # Lottie animasyon JSON dosyalari
└── bg-music.mp3           # Arkaplan muzigi

data/
└── waitlist.db            # SQLite veritabani (otomatik olusur)
```

---

## Lisans

MIT License &copy; Avni Cem Ersoy
