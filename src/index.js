/**
 * Virtual Number Bot — Cloudflare Workers 
 * 
 * A professional Telegram bot that fetches virtual phone numbers
 * and presents them with inline buttons.
 * 
 * Creator: Ashlynn Repository (https://t.me/Ashlynn_Repository)
 */

// ─────────────────────────────────────────────
//  CONSTANTS
// ─────────────────────────────────────────────

const ONLINESIM_BASE = "https://onlinesim.io/api/v1/free_numbers_content";
const TG_API = "https://api.telegram.org/bot";

const BOT_INFO = {
  name: "Virtual Number Bot",
  version: "2.1",
  creator: "Ashlynn Repository",
  creatorLink: "https://t.me/Ashlynn_Repository",
  creatorUsername: "Ashlynn_Repository",
};

// Force-join channel (without @)
const FORCE_JOIN_CHANNEL = "Ashlynn_Repository";
const FORCE_JOIN_LINK = "https://t.me/Ashlynn_Repository";

// How many country buttons per page
const COUNTRIES_PER_PAGE = 12;
// How many number buttons per page
const NUMBERS_PER_PAGE = 8;

const CODE_TO_FLAG = {
  1: "🇺🇸", 7: "🇷🇺", 20: "🇪🇬", 27: "🇿🇦", 30: "🇬🇷", 31: "🇳🇱",
  32: "🇧🇪", 33: "🇫🇷", 34: "🇪🇸", 36: "🇭🇺", 39: "🇮🇹", 40: "🇷🇴",
  41: "🇨🇭", 43: "🇦🇹", 44: "🇬🇧", 45: "🇩🇰", 46: "🇸🇪", 47: "🇳🇴",
  48: "🇵🇱", 49: "🇩🇪", 51: "🇵🇪", 52: "🇲🇽", 53: "🇨🇺", 54: "🇦🇷",
  55: "🇧🇷", 56: "🇨🇱", 57: "🇨🇴", 58: "🇻🇪", 60: "🇲🇾", 61: "🇦🇺",
  62: "🇮🇩", 63: "🇵🇭", 64: "🇳🇿", 65: "🇸🇬", 66: "🇹🇭", 77: "🇰🇿",
  81: "🇯🇵", 82: "🇰🇷", 84: "🇻🇳", 86: "🇨🇳", 90: "🇹🇷", 91: "🇮🇳",
  92: "🇵🇰", 93: "🇦🇫", 94: "🇱🇰", 95: "🇲🇲", 98: "🇮🇷",
  212: "🇲🇦", 213: "🇩🇿", 216: "🇹🇳", 218: "🇱🇾", 220: "🇬🇲",
  221: "🇸🇳", 222: "🇲🇷", 223: "🇲🇱", 224: "🇬🇳", 225: "🇨🇮",
  226: "🇧🇫", 227: "🇳🇪", 228: "🇹🇬", 229: "🇧🇯", 230: "🇲🇺",
  231: "🇱🇷", 232: "🇸🇱", 233: "🇬🇭", 234: "🇳🇬", 235: "🇹🇩",
  236: "🇨🇫", 237: "🇨🇲", 238: "🇨🇻", 239: "🇸🇹", 240: "🇬🇶",
  241: "🇬🇦", 242: "🇨🇬", 243: "🇨🇩", 244: "🇦🇴", 245: "🇬🇼",
  248: "🇸🇨", 249: "🇸🇩", 250: "🇷🇼", 251: "🇪🇹", 252: "🇸🇴",
  253: "🇩🇯", 254: "🇰🇪", 255: "🇹🇿", 256: "🇺🇬", 257: "🇧🇮",
  258: "🇲🇿", 260: "🇿🇲", 261: "🇲🇬", 262: "🇷🇪", 263: "🇿🇼",
  264: "🇳🇦", 265: "🇲🇼", 266: "🇱🇸", 267: "🇧🇼", 268: "🇸🇿",
  269: "🇰🇲", 290: "🇸🇭", 291: "🇪🇷", 297: "🇦🇼",
  298: "🇫🇴", 299: "🇬🇱", 350: "🇬🇮", 351: "🇵🇹", 352: "🇱🇺",
  353: "🇮🇪", 354: "🇮🇸", 355: "🇦🇱", 356: "🇲🇹", 357: "🇨🇾",
  358: "🇫🇮", 359: "🇧🇬", 370: "🇱🇹", 371: "🇱🇻", 372: "🇪🇪",
  373: "🇲🇩", 374: "🇦🇲", 375: "🇧🇾", 376: "🇦🇩", 380: "🇺🇦",
  381: "🇷🇸", 382: "🇲🇪", 383: "🇽🇰", 385: "🇭🇷", 386: "🇸🇮",
  387: "🇧🇦", 389: "🇲🇰", 420: "🇨🇿", 421: "🇸🇰", 501: "🇧🇿",
  502: "🇬🇹", 503: "🇸🇻", 504: "🇭🇳", 505: "🇳🇮", 506: "🇨🇷",
  507: "🇵🇦", 509: "🇭🇹", 591: "🇧🇴", 592: "🇬🇾", 593: "🇪🇨",
  594: "🇬🇫", 595: "🇵🇾", 596: "🇲🇶", 597: "🇸🇷", 598: "🇺🇾",
  670: "🇹🇱", 673: "🇧🇳", 675: "🇵🇬", 676: "🇹🇴", 677: "🇸🇧",
  678: "🇻🇺", 679: "🇫🇯", 680: "🇵🇼", 685: "🇼🇸", 686: "🇰🇮",
  689: "🇵🇫", 690: "🇹🇰", 691: "🇫🇲", 692: "🇲🇭",
  852: "🇭🇰", 853: "🇲🇴", 855: "🇰🇭", 856: "🇱🇦", 880: "🇧🇩",
  886: "🇹🇼", 960: "🇲🇻", 961: "🇱🇧", 962: "🇯🇴", 963: "🇸🇾",
  964: "🇮🇶", 965: "🇰🇼", 966: "🇸🇦", 967: "🇾🇪", 968: "🇴🇲",
  970: "🇵🇸", 971: "🇦🇪", 972: "🇮🇱", 973: "🇧🇭", 974: "🇶🇦",
  975: "🇧🇹", 976: "🇲🇳", 977: "🇳🇵", 992: "🇹🇯", 993: "🇹🇲",
  994: "🇦🇿", 995: "🇬🇪", 996: "🇰🇬", 998: "🇺🇿",
};

