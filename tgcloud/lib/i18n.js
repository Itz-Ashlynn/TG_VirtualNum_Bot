/**
 * Internationalization (i18n) Engine
 * Multi-language translations for 8 major languages:
 * en, ru, hi, zh, es, ar, fr, de
 */

export const SUPPORTED_LANGUAGES = {
  en: { code: 'en', name: 'English', flag: '🇬🇧' },
  ru: { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  hi: { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  zh: { code: 'zh', name: '中文', flag: '🇨🇳' },
  es: { code: 'es', name: 'Español', flag: '🇪🇸' },
  ar: { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  fr: { code: 'fr', name: 'Français', flag: '🇫🇷' },
  de: { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
};

export const DEFAULT_LANG = 'en';

export function normalizeLang(code) {
  if (!code) return DEFAULT_LANG;
  const c = String(code).toLowerCase().trim();
  if (c === 'cn') return 'zh';
  if (SUPPORTED_LANGUAGES[c]) return c;
  return DEFAULT_LANG;
}

const TRANSLATIONS = {
  en: {
    welcome_title: '⁀➴ Hello {user}!',
    welcome_desc:
      'Welcome to <b>{botName}</b> ✨\n\n' +
      'Get <b>free virtual phone numbers</b> and inspect their incoming SMS inboxes in real-time — powered by high-speed serverless infrastructure.\n\n' +
      '<b>Quick Start:</b>\n' +
      '├ /number — Get a random active number\n' +
      '├ /countries — Browse &amp; pick a country\n' +
      '├ /lang — Switch language preference\n' +
      '├ /help — Detailed usage manual\n' +
      '├ /about — Bot info &amp; credits\n' +
      '└ /start — Show this menu\n\n' +
      '<i>Tap a button below to get started 👇</i>',

    force_join:
      '<b>⚠️ Access Required</b>\n\n' +
      'Hey {user}, you must join our channel before using this bot.\n\n' +
      '📢 <b><a href="{channelLink}">{channelName}</a></b>\n\n' +
      'Tap <b>"Join Channel"</b> below, then tap <b>"I\'ve Joined"</b> to verify.',

    help_title: '❓ How to Use {botName}',
    help_body:
      'This bot provides free public virtual phone numbers and their real-time SMS inboxes.\n\n' +
      '<b>━━━ Commands ━━━</b>\n\n' +
      '<b>/start</b> — Launch bot &amp; show main menu\n' +
      '<b>/number</b> — Fetch a random active virtual number\n' +
      '<b>/countries</b> — Browse available countries &amp; pick one\n' +
      '<b>/lang [code]</b> — Change language (e.g. <code>/lang ru</code>)\n' +
      '<b>/help</b> — Display this help manual\n' +
      '<b>/about</b> — Bot version and platform credits\n\n' +
      '<b>━━━ Inline Buttons ━━━</b>\n\n' +
      '<b>📥 Inbox</b> — View the last 5 SMS messages received\n' +
      '<b>🔄 Renew</b> — Immediately request a different active number\n' +
      '<b>🔍 Check Profile</b> — Open Telegram profile to see if registered\n' +
      '<b>🌍 Choose Country</b> — Browse countries &amp; regional numbers\n\n' +
      '<b>━━━ Best Practices &amp; Tips ━━━</b>\n\n' +
      '<blockquote expandable>• If no active numbers are available in a pool, check back in 1–2 minutes.\n' +
      '• SMS inboxes update live each time you press the "Inbox" button.\n' +
      '• Use /countries to target specific geographical regions.\n' +
      '• Numbers come from shared public pools — do NOT use for personal or highly sensitive financial accounts.</blockquote>',

    about_title: 'ℹ️ About {botName}',
    about_body:
      '<b>Version:</b> <code>{version}</code>\n' +
      '<b>Architecture:</b> Telegram Serverless (V8 Isolate)\n' +
      '<b>Bot API:</b> Bot API 10.3+ (Rich Elements &amp; Styled Buttons)\n' +
      '<b>Persistence:</b> Built-in SQLite DSL\n\n' +
      '<b>━━━ Developer Credits ━━━</b>\n\n' +
      'Developed by <b>{creator}</b>\n' +
      '<a href="{creatorLink}">📢 Channel: {creator}</a>\n\n' +
      '<i>Engineered for ultra-fast, zero-cold-start performance.</i>',

    lang_title: '🌐 Choose Your Language / Выберите язык',
    lang_desc:
      'Select your preferred language from the list below.\n' +
      'You can also change language anytime using <code>/lang &lt;code&gt;</code> (e.g. <code>/lang ru</code>, <code>/lang hi</code>, <code>/lang en</code>).',
    lang_changed: '✅ Language changed to {flag} <b>{name}</b>!',

    loading_countries:
      '<b>🌍 Loading available countries...</b>\n\n<i>Please wait a moment.</i>',
    no_countries:
      '<b>🌍 Available Countries</b>\n\n<b>😔 No countries are available right now.</b>\n\n<i>Please try again in a few minutes.</i>',
    countries_header:
      '<b>🌍 Available Countries</b>\n\nFound <b>{total}</b> countries with active virtual numbers.\n<i>Select a country to view available numbers.</i>\n\n<b>📄 Page {page} of {totalPages}</b>',

    numbers_header:
      '{flag} <b>{country} — Available Numbers</b>\n\nFound <b>{total}</b> active number{plural}.\n<i>Tap a number to select it and view its inbox.</i>\n\n<b>📄 Page {page} of {totalPages}</b>',
    no_numbers_for_country:
      '{flag} <b>{country}</b>\n\n<b>😔 No active numbers available for this country right now.</b>\n\n<i>Try another country or check back later.</i>',
    numbers_expired:
      '{flag} <b>{country}</b>\n\n<b>😔 Numbers are no longer available.</b>',

    getting_number_init:
      '<b>🔍 Getting a random number for you...</b>\n\n<i>⁀➴ Initializing search...</i>',
    getting_number_fetching:
      '<b>🔍 Getting a random number for you...</b>\n\n<i>⁀➴ Fetching active countries...</i>',
    getting_number_testing:
      '<b>🔍 Getting a random number for you...</b>\n\n' +
      'Got <b>{count}</b> available countries.\n\n' +
      '<i>⁀➴ Testing active numbers: trying {country} ({phone})...</i>',
    number_found_title: '✅ Number Found &amp; Active!',
    number_found_body:
      '{flag} <b>Number:</b> <code>+{phone}</code>\n' +
      '<b>📍 Country:</b> {country}\n' +
      '<b>🕐 Last Update:</b> {lastUpdate}\n\n' +
      '<i>Use the buttons below to check inbox or renew for another number.</i>',
    no_active_number_found:
      '<b>🔍 Getting a random number for you...</b>\n\n' +
      '<b>😔 No active number available right now in the pool.</b>\n\n' +
      '<i>Please try again in a moment.</i>',

    number_selected_title: '✅ Number Selected!',
    number_selected_body:
      '{flag} <b>Number:</b> <code>+{phone}</code>\n' +
      '<b>📍 Country:</b> {country}\n' +
      '<b>📬 Messages in Inbox:</b> {inboxCount}\n\n' +
      '<i>Use the buttons below to check the latest SMS or get a new number.</i>',
    number_inactive:
      '{flag} <b>{country}</b>\n\n' +
      '<b>⚠️ This number is no longer active.</b>\n' +
      'Number: <code>+{phone}</code>\n\n' +
      '<i>Please select another number from the list.</i>',

    inbox_fetching: '📬 Fetching latest SMS messages...',
    inbox_empty: '📭 No messages found. Waiting for incoming OTP / SMS...',
    inbox_msg_header: '<b>📩 Incoming SMS #{num}</b>\n<b>🕒 Time:</b> {time}',

    unknown_fallback:
      'Hey {user}! 👋\n\n' +
      "I don't understand <b>{type}</b> — I am a virtual number bot.\n\n" +
      '<b>Try these commands:</b>\n' +
      '├ /number — Get a random virtual number\n' +
      '├ /countries — Browse &amp; pick a country\n' +
      '├ /lang — Change language\n' +
      '└ /help — How to use this bot',

    // Buttons
    btn_get_number: '📱 Get Random Number',
    btn_countries: '🌍 Choose Country',
    btn_language: '🌐 Language',
    btn_help: '❓ Help',
    btn_about: 'ℹ️ About',
    btn_creator: '👤 Creator',
    btn_inbox: '📥 Inbox',
    btn_renew: '🔄 Renew Number',
    btn_check_profile: '🔍 Check Profile',
    btn_menu: '« Menu',
    btn_prev: '« Prev',
    btn_next: 'Next »',
    btn_join_channel: '📢 Join Channel',
    btn_ive_joined: "✅ I've Joined",
    btn_retry_country: '🔄 Retry {country}',
    btn_random: '🎲 Random Number',
    verified_welcome: '✅ Verified! Welcome aboard!',
    not_joined_alert: "❌ You haven't joined yet! Please join the channel first.",
  },

  ru: {
    welcome_title: '⁀➴ Привет, {user}!',
    welcome_desc:
      'Добро пожаловать в <b>{botName}</b> ✨\n\n' +
      'Получайте <b>бесплатные виртуальные номера</b> и читайте входящие СМС прямо в Telegram — на сверхбыстром бессерверном движке.\n\n' +
      '<b>Быстрый старт:</b>\n' +
      '├ /number — Случайный активный номер\n' +
      '├ /countries — Каталог стран\n' +
      '├ /lang — Выбрать язык\n' +
      '├ /help — Инструкция по использованию\n' +
      '├ /about — Информация о боте\n' +
      '└ /start — Главное меню\n\n' +
      '<i>Нажмите кнопку ниже, чтобы начать 👇</i>',

    force_join:
      '<b>⚠️ Требуется подписка</b>\n\n' +
      'Привет, {user}! Чтобы пользоваться ботом, подпишитесь на наш канал.\n\n' +
      '📢 <b><a href="{channelLink}">{channelName}</a></b>\n\n' +
      'Нажмите <b>"Подписаться"</b>, затем <b>"Я подписался"</b>.',

    help_title: '❓ Руководство по {botName}',
    help_body:
      'Этот бот предоставляет бесплатные публичные виртуальные номера и доступ к их СМС-входящим.\n\n' +
      '<b>━━━ Команды ━━━</b>\n\n' +
      '<b>/start</b> — Главное меню\n' +
      '<b>/number</b> — Получить активный номер\n' +
      '<b>/countries</b> — Список доступных стран\n' +
      '<b>/lang [код]</b> — Сменить язык (напр. <code>/lang ru</code>)\n' +
      '<b>/help</b> — Инструкция\n' +
      '<b>/about</b> — О боте\n\n' +
      '<b>━━━ Кнопки ━━━</b>\n\n' +
      '<b>📥 Входящие</b> — Последние 5 СМС сообщений\n' +
      '<b>🔄 Обновить</b> — Получить другой номер\n' +
      '<b>🔍 Профиль</b> — Проверить регистрацию в Telegram\n' +
      '<b>🌍 Выбрать страну</b> — Каталог номеров по странам\n\n' +
      '<b>━━━ Советы ━━━</b>\n\n' +
      '<blockquote expandable>• Если номер занят или не получает код, нажмите "Обновить".\n' +
      '• Входящие обновляются в реальном времени при каждом нажатии кнопки "Входящие".\n' +
      '• Номера публичные — не используйте для важных банковских или личных аккаунтов.</blockquote>',

    about_title: 'ℹ️ О боте {botName}',
    about_body:
      '<b>Версия:</b> <code>{version}</code>\n' +
      '<b>Платформа:</b> Telegram Serverless (V8 Isolate)\n' +
      '<b>Bot API:</b> Bot API 10.3+ (Цветные кнопки и Rich-сообщения)\n' +
      '<b>База данных:</b> Встроенный SQLite DSL\n\n' +
      '<b>━━━ Разработчик ━━━</b>\n\n' +
      'Создано <b>{creator}</b>\n' +
      '<a href="{creatorLink}">📢 Канал: {creator}</a>',

    lang_title: '🌐 Выберите язык / Select Language',
    lang_desc:
      'Выберите язык интерфейса из списка ниже.\n' +
      'Вы также можете менять язык командой <code>/lang &lt;код&gt;</code> (например <code>/lang en</code>, <code>/lang ru</code>).',
    lang_changed: '✅ Язык успешно изменен на {flag} <b>{name}</b>!',

    loading_countries:
      '<b>🌍 Загрузка доступных стран...</b>\n\n<i>Пожалуйста, подождите.</i>',
    no_countries:
      '<b>🌍 Доступные страны</b>\n\n<b>😔 В данный момент нет доступных стран.</b>',
    countries_header:
      '<b>🌍 Доступные страны</b>\n\nНайдено <b>{total}</b> стран с активными номерами.\n<i>Выберите страну:</i>\n\n<b>📄 Страница {page} из {totalPages}</b>',

    numbers_header:
      '{flag} <b>{country} — Номера</b>\n\nНайдено <b>{total}</b> активных номеров.\n<i>Нажмите на номер для выбора:</i>\n\n<b>📄 Страница {page} из {totalPages}</b>',
    no_numbers_for_country:
      '{flag} <b>{country}</b>\n\n<b>😔 Нет активных номеров для этой страны.</b>',
    numbers_expired:
      '{flag} <b>{country}</b>\n\n<b>😔 Номера больше недоступны.</b>',

    getting_number_init:
      '<b>🔍 Подбираем случайный номер...</b>\n\n<i>⁀➴ Инициализация...</i>',
    getting_number_fetching:
      '<b>🔍 Подбираем случайный номер...</b>\n\n<i>⁀➴ Поиск активных стран...</i>',
    getting_number_testing:
      '<b>🔍 Подбираем номер...</b>\n\nДоступно <b>{count}</b> стран.\n\n<i>Проверяем: {country} ({phone})...</i>',
    number_found_title: '✅ Номер найден и активен!',
    number_found_body:
      '{flag} <b>Номер:</b> <code>+{phone}</code>\n' +
      '<b>📍 Страна:</b> {country}\n' +
      '<b>🕐 Обновление:</b> {lastUpdate}\n\n' +
      '<i>Используйте кнопки ниже для просмотра СМС или смены номера.</i>',
    no_active_number_found:
      '<b>🔍 Поиск номера...</b>\n\n<b>😔 Не удалось найти активный номер. Попробуйте через минуту.</b>',

    number_selected_title: '✅ Номер выбран!',
    number_selected_body:
      '{flag} <b>Номер:</b> <code>+{phone}</code>\n' +
      '<b>📍 Страна:</b> {country}\n' +
      '<b>📬 Сообщений во входящих:</b> {inboxCount}\n\n' +
      '<i>Нажмите "Входящие" для чтения СМС.</i>',
    number_inactive:
      '{flag} <b>{country}</b>\n\n<b>⚠️ Этот номер больше не активен. Выберите другой.</b>',

    inbox_fetching: '📬 Загрузка входящих СМС...',
    inbox_empty: '📭 Сообщений пока нет. Ожидаем входящий код / СМС...',
    inbox_msg_header: '<b>📩 Входящее СМС #{num}</b>\n<b>🕒 Время:</b> {time}',

    unknown_fallback:
      'Привет, {user}! 👋\n\nЯ бот для получения виртуальных номеров и не понимаю этот тип сообщений.\n\nИспользуйте меню или команду /help.',

    btn_get_number: '📱 Получить номер',
    btn_countries: '🌍 Выбрать страну',
    btn_language: '🌐 Сменить язык',
    btn_help: '❓ Помощь',
    btn_about: 'ℹ️ О боте',
    btn_creator: '👤 Создатель',
    btn_inbox: '📥 Входящие СМС',
    btn_renew: '🔄 Сменить номер',
    btn_check_profile: '🔍 Проверить профиль',
    btn_menu: '« Меню',
    btn_prev: '« Назад',
    btn_next: 'Вперед »',
    btn_join_channel: '📢 Подписаться',
    btn_ive_joined: '✅ Я подписался',
    btn_retry_country: '🔄 Повторить {country}',
    btn_random: '🎲 Случайный номер',
    verified_welcome: '✅ Подписка подтверждена! Добро пожаловать!',
    not_joined_alert: '❌ Вы еще не подписались! Подпишитесь на канал.',
  },

  hi: {
    welcome_title: '⁀➴ नमस्ते {user}!',
    welcome_desc:
      '<b>{botName}</b> में आपका स्वागत है ✨\n\n' +
      'मुफ़्त <b>वर्चुअल फ़ोन नंबर</b> प्राप्त करें और रीयल-टाइम में ओटीपी/एसएमएस देखें।\n\n' +
      '<b>त्वरित कमांड:</b>\n' +
      '├ /number — रैंडम वर्चुअल नंबर लें\n' +
      '├ /countries — देश चुनें\n' +
      '├ /lang — भाषा बदलें\n' +
      '├ /help — उपयोग निर्देश\n' +
      '├ /about — बॉट की जानकारी\n' +
      '└ /start — मुख्य मेनू\n\n' +
      '<i>शुरू करने के लिए नीचे दिए गए बटन पर टैप करें 👇</i>',

    force_join:
      '<b>⚠️ चैनल से जुड़ना अनिवार्य है</b>\n\n' +
      'नमस्ते {user}, बॉट का उपयोग करने से पहले हमारे चैनल से जुड़ें।\n\n' +
      '📢 <b><a href="{channelLink}">{channelName}</a></b>',

    help_title: '❓ {botName} का उपयोग कैसे करें',
    help_body:
      'यह बॉट मुफ़्त वर्चुअल नंबर और एसएमएस इनबॉक्स प्रदान करता है।\n\n' +
      '<b>/number</b> — एक नया सक्रिय नंबर प्राप्त करें\n' +
      '<b>/countries</b> — उपलब्ध देशों की सूची देखें\n' +
      '<b>/lang</b> — अपनी भाषा बदलें\n' +
      '<blockquote expandable>• एसएमएस देखने के लिए "इनबॉक्स" बटन दबाएं।\n• सार्वजनिक नंबर व्यक्तिगत या बैंक खातों के लिए उपयोग न करें।</blockquote>',

    about_title: 'ℹ️ {botName} के बारे में',
    about_body:
      '<b>संस्करण:</b> <code>{version}</code>\n' +
      '<b>प्लेटफ़ॉर्म:</b> Telegram Serverless (V8 Isolate)\n' +
      '<b>डेवलपर:</b> <b>{creator}</b>\n<a href="{creatorLink}">📢 {creator}</a>',

    lang_title: '🌐 अपनी भाषा चुनें / Select Language',
    lang_desc: 'नीचे दी गई सूची में से अपनी पसंदीदा भाषा चुनें:',
    lang_changed: '✅ भाषा बदलकर {flag} <b>{name}</b> कर दी गई है!',

    loading_countries: '<b>🌍 उपलब्ध देश लोड हो रहे हैं...</b>',
    no_countries: '<b>😔 वर्तमान में कोई देश उपलब्ध नहीं है।</b>',
    countries_header:
      '<b>🌍 उपलब्ध देश</b>\n\nकुल <b>{total}</b> देश सक्रिय हैं।\n\n<b>📄 पृष्ठ {page}/{totalPages}</b>',
    numbers_header:
      '{flag} <b>{country} — नंबर</b>\n\nकुल <b>{total}</b> सक्रिय नंबर उपलब्ध हैं।\n\n<b>📄 पृष्ठ {page}/{totalPages}</b>',
    no_numbers_for_country: '{flag} <b>{country}</b> के लिए कोई नंबर उपलब्ध नहीं है।',
    numbers_expired: '⚠️ नंबर अब उपलब्ध नहीं हैं।',

    getting_number_init: '<b>🔍 आपके लिए नंबर खोजा जा रहा है...</b>',
    getting_number_fetching: '<b>🔍 देश खोजे जा रहे हैं...</b>',
    getting_number_testing: '<b>🔍 सक्रिय नंबर जाँचा जा रहा है: {country}...</b>',
    number_found_title: '✅ सक्रिय नंबर मिल गया!',
    number_found_body:
      '{flag} <b>नंबर:</b> <code>+{phone}</code>\n' +
      '<b>📍 देश:</b> {country}\n' +
      '<b>🕐 अंतिम अपडेट:</b> {lastUpdate}',
    no_active_number_found: '😔 कोई सक्रिय नंबर नहीं मिला। कृपया 1 मिनट बाद प्रयास करें।',

    number_selected_title: '✅ नंबर चुना गया!',
    number_selected_body:
      '{flag} <b>नंबर:</b> <code>+{phone}</code>\n' +
      '<b>📍 देश:</b> {country}\n' +
      '<b>📬 संदेश:</b> {inboxCount}',
    number_inactive: '⚠️ यह नंबर अब सक्रिय नहीं है।',

    inbox_fetching: '📬 एसएमएस लोड हो रहे हैं...',
    inbox_empty: '📭 कोई संदेश नहीं मिला। नए एसएमएस की प्रतीक्षा की जा रही है...',
    inbox_msg_header: '<b>📩 एसएमएस #{num}</b>\n<b>🕒 समय:</b> {time}',

    unknown_fallback: 'नमस्ते {user}! मैं केवल वर्चुअल नंबर बॉट हूँ। मेनू का उपयोग करें।',

    btn_get_number: '📱 नया नंबर प्राप्त करें',
    btn_countries: '🌍 देश चुनें',
    btn_language: '🌐 भाषा बदलें',
    btn_help: '❓ सहायता',
    btn_about: 'ℹ️ बॉट जानकारी',
    btn_creator: '👤 डेवलपर',
    btn_inbox: '📥 इनबॉक्स देखें',
    btn_renew: '🔄 दूसरा नंबर लें',
    btn_check_profile: '🔍 टेलीग्राम प्रोफ़ाइल',
    btn_menu: '« मेनू',
    btn_prev: '« पिछला',
    btn_next: 'अगला »',
    btn_join_channel: '📢 चैनल से जुड़ें',
    btn_ive_joined: '✅ मैं जुड़ गया हूँ',
    btn_retry_country: '🔄 पुनः प्रयास {country}',
    btn_random: '🎲 रैंडम नंबर',
    verified_welcome: '✅ सत्यापन सफल! स्वागत है!',
    not_joined_alert: '❌ आपने चैनल जॉइन नहीं किया है!',
  },

  zh: {
    welcome_title: '⁀➴ 你好 {user}!',
    welcome_desc:
      '欢迎使用 <b>{botName}</b> ✨\n\n' +
      '获取<b>免费虚拟手机号码</b>并实时接收验证码短信 — 由 Telegram Serverless 提供超高速驱动。\n\n' +
      '<b>快速上手:</b>\n' +
      '├ /number — 随机获取可用号码\n' +
      '├ /countries — 浏览国家列表\n' +
      '├ /lang — 切换语言设置\n' +
      '├ /help — 使用指南\n' +
      '├ /about — 关于与版本\n' +
      '└ /start — 返回主菜单\n\n' +
      '<i>点击下方按钮即可开始 👇</i>',

    force_join:
      '<b>⚠️ 需要关注频道</b>\n\n' +
      '你好 {user}，使用此机器人前请先关注我们的官方频道。\n\n' +
      '📢 <b><a href="{channelLink}">{channelName}</a></b>',

    help_title: '❓ {botName} 使用指南',
    help_body:
      '本机器人提供全球公共虚拟号码并支持实时接收短信验证码。\n\n' +
      '<b>/number</b> — 随机提取有效号码\n' +
      '<b>/countries</b> — 按国家浏览号码\n' +
      '<b>/lang [代码]</b> — 更改语言（例如 <code>/lang zh</code>）\n' +
      '<blockquote expandable>• 点击“收件箱”可实时刷新并查看最新 5 条短信验证码。\n• 公共号码仅供测试，请勿用于重要金融或私人账号。</blockquote>',

    about_title: 'ℹ️ 关于 {botName}',
    about_body:
      '<b>版本:</b> <code>{version}</code>\n' +
      '<b>平台:</b> Telegram Serverless (V8 Isolate)\n' +
      '<b>Bot API:</b> 10.3+ (富文本 & 彩色按键)\n' +
      '<b>开发者:</b> <b>{creator}</b>\n<a href="{creatorLink}">📢 {creator}</a>',

    lang_title: '🌐 选择语言 / Select Language',
    lang_desc: '请在下方选择您的首选语言：',
    lang_changed: '✅ 语言已成功更改为 {flag} <b>{name}</b>！',

    loading_countries: '<b>🌍 正在加载可用国家...</b>',
    no_countries: '<b>😔 目前没有可用的国家。</b>',
    countries_header:
      '<b>🌍 可选国家</b>\n\n共有 <b>{total}</b> 个国家拥有活跃号码。\n\n<b>📄 第 {page}/{totalPages} 页</b>',
    numbers_header:
      '{flag} <b>{country} — 可选号码</b>\n\n共有 <b>{total}</b> 个有效号码。\n\n<b>📄 第 {page}/{totalPages} 页</b>',
    no_numbers_for_country: '{flag} <b>{country}</b> 暂无有效号码。',
    numbers_expired: '⚠️ 该号码已失效。',

    getting_number_init: '<b>🔍 正在为您检索可用号码...</b>',
    getting_number_fetching: '<b>🔍 正在获取国家池...</b>',
    getting_number_testing: '<b>🔍 正在测试活跃度: {country}...</b>',
    number_found_title: '✅ 已获取活跃号码！',
    number_found_body:
      '{flag} <b>号码:</b> <code>+{phone}</code>\n' +
      '<b>📍 国家:</b> {country}\n' +
      '<b>🕐 最近更新:</b> {lastUpdate}',
    no_active_number_found: '😔 号码池当前繁忙，请在 1 分钟后重试。',

    number_selected_title: '✅ 已选中号码！',
    number_selected_body:
      '{flag} <b>号码:</b> <code>+{phone}</code>\n' +
      '<b>📍 国家:</b> {country}\n' +
      '<b>📬 收件箱信息数:</b> {inboxCount}',
    number_inactive: '⚠️ 该号码已停用，请选择其他号码。',

    inbox_fetching: '📬 正在拉取最新短信验证码...',
    inbox_empty: '📭 暂无新短信，正在等待验证码到达...',
    inbox_msg_header: '<b>📩 短信 #{num}</b>\n<b>🕒 时间:</b> {time}',

    unknown_fallback: '你好 {user}！我是虚拟号码机器人，请点击下方菜单。',

    btn_get_number: '📱 获取随机号码',
    btn_countries: '🌍 选择国家',
    btn_language: '🌐 切换语言',
    btn_help: '❓ 使用帮助',
    btn_about: 'ℹ️ 关于本程序',
    btn_creator: '👤 作者主页',
    btn_inbox: '📥 查看收件箱',
    btn_renew: '🔄 更换号码',
    btn_check_profile: '🔍 检查 TG 账号',
    btn_menu: '« 主菜单',
    btn_prev: '« 上一页',
    btn_next: '下一页 »',
    btn_join_channel: '📢 关注频道',
    btn_ive_joined: '✅ 我已关注',
    btn_retry_country: '🔄 重试 {country}',
    btn_random: '🎲 随机号码',
    verified_welcome: '✅ 验证成功！欢迎使用！',
    not_joined_alert: '❌ 您尚未加入频道，请先加入！',
  },

  es: {
    welcome_title: '⁀➴ ¡Hola {user}!',
    welcome_desc:
      'Bienvenido a <b>{botName}</b> ✨\n\n' +
      'Obtén <b>números virtuales gratuitos</b> y revisa los SMS recibidos al instante dentro de Telegram.\n\n' +
      '<b>Inicio rápido:</b>\n' +
      '├ /number — Obtener número activo\n' +
      '├ /countries — Ver catálogo de países\n' +
      '├ /lang — Cambiar idioma\n' +
      '├ /help — Ayuda e instrucciones\n' +
      '├ /about — Información del bot\n' +
      '└ /start — Menú principal',

    force_join:
      '<b>⚠️ Acceso Requerido</b>\n\n' +
      'Hola {user}, únete a nuestro canal para utilizar el bot.\n\n' +
      '📢 <b><a href="{channelLink}">{channelName}</a></b>',

    help_title: '❓ Cómo usar {botName}',
    help_body:
      'Este bot ofrece números virtuales públicos y lectura de SMS en vivo.\n\n' +
      '<b>/number</b> — Obtiene un número aleatorio\n' +
      '<b>/countries</b> — Explora países disponibles\n' +
      '<b>/lang [código]</b> — Cambia de idioma (ej. <code>/lang es</code>)',

    about_title: 'ℹ️ Acerca de {botName}',
    about_body:
      '<b>Versión:</b> <code>{version}</code>\n' +
      '<b>Plataforma:</b> Telegram Serverless\n' +
      '<b>Creador:</b> <b>{creator}</b>\n<a href="{creatorLink}">📢 {creator}</a>',

    lang_title: '🌐 Seleccionar Idioma / Choose Language',
    lang_desc: 'Elige tu idioma preferido:',
    lang_changed: '✅ ¡Idioma cambiado a {flag} <b>{name}</b>!',

    loading_countries: '<b>🌍 Cargando países disponibles...</b>',
    no_countries: '<b>😔 No hay países disponibles en este momento.</b>',
    countries_header:
      '<b>🌍 Países Disponibles</b>\n\nSe encontraron <b>{total}</b> países activos.\n\n<b>📄 Página {page} de {totalPages}</b>',
    numbers_header:
      '{flag} <b>{country} — Números</b>\n\n<b>{total}</b> números activos.\n\n<b>📄 Página {page} de {totalPages}</b>',
    no_numbers_for_country: '{flag} <b>{country}</b>: sin números disponibles.',
    numbers_expired: '⚠️ Los números ya no están disponibles.',

    getting_number_init: '<b>🔍 Buscando un número para ti...</b>',
    getting_number_fetching: '<b>🔍 Obteniendo países activos...</b>',
    getting_number_testing: '<b>🔍 Probando número en {country}...</b>',
    number_found_title: '✅ ¡Número Activo Encontrado!',
    number_found_body:
      '{flag} <b>Número:</b> <code>+{phone}</code>\n' +
      '<b>📍 País:</b> {country}\n' +
      '<b>🕐 Actualizado:</b> {lastUpdate}',
    no_active_number_found: '😔 No hay números disponibles ahora. Reintenta en breve.',

    number_selected_title: '✅ ¡Número Seleccionado!',
    number_selected_body:
      '{flag} <b>Número:</b> <code>+{phone}</code>\n' +
      '<b>📍 País:</b> {country}\n' +
      '<b>📬 Mensajes:</b> {inboxCount}',
    number_inactive: '⚠️ Este número ya no está activo.',

    inbox_fetching: '📬 Cargando mensajes SMS recibidos...',
    inbox_empty: '📭 No hay mensajes todavía. Esperando SMS...',
    inbox_msg_header: '<b>📩 Mensaje SMS #{num}</b>\n<b>🕒 Hora:</b> {time}',

    unknown_fallback: '¡Hola {user}! Soy un bot de números virtuales. Usa el menú.',

    btn_get_number: '📱 Obtener Número',
    btn_countries: '🌍 Elegir País',
    btn_language: '🌐 Idioma',
    btn_help: '❓ Ayuda',
    btn_about: 'ℹ️ Acerca de',
    btn_creator: '👤 Creador',
    btn_inbox: '📥 Ver SMS',
    btn_renew: '🔄 Cambiar Número',
    btn_check_profile: '🔍 Ver Perfil TG',
    btn_menu: '« Menú',
    btn_prev: '« Anterior',
    btn_next: 'Siguiente »',
    btn_join_channel: '📢 Unirse al Canal',
    btn_ive_joined: '✅ Ya me uní',
    btn_retry_country: '🔄 Reintentar {country}',
    btn_random: '🎲 Número Aleatorio',
    verified_welcome: '✅ ¡Verificado con éxito!',
    not_joined_alert: '❌ ¡Aún no te has unido al canal!',
  },

  ar: {
    welcome_title: '⁀➴ أهلاً {user}!',
    welcome_desc:
      'مرحباً بك في <b>{botName}</b> ✨\n\n' +
      'احصل على <b>أرقام هواتف وهمية مجانية</b> واستقبل رسائل التفعيل (OTP) في الوقت الفعلي عبر تيليجرام.\n\n' +
      '<b>الأوامر السريعة:</b>\n' +
      '├ /number — طلب رقم عشوائي نشط\n' +
      '├ /countries — تصفح قائمة الدول\n' +
      '├ /lang — تغيير اللغة\n' +
      '├ /help — دليل الاستخدام\n' +
      '├ /about — معلومات عن البوت\n' +
      '└ /start — القائمة الرئيسية',

    force_join:
      '<b>⚠️ يجب الاشتراك بالقناة</b>\n\n' +
      'أهلاً {user}، يرجى الانضمام لقناتنا أولاً للوصول إلى خدمات البوت.\n\n' +
      '📢 <b><a href="{channelLink}">{channelName}</a></b>',

    help_title: '❓ كيفية استخدام {botName}',
    help_body:
      'يوفر هذا البوت أرقاماً وهمية مجانية لاستقبال الرسائل.\n\n' +
      '<b>/number</b> — جلب رقم شغال فوراً\n' +
      '<b>/countries</b> — تصفح أرقام الدول\n' +
      '<b>/lang [رمز]</b> — تغيير اللغة (مثال: <code>/lang ar</code>)',

    about_title: 'ℹ️ معلومات عن {botName}',
    about_body:
      '<b>الإصدار:</b> <code>{version}</code>\n' +
      '<b>النظام:</b> Telegram Serverless (V8 Isolate)\n' +
      '<b>المطور:</b> <b>{creator}</b>\n<a href="{creatorLink}">📢 {creator}</a>',

    lang_title: '🌐 اختيار اللغة / Select Language',
    lang_desc: 'اختر لغتك المفضلة من القائمة أدناه:',
    lang_changed: '✅ تم تغيير اللغة إلى {flag} <b>{name}</b>!',

    loading_countries: '<b>🌍 جاري تحميل الدول المتاحة...</b>',
    no_countries: '<b>😔 لا توجد دول متاحة حالياً.</b>',
    countries_header:
      '<b>🌍 الدول المتاحة</b>\n\nتم العثور على <b>{total}</b> دولة بها أرقام نشطة.\n\n<b>📄 صفحة {page} من {totalPages}</b>',
    numbers_header:
      '{flag} <b>{country} — الأرقام</b>\n\nيوجد <b>{total}</b> رقم نشط.\n\n<b>📄 صفحة {page} من {totalPages}</b>',
    no_numbers_for_country: '{flag} <b>{country}</b>: لا توجد أرقام متاحة الآن.',
    numbers_expired: '⚠️ هذه الأرقام لم تعد متاحة.',

    getting_number_init: '<b>🔍 جاري البحث عن رقم نشط...</b>',
    getting_number_fetching: '<b>🔍 جاري فحص الدول المتاحة...</b>',
    getting_number_testing: '<b>🔍 جاري اختبار الأرقام في {country}...</b>',
    number_found_title: '✅ تم العثور على رقم نشط!',
    number_found_body:
      '{flag} <b>الرقم:</b> <code>+{phone}</code>\n' +
      '<b>📍 الدولة:</b> {country}\n' +
      '<b>🕐 آخر تحديث:</b> {lastUpdate}',
    no_active_number_found: '😔 لا توجد أرقام نشطة حالياً. يرجى المحاولة بعد دقيقة.',

    number_selected_title: '✅ تم اختيار الرقم!',
    number_selected_body:
      '{flag} <b>الرقم:</b> <code>+{phone}</code>\n' +
      '<b>📍 الدولة:</b> {country}\n' +
      '<b>📬 الرسائل في الصندوق:</b> {inboxCount}',
    number_inactive: '⚠️ هذا الرقم لم يعد نشطاً.',

    inbox_fetching: '📬 جاري جلب أحدث رسائل SMS...',
    inbox_empty: '📭 لا توجد رسائل حالياً. بانتظار الكود القادم...',
    inbox_msg_header: '<b>📩 رسالة SMS رقم #{num}</b>\n<b>🕒 الوقت:</b> {time}',

    unknown_fallback: 'أهلاً {user}! أنا بوت أرقام وهمية. يرجى استخدام القائمة.',

    btn_get_number: '📱 طلب رقم عشوائي',
    btn_countries: '🌍 اختيار دولة',
    btn_language: '🌐 تغيير اللغة',
    btn_help: '❓ المساعدة',
    btn_about: 'ℹ️ عن البوت',
    btn_creator: '👤 المطور',
    btn_inbox: '📥 صندوق الرسائل',
    btn_renew: '🔄 رقم جديد',
    btn_check_profile: '🔍 فحص حساب تيليجرام',
    btn_menu: '« القائمة',
    btn_prev: '« السابق',
    btn_next: 'التالي »',
    btn_join_channel: '📢 انضم للقناة',
    btn_ive_joined: '✅ لقد انضممت',
    btn_retry_country: '🔄 إعادة محاولة {country}',
    btn_random: '🎲 رقم عشوائي',
    verified_welcome: '✅ تم التحقق بنجاح! أهلاً بك!',
    not_joined_alert: '❌ لم تقم بالانضمام للقناة بعد!',
  },

  fr: {
    welcome_title: '⁀➴ Bonjour {user}!',
    welcome_desc:
      'Bienvenue sur <b>{botName}</b> ✨\n\n' +
      'Obtenez des <b>numéros virtuels gratuits</b> et consultez les SMS reçus en temps réel dans Telegram.\n\n' +
      '<b>Commandes rapides:</b>\n' +
      '├ /number — Obtenir un numéro actif\n' +
      '├ /countries — Parcourir les pays\n' +
      '├ /lang — Changer de langue\n' +
      '├ /help — Guide d\'utilisation\n' +
      '├ /about — À propos\n' +
      '└ /start — Menu principal',

    force_join:
      '<b>⚠️ Accès Requis</b>\n\n' +
      'Bonjour {user}, veuillez rejoindre notre canal pour utiliser le bot.\n\n' +
      '📢 <b><a href="{channelLink}">{channelName}</a></b>',

    help_title: '❓ Comment utiliser {botName}',
    help_body:
      'Ce bot fournit des numéros virtuels publics gratuits et leur boîte SMS.\n\n' +
      '<b>/number</b> — Numéro aléatoire actif\n' +
      '<b>/countries</b> — Catalogue des pays\n' +
      '<b>/lang [code]</b> — Changer la langue (ex: <code>/lang fr</code>)',

    about_title: 'ℹ️ À propos de {botName}',
    about_body:
      '<b>Version:</b> <code>{version}</code>\n' +
      '<b>Plateforme:</b> Telegram Serverless (V8 Isolate)\n' +
      '<b>Développeur:</b> <b>{creator}</b>\n<a href="{creatorLink}">📢 {creator}</a>',

    lang_title: '🌐 Choisissez votre langue / Select Language',
    lang_desc: 'Sélectionnez votre langue dans la liste ci-dessous :',
    lang_changed: '✅ Langue changée avec succès en {flag} <b>{name}</b> !',

    loading_countries: '<b>🌍 Chargement des pays disponibles...</b>',
    no_countries: '<b>😔 Aucun pays disponible pour le moment.</b>',
    countries_header:
      '<b>🌍 Pays Disponibles</b>\n\n<b>{total}</b> pays actifs trouvés.\n\n<b>📄 Page {page} sur {totalPages}</b>',
    numbers_header:
      '{flag} <b>{country} — Numéros</b>\n\n<b>{total}</b> numéros actifs.\n\n<b>📄 Page {page} sur {totalPages}</b>',
    no_numbers_for_country: '{flag} <b>{country}</b> : aucun numéro disponible.',
    numbers_expired: '⚠️ Ces numéros ne sont plus disponibles.',

    getting_number_init: '<b>🔍 Recherche d\'un numéro pour vous...</b>',
    getting_number_fetching: '<b>🔍 Récupération des pays actifs...</b>',
    getting_number_testing: '<b>🔍 Test d\'un numéro pour {country}...</b>',
    number_found_title: '✅ Numéro Actif Trouvé !',
    number_found_body:
      '{flag} <b>Numéro:</b> <code>+{phone}</code>\n' +
      '<b>📍 Pays:</b> {country}\n' +
      '<b>🕐 Mis à jour:</b> {lastUpdate}',
    no_active_number_found: '😔 Aucun numéro actif disponible. Réessayez dans 1 minute.',

    number_selected_title: '✅ Numéro Sélectionné !',
    number_selected_body:
      '{flag} <b>Numéro:</b> <code>+{phone}</code>\n' +
      '<b>📍 Pays:</b> {country}\n' +
      '<b>📬 Messages:</b> {inboxCount}',
    number_inactive: '⚠️ Ce numéro n\'est plus actif.',

    inbox_fetching: '📬 Récupération des SMS en cours...',
    inbox_empty: '📭 Aucun message pour le moment. En attente du SMS...',
    inbox_msg_header: '<b>📩 SMS #{num}</b>\n<b>🕒 Heure:</b> {time}',

    unknown_fallback: 'Bonjour {user} ! Je suis un bot de numéros virtuels. Utilisez le menu.',

    btn_get_number: '📱 Obtenir un numéro',
    btn_countries: '🌍 Choisir un pays',
    btn_language: '🌐 Langue',
    btn_help: '❓ Aide',
    btn_about: 'ℹ️ À propos',
    btn_creator: '👤 Créateur',
    btn_inbox: '📥 Voir la boîte SMS',
    btn_renew: '🔄 Changer de numéro',
    btn_check_profile: '🔍 Vérifier profil TG',
    btn_menu: '« Menu',
    btn_prev: '« Précédent',
    btn_next: 'Suivant »',
    btn_join_channel: '📢 Rejoindre le Canal',
    btn_ive_joined: '✅ J\'ai rejoint',
    btn_retry_country: '🔄 Réessayer {country}',
    btn_random: '🎲 Numéro Aléatoire',
    verified_welcome: '✅ Vérifié avec succès ! Bienvenue !',
    not_joined_alert: '❌ Vous n\'avez pas encore rejoint le canal !',
  },

  de: {
    welcome_title: '⁀➴ Hallo {user}!',
    welcome_desc:
      'Willkommen bei <b>{botName}</b> ✨\n\n' +
      'Erhalte <b>kostenlose virtuelle Telefonnummern</b> und sieh eingehende SMS-Nachrichten live in Telegram ein.\n\n' +
      '<b>Schnellstart:</b>\n' +
      '├ /number — Aktive Zufallsnummer anfordern\n' +
      '├ /countries — Länderübersicht durchsuchen\n' +
      '├ /lang — Sprache ändern\n' +
      '├ /help — Anleitung anzeigen\n' +
      '├ /about — Bot-Informationen\n' +
      '└ /start — Hauptmenü',

    force_join:
      '<b>⚠️ Kanalbeitritt Erforderlich</b>\n\n' +
      'Hallo {user}, bitte trete unserem Kanal bei, um den Bot zu nutzen.\n\n' +
      '📢 <b><a href="{channelLink}">{channelName}</a></b>',

    help_title: '❓ Anleitung für {botName}',
    help_body:
      'Dieser Bot stellt kostenlose virtuelle Telefonnummern und SMS-Posteingänge bereit.\n\n' +
      '<b>/number</b> — Erhalte eine aktive Nummer\n' +
      '<b>/countries</b> — Durchsuche Länder nach Nummern\n' +
      '<b>/lang [code]</b> — Sprache ändern (z. B. <code>/lang de</code>)',

    about_title: 'ℹ️ Über {botName}',
    about_body:
      '<b>Version:</b> <code>{version}</code>\n' +
      '<b>Plattform:</b> Telegram Serverless (V8 Isolate)\n' +
      '<b>Entwickler:</b> <b>{creator}</b>\n<a href="{creatorLink}">📢 {creator}</a>',

    lang_title: '🌐 Sprache wählen / Select Language',
    lang_desc: 'Wähle deine bevorzugte Sprache aus der Liste:',
    lang_changed: '✅ Sprache erfolgreich auf {flag} <b>{name}</b> geändert!',

    loading_countries: '<b>🌍 Verfügbare Länder werden geladen...</b>',
    no_countries: '<b>😔 Zurzeit sind keine Länder verfügbar.</b>',
    countries_header:
      '<b>🌍 Verfügbare Länder</b>\n\n<b>{total}</b> aktive Länder gefunden.\n\n<b>📄 Seite {page} von {totalPages}</b>',
    numbers_header:
      '{flag} <b>{country} — Nummern</b>\n\n<b>{total}</b> aktive Nummern.\n\n<b>📄 Seite {page} von {totalPages}</b>',
    no_numbers_for_country: '{flag} <b>{country}</b>: Keine Nummern verfügbar.',
    numbers_expired: '⚠️ Diese Nummern sind nicht mehr verfügbar.',

    getting_number_init: '<b>🔍 Suche nach einer Nummer für dich...</b>',
    getting_number_fetching: '<b>🔍 Verfügbare Länder werden abgerufen...</b>',
    getting_number_testing: '<b>🔍 Teste Nummer in {country}...</b>',
    number_found_title: '✅ Aktive Nummer gefunden!',
    number_found_body:
      '{flag} <b>Nummer:</b> <code>+{phone}</code>\n' +
      '<b>📍 Land:</b> {country}\n' +
      '<b>🕐 Aktualisiert:</b> {lastUpdate}',
    no_active_number_found: '😔 Keine aktive Nummer gefunden. Bitte in 1 Minute erneut versuchen.',

    number_selected_title: '✅ Nummer ausgewählt!',
    number_selected_body:
      '{flag} <b>Nummer:</b> <code>+{phone}</code>\n' +
      '<b>📍 Land:</b> {country}\n' +
      '<b>📬 Posteingang:</b> {inboxCount} Nachrichten',
    number_inactive: '⚠️ Diese Nummer ist nicht mehr aktiv.',

    inbox_fetching: '📬 Lade die neuesten SMS-Nachrichten...',
    inbox_empty: '📭 Noch keine Nachrichten eingetroffen. Warte auf SMS...',
    inbox_msg_header: '<b>📩 SMS #{num}</b>\n<b>🕒 Zeit:</b> {time}',

    unknown_fallback: 'Hallo {user}! Ich bin ein Bot für virtuelle Nummern. Bitte nutze das Menü.',

    btn_get_number: '📱 Nummer anfordern',
    btn_countries: '🌍 Land auswählen',
    btn_language: '🌐 Sprache',
    btn_help: '❓ Hilfe',
    btn_about: 'ℹ️ Über',
    btn_creator: '👤 Entwickler',
    btn_inbox: '📥 SMS-Posteingang',
    btn_renew: '🔄 Neue Nummer',
    btn_check_profile: '🔍 TG-Profil prüfen',
    btn_menu: '« Menü',
    btn_prev: '« Zurück',
    btn_next: 'Weiter »',
    btn_join_channel: '📢 Kanal beitreten',
    btn_ive_joined: '✅ Ich bin beigetreten',
    btn_retry_country: '🔄 Erneut versuchen: {country}',
    btn_random: '🎲 Zufallsnummer',
    verified_welcome: '✅ Erfolgreich verifiziert! Willkommen!',
    not_joined_alert: '❌ Du bist dem Kanal noch nicht beigetreten!',
  },
};

/**
 * Translate a key for a given language code with optional parameter interpolation.
 */
export function t(lang, key, params = {}) {
  const norm = normalizeLang(lang);
  const dict = TRANSLATIONS[norm] || TRANSLATIONS.en;
  let text = dict[key] || TRANSLATIONS.en[key] || key;

  for (const [k, v] of Object.entries(params)) {
    text = text.replaceAll(`{${k}}`, String(v ?? ''));
  }
  return text;
}
