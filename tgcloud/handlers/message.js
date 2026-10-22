import { api, BotApiError } from 'sdk';
import { t, normalizeLang, SUPPORTED_LANGUAGES } from '../lib/i18n.js';
import { getOrInitUser, updateUserLang } from '../lib/db.js';
import {
  BOT_CONFIG,
  buildStartKeyboard,
  buildForceJoinKeyboard,
  buildBackKeyboard,
  buildLanguageKeyboard,
  buildCountriesKeyboard,
  buildNumberKeyboard,
} from '../lib/keyboards.js';
import {
  escapeHtml,
  userMention,
  formatCountryName,
  formatPhone,
  getFlag,
  shuffle,
} from '../lib/formatters.js';
import {
  getOnlineCountries,
  getCountryNumbers,
  getNumberInbox,
} from '../lib/onlinesim.js';

async function safeChatAction(chatId) {
  try {
    await api.sendChatAction({ chat_id: chatId, action: 'typing' });
  } catch (err) {
    // Ignore chatAction failures (e.g. non-existent test chat or blocked)
  }
}

async function isChannelMember(userId) {
  try {
    const res = await api.getChatMember({
      chat_id: `@${BOT_CONFIG.forceJoinChannel}`,
      user_id: userId,
    });
    const status = res?.status;
    return ['member', 'administrator', 'creator'].includes(status);
  } catch {
    return true; // Fail open if channel admin permissions aren't set
  }
}

async function checkForceJoin(chatId, user, lang, replyToMsgId = null) {
  const isMember = await isChannelMember(user.id);
  if (isMember) return true;

  const text = t(lang, 'force_join', {
    user: userMention(user),
    channelLink: BOT_CONFIG.forceJoinLink,
    channelName: BOT_CONFIG.creator,
  });

  const opts = {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    link_preview_options: { is_disabled: true },
    reply_markup: buildForceJoinKeyboard(lang),
  };
  if (replyToMsgId) opts.reply_to_message_id = replyToMsgId;

  try {
    await api.sendMessage(opts);
  } catch (e) {
    console.warn('Failed to send force_join prompt:', e.message);
  }
  return false;
}

export default async function (message, ctx) {
  if (!message || !message.chat) return;

  const chatId = message.chat.id;
  const user = message.from;
  if (!user) return;

  try {
    // Fetch or initialize user and language preference
    const dbUser = await getOrInitUser(user);
    let lang = dbUser?.lang || 'en';

    const rawText = (message.text || '').trim();
    const tokens = rawText.split(/\s+/);
    const command = tokens[0]?.split('@')[0]?.toLowerCase();
    const arg = tokens[1]?.toLowerCase();

    // 1. /start or /restart
    if (command === '/start' || command === '/restart') {
      if (!(await checkForceJoin(chatId, user, lang, message.message_id))) return;

      await safeChatAction(chatId);

      const welcome =
        `<b>${t(lang, 'welcome_title', { user: userMention(user) })}</b>\n\n` +
        t(lang, 'welcome_desc', { botName: escapeHtml(BOT_CONFIG.name) });

      await api.sendMessage({
        chat_id: chatId,
        text: welcome,
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true },
        reply_to_message_id: message.message_id,
        reply_markup: buildStartKeyboard(lang),
      });
      return;
    }

    // 2. /lang or /language [code]
    if (command === '/lang' || command === '/language') {
      if (!(await checkForceJoin(chatId, user, lang, message.message_id))) return;

      if (arg) {
        const newLang = normalizeLang(arg);
        if (SUPPORTED_LANGUAGES[newLang]) {
          await updateUserLang(user.id, newLang);
          lang = newLang;

          const info = SUPPORTED_LANGUAGES[newLang];
          const confirmation = t(newLang, 'lang_changed', {
            flag: info.flag,
            name: info.name,
          });

          await api.sendMessage({
            chat_id: chatId,
            text: confirmation,
            parse_mode: 'HTML',
            reply_to_message_id: message.message_id,
            reply_markup: buildStartKeyboard(newLang),
          });
          return;
        }
      }

      // Show interactive language selector
      const langMsg =
        `<b>${t(lang, 'lang_title')}</b>\n\n` + t(lang, 'lang_desc');

      await api.sendMessage({
        chat_id: chatId,
        text: langMsg,
        parse_mode: 'HTML',
        reply_to_message_id: message.message_id,
        reply_markup: buildLanguageKeyboard(lang),
      });
      return;
    }

    // 3. /help or /usage
    if (command === '/help' || command === '/usage') {
      if (!(await checkForceJoin(chatId, user, lang, message.message_id))) return;

      await safeChatAction(chatId);

      const text =
        `<b>${t(lang, 'help_title', { botName: escapeHtml(BOT_CONFIG.name) })}</b>\n\n` +
        t(lang, 'help_body');

      await api.sendMessage({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true },
        reply_to_message_id: message.message_id,
        reply_markup: buildBackKeyboard(lang),
      });
      return;
    }

    // 4. /about
    if (command === '/about') {
      if (!(await checkForceJoin(chatId, user, lang, message.message_id))) return;

      await safeChatAction(chatId);

      const text =
        `<b>${t(lang, 'about_title', { botName: escapeHtml(BOT_CONFIG.name) })}</b>\n\n` +
        t(lang, 'about_body', {
          version: BOT_CONFIG.version,
          creator: escapeHtml(BOT_CONFIG.creator),
          creatorLink: BOT_CONFIG.creatorLink,
        });

      await api.sendMessage({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true },
        reply_to_message_id: message.message_id,
        reply_markup: buildBackKeyboard(lang),
      });
      return;
    }

    // 5. /countries
    if (command === '/countries') {
      if (!(await checkForceJoin(chatId, user, lang, message.message_id))) return;

      await safeChatAction(chatId);

      const loadingMsg = await api.sendMessage({
        chat_id: chatId,
        text: t(lang, 'loading_countries'),
        parse_mode: 'HTML',
        reply_to_message_id: message.message_id,
      });

      const countries = await getOnlineCountries();

      if (countries.length === 0) {
        await api.editMessageText({
          chat_id: chatId,
          message_id: loadingMsg.message_id,
          text: t(lang, 'no_countries'),
          parse_mode: 'HTML',
          reply_markup: buildBackKeyboard(lang),
        });
        return;
      }

      countries.sort((a, b) => a.name.localeCompare(b.name));
      const totalPages = Math.ceil(
        countries.length / BOT_CONFIG.countriesPerPage
      );

      await api.editMessageText({
        chat_id: chatId,
        message_id: loadingMsg.message_id,
        text: t(lang, 'countries_header', {
          total: countries.length,
          page: 1,
          totalPages,
        }),
        parse_mode: 'HTML',
        reply_markup: buildCountriesKeyboard(lang, countries, 0),
      });
      return;
    }

    // 6. /number or /phone
    if (command === '/number' || command === '/phone') {
      if (!(await checkForceJoin(chatId, user, lang, message.message_id))) return;

      await safeChatAction(chatId);

      const initMsg = await api.sendMessage({
        chat_id: chatId,
        text: t(lang, 'getting_number_init'),
        parse_mode: 'HTML',
        reply_to_message_id: message.message_id,
      });

      await fetchAndSendRandomNumber(chatId, initMsg.message_id, lang);
      return;
    }

    // 7. Non-command / unknown messages
    if (!(await checkForceJoin(chatId, user, lang, message.message_id))) return;

    let contentType = 'message';
    if (message.photo) contentType = 'photo';
    else if (message.video) contentType = 'video';
    else if (message.document) contentType = 'document';
    else if (message.sticker) contentType = 'sticker';
    else if (message.voice) contentType = 'voice message';
    else if (message.audio) contentType = 'audio';
    else if (message.animation) contentType = 'GIF';
    else if (message.text) contentType = 'text';

    const fallback = t(lang, 'unknown_fallback', {
      user: userMention(user),
      type: contentType,
    });

    await api.sendMessage({
      chat_id: chatId,
      text: fallback,
      parse_mode: 'HTML',
      reply_to_message_id: message.message_id,
      reply_markup: buildStartKeyboard(lang),
    });
  } catch (err) {
    if (err instanceof BotApiError) {
      console.warn(`BotApiError in message handler [${err.code}]:`, err.description);
    } else {
      console.error('Message handler unexpected error:', err);
    }
  }
}