// ─────────────────────────────────────────────
//  TELEGRAM API HELPERS
// ─────────────────────────────────────────────

async function tg(token, method, body = {}) {
  const res = await fetch(`${TG_API}${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function sendMessage(token, chatId, text, options = {}) {
  return tg(token, "sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
    ...options,
  });
}

async function editMessage(token, chatId, messageId, text, options = {}) {
  return tg(token, "editMessageText", {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
    ...options,
  });
}

async function sendChatAction(token, chatId, action = "typing") {
  return tg(token, "sendChatAction", { chat_id: chatId, action });
}

async function answerCallback(token, callbackId, text = "", showAlert = false) {
  return tg(token, "answerCallbackQuery", {
    callback_query_id: callbackId,
    text,
    show_alert: showAlert,
  });
}

async function isChannelMember(token, userId) {
  try {
    const res = await tg(token, "getChatMember", {
      chat_id: `@${FORCE_JOIN_CHANNEL}`,
      user_id: userId,
    });

    if (!res.ok) return false;

    const status = res.result?.status;
    // member, administrator, creator are valid
    return ["member", "administrator", "creator"].includes(status);
  } catch {
    return true;
  }
}

// ─────────────────────────────────────────────
//  NUMBER SOURCE API HELPERS
// ─────────────────────────────────────────────

async function getOnlineCountries() {
  try {
    const res = await fetch(`${ONLINESIM_BASE}/countries`);
    const data = await res.json();

    if (data.response === "1" || data.response === 1) {
      const all = data.counties || data.countries || [];
      return all.filter((c) => c.online === true);
    }
    return [];
  } catch {
    return [];
  }
}

async function getCountryNumbers(country) {
  try {
    const res = await fetch(`${ONLINESIM_BASE}/countries/${country}?lang=en`);
    const data = await res.json();

    if (data.response === "1" || data.response === 1) {
      return (data.numbers || []).map((n) => ({
        lastUpdate: n.data_humans,
        fullNumber: String(n.full_number),
      }));
    }
    return [];
  } catch {
    return [];
  }
}

async function getNumberInbox(country, number) {
  try {
    const res = await fetch(
      `${ONLINESIM_BASE}/countries/${country}/${number}?lang=en`
    );
    const data = await res.json();

    if ((data.response === "1" || data.response === 1) && data.online) {
      const msgs = (data.messages?.data || []).map((m) => ({
        time: m.data_humans,
        text: m.text,
      }));
      return msgs;
    }
    return false;
  } catch {
    return false;
  }
}

// ─────────────────────────────────────────────
//  FORMATTING UTILITIES
// ─────────────────────────────────────────────


function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function userMention(user) {
  const name = escapeHtml(
    user.first_name || user.last_name || user.username || "User"
  );
  return `<a href="tg://user?id=${user.id}">${name}</a>`;
}

function getFlag(fullNumber) {
  const num = fullNumber.replace(/\D/g, "");
  for (const len of [3, 2, 1]) {
    const code = parseInt(num.substring(0, len), 10);
    if (CODE_TO_FLAG[code]) return CODE_TO_FLAG[code];
  }
  return "🌐";
}

function getFlagForCountry(countryName) {
  const NAME_FLAGS = {
    russia: "🇷🇺", united_states: "🇺🇸", usa: "🇺🇸", united_kingdom: "🇬🇧",
    uk: "🇬🇧", france: "🇫🇷", germany: "🇩🇪", spain: "🇪🇸", italy: "🇮🇹",
    brazil: "🇧🇷", india: "🇮🇳", china: "🇨🇳", japan: "🇯🇵",
    south_korea: "🇰🇷", korea: "🇰🇷", canada: "🇨🇦", australia: "🇦🇺",
    mexico: "🇲🇽", argentina: "🇦🇷", colombia: "🇨🇴", chile: "🇨🇱",
    peru: "🇵🇪", venezuela: "🇻🇪", ecuador: "🇪🇨", bolivia: "🇧🇴",
    paraguay: "🇵🇾", uruguay: "🇺🇾", netherlands: "🇳🇱", belgium: "🇧🇪",
    switzerland: "🇨🇭", austria: "🇦🇹", sweden: "🇸🇪", norway: "🇳🇴",
    denmark: "🇩🇰", finland: "🇫🇮", poland: "🇵🇱", czech_republic: "🇨🇿",
    czechia: "🇨🇿", romania: "🇷🇴", hungary: "🇭🇺", portugal: "🇵🇹",
    greece: "🇬🇷", turkey: "🇹🇷", ukraine: "🇺🇦", kazakhstan: "🇰🇿",
    indonesia: "🇮🇩", malaysia: "🇲🇾", philippines: "🇵🇭",
    thailand: "🇹🇭", vietnam: "🇻🇳", singapore: "🇸🇬",
    south_africa: "🇿🇦", nigeria: "🇳🇬", kenya: "🇰🇪", egypt: "🇪🇬",
    morocco: "🇲🇦", pakistan: "🇵🇰", bangladesh: "🇧🇩",
    ireland: "🇮🇪", new_zealand: "🇳🇿", israel: "🇮🇱",
    uae: "🇦🇪", united_arab_emirates: "🇦🇪", saudi_arabia: "🇸🇦",
    myanmar: "🇲🇲", cambodia: "🇰🇭", laos: "🇱🇦", taiwan: "🇹🇼",
    hong_kong: "🇭🇰", macau: "🇲🇴", mongolia: "🇲🇳",
    uzbekistan: "🇺🇿", tajikistan: "🇹🇯", kyrgyzstan: "🇰🇬",
    turkmenistan: "🇹🇲", azerbaijan: "🇦🇿", georgia: "🇬🇪",
    armenia: "🇦🇲", belarus: "🇧🇾", moldova: "🇲🇩",
    lithuania: "🇱🇹", latvia: "🇱🇻", estonia: "🇪🇪",
    croatia: "🇭🇷", serbia: "🇷🇸", slovenia: "🇸🇮",
    bosnia: "🇧🇦", montenegro: "🇲🇪", macedonia: "🇲🇰",
    albania: "🇦🇱", bulgaria: "🇧🇬", slovakia: "🇸🇰",
    iceland: "🇮🇸", luxembourg: "🇱🇺", malta: "🇲🇹", cyprus: "🇨🇾",
    cuba: "🇨🇺", costa_rica: "🇨🇷", panama: "🇵🇦",
    guatemala: "🇬🇹", honduras: "🇭🇳", el_salvador: "🇸🇻",
    nicaragua: "🇳🇮", haiti: "🇭🇹", sri_lanka: "🇱🇰",
    afghanistan: "🇦🇫", iran: "🇮🇷", iraq: "🇮🇶",
    syria: "🇸🇾", jordan: "🇯🇴", lebanon: "🇱🇧",
    kuwait: "🇰🇼", qatar: "🇶🇦", bahrain: "🇧🇭", oman: "🇴🇲",
    yemen: "🇾🇪", nepal: "🇳🇵", bhutan: "🇧🇹", maldives: "🇲🇻",
    andorra: "🇦🇩", gibraltar: "🇬🇮",
  };
  const key = countryName.toLowerCase().replace(/\s+/g, "_");
  return NAME_FLAGS[key] || "🌐";
}

function formatPhone(fullNumber) {
  const num = String(fullNumber).replace(/\D/g, "");
  if (num.length <= 4) return `+${num}`;

  let ccLen = 1;
  for (const len of [3, 2, 1]) {
    const code = parseInt(num.substring(0, len), 10);
    if (CODE_TO_FLAG[code]) {
      ccLen = len;
      break;
    }
  }

  const cc = num.substring(0, ccLen);
  const rest = num.substring(ccLen);
  const groups = rest.match(/.{1,3}/g) || [];
  return `+${cc} ${groups.join(" ")}`;
}

function formatCountryName(name) {
  return name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function shuffle(arr) {
  const a = [...arr]; // clone
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─────────────────────────────────────────────
//  INLINE KEYBOARD BUILDERS
// ─────────────────────────────────────────────

function buildForceJoinKeyboard() {
  return {
    inline_keyboard: [
      [
        {
          text: "📢 Join Channel",
          url: FORCE_JOIN_LINK,
          style: "success",
        },
      ],
      [
        {
          text: "✅ I've Joined",
          callback_data: "check_join",
          style: "primary",
        },
      ],
    ],
  };
}

function buildNumberKeyboard(country, number) {
  return {
    inline_keyboard: [
      [
        {
          text: "📥 Inbox",
          callback_data: `msg&${country}&${number}`,
          style: "success",
        },
        {
          text: "🔄 Renew",
          callback_data: "new_phone_number",
          style: "danger",
        },
      ],
      [
        {
          text: "🔍 Check Phone Profile",
          url: `tg://resolve?phone=+${number}`,
          style: "primary",
        },
      ],
      [
        {
          text: "🌍 Choose Country",
          callback_data: "countries_0",
        },
        {
          text: "« Menu",
          callback_data: "back_to_main",
        },
      ],
    ],
  };
}

