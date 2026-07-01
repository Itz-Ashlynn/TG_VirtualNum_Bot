<div align="center">

# 📱 AR Virtual Number Bot

### A Professional Telegram Bot for Free Virtual Phone Numbers — Cloudflare Workers Edition

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white&style=for-the-badge)](https://workers.cloudflare.com)
[![Telegram Bot API](https://img.shields.io/badge/Telegram-Bot%20API%209.4-26A5E4?logo=telegram&logoColor=white&style=for-the-badge)](https://core.telegram.org/bots/api)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

**Get free virtual phone numbers • View SMS inboxes • Browse countries**

🤖 **Live Bot Demo:** [@ARTempnumBot](https://t.me/ARTempnumBot)

Built with ❤️ by [Ashlynn Repository](https://t.me/Ashlynn_Repository)

---

</div>

## ✨ Features

The bot is packed with powerful features designed for a premium user experience and seamless serverless hosting:

### 📱 Core Bot Features
- 🌍 **Global Country Browser**: Browse and pick from dozens of available countries (such as USA, UK, Germany, Russia, Spain, India, and more).
- 🔢 **Random Number Retrieval**: Fetch an active virtual phone number instantly from random pools with one tap.
- 📥 **Real-Time SMS Inbox**: View the last 5 messages received on any active number. Messages refresh each time you check, allowing you to easily read verification OTPs.
- 🔄 **Instant Number Renewal**: Get a different active virtual number immediately if your current number is busy or inactive.
- 🔍 **Telegram Profile Check**: Includes deep links to directly search the number on Telegram to verify if a profile already exists.
- 🎨 **Modern Interface**: Clean and professional messages utilizing HTML formatting, flags, and custom styled interactive inline buttons.

### ⚡ Technical & Architectural Features
- 🚀 **Serverless Cloudflare Worker**: Built to run entirely on Cloudflare Workers (V8 runtime), ensuring ultra-fast edge routing, zero maintenance, and free tier compatibility.
- 🔒 **Force Join Gate**: Built-in channel membership validation (via [@Ashlynn_Repository](https://t.me/Ashlynn_Repository)) to grow your community. The bot checks membership before granting access to commands.
- 🔐 **Secure Webhook Handler**: Protected by secret webhook tokens (`X-Telegram-Bot-Api-Secret-Token`) to prevent spoofing and ensure that only updates from Telegram are processed.
- 📂 **Single-File Logic**: Clean, optimized codebase inside `src/index.js` for easier deployment and performance optimization.
- 🔄 **OnlineSIM.io Integration**: Powered by free public API endpoints from OnlineSIM.io for retrieving real-time active numbers and inboxes.

---

## 🤖 Bot Commands

The bot supports standard commands as well as interactive inline callbacks:

| Command | Action / Description |
|:--------|:---------------------|
| `/start` | Launches the bot, checks channel join, and shows the main interactive menu |
| `/number` | Directly fetches a random active virtual number with check/renew options |
| `/countries` | Opens a paginated catalog to browse and choose specific countries |
| `/help` | Displays a detailed usage manual and tips |
| `/about` | Shows bot software details, version, and developer credits |

---

## 🚀 Deployment Guide

Follow these instructions to deploy your own instance of the Virtual Number Bot to Cloudflare Workers on Windows, macOS, or Linux.

### 📋 Prerequisites

1. **Telegram Bot Token**: Get a bot token from [@BotFather](https://t.me/BotFather) on Telegram.
2. **Cloudflare Account**: Sign up for a free account at [Cloudflare](https://dash.cloudflare.com/).
3. **Node.js**: Install Node.js (v18+) for your operating system.

---

### 🖥️ OS-Specific Installation Guide

Choose the guide for your operating system to set up Node.js and dependencies:

#### 🪟 Windows Setup (PowerShell / CMD)
1. **Install Node.js**: Download and run the installer from the [Node.js Official Page](https://nodejs.org/), or use winget:
   ```powershell
   winget install OpenJS.NodeJS
   ```
2. **Install Dependencies**: Open your terminal (PowerShell or CMD) in the project root directory and run:
   ```powershell
   npm install
   ```

#### 🍎 macOS Setup (Terminal)
1. **Install Node.js**: Install via Homebrew:
   ```bash
   brew install node
   ```
2. **Install Dependencies**: Open Terminal in the project root directory and run:
   ```bash
   npm install
   ```

#### 🐧 Linux Setup (Terminal)
1. **Install Node.js**: Install via your package manager (e.g. Debian/Ubuntu):
   ```bash
   sudo apt update
   sudo apt install -y nodejs npm
   ```
2. **Install Dependencies**: Open terminal in the project root directory and run:
   ```bash
   npm install
   ```

---

### ⚙️ Step-by-Step Deployment

Once dependencies are installed, follow these steps to deploy to Cloudflare:

#### 1️⃣ Authenticate Cloudflare CLI
Run the wrangler login command to authorize your machine:
```bash
npx wrangler login
```
*This will open a browser window. Click "Allow" to log in with your Cloudflare credentials.*

#### 2️⃣ Configure Secrets
Wrangler securely uploads your credentials directly to Cloudflare's environment vaults.

Set your Telegram Bot Token:
```bash
npx wrangler secret put BOT_TOKEN
```
*When prompted, paste your Telegram Bot Token (e.g. `123456789:ABCDefghIjklmNoPQRsTuvWxYz`).*

Set a Webhook Secret Token (Choose a random string to secure your webhook endpoint):
```bash
npx wrangler secret put WEBHOOK_SECRET
```
*When prompted, paste your custom secret token (e.g. `MySuperSecretToken123`).*

#### 3️⃣ Deploy to Cloudflare Workers
Deploy the script to the Cloudflare Edge network:
```bash
npx wrangler deploy
```
Once complete, wrangler will print the deployed URL. For example:
```text
Published ar-virtualnum-bot (4.12 sec)
  https://ar-virtualnum-bot.<your-subdomain>.workers.dev
```

#### 4️⃣ Register the Webhook with Telegram
To tell Telegram to send updates to your newly deployed Cloudflare Worker, visit the setup page in your web browser:
```text
https://<your-worker-url>.workers.dev/setup
```
*(Replace `<your-worker-url>` with the URL from the deployment step above).*

If successful, you will see a JSON response confirming registration:
```json
{
  "action": "Webhook setup",
  "webhookUrl": "https://ar-virtualnum-bot.your-subdomain.workers.dev/webhook",
  "result": {
    "ok": true,
    "result": true,
    "description": "Webhook was set"
  }
}
```

---

## 🔒 Configuring Force Join Gate

To require users to join your Telegram channel before using the bot:
1. Open [src/index.js](./src/index.js) and update the `FORCE_JOIN_CHANNEL` and `FORCE_JOIN_LINK` constants to your channel username and join link:
   ```javascript
   const FORCE_JOIN_CHANNEL = "YourChannelUsername"; // Channel username without @
   const FORCE_JOIN_LINK = "https://t.me/YourChannelUsername";
   ```
2. Add your Bot as an **Administrator** in your Telegram channel with at least the **Invite Users via Link** (or **Read Members**) permission.
3. Redeploy your changes by running `npx wrangler deploy`.

---

## 📡 API Endpoints

Your deployed worker hosts the following endpoints:

| Endpoint | Method | Purpose |
|:---------|:------:|:--------|
| `/` | `GET` | Health Check (shows status, bot name, and version) |
| `/setup` | `GET` | Registers the Telegram Webhook using configured secrets |
| `/remove` | `GET` | Deregisters and deletes the Webhook from Telegram |
| `/webhook` | `POST` | Processes incoming updates from Telegram (validated via `WEBHOOK_SECRET`) |

---

## 🔧 Local Development & Testing

You can run the worker locally to debug code changes:

```bash
npm run dev
```

> [!WARNING]
> Local worker instances cannot receive webhook events directly from Telegram since localhost is private. To test webhook updates locally, use a tunneling tool such as [ngrok](https://ngrok.com/) or [cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) to expose your local port (default is `8787`), configure it as your webhook URL on Telegram, or mock updates manually.

---

## 📐 Architecture Flow

```
┌──────────┐         ┌──────────┐         ┌────────────┐         ┌──────────────┐
│ Telegram │ ──(1)──>│  Worker  │ ──(2)──>│ ForceJoin? │ ──(3)──>│  OnlineSIM   │
│   User   │         │ /webhook │         │ Verification│        │     APIs     │
└──────────┘         └──────────┘         └────────────┘         └──────────────┘
     ▲                    │                      │                      │
     │                    │                      ▼                      │
     └────────(6)─────────┴──────────(5)─────────┴──────────(4)─────────┘
                       Responsive HTML payload sent back to Telegram
```

1. **User interaction**: User clicks a button or types a command in Telegram.
2. **Webhook execution**: Telegram sends a POST request with the update to the Cloudflare Worker `/webhook`.
3. **Authentication**: The Worker verifies the header token, routes the update, and checks if the user is in the channel.
4. **Data retrieval**: If verified, the Worker queries OnlineSIM free APIs to gather active countries, numbers, or inbox messages.
5. **Payload processing**: The response is processed, HTML-formatted, and keyboard layouts are generated.
6. **Delivery**: The Worker uses the Telegram Bot API to send/edit the message to the user.

---

## 🗂️ Project Structure

```text
.
├── src/
│   └── index.js          # All Bot routing and handler logic
├── package.json          # Node package configuration
├── package-lock.json     # Locked dependency versions
├── wrangler.toml         # Cloudflare Workers configuration
└── README.md             # Project documentation (You are here)
```

---

<div align="center">

### 📢 [Ashlynn Repository](https://t.me/Ashlynn_Repository)

**Star ⭐ this repo if you found it useful!**

</div>
