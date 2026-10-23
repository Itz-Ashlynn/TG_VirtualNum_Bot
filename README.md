<div align="center">

# ⚡ Elite Virtual Number Bot

### Cloudflare Workers Edition & Telegram Serverless Multi-Edition

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white&style=for-the-badge)](https://workers.cloudflare.com)
[![Telegram Serverless](https://img.shields.io/badge/Telegram-Serverless%20(tgcloud)-26A5E4?logo=telegram&logoColor=white&style=for-the-badge)](https://github.com/Itz-Ashlynn/TG_VirtualNum_Bot/tree/tgserverless)
[![Telegram Bot API](https://img.shields.io/badge/Telegram-Bot%20API-26A5E4?logo=telegram&logoColor=white&style=for-the-badge)](https://core.telegram.org/bots/api)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE.txt)

**Free Global Virtual Numbers • Real-Time SMS Inboxes • Multi-Language Support • Zero Cloud Cost**

🤖 **Live Bot:** [@EliteTempnumBot](https://t.me/EliteTempnumBot)  
🌐 **Live Landing Page & Mini App:** [https://app8941571523.tgcloud.ai/](https://app8941571523.tgcloud.ai/)  
Built with ❤️ by [Ashlynn Repository](https://t.me/Ashlynn_Repository)

---

</div>

## 🌿 Repository Branches & Architectures

This repository hosts two distinct implementations:

| Branch | Platform / Edition | Description |
|:---|:---|:---|
| **`main`** *(Active)* | **Cloudflare Workers Edition** | The serverless Cloudflare Workers implementation deployed via `wrangler`, running on Cloudflare's Edge network with `fetch` webhook processing. |
| **`tgserverless`** | **[Telegram Serverless Edition →](https://github.com/Itz-Ashlynn/TG_VirtualNum_Bot/tree/tgserverless)** | The next-generation native bot running directly on Telegram V8 Isolates (`tgcloud`), featuring relational SQLite persistence, Bot API 10.3+ button styles, 8-language i18n, and fully responsive Mini App & landing page. |

---

## ✨ Features (Cloudflare Workers Edition)

- 🌍 **Global Country Browser**: Browse and pick from dozens of available countries (such as USA, UK, Germany, Russia, Spain, India, and more).
- 🔢 **Random Number Retrieval**: Fetch an active virtual phone number instantly from random pools with one tap.
- 📥 **Real-Time SMS Inbox**: View the last 5 messages received on any active number. Messages refresh each time you check, allowing you to easily read verification OTPs.
- 🔄 **Instant Number Renewal**: Get a different active virtual number immediately if your current number is busy or inactive.
- 🔍 **Telegram Profile Check**: Includes deep links to directly search the number on Telegram to verify if a profile already exists.
- 🚀 **Serverless Cloudflare Worker**: Built to run entirely on Cloudflare Workers (V8 runtime), ensuring ultra-fast edge routing, zero maintenance, and free tier compatibility.
- 🔒 **Force Join Gate**: Built-in channel membership validation (via [@Ashlynn_Repository](https://t.me/Ashlynn_Repository)) to grow your community.
- 🔐 **Secure Webhook Handler**: Protected by secret webhook tokens (`X-Telegram-Bot-Api-Secret-Token`) to prevent spoofing.
- 📂 **Single-File Logic**: Clean, optimized codebase inside `src/index.js` for quick deployments.

---

## 🤖 Bot Commands

| Command | Action / Description |
|:---|:---|
| `/start` | Launches the bot, checks channel join, and shows the main interactive menu |
| `/number` | Directly fetches a random active virtual number with check/renew options |
| `/countries` | Opens a paginated catalog to browse and choose specific countries |
| `/help` | Displays a detailed usage manual and tips |
| `/about` | Shows bot software details, version, and developer credits |

---

## 🚀 Cloudflare Workers Deployment Guide

### 📋 Prerequisites

1. **Telegram Bot Token**: Get a bot token from [@BotFather](https://t.me/BotFather) on Telegram.
2. **Cloudflare Account**: Sign up for a free account at [Cloudflare](https://dash.cloudflare.com/).
3. **Node.js**: Install Node.js (v18+) for your operating system.

---

### 🛠️ Setup & Deployment Steps

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Authenticate with Cloudflare**:
   ```bash
   npx wrangler login
   ```

3. **Configure Secrets**:
   Store your sensitive Telegram bot token and webhook secret securely in Cloudflare:
   ```bash
   npx wrangler secret put BOT_TOKEN
   npx wrangler secret put WEBHOOK_SECRET
   ```

4. **Deploy the Worker**:
   ```bash
   npm run deploy
   # or: npx wrangler deploy
   ```

5. **Register the Webhook**:
   After deployment, visit your worker's setup endpoint in your browser:
   ```text
   https://<your-worker-subdomain>.workers.dev/setup
   ```
   You will receive a confirmation JSON response:
   ```json
   { "ok": true, "result": true, "description": "Webhook was set" }
   ```

---

## 💡 Looking for Telegram Serverless Edition?

Check out the [`tgserverless`](https://github.com/Itz-Ashlynn/TG_VirtualNum_Bot/tree/tgserverless) branch for:
- Zero external hosting setup (runs natively on Telegram V8 Isolates via `tgcloud`).
- Built-in SQLite database (`sdk/db`) for user state and language preferences.
- 8-language multi-lingual system (`/lang [code]`).
- Modern Bot API 10.3+ button styling (`primary`, `success`, `danger`).
- Interactive Co-Hosted Mini App and responsive web landing page.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE.txt](LICENSE.txt) file for details.