function buildStartKeyboard() {
  return {
    inline_keyboard: [
      [
        {
          text: "📱 Get Random Number",
          callback_data: "get_number",
          style: "success",
        },
      ],
      [
        {
          text: "🌍 Choose Country",
          callback_data: "countries_0",
          style: "primary",
        },
        {
          text: "❓ Help",
          callback_data: "show_help",
        },
      ],
      [
        {
          text: "ℹ️ About",
          callback_data: "show_about",
        },
        {
          text: "👤 Creator",
          url: BOT_INFO.creatorLink,
        },
      ],
    ],
  };
}

function buildBackKeyboard() {
  return {
    inline_keyboard: [
      [
        {
          text: "« Back to Menu",
          callback_data: "back_to_main",
        },
      ],
    ],
  };
}

function buildCountriesKeyboard(countries, page) {
  const totalPages = Math.ceil(countries.length / COUNTRIES_PER_PAGE);
  const start = page * COUNTRIES_PER_PAGE;
  const end = Math.min(start + COUNTRIES_PER_PAGE, countries.length);
  const pageCountries = countries.slice(start, end);

  const rows = [];
  for (let i = 0; i < pageCountries.length; i += 2) {
    const row = [];
    for (let j = i; j < Math.min(i + 2, pageCountries.length); j++) {
      const c = pageCountries[j];
      const flag = getFlagForCountry(c.name);
      const displayName = formatCountryName(c.name);
      const label =
        displayName.length > 18
          ? `${flag} ${displayName.substring(0, 16)}..`
          : `${flag} ${displayName}`;
      row.push({
        text: label,
        callback_data: `country&${c.name}`,
      });
    }
    rows.push(row);
  }

  const navRow = [];
  if (page > 0) {
    navRow.push({
      text: "« Prev",
      callback_data: `countries_${page - 1}`,
    });
  }
  navRow.push({
    text: `📄 ${page + 1}/${totalPages}`,
    callback_data: "noop",
  });
  if (page < totalPages - 1) {
    navRow.push({
      text: "Next »",
      callback_data: `countries_${page + 1}`,
    });
  }
  rows.push(navRow);

  rows.push([
    {
      text: "🎲 Random Number",
      callback_data: "get_number",
      style: "success",
    },
    {
      text: "« Menu",
      callback_data: "back_to_main",
    },
  ]);

  return { inline_keyboard: rows };
}

function buildNumbersKeyboard(country, numbers, page) {
  const totalPages = Math.ceil(numbers.length / NUMBERS_PER_PAGE);
  const start = page * NUMBERS_PER_PAGE;
  const end = Math.min(start + NUMBERS_PER_PAGE, numbers.length);
  const pageNumbers = numbers.slice(start, end);

  const rows = [];
  for (let i = 0; i < pageNumbers.length; i += 2) {
    const row = [];
    for (let j = i; j < Math.min(i + 2, pageNumbers.length); j++) {
      const n = pageNumbers[j];
      const formatted = formatPhone(n.fullNumber);
      row.push({
        text: `📱 ${formatted}`,
        callback_data: `pick&${country}&${n.fullNumber}`,
      });
    }
    rows.push(row);
  }

  if (totalPages > 1) {
    const navRow = [];
    if (page > 0) {
      navRow.push({
        text: "« Prev",
        callback_data: `nums&${country}&${page - 1}`,
      });
    }
    navRow.push({
      text: `📄 ${page + 1}/${totalPages}`,
      callback_data: "noop",
    });
    if (page < totalPages - 1) {
      navRow.push({
        text: "Next »",
        callback_data: `nums&${country}&${page + 1}`,
      });
    }
    rows.push(navRow);
  }

  rows.push([
    {
      text: "🌍 Countries",
      callback_data: "countries_0",
    },
    {
      text: "« Menu",
      callback_data: "back_to_main",
    },
  ]);

  return { inline_keyboard: rows };
}

// ─────────────────────────────────────────────
//  MESSAGE TEMPLATES
// ─────────────────────────────────────────────

function forceJoinText(user) {
  return (
    `<b>⚠️ Access Required</b>\n\n` +
    `Hey ${userMention(user)}, you must join our channel ` +
    `before using this bot.\n\n` +
    `📢 <b><a href="${FORCE_JOIN_LINK}">${escapeHtml(BOT_INFO.creator)}</a></b>\n\n` +
    `Tap <b>"Join Channel"</b> below, then tap <b>"I've Joined"</b> to verify.`
  );
}

function welcomeText(user) {
  return (
    `<b>⁀➴ Hello ${userMention(user)}!</b>\n\n` +
    `Welcome to <b>${escapeHtml(BOT_INFO.name)}</b> ✨\n\n` +
    `This bot provides <b>free virtual phone numbers</b> ` +
    `and lets you view their SMS inbox — all within Telegram.\n\n` +
    `<b>Quick Start:</b>\n` +
    `├ /number — Get a random virtual number\n` +
    `├ /countries — Browse &amp; pick a country\n` +
    `├ /help — How to use this bot\n` +
    `├ /about — Bot information\n` +
    `└ /start — Show this menu\n\n` +
    `<i>Tap a button below to get started 👇</i>`
  );
}

function helpText() {
  return (
    `<b>❓ How to Use ${escapeHtml(BOT_INFO.name)}</b>\n\n` +
    `This bot provides free virtual phone numbers and their SMS inboxes.\n\n` +
    `<b>━━━ Commands ━━━</b>\n\n` +
    `<b>/start</b> — Launch the bot &amp; show the main menu\n` +
    `<b>/number</b> — Fetch a random active virtual number\n` +
    `<b>/countries</b> — Browse available countries &amp; pick one\n` +
    `<b>/help</b> — Display this help message\n` +
    `<b>/about</b> — Bot info &amp; credits\n\n` +
    `<b>━━━ Inline Buttons ━━━</b>\n\n` +
    `<b>📥 Inbox</b> — View the last 5 SMS messages received\n` +
    `<b>🔄 Renew</b> — Get a different number\n` +
    `<b>🔍 Check Phone Profile</b> — Open the number's Telegram profile\n` +
    `<b>🌍 Choose Country</b> — Browse countries and pick a number\n\n` +
    `<b>━━━ Tips ━━━</b>\n\n` +
    `• If no number is found, try again in a minute\n` +
    `• Inbox messages refresh each time you tap the button\n` +
    `• Use /countries to find numbers from specific regions\n` +
    `• Numbers are from public free pools — do not use for sensitive accounts`
  );
}

