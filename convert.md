# 🚀 Architecture & Conversion Plan: Telegram Serverless Bot (`tgcloud`)

> **Target Platform:** [Telegram Serverless](https://core.telegram.org/bots/serverless) (`tgcloud` runtime)  
> **Source Platform:** Legacy Cloudflare Worker (`src/index.js`)  
> **Bot API Compliance:** Latest Telegram Bot API (10.x+ with colored buttons, rich layouts, expandable blockquotes)  
> **Status:** Pending Review

---

## 1. Executive Summary

This plan outlines the complete conversion of the **Virtual Number Telegram Bot** from a legacy Cloudflare Workers architecture to the official **Telegram Serverless (`tgcloud`)** platform. 

### Why Telegram Serverless?
| Aspect | Old: Cloudflare Workers | New: Telegram Serverless (`tgcloud`) |
| :--- | :--- | :--- |
| **Hosting & Webhooks** | Manual webhook registration, secret tokens, external DNS & SSL certificates | **Zero-config native hosting** directly on Telegram's edge infrastructure; no manual webhooks needed |
| **Token Management** | Token stored in environment variables, manual HTTP headers to `api.telegram.org` | **Native `api` SDK** with auto-authentication, automatic envelope unwrapping, and built-in type proxy |
| **Database & State** | Stateless (no DB; user preferences lost on every request) | **Built-in SQLite DB (`sdk/db`)** with query builder, automatic schema migration, and persistent user settings |
| **Language Support** | Hardcoded English only | **Full i18n engine** (8 major languages: EN, RU, HI, ZH/CN, ES, AR, FR, DE) with `/lang` command and persistent preference |
| **Button Styling** | Partial/inconsistent styling | **Latest Telegram Bot API 10.x button styles** (`primary`, `success`, `danger`) across all keyboards |
| **Mini App & Web** | Separate or absent | **Co-hosted Mini App & Landing Page** served at `https://app<id>.tgcloud.ai/` with native `/api/*` endpoints |

---

## 2. Target Project Architecture

The converted project will follow the strict, standard `tgcloud` directory layout:

```text
TG_VirtualNum_Bot-main/
├── tgcloud/
│   ├── schema.js                  # Database tables: users, query_history, favorite_numbers
│   ├── handlers/
│   │   ├── message.js             # Handles incoming text messages & commands (/start, /number, /countries, /lang, /help, /about)
│   │   └── callback_query.js      # Handles all inline button interactions (pagination, inboxes, renew, language switch)
│   ├── lib/
│   │   ├── i18n.js                # Multi-language dictionary & translation helper (EN, RU, HI, ZH, ES, AR, FR, DE)
│   │   ├── db.js                  # User profile and language persistence helpers
│   │   ├── onlinesim.js           # OnlineSIM API client using native `fetch` from 'sdk'
│   │   ├── keyboards.js           # Inline keyboards with Bot API 10.x styles ('primary', 'success', 'danger')
│   │   └── formatters.js          # Phone formatting, country flags, and HTML escaping
│   └── endpoints/
│       ├── getStats.js            # Mini App / Landing Page API: real-time platform statistics
│       ├── getCountries.js        # Mini App / Landing Page API: list available countries
│       ├── getNumbers.js          # Mini App / Landing Page API: available numbers per country
│       ├── getInbox.js            # Mini App / Landing Page API: fetch received SMS messages
│       └── setLanguage.js         # Mini App / Landing Page API: set user language preference
├── public/                        # Co-hosted Frontend Landing Page & Mini App
│   ├── index.html                 # Premium responsive landing page & WebApp UI
│   ├── style.css                  # Vanilla CSS design system (dark glassmorphism, responsive)
│   └── app.js                     # Interactive client communicating via endpoints
├── package.json                   # Updated scripts: "push", "migrate", "dev", "run"
├── tgcloud-sdk.md                 # SDK reference documentation (preserved)
└── convert.md                     # This plan
```

---

## 3. Core Technical Modernizations

### A. Database Schema (`tgcloud/schema.js`)
We leverage `sdk/db` to create persistent SQLite tables. No foreign keys are used (in strict compliance with tgcloud guidelines):
- **`users` Table:**
  - `id`: Integer primary key (auto-increment).
  - `tg_id`: Integer, unique (Telegram User ID).
  - `username`: Text (nullable).
  - `firstName`: Text (nullable).
  - `lang`: Text, default `'en'` (stores `'en'`, `'ru'`, `'hi'`, `'zh'`, `'es'`, `'ar'`, `'fr'`, `'de'`).
  - `requestCount`: Integer, default `0`.
  - `createdAt`: Timestamp.
  - `updatedAt`: Timestamp.
- **`user_history` Table:**
  - `id`: Integer primary key.
  - `tg_id`: Integer (logical reference to user).
  - `country`: Text.
  - `phoneNumber`: Text.
  - `createdAt`: Timestamp.

### B. Event Handlers (`tgcloud/handlers/`)
- **`handlers/message.js`**:
  - Automatically receives `(message, ctx)`.
  - Upserts user into `users` table upon interaction.
  - Retrieves active language preference.
  - Routes commands:
    - `/start`: Greeting with main menu, channel membership check, and language quick-select.
    - `/number`: Instant random active virtual number retrieval.
    - `/countries`: Paginated country browser with localized names and flags.
    - `/lang [code]`: Change language directly via argument (`/lang ru`, `/lang hi`, `/lang en`) or open interactive inline keyboard.
    - `/help`: Detailed operational guide in the user's active language.
    - `/about`: Bot version, Telegram Serverless runtime info, and developer credits.
    - Non-command text/media: Friendly, localized fallback with quick-action buttons.
- **`handlers/callback_query.js`**:
  - Automatically receives `(callbackQuery, ctx)`.
  - Dispatches actions:
    - `set_lang_<code?>`: Updates database with new language and confirms with instant alert.
    - `countries_<page>`: Navigates country catalog.
    - `country&<country>`: Displays numbers available for selected country.
    - `nums&<country>&<page>`: Paginated numbers list.
    - `pick&<country>&<number>`: Selects specific number and tests live inbox.
    - `msg&<country>&<number>`: Fetches latest SMS messages, formatted with `<blockquote expandable>`.
    - `new_phone_number` / `get_number`: Fetches fresh active number.
    - `check_join`: Validates channel membership.
    - `back_to_main`, `show_help`, `show_about`: Menu navigation.

### C. Multi-Language System (`tgcloud/lib/i18n.js`)
- **Supported Languages:**
  - 🇬🇧 English (`en`) — Default
  - 🇷🇺 Русский (`ru`)
  - 🇮🇳 हिन्दी (`hi`)
  - 🇨🇳 中文 (`zh` / `cn`)
  - 🇪🇸 Español (`es`)
  - 🇸🇦 العربية (`ar`)
  - 🇫🇷 Français (`fr`)
  - 🇩🇪 Deutsch (`de`)
- **Key Features:**
  - Complete translation dictionary covering all bot menus, button labels, notifications, inboxes, and help messages.
  - Seamless fallback to `en` if a string is missing in a specific locale.
  - Inline language selector keyboard with visual checkmark (`✅`) indicating the active language.

### D. Latest Telegram Bot API Features
- **Button Styling (`style` param):**
  - `"success"`: Green button for positive actions (e.g., "📥 Check Inbox", "📱 Get Number", "✅ Confirm").
  - `"primary"`: Blue button for navigational or main actions (e.g., "🌍 Choose Country", "🔍 Check Profile").
  - `"danger"`: Red button for destructive or reset actions (e.g., "🔄 Renew Number").
- **Rich Message Formatting:**
  - `<blockquote expandable>` for received SMS messages and verification codes.
  - `<code>` blocks with copyable phone numbers and OTP codes.
  - Clean HTML layout with emoji flags and visual hierarchy.

### E. Frontend Landing Page & Mini App (`public/`)
A responsive, standalone web application that can be used both on desktop/mobile browsers and embedded directly as a Telegram Mini App:
- **Design:** Dark glassmorphism with vivid accents, modern typography (Inter), smooth micro-interactions, and neon status badges.
- **Features:**
  - Live virtual number explorer: browse countries and preview active numbers in real time.
  - SMS Inbox Simulator: interactive demo showing how incoming OTP messages look.
  - Features overview, command cheatsheet, and serverless architecture showcase.
  - "Launch Bot" Telegram deep-link button (`https://t.me/EliteTempnumBot`).
  - Seamless Telegram WebApp integration (`Telegram.WebApp.ready()`, auto-theme matching).

---

## 4. Step-by-Step Implementation Roadmap

1. **Step 1: Database Schema & Migration Setup**
   - Create `tgcloud/schema.js` with `users` and `user_history` tables.
   - Configure migration scripts.

2. **Step 2: Core Libraries (`tgcloud/lib/`)**
   - Implement `i18n.js` with comprehensive translations for 8 languages.
   - Implement `db.js` for clean user database operations.
   - Implement `onlinesim.js` using `sdk/fetch`.
   - Implement `keyboards.js` with rich button styles (`primary`, `success`, `danger`).
   - Implement `formatters.js` for phone formatting, country flags, and text sanitization.

3. **Step 3: Event Handlers (`tgcloud/handlers/`)**
   - Create `tgcloud/handlers/message.js` to process all commands and messages.
   - Create `tgcloud/handlers/callback_query.js` to process callbacks and pagination.

4. **Step 4: Mini App Endpoints (`tgcloud/endpoints/`)**
   - Create `getStats.js`, `getCountries.js`, `getNumbers.js`, `getInbox.js`, and `setLanguage.js`.

5. **Step 5: Frontend Landing Page & Mini App (`public/`)**
   - Build `public/index.html`, `public/style.css`, and `public/app.js` using high-aesthetic vanilla CSS and responsive design.

6. **Step 6: Configuration & Documentation**
   - Update `package.json` with `tgcloud` scripts.
   - Update `README.md` with Telegram Serverless deployment instructions (`npx tgcloud push`, `npx tgcloud migrate`).

---

## 5. Review & Confirmation

Please review this conversion plan. Once approved, we will proceed with the implementation according to this specification.
