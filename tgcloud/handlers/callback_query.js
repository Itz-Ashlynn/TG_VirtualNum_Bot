import { api, BotApiError } from 'sdk';
import { t, SUPPORTED_LANGUAGES } from '../lib/i18n.js';
import { getOrInitUser, updateUserLang, recordUserQuery } from '../lib/db.js';
import {
  BOT_CONFIG,
  buildStartKeyboard,
  buildBackKeyboard,
  buildLanguageKeyboard,
  buildCountriesKeyboard,
  buildNumbersKeyboard,
  buildNumberKeyboard,
} from '../lib/keyboards.js';
import {
  escapeHtml,
  userMention,
  formatCountryName,
  formatPhone,
  getFlag,
  getFlagForCountry,
} from '../lib/formatters.js';
import {
  getOnlineCountries,
  getCountryNumbers,
  getNumberInbox,
} from '../lib/onlinesim.js';
import { fetchAndSendRandomNumber } from './message.js';

async function isChannelMember(userId) {
  try {
    const res = await api.getChatMember({
      chat_id: `@${BOT_CONFIG.forceJoinChannel}`,
      user_id: userId,
    });
    const status = res?.status;
    return ['member', 'administrator', 'creator'].includes(status);
  } catch {
    return true;
  }
}

async function safeAnswerCallback(callbackId, text = '', showAlert = false) {
  try {
    await api.answerCallbackQuery({
      callback_query_id: callbackId,
      text,
      show_alert: showAlert,
    });
  } catch {}
}