function aboutText() {
  return (
    `<b>ℹ️ About ${escapeHtml(BOT_INFO.name)}</b>\n\n` +
    `<b>Version:</b> <code>${BOT_INFO.version}</code>\n` +
    `<b>Platform:</b> Serverless Edge ⚡\n` +
    `<b>Telegram API:</b> Bot API 9.4+\n\n` +
    `<b>━━━ Creator ━━━</b>\n\n` +
    `Developed by <b>${escapeHtml(BOT_INFO.creator)}</b>\n` +
    `<a href="${BOT_INFO.creatorLink}">📢 ${escapeHtml(BOT_INFO.creator)}</a>\n\n` +
    `<i>Built with ❤️ for the community</i>`
  );
}

function countriesHeaderText(total, page, totalPages) {
  return (
    `<b>🌍 Available Countries</b>\n\n` +
    `Found <b>${total}</b> countries with active numbers.\n` +
    `<i>Select a country to view its available numbers.</i>\n\n` +
    `<b>📄 Page ${page + 1} of ${totalPages}</b>`
  );
}

function numbersHeaderText(countryName, flag, total, page, totalPages) {
  return (
    `${flag} <b>${escapeHtml(countryName)} — Available Numbers</b>\n\n` +
    `Found <b>${total}</b> active number${total !== 1 ? "s" : ""}.\n` +
    `<i>Tap a number to select it and view its inbox.</i>` +
    (totalPages > 1 ? `\n\n<b>📄 Page ${page + 1} of ${totalPages}</b>` : "")
  );
}

// ─────────────────────────────────────────────
//  FORCE JOIN CHECK
// ─────────────────────────────────────────────

async function checkForceJoin(token, chatId, user, replyToMsgId = null) {
  const isMember = await isChannelMember(token, user.id);
  if (isMember) return true;

  const opts = {
    reply_markup: buildForceJoinKeyboard(),
  };
  if (replyToMsgId) opts.reply_to_message_id = replyToMsgId;

  await sendMessage(token, chatId, forceJoinText(user), opts);
  return false;
}

// ─────────────────────────────────────────────
//  COMMAND HANDLERS
// ─────────────────────────────────────────────

async function handleStart(token, message) {
  const chatId = message.chat.id;
  const user = message.from;

  if (!(await checkForceJoin(token, chatId, user, message.message_id))) return;

  await sendChatAction(token, chatId);
  await sendMessage(token, chatId, welcomeText(user), {
    reply_to_message_id: message.message_id,
    reply_markup: buildStartKeyboard(),
  });
}

async function handleHelp(token, message) {
  const chatId = message.chat.id;
  if (!(await checkForceJoin(token, chatId, message.from, message.message_id)))
    return;

  await sendChatAction(token, chatId);
  await sendMessage(token, chatId, helpText(), {
    reply_to_message_id: message.message_id,
    reply_markup: buildBackKeyboard(),
  });
}

async function handleAbout(token, message) {
  const chatId = message.chat.id;
  if (!(await checkForceJoin(token, chatId, message.from, message.message_id)))
    return;

  await sendChatAction(token, chatId);
  await sendMessage(token, chatId, aboutText(), {
    reply_to_message_id: message.message_id,
    reply_markup: buildBackKeyboard(),
  });
}

/**
 * Handle /countries command — show paginated country list.
 */
async function handleCountries(token, message) {
  const chatId = message.chat.id;
  if (!(await checkForceJoin(token, chatId, message.from, message.message_id)))
    return;

  await sendChatAction(token, chatId);

  const loadingRes = await sendMessage(
    token,
    chatId,
    `<b>🌍 Loading available countries...</b>\n\n<i>Please wait a moment.</i>`,
    { reply_to_message_id: message.message_id }
  );

  const countries = await getOnlineCountries();

  if (countries.length === 0) {
    if (loadingRes.ok) {
      await editMessage(
        token,
        chatId,
        loadingRes.result.message_id,
        `<b>🌍 Available Countries</b>\n\n` +
        `<b>😔 No countries are available right now.</b>\n\n` +
        `<i>Please try again in a few minutes.</i>`,
        { reply_markup: buildBackKeyboard() }
      );
    }
    return;
  }

  countries.sort((a, b) => a.name.localeCompare(b.name));

  const totalPages = Math.ceil(countries.length / COUNTRIES_PER_PAGE);

  if (loadingRes.ok) {
    await editMessage(
      token,
      chatId,
      loadingRes.result.message_id,
      countriesHeaderText(countries.length, 0, totalPages),
      { reply_markup: buildCountriesKeyboard(countries, 0) }
    );
  }
}

/**
 * Core number-fetching logic — used by both /number command and renew callback.
 */
