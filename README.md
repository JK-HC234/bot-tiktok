# 🤖 BOT-TIKTOK | WhatsApp Bot

Bot de WhatsApp solo para descargar videos de TikTok sin marca de agua y con botones para elegir calidad (HD, SD o solo audio). Sin necesidad de API key.

---

## ✅ Funciones
- Descargar videos de TikTok sin marca de agua
- Elegir calidad: HD, SD o audio
- Uso sencillo con comando y botones interactivos
- Sin necesidad de API key

---

## 📦 Requisitos

- Termux (recomendado desde F-Droid)
- Node.js v18+
- WhatsApp con sesión activa

---

## 🚀 Instalación en Termux

```bash
pkg update && pkg upgrade
pkg install git nodejs -y
git clone https://github.com/usuario/bot-tiktok.git
cd bot-tiktok
npm install
npm install @whiskeysockets/baileys
node index.js
```

---

## 🟢 Uso

En WhatsApp escribe:

```
.tiktok https://www.tiktok.com/@usuario/video/1234567890
```

El bot responderá con botones para elegir:
- 🔹 HD (alta calidad)
- 🔸 SD (calidad estándar)
- 🎧 Audio (solo sonido)

---

## 🤝 Créditos

- Código base: adaptado por [@jahseh]
- Librería WhatsApp: [`@whiskeysockets/baileys`](https://github.com/WhiskeySockets/Baileys)
- Sin necesidad de API externa

---

📌 *Bot simple y directo para uso personal. ¡Disfrútalo!*