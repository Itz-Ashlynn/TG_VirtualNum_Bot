<div align="center">

# ⚡ Elite Virtual Number Bot

### Telegram Serverless Edition (`tgcloud`) & Cloudflare Workers Multi-Edition

[![Telegram Serverless](https://img.shields.io/badge/Telegram-Serverless-26A5E4?logo=telegram&logoColor=white&style=for-the-badge)](https://core.telegram.org/bots/serverless)
[![Telegram Bot API](https://img.shields.io/badge/Telegram-Bot%20API%2010.3-26A5E4?logo=telegram&logoColor=white&style=for-the-badge)](https://core.telegram.org/bots/api)
[![SQLite](https://img.shields.io/badge/SQLite-Native%20DSL-003B57?logo=sqlite&logoColor=white&style=for-the-badge)](https://sqlite.org)
[![Responsive UI](https://img.shields.io/badge/UI-Mobile%20First%20Responsive-brightgreen?style=for-the-badge)](#-integrated-mini-app--responsive-landing-page)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE.txt)

**Free Global Virtual Numbers • Real-Time SMS Inboxes • Multi-Language Support • Zero Cloud Cost**

🤖 **Live Bot:** [@EliteTempnumBot](https://t.me/EliteTempnumBot)  
🌐 **Live Landing Page & Mini App:** [https://app8941571523.tgcloud.ai/](https://app8941571523.tgcloud.ai/)  
Built with ❤️ by [Ashlynn Repository](https://t.me/Ashlynn_Repository)

---

</div>

## 🌿 Repository Branches

This repository maintains two distinct, optimized deployment architectures:

| Branch | Platform / Edition | Description |
|:---|:---|:---|
| **`main`** | **Cloudflare Workers Edition** | The legacy Cloudflare Workers implementation deployed via `wrangler`, running on Cloudflare's Edge network. |
| **`tgserverless`** | **Telegram Serverless Edition** | The next-generation Telegram native bot running directly on Telegram V8 Isolates (`tgcloud`), featuring relational SQLite persistence, Bot API 10.3+ button styles, 8-language i18n, and fully responsive Mini App & landing page. |

---

## ✨ Key Capabilities (Telegram Serverless Edition)

- ⚡ **Native Telegram Serverless (`tgcloud`)**: Runs natively inside Telegram's global V8 infrastructure. No external VPS, zero cloud costs, zero cold-starts, and automatic webhook/SSL management.
- 💾 **Built-in Relational SQLite Persistence (`sdk/db`)**: Stores user language preferences, user analytics, and number query history without external database dependencies.
- 🌐 **Comprehensive Multi-Language Engine (`i18n`)**:
  - 🇬🇧 English (`en`) — Default
  - 🇷🇺 Русский (`ru`)
  - 🇮🇳 हिन्दी (`hi`)
  - 🇨🇳 中文 (`zh`)
  - 🇪🇸 Español (`es`)
  - 🇸🇦 العربية (`ar`)
  - 🇫🇷 Français (`fr`)
  - 🇩🇪 Deutsch (`de`)
  - Accessible via `/lang` inline interactive keyboard or direct query argument (e.g. `/lang ru`, `/lang hi`).
- 🎨 **Modern Bot API 10.3+ Rich Styles**:
  - Official button styling (`primary`, `success`, `danger`).
  - Expandable blockquotes (`<blockquote expandable>`) for formatted SMS messages.
  - Copyable `<code>` tags for phone numbers and incoming OTP codes.
- 📱 **Integrated Mini App & 100% Responsive Landing Page**:
  - Co-hosted on `https://app<id>.tgcloud.ai/`.
  - **Full Responsiveness Across All Viewports**: Meticulously designed for small mobile screens (320px–420px), tablets (768px), and ultra-wide desktops.
  - Zero horizontal overflow, adaptive mobile navigation, compact language picker, and responsive command cards with one-click copy.
  - Interactive virtual number simulator and live real-time SMS tester.

---

## 🤖 Bot Commands

| Command | Action / Description | Example |
|:---|:---|:---|
| `/start` | Launches the bot, checks channel membership, and opens main menu | `/start` |
| `/number` | Directly fetches a random active virtual phone number | `/number` |
| `/countries` | Opens a paginated catalog to browse available countries | `/countries` |
| `/lang [code]` | Switches language (e.g. `/lang ru`, `/lang hi`, `/lang en`) | `/lang hi` |
| `/help` | Displays a detailed usage manual and best-practice tips | `/help` |
| `/about` | Shows bot software details, V8 runtime, and developer credits | `/about` |

---

## 📁 Project Structure

```text
TG_VirtualNum_Bot/
├── tgcloud/
│   ├── schema.js              # SQLite tables: users, user_history
│   ├── handlers/
│   │   ├── message.js          # Handles text messages & commands (/start, /number, /countries, /lang, /help, /about)
│   │   └── callback_query.js   # Handles inline buttons (pagination, inboxes, renew, lang picker)
│   ├── lib/
│   │   ├── i18n.js             # 8-language dictionary and translation helper
│   │   ├── db.js               # Database queries (user profiles, language updates, history)
│   │   ├── onlinesim.js        # OnlineSIM API client using native `fetch` from 'sdk'
│   │   ├── keyboards.js        # Inline keyboards with Bot API 10.x styles ('primary', 'success', 'danger')
│   │   └── formatters.js       # Phone formatters, flag resolvers, HTML escaping
│   └── endpoints/
│       ├── getStats.js         # Mini App / Landing Page API: real-time platform statistics
│       ├── getCountries.js     # Mini App / Landing Page API: list available countries
│       ├── getNumbers.js       # Mini App / Landing Page API: available numbers per country
│       ├── getInbox.js         # Mini App / Landing Page API: fetch received SMS messages
│       └── setLanguage.js      # Mini App / Landing Page API: set user language preference
├── dist/                      # Deployed Static Frontend Landing Page & Mini App
│   ├── index.html             # Responsive landing page & WebApp UI (fluid cards, mobile navbar)
│   ├── style.css              # Cyber glassmorphic CSS system with universal mobile breakpoints
│   ├── app.js                 # Frontend interactive logic (simulator, glider tabs, copy buttons)
│   ├── favicon.png            # Bot favicon
│   └── logo.png               # High-res bot mascot logo
├── tgcloud.json               # tgcloud deployment & static hosting configuration
├── package.json               # Project scripts (push, migrate, status, webhook)
├── .gitignore                 # Protects secrets (.tgcloud/credentials) and dependencies
├── tgcloud-sdk.md             # Telegram Serverless SDK reference
└── convert.md                 # Architecture migration blueprint
```

---

## 🚀 Deployment & Management Guide

### 1. Link Your Bot
```bash
npx tgcloud login
```
*(Or save your token in `.tgcloud/credentials` or set `export TGCLOUD_TOKEN="app<id>:<secret>"`).*

### 2. Deploy Code & Frontend
```bash
npm run push
# or: npx tgcloud push
```

### 3. Run Database Migrations
```bash
npm run migrate
# or: npx tgcloud migrate --yes
```

### 4. Check Status & Webhooks
```bash
npm run status
npm run webhook
```

### 5. Test Functions Locally / In Cloud
```bash
npx tgcloud run endpoints/getStats "{}"
npx tgcloud run handlers/message "{ chat: { id: 123456 }, from: { id: 123456 }, text: '/start' }"
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE.txt](LICENSE.txt) file for details.