async function fetchAndSendNumber(token, chatId, messageId) {
  await editMessage(
    token,
    chatId,
    messageId,
    `<b>🔍 Getting a random number for you...</b>\n\n` +
    `<i>⁀➴ Fetching available countries...</i>`
  );

  const countries = shuffle(await getOnlineCountries());

  if (countries.length === 0) {
    await editMessage(
      token,
      chatId,
      messageId,
      `<b>🔍 Getting a random number for you...</b>\n\n` +
      `⁀➴ Fetching available countries:\n` +
      `<b>⚠️ No countries available right now. Try again later.</b>`,
      { reply_markup: buildBackKeyboard() }
    );
    return false;
  }

  await editMessage(
    token,
    chatId,
    messageId,
    `<b>🔍 Getting a random number for you...</b>\n\n` +
    `⁀➴ Fetching available countries:\n` +
    `Got <b>${countries.length}</b> countries\n\n` +
    `<i>⁀➴ Testing active numbers...</i>`
  );

  for (const country of countries) {
    const numbers = await getCountryNumbers(country.name);
    if (!numbers || numbers.length === 0) continue;

    const countryName = formatCountryName(country.name);

    for (const numObj of numbers) {
      const flag = getFlag(numObj.fullNumber);
      const formatted = formatPhone(numObj.fullNumber);

      await editMessage(
        token,
        chatId,
        messageId,
        `<b>🔍 Getting a random number for you...</b>\n\n` +
        `⁀➴ Fetching available countries:\n` +
        `Got <b>${countries.length}</b> countries\n\n` +
        `⁀➴ Testing active numbers:\n` +
        `<i>Trying ${escapeHtml(countryName)} (${escapeHtml(formatted)})</i>`
      );

      const inbox = await getNumberInbox(country.name, numObj.fullNumber);
      if (inbox && inbox.length >= 0) {
        await editMessage(
          token,
          chatId,
          messageId,
          `<b>✅ Number Found!</b>\n\n` +
          `${flag} <b>Number:</b> <code>+${escapeHtml(numObj.fullNumber)}</code>\n` +
          `<b>📍 Country:</b> ${escapeHtml(countryName)}\n` +
          `<b>🕐 Last Update:</b> ${escapeHtml(numObj.lastUpdate)}\n\n` +
          `<i>Use the buttons below to check inbox or get a new number.</i>`,
          {
            reply_markup: buildNumberKeyboard(
              country.name,
              numObj.fullNumber
            ),
          }
        );
        return true;
      }
    }
  }

  await editMessage(
    token,
    chatId,
    messageId,
    `<b>🔍 Getting a random number for you...</b>\n\n` +
    `⁀➴ Fetching available countries:\n` +
    `Got <b>${countries.length}</b> countries\n\n` +
    `⁀➴ Testing active numbers:\n` +
    `<b>😔 No active number available right now.</b>\n\n` +
    `<i>Please try again in a minute.</i>`,
    { reply_markup: buildBackKeyboard() }
  );
  return false;
}

async function handleNumber(token, message) {
  const chatId = message.chat.id;
  if (!(await checkForceJoin(token, chatId, message.from, message.message_id)))
    return;

  await sendChatAction(token, chatId);

  const promptRes = await sendMessage(
    token,
    chatId,
    `<b>🔍 Getting a random number for you...</b>\n\n` +
    `<i>⁀➴ Initializing...</i>`,
    { reply_to_message_id: message.message_id }
  );

  if (!promptRes.ok) return;
  await fetchAndSendNumber(token, chatId, promptRes.result.message_id);
}

// ─────────────────────────────────────────────
//  CALLBACK QUERY HANDLERS
// ─────────────────────────────────────────────