export default async function (callbackQuery, ctx) {
  if (!callbackQuery || !callbackQuery.message) return;

  const data = callbackQuery.data || '';
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const callbackId = callbackQuery.id;
  const user = callbackQuery.from;

  try {
    // Fetch or initialize user & current language
    const dbUser = await getOrInitUser(user);
    let lang = dbUser?.lang || 'en';

    // 1. No-op (e.g. page indicator buttons)
    if (data === 'noop') {
      await safeAnswerCallback(callbackId);
      return;
    }

    // 2. Channel Join Check
    if (data === 'check_join') {
      const isMember = await isChannelMember(user.id);
      if (isMember) {
        await safeAnswerCallback(callbackId, t(lang, 'verified_welcome'), false);

        const welcome =
          `<b>${t(lang, 'welcome_title', { user: userMention(user) })}</b>\n\n` +
          t(lang, 'welcome_desc', { botName: escapeHtml(BOT_CONFIG.name) });

        await api.editMessageText({
          chat_id: chatId,
          message_id: messageId,
          text: welcome,
          parse_mode: 'HTML',
          link_preview_options: { is_disabled: true },
          reply_markup: buildStartKeyboard(lang),
        });
      } else {
        await safeAnswerCallback(callbackId, t(lang, 'not_joined_alert'), true);
      }
      return;
    }

    // 3. Language Menu
    if (data === 'lang_menu') {
      await safeAnswerCallback(callbackId);

      const text =
        `<b>${t(lang, 'lang_title')}</b>\n\n` + t(lang, 'lang_desc');

      await api.editMessageText({
        chat_id: chatId,
        message_id: messageId,
        text,
        parse_mode: 'HTML',
        reply_markup: buildLanguageKeyboard(lang),
      });
      return;
    }

    // 4. Set Language Callback
    if (data.startsWith('set_lang_')) {
      const newLang = data.replace('set_lang_', '').trim();
      if (SUPPORTED_LANGUAGES[newLang]) {
        await updateUserLang(user.id, newLang);
        lang = newLang;

        const info = SUPPORTED_LANGUAGES[newLang];
        const confirmation = t(newLang, 'lang_changed', {
          flag: info.flag,
          name: info.name,
        });

        await safeAnswerCallback(callbackId, `${info.flag} ${info.name}`, false);

        const welcome =
          `<b>${confirmation}</b>\n\n` +
          `<b>${t(lang, 'welcome_title', { user: userMention(user) })}</b>\n\n` +
          t(lang, 'welcome_desc', { botName: escapeHtml(BOT_CONFIG.name) });

        await api.editMessageText({
          chat_id: chatId,
          message_id: messageId,
          text: welcome,
          parse_mode: 'HTML',
          link_preview_options: { is_disabled: true },
          reply_markup: buildStartKeyboard(lang),
        });
      }
      return;
    }

    // 5. Check Membership gate for all subsequent actions
    const isMember = await isChannelMember(user.id);
    if (!isMember) {
      await safeAnswerCallback(callbackId, t(lang, 'not_joined_alert'), true);
      return;
    }

    // 6. Show Help
    if (data === 'show_help') {
      await safeAnswerCallback(callbackId);

      const text =
        `<b>${t(lang, 'help_title', { botName: escapeHtml(BOT_CONFIG.name) })}</b>\n\n` +
        t(lang, 'help_body');

      await api.editMessageText({
        chat_id: chatId,
        message_id: messageId,
        text,
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true },
        reply_markup: buildBackKeyboard(lang),
      });
      return;
    }

    // 7. Show About
    if (data === 'show_about') {
      await safeAnswerCallback(callbackId);

      const text =
        `<b>${t(lang, 'about_title', { botName: escapeHtml(BOT_CONFIG.name) })}</b>\n\n` +
        t(lang, 'about_body', {
          version: BOT_CONFIG.version,
          creator: escapeHtml(BOT_CONFIG.creator),
          creatorLink: BOT_CONFIG.creatorLink,
        });

      await api.editMessageText({
        chat_id: chatId,
        message_id: messageId,
        text,
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true },
        reply_markup: buildBackKeyboard(lang),
      });
      return;
    }

    // 8. Back to Main Menu
    if (data === 'back_to_main') {
      await safeAnswerCallback(callbackId);

      const welcome =
        `<b>${t(lang, 'welcome_title', { user: userMention(user) })}</b>\n\n` +
        t(lang, 'welcome_desc', { botName: escapeHtml(BOT_CONFIG.name) });

      await api.editMessageText({
        chat_id: chatId,
        message_id: messageId,
        text: welcome,
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true },
        reply_markup: buildStartKeyboard(lang),
      });
      return;
    }

    // 9. Get Random Number / Renew
    if (data === 'get_number' || data === 'new_phone_number') {
      await safeAnswerCallback(callbackId, '📱 Searching active pool...');

      await api.editMessageText({
        chat_id: chatId,
        message_id: messageId,
        text: t(lang, 'getting_number_init'),
        parse_mode: 'HTML',
      });

      await fetchAndSendRandomNumber(chatId, messageId, lang);
      return;
    }

    // 10. Paginated Countries List
    if (data.startsWith('countries_')) {
      const page = parseInt(data.split('_')[1], 10) || 0;
      await safeAnswerCallback(callbackId);

      const countries = await getOnlineCountries();
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

      countries.sort((a, b) => a.name.localeCompare(b.name));
      const totalPages = Math.ceil(
        countries.length / BOT_CONFIG.countriesPerPage
      );
      const safePage = Math.min(page, totalPages - 1);

      await api.editMessageText({
        chat_id: chatId,
        message_id: messageId,
        text: t(lang, 'countries_header', {
          total: countries.length,
          page: safePage + 1,
          totalPages,
        }),
        parse_mode: 'HTML',
        reply_markup: buildCountriesKeyboard(lang, countries, safePage),
      });
      return;
    }

    // 11. Choose Specific Country
    if (data.startsWith('country&')) {
      const country = data.split('&')[1];
      if (!country) return;

      await safeAnswerCallback(callbackId);

      const countryName = formatCountryName(country);
      const flag = getFlagForCountry(country);

      const numbers = await getCountryNumbers(country, lang);

      if (!numbers || numbers.length === 0) {
        await api.editMessageText({
          chat_id: chatId,
          message_id: messageId,
          text: t(lang, 'no_numbers_for_country', {
            flag,
            country: escapeHtml(countryName),
          }),
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: t(lang, 'btn_countries'),
                  callback_data: 'countries_0',
                  style: 'primary',
                },
                {
                  text: t(lang, 'btn_menu'),
                  callback_data: 'back_to_main',
                },
              ],
            ],
          },
        });
        return;
      }

      const totalPages = Math.ceil(
        numbers.length / BOT_CONFIG.numbersPerPage
      );

      await api.editMessageText({
        chat_id: chatId,
        message_id: messageId,
        text: t(lang, 'numbers_header', {
          flag,
          country: escapeHtml(countryName),
          total: numbers.length,
          plural: numbers.length !== 1 ? 's' : '',
          page: 1,
          totalPages,
        }),
        parse_mode: 'HTML',
        reply_markup: buildNumbersKeyboard(lang, country, numbers, 0),
      });
      return;
    }

    // 12. Numbers Pagination
    if (data.startsWith('nums&')) {
      const parts = data.split('&');
      const country = parts[1];
      const page = parseInt(parts[2], 10) || 0;

      await safeAnswerCallback(callbackId);

      const countryName = formatCountryName(country);
      const flag = getFlagForCountry(country);
      const numbers = await getCountryNumbers(country, lang);

      if (!numbers || numbers.length === 0) {
        await api.editMessageText({
          chat_id: chatId,
          message_id: messageId,
          text: t(lang, 'numbers_expired', {
            flag,
            country: escapeHtml(countryName),
          }),
          parse_mode: 'HTML',
          reply_markup: buildBackKeyboard(lang),
        });
        return;
      }

      const totalPages = Math.ceil(
        numbers.length / BOT_CONFIG.numbersPerPage
      );
      const safePage = Math.min(page, totalPages - 1);

      await api.editMessageText({
        chat_id: chatId,
        message_id: messageId,
        text: t(lang, 'numbers_header', {
          flag,
          country: escapeHtml(countryName),
          total: numbers.length,
          plural: numbers.length !== 1 ? 's' : '',
          page: safePage + 1,
          totalPages,
        }),
        parse_mode: 'HTML',
        reply_markup: buildNumbersKeyboard(lang, country, numbers, safePage),
      });
      return;
    }

    // 13. Pick Specific Number
    if (data.startsWith('pick&')) {
      const parts = data.split('&');
      const country = parts[1];
      const number = parts[2];

      const countryName = formatCountryName(country);
      const flag = getFlag(number) || getFlagForCountry(country);
      const formatted = formatPhone(number);

      await safeAnswerCallback(callbackId, `📱 ${formatted}`);

      const inbox = await getNumberInbox(country, number, lang);

      if (inbox !== false) {
        // Record query in DB
        await recordUserQuery(user.id, country, number);

        const body =
          `<b>${t(lang, 'number_selected_title')}</b>\n\n` +
          t(lang, 'number_selected_body', {
            flag,
            phone: escapeHtml(number),
            country: escapeHtml(countryName),
            inboxCount: inbox.length,
          });

        await api.editMessageText({
          chat_id: chatId,
          message_id: messageId,
          text: body,
          parse_mode: 'HTML',
          reply_markup: buildNumberKeyboard(lang, country, number),
        });
      } else {
        await api.editMessageText({
          chat_id: chatId,
          message_id: messageId,
          text: t(lang, 'number_inactive', {
            flag,
            country: escapeHtml(countryName),
            phone: escapeHtml(number),
          }),
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: t(lang, 'btn_retry_country', {
                    country: escapeHtml(countryName),
                  }),
                  callback_data: `country&${country}`,
                  style: 'primary',
                },
              ],
              [
                {
                  text: t(lang, 'btn_countries'),
                  callback_data: 'countries_0',
                },
                {
                  text: t(lang, 'btn_menu'),
                  callback_data: 'back_to_main',
                },
              ],
            ],
          },
        });
      }
      return;
    }

    // 14. Check SMS Inbox
    if (data.startsWith('msg&')) {
      const parts = data.split('&');
      const country = parts[1];
      const number = parts[2];

      await safeAnswerCallback(callbackId, t(lang, 'inbox_fetching'));

      const messages = await getNumberInbox(country, number, lang);

      if (!messages || messages.length === 0) {
        await safeAnswerCallback(callbackId, t(lang, 'inbox_empty'), true);
        return;
      }

      const lastFive = messages.slice(0, 5);
      for (let idx = 0; idx < lastFive.length; idx++) {
        const msg = lastFive[idx];
        const cleanText = msg.text
          ? msg.text.split('received from OnlineSIM.io')[0].trim()
          : '—';

        const header = t(lang, 'inbox_msg_header', {
          num: idx + 1,
          time: escapeHtml(msg.time || 'Recent'),
        });

        const formattedMsg = `${header}\n\n<blockquote expandable>${escapeHtml(cleanText)}</blockquote>`;

        await api.sendMessage({
          chat_id: chatId,
          text: formattedMsg,
          parse_mode: 'HTML',
          reply_to_message_id: messageId,
        });
      }
      return;
    }

    await safeAnswerCallback(callbackId);
  } catch (err) {
    if (err instanceof BotApiError) {
      console.warn(`BotApiError in callback handler [${err.code}]:`, err.description);
    } else {
      console.error('CallbackQuery handler unexpected error:', err);
    }
  }
}
