import { t, SUPPORTED_LANGUAGES } from './i18n.js';
import {
  getFlagForCountry,
  formatCountryName,
  formatPhone,
} from './formatters.js';

export const BOT_CONFIG = {
  name: 'Elite Virtual Number Bot',
  version: '3.0 (Telegram Serverless Edition)',
  creator: 'Ashlynn Repository',
  creatorLink: 'https://t.me/Ashlynn_Repository',
  forceJoinChannel: 'Ashlynn_Repository',
  forceJoinLink: 'https://t.me/Ashlynn_Repository',
  countriesPerPage: 12,
  numbersPerPage: 8,
};

export function buildForceJoinKeyboard(lang = 'en') {
  return {
    inline_keyboard: [
      [
        {
          text: t(lang, 'btn_join_channel'),
          url: BOT_CONFIG.forceJoinLink,
          style: 'success',
        },
      ],
      [
        {
          text: t(lang, 'btn_ive_joined'),
          callback_data: 'check_join',
          style: 'primary',
        },
      ],
    ],
  };
}

export function buildStartKeyboard(lang = 'en') {
  return {
    inline_keyboard: [
      [
        {
          text: t(lang, 'btn_get_number'),
          callback_data: 'get_number',
          style: 'success',
        },
      ],
      [
        {
          text: t(lang, 'btn_countries'),
          callback_data: 'countries_0',
          style: 'primary',
        },
        {
          text: t(lang, 'btn_language'),
          callback_data: 'lang_menu',
        },
      ],
      [
        {
          text: t(lang, 'btn_help'),
          callback_data: 'show_help',
        },
        {
          text: t(lang, 'btn_about'),
          callback_data: 'show_about',
        },
      ],
      [
        {
          text: `📢 ${BOT_CONFIG.creator}`,
          url: BOT_CONFIG.creatorLink,
        },
      ],
    ],
  };
}

export function buildNumberKeyboard(lang, country, number) {
  return {
    inline_keyboard: [
      [
        {
          text: t(lang, 'btn_inbox'),
          callback_data: `msg&${country}&${number}`,
          style: 'success',
        },
        {
          text: t(lang, 'btn_renew'),
          callback_data: 'new_phone_number',
          style: 'danger',
        },
      ],
      [
        {
          text: t(lang, 'btn_check_profile'),
          url: `tg://resolve?phone=+${number}`,
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
  };
}

export function buildLanguageKeyboard(currentLang = 'en') {
  const rows = [];
  const entries = Object.values(SUPPORTED_LANGUAGES);

  for (let i = 0; i < entries.length; i += 2) {
    const row = [];
    for (let j = i; j < Math.min(i + 2, entries.length); j++) {
      const item = entries[j];
      const isSelected = item.code === currentLang;
      const label = isSelected
        ? `✅ ${item.flag} ${item.name}`
        : `${item.flag} ${item.name}`;

      const btn = {
        text: label,
        callback_data: `set_lang_${item.code}`,
      };
      if (isSelected) {
        btn.style = 'primary';
      }
      row.push(btn);
    }
    rows.push(row);
  }

  rows.push([
    {
      text: t(currentLang, 'btn_menu'),
      callback_data: 'back_to_main',
    },
  ]);

  return { inline_keyboard: rows };
}

export function buildCountriesKeyboard(lang, countries, page = 0) {
  const perPage = BOT_CONFIG.countriesPerPage;
  const totalPages = Math.ceil(countries.length / perPage) || 1;
  const start = page * perPage;
  const pageCountries = countries.slice(start, start + perPage);

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

  // Navigation row
  const navRow = [];
  if (page > 0) {
    navRow.push({
      text: t(lang, 'btn_prev'),
      callback_data: `countries_${page - 1}`,
    });
  }
  navRow.push({
    text: `📄 ${page + 1}/${totalPages}`,
    callback_data: 'noop',
  });
  if (page < totalPages - 1) {
    navRow.push({
      text: t(lang, 'btn_next'),
      callback_data: `countries_${page + 1}`,
    });
  }
  rows.push(navRow);

  // Footer row
  rows.push([
    {
      text: t(lang, 'btn_random'),
      callback_data: 'get_number',
      style: 'success',
    },
    {
      text: t(lang, 'btn_menu'),
      callback_data: 'back_to_main',
    },
  ]);

  return { inline_keyboard: rows };
}

export function buildNumbersKeyboard(lang, country, numbers, page = 0) {
  const perPage = BOT_CONFIG.numbersPerPage;
  const totalPages = Math.ceil(numbers.length / perPage) || 1;
  const start = page * perPage;
  const pageNumbers = numbers.slice(start, start + perPage);

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
        text: t(lang, 'btn_prev'),
        callback_data: `nums&${country}&${page - 1}`,
      });
    }
    navRow.push({
      text: `📄 ${page + 1}/${totalPages}`,
      callback_data: 'noop',
    });
    if (page < totalPages - 1) {
      navRow.push({
        text: t(lang, 'btn_next'),
        callback_data: `nums&${country}&${page + 1}`,
      });
    }
    rows.push(navRow);
  }

  rows.push([
    {
      text: t(lang, 'btn_countries'),
      callback_data: 'countries_0',
    },
    {
      text: t(lang, 'btn_menu'),
      callback_data: 'back_to_main',
    },
  ]);

  return { inline_keyboard: rows };
}

export function buildBackKeyboard(lang = 'en') {
  return {
    inline_keyboard: [
      [
        {
          text: t(lang, 'btn_menu'),
          callback_data: 'back_to_main',
        },
      ],
    ],
  };
}
