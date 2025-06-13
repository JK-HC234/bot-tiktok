# 📥 BOT WHATSAPP DESCARGADOR DE TIKTOK 🔥
**Sin marca de agua | Sin API Key | Botones para elegir calidad**

---

## 🚀 FUNCIONES:
- Descargar videos de TikTok **sin marca de agua**
- Elegir calidad: **HD**, **SD**, o **solo audio**
- Todo funciona **sin usar ninguna API key**
- Se activa escribiendo:  
  ```
  .tiktok [enlace]
  



## 🛠️ INSTALACIÓN

# 0.termux
```
termux-setup-storage
```
# 1. Actualiza paquetes
```
pkg update && pkg upgrade -y

```
# 2. Instala Node.js y Git
```
pkg install nodejs git -y
```
# 3. Instala FFmpeg (para procesar video/audio si se requiere)
```
pkg install ffmpeg -y
```
# 4. github
```
https://github.com/JK-HC234/bot-tiktok/tree/main && cd bot-tiktok
```
# 5. Instala dependencias
```
npm install
```
# 6. Ejecuta el bot
```
node index.js

   ```
4.*Escanea el código QR** desde tu WhatsApp (te lo mostrará en consola)

## 📦 USO

Envía un mensaje a tu bot como este:
```
.tiktok https://www.tiktok.com/@usuario/video/1234567890
```

El bot responderá con **botones** para que elijas:
- 🎥 Descargar en HD
- 📺 Descargar en SD
- 🎧 Descargar audio

---

## 🤖 DEPENDENCIAS

- `@whiskeysockets/baileys` — Para manejar WhatsApp
- `node-fetch` — Para hacer solicitudes HTTP
- `cheerio` y `axios` — Para scrapear TikTok

---

## 💡 CRÉDITOS

- Código adaptado y generado por [Jahseh]
- Usamos técnicas de scraping y parsing sin necesidad de claves API