async function handleCallbackQuery(token, callbackQuery) {
  const data = callbackQuery.data;
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const callbackId = callbackQuery.id;
  const user = callbackQuery.from;

  try {
    if (data === "noop") {
      await answerCallback(token, callbackId);
      return;
    }

    if (data === "check_join") {
      const isMember = await isChannelMember(token, user.id);
      if (isMember) {
        await answerCallback(token, callbackId, "✅ Verified! Welcome!", false);
        await editMessage(token, chatId, messageId, welcomeText(user), {
          reply_markup: buildStartKeyboard(),
        });
      } else {
        await answerCallback(
          token,
          callbackId,
          "❌ You haven't joined yet! Please join the channel first.",
          true
        );
      }
      return;
    }

    const isMember = await isChannelMember(token, user.id);
    if (!isMember) {
      await answerCallback(
        token,
        callbackId,
        "⚠️ Please join the channel first!",
        true
      );
      return;
    }

    if (data.startsWith("msg&")) {
      const parts = data.split("&");
      if (parts.length < 3) {
        await answerCallback(token, callbackId, "❌ Invalid request.", true);
        return;
      }

      const [, country, number] = parts;

      await answerCallback(token, callbackId, "📬 Fetching inbox...");

      const messages = await getNumberInbox(country, number);

      if (!messages || messages.length === 0) {
        await answerCallback(
          token,
          callbackId,
          "📭 No messages found. Try again in a minute!",
          true
        );
        return;
      }

      const lastFive = messages.slice(0, 5);
      for (const msg of lastFive) {
        const cleanText = msg.text
          ? msg.text.split("received from OnlineSIM.io")[0].trim()
          : "—";

        await sendMessage(
          token,
          chatId,
          `<b>⚯͛ Time:</b> ${escapeHtml(msg.time)}\n\n${escapeHtml(cleanText)}`,
          { reply_to_message_id: messageId }
        );
      }
      return;
    }

    if (data === "new_phone_number") {
      await answerCallback(token, callbackId, "🔄 Finding a new number...");
      await fetchAndSendNumber(token, chatId, messageId);
      return;
    }

    if (data === "get_number") {
      await answerCallback(token, callbackId, "📱 Searching...");
      await editMessage(
        token,
        chatId,
        messageId,
        `<b>🔍 Getting a random number for you...</b>\n\n` +
        `<i>⁀➴ Initializing...</i>`
      );
      await fetchAndSendNumber(token, chatId, messageId);
      return;
    }

    if (data.startsWith("countries_")) {
      const page = parseInt(data.split("_")[1], 10) || 0;

      await answerCallback(token, callbackId);

      const countries = await getOnlineCountries();
      if (countries.length === 0) {
        await editMessage(
          token,
          chatId,
          messageId,
          `<b>🌍 Available Countries</b>\n\n` +
          `<b>😔 No countries available right now.</b>\n\n` +
          `<i>Please try again in a few minutes.</i>`,
          { reply_markup: buildBackKeyboard() }
        );
        return;
      }

      countries.sort((a, b) => a.name.localeCompare(b.name));
      const totalPages = Math.ceil(countries.length / COUNTRIES_PER_PAGE);
      const safePage = Math.min(page, totalPages - 1);

      await editMessage(
        token,
        chatId,
        messageId,
        countriesHeaderText(countries.length, safePage, totalPages),
        { reply_markup: buildCountriesKeyboard(countries, safePage) }
      );
      return;
    }

    if (data.startsWith("country&")) {
      const country = data.split("&")[1];
      if (!country) {
        await answerCallback(token, callbackId, "❌ Invalid country.", true);
        return;
      }

      await answerCallback(token, callbackId, "📱 Loading numbers...");

      const countryName = formatCountryName(country);
      const flag = getFlagForCountry(country);

      await editMessage(
        token,
        chatId,
        messageId,
        `${flag} <b>${escapeHtml(countryName)}</b>\n\n<i>Loading available numbers...</i>`
      );

      const numbers = await getCountryNumbers(country);

      if (!numbers || numbers.length === 0) {
        await editMessage(
          token,
          chatId,
          messageId,
          `${flag} <b>${escapeHtml(countryName)}</b>\n\n` +
          `<b>😔 No numbers available for this country right now.</b>\n\n` +
          `<i>Try another country or check back later.</i>`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "🌍 Back to Countries",
                    callback_data: "countries_0",
                  },
                  { text: "« Menu", callback_data: "back_to_main" },
                ],
              ],
            },
          }
        );
        return;
      }

      const totalPages = Math.ceil(numbers.length / NUMBERS_PER_PAGE);

      await editMessage(
        token,
        chatId,
        messageId,
        numbersHeaderText(countryName, flag, numbers.length, 0, totalPages),
        { reply_markup: buildNumbersKeyboard(country, numbers, 0) }
      );
      return;
    }

    if (data.startsWith("nums&")) {
      const parts = data.split("&");
      if (parts.length < 3) {
        await answerCallback(token, callbackId, "❌ Invalid request.", true);
        return;
      }

      const [, country, pageStr] = parts;
      const page = parseInt(pageStr, 10) || 0;

      await answerCallback(token, callbackId);

      const countryName = formatCountryName(country);
      const flag = getFlagForCountry(country);
      const numbers = await getCountryNumbers(country);

      if (!numbers || numbers.length === 0) {
        await editMessage(
          token,
          chatId,
          messageId,
          `${flag} <b>${escapeHtml(countryName)}</b>\n\n` +
          `<b>😔 Numbers are no longer available.</b>`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "🌍 Back to Countries",
                    callback_data: "countries_0",
                  },
                  { text: "« Menu", callback_data: "back_to_main" },
                ],
              ],
            },
          }
        );
        return;
      }

      const totalPages = Math.ceil(numbers.length / NUMBERS_PER_PAGE);
      const safePage = Math.min(page, totalPages - 1);

      await editMessage(
        token,
        chatId,
        messageId,
        numbersHeaderText(
          countryName,
          flag,
          numbers.length,
          safePage,
          totalPages
        ),
        { reply_markup: buildNumbersKeyboard(country, numbers, safePage) }
      );
      return;
    }

    if (data.startsWith("pick&")) {
      const parts = data.split("&");
      if (parts.length < 3) {
        await answerCallback(token, callbackId, "❌ Invalid request.", true);
        return;
      }

      const [, country, number] = parts;
      const countryName = formatCountryName(country);
      const flag = getFlag(number) || getFlagForCountry(country);
      const formatted = formatPhone(number);

      await answerCallback(token, callbackId, `📱 Selected ${formatted}`);

      // Verify the number is still active
      const inbox = await getNumberInbox(country, number);
      const isActive = inbox !== false;

      if (isActive) {
        await editMessage(
          token,
          chatId,
          messageId,
          `<b>✅ Number Selected!</b>\n\n` +
          `${flag} <b>Number:</b> <code>+${escapeHtml(number)}</code>\n` +
          `<b>📍 Country:</b> ${escapeHtml(countryName)}\n` +
          `<b>📬 Inbox:</b> ${inbox.length} message${inbox.length !== 1 ? "s" : ""}\n\n` +
          `<i>Use the buttons below to check inbox or get a new number.</i>`,
          { reply_markup: buildNumberKeyboard(country, number) }
        );
      } else {
        await editMessage(
          token,
          chatId,
          messageId,
          `${flag} <b>${escapeHtml(countryName)}</b>\n\n` +
          `<b>⚠️ This number is no longer active.</b>\n` +
          `Number: <code>+${escapeHtml(number)}</code>\n\n` +
          `<i>Please select another number.</i>`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: `🔄 Retry ${escapeHtml(countryName)}`,
                    callback_data: `country&${country}`,
                    style: "primary",
                  },
                ],
                [
                  {
                    text: "🌍 Countries",
                    callback_data: "countries_0",
                  },
                  { text: "« Menu", callback_data: "back_to_main" },
                ],
              ],
            },
          }
        );
      }
      return;
    }

    // ── Show Help (inline) ──
    if (data === "show_help") {
      await answerCallback(token, callbackId);
      await editMessage(token, chatId, messageId, helpText(), {
        reply_markup: buildBackKeyboard(),
      });
      return;
    }

    // ── Show About (inline) ──
    if (data === "show_about") {
      await answerCallback(token, callbackId);
      await editMessage(token, chatId, messageId, aboutText(), {
        reply_markup: buildBackKeyboard(),
      });
      return;
    }

    // ── Back to Main Menu ──
    if (data === "back_to_main") {
      await answerCallback(token, callbackId);
      await editMessage(token, chatId, messageId, welcomeText(user), {
        reply_markup: buildStartKeyboard(),
      });
      return;
    }

    // ── Unknown callback ──
    await answerCallback(token, callbackId, "❓ Unknown action.", false);
  } catch (err) {
    console.error("Callback error:", err);
    try {
      await answerCallback(
        token,
        callbackId,
        "⚠️ Something went wrong. Please try again.",
        true
      );
    } catch {
    }
  }
}

