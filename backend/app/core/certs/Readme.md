# 🔐 RSA-256 Kalit Juftligini `openssl` orqali Yaratish

## 📥 1. OpenSSL o‘rnatilganini tekshirish

Terminalda quyidagi buyruqni yozing:

```bash
openssl version
```

Agar `openssl` o‘rnatilmagan bo‘lsa:

- **MacOS** uchun:

```bash
brew install openssl
```

- **Linux** uchun:

```bash
sudo apt install openssl
```

---

## 📦 2. Private (shaxsiy) kalit yaratish

**RSA 256-bit** kalit yaratish uchun:

```bash
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
```

### ✅ Flaglar izohi:

| **Flag**                      | **Ma’nosi**                                                  |
|-------------------------------|-------------------------------------------------------------|
| `genpkey`                      | Kalit juftligi yaratish uchun buyruq.                        |
| `-algorithm RSA`               | RSA algoritmiga asoslangan kalit yaratadi.                   |
| `-out private_key.pem`         | Private kalitni saqlaydigan fayl nomi.                       |
| `-pkeyopt rsa_keygen_bits:2048` | Kalit uzunligini 2048-bit qilib belgilaydi. (**256-bit emas**) |

> ⚡ **Eslatma:** RSA-256 to‘g‘ridan-to‘g‘ri mavjud emas. SHA-256 bilan birga ishlatiladi.

---

## 📤 3. Public (ommaviy) kalitni olish

Private kalitdan public kalitni ajratib olish:

```bash
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

### ✅ Flaglar izohi:

| **Flag**               | **Ma’nosi**                                |
|------------------------|--------------------------------------------|
| `rsa`                   | RSA kalitini o‘qish va ishlatish uchun.    |
| `-pubout`               | Public kalitni ajratib olish uchun.        |
| `-in private_key.pem`   | Private kalitni ko‘rsatadi.               |
| `-out public_key.pem`   | Public kalitni saqlash uchun fayl nomi.   |

---

## 🔑 4. Kalitlarni tekshirish

- **Private Kalitni ko‘rish:**

  ```bash
  cat private_key.pem
  ```

- **Public Kalitni ko‘rish:**

  ```bash
  cat public_key.pem
  ```

---

## 🖊️ 5. RSA Kaliti bilan SHA-256 yordamida Imzo Yaratish

1. **Imzolash uchun fayl yaratamiz:**

   ```bash
   echo "Bu test fayl." > data.txt
   ```

2. **SHA-256 yordamida imzo yaratamiz:**

   ```bash
   openssl dgst -sha256 -sign private_key.pem -out data.sig data.txt
   ```

   | **Flag**        | **Ma’nosi**                         |
      |-----------------|--------------------------------------|
   | `dgst`          | Digest (xesh) yaratish.              |
   | `-sha256`       | SHA-256 algoritmidan foydalanish.    |
   | `-sign`         | Private kalit bilan imzolash.        |
   | `-out data.sig` | Imzo faylini saqlash.                |

---

## ✅ 6. Imzoni Tekshirish

```bash
openssl dgst -sha256 -verify public_key.pem -signature data.sig data.txt
```

**Natija:**

- `Verified OK` — Imzo to‘g‘ri.
- `Verification Failure` — Imzo mos kelmadi.

---

## 🗄️ 7. Kalitlarni Formatga O‘zgartirish (Ixtiyoriy)

- **PKCS#8 formatiga o‘tkazish:**

  ```bash
  openssl pkcs8 -topk8 -inform PEM -outform PEM -in private_key.pem -out private_key_pkcs8.pem -nocrypt
  ```

- **DER formatida public kalit:**

  ```bash
  openssl rsa -in private_key.pem -pubout -outform DER -out public_key.der
  ```

---

## 💡 Tavsiyalar

- **RSA 2048-bit** — standart xavfsizlik uchun yetarli.
- **RSA 4096-bit** — yuqori xavfsizlik talab qilinganda.
- **Private kalit** — hech kimga bermang.
- **Public kalit** — serverlar yoki foydalanuvchilarga berilishi mumkin.

---

Shu tarzda **RSA-SHA256** uchun **public** va **private** kalitlaringizni yaratishingiz va ishlatishingiz mumkin! 🚀