/**
 * Searches and sends a verified active random number.
 */
export async function fetchAndSendRandomNumber(chatId, messageId, lang) {
  try {
    try {
      await api.editMessageText({
        chat_id: chatId,
        message_id: messageId,
        text: t(lang, 'getting_number_fetching'),
        parse_mode: 'HTML',
      });
    } catch {}

    const countries = shuffle(await getOnlineCountries());

    if (countries.length === 0) {
      await api.editMessageText({
        chat_id: chatId,
        message_id: messageId,
        text: t(lang, 'no_countries'),
        parse_mode: 'HTML',
        reply_markup: buildBackKeyboard(lang),
      });
      return;
    }

    // Try countries until an active number is found
    for (const country of countries.slice(0, 10)) {
      const numbers = await getCountryNumbers(country.name, lang);
      if (!numbers || numbers.length === 0) continue;

      const countryName = formatCountryName(country.name);

      for (const numObj of numbers.slice(0, 5)) {
        const flag = getFlag(numObj.fullNumber);
        const formatted = formatPhone(numObj.fullNumber);

        try {
          await api.editMessageText({
            chat_id: chatId,
            message_id: messageId,
            text: t(lang, 'getting_number_testing', {
              count: countries.length,
              country: escapeHtml(countryName),
              phone: escapeHtml(formatted),
            }),
            parse_mode: 'HTML',
          });
        } catch {}

        const inbox = await getNumberInbox(country.name, numObj.fullNumber, lang);
        if (inbox !== false) {
          const body =
            `<b>${t(lang, 'number_found_title')}</b>\n\n` +
            t(lang, 'number_found_body', {
              flag,
              phone: escapeHtml(numObj.fullNumber),
              country: escapeHtml(countryName),
              lastUpdate: escapeHtml(numObj.lastUpdate || 'Just now'),
            });

          await api.editMessageText({
            chat_id: chatId,
            message_id: messageId,
            text: body,
            parse_mode: 'HTML',
            reply_markup: buildNumberKeyboard(
              lang,
              country.name,
              numObj.fullNumber
            ),
          });
          return;
        }
      }
    }

    // Pool empty / none found
    await api.editMessageText({
      chat_id: chatId,
      message_id: messageId,
      text: t(lang, 'no_active_number_found'),
      parse_mode: 'HTML',
      reply_markup: buildBackKeyboard(lang),
    });
  } catch (err) {
    console.error('fetchAndSendRandomNumber error:', err);
  }
}