// ─────────────────────────────────────────────
//  NON-COMMAND / MEDIA HANDLER
// ─────────────────────────────────────────────

async function handleUnknown(token, message) {
  const chatId = message.chat.id;
  const user = message.from;

  if (!(await checkForceJoin(token, chatId, user, message.message_id))) return;

  const mention = userMention(user);

  let contentType = "message";
  if (message.photo) contentType = "photo";
  else if (message.video) contentType = "video";
  else if (message.document) contentType = "document";
  else if (message.sticker) contentType = "sticker";
  else if (message.voice) contentType = "voice message";
  else if (message.audio) contentType = "audio";
  else if (message.animation) contentType = "GIF";
  else if (message.video_note) contentType = "video note";
  else if (message.contact) contentType = "contact";
  else if (message.location) contentType = "location";
  else if (message.poll) contentType = "poll";
  else if (message.dice) contentType = "dice";
  else if (message.text) contentType = "text";

  await sendMessage(
    token,
    chatId,
    `Hey ${mention}! 👋\n\n` +
    `I don't understand <b>${contentType}s</b> — I'm a virtual number bot.\n\n` +
    `<b>Try these commands instead:</b>\n` +
    `├ /number — Get a random virtual number\n` +
    `├ /countries — Browse &amp; pick a country\n` +
    `├ /help — How to use this bot\n` +
    `└ /about — Bot information`,
    {
      reply_to_message_id: message.message_id,
      reply_markup: buildStartKeyboard(),
    }
  );
}

// ─────────────────────────────────────────────
//  UPDATE ROUTER
// ─────────────────────────────────────────────

async function handleUpdate(token, update) {
  try {
    if (update.callback_query) {
      await handleCallbackQuery(token, update.callback_query);
      return;
    }

    const message = update.message;
    if (!message) return;

    const text = message.text || "";
    const command = text.split("@")[0].split(" ")[0].toLowerCase();

    switch (command) {
      case "/start":
      case "/restart":
        await handleStart(token, message);
        break;

      case "/help":
      case "/usage":
        await handleHelp(token, message);
        break;

      case "/about":
        await handleAbout(token, message);
        break;

      case "/number":
        await handleNumber(token, message);
        break;

      case "/countries":
        await handleCountries(token, message);
        break;

      default:
        await handleUnknown(token, message);
        break;
    }
  } catch (err) {
    console.error("Update handling error:", err);

    try {
      const chatId =
        update.message?.chat?.id ||
        update.callback_query?.message?.chat?.id;
      if (chatId) {
        await sendMessage(
          token,
          chatId,
          `<b>⚠️ An unexpected error occurred.</b>\n\n` +
          `<i>Please try again or send /start to restart.</i>`
        );
      }
    } catch {
    }
  }
}

// ─────────────────────────────────────────────
//  WEBHOOK SETUP
// ─────────────────────────────────────────────

async function setupWebhook(token, webhookUrl, secret) {
  return tg(token, "setWebhook", {
    url: `${webhookUrl}/webhook`,
    secret_token: secret,
    allowed_updates: ["message", "callback_query"],
    drop_pending_updates: true,
    max_connections: 100,
  });
}

async function getWebhookInfo(token) {
  return tg(token, "getWebhookInfo");
}

// ─────────────────────────────────────────────
//  CLOUDFLARE WORKER ENTRY POINT
// ─────────────────────────────────────────────

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const token = env.BOT_TOKEN;
    const secret = env.WEBHOOK_SECRET || "ar-bot-webhook-secret";

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Bot token not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (request.method === "GET" && url.pathname === "/") {
      return new Response(
        JSON.stringify(
          {
            status: "✅ Bot is running",
            bot: BOT_INFO.name,
            version: BOT_INFO.version,
          },
          null,
          2
        ),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // ── GET /setup — Register webhook ──
    if (request.method === "GET" && url.pathname === "/setup") {
      const workerUrl = `${url.protocol}//${url.host}`;
      const result = await setupWebhook(token, workerUrl, secret);
      return new Response(
        JSON.stringify(
          {
            action: "Webhook setup",
            webhookUrl: `${workerUrl}/webhook`,
            result,
          },
          null,
          2
        ),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // ── GET /remove — Remove webhook ──
    if (request.method === "GET" && url.pathname === "/remove") {
      const result = await tg(token, "deleteWebhook", {
        drop_pending_updates: true,
      });
      return new Response(
        JSON.stringify({ action: "Webhook removed", result }, null, 2),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // ── POST /webhook — Handle Telegram updates ──
    if (request.method === "POST" && url.pathname === "/webhook") {
      const headerSecret = request.headers.get(
        "X-Telegram-Bot-Api-Secret-Token"
      );
      if (headerSecret !== secret) {
        return new Response("Unauthorized", { status: 403 });
      }

      let update;
      try {
        update = await request.json();
      } catch {
        return new Response("Bad Request", { status: 400 });
      }

      ctx.waitUntil(handleUpdate(token, update));

      return new Response("OK", { status: 200 });
    }

    return new Response("Not Found", { status: 404 });
  },
};
