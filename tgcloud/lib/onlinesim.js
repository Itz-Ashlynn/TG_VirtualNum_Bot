import { fetch } from 'sdk';

const ONLINESIM_BASE = 'https://onlinesim.io/api/v1/free_numbers_content';

/**
 * Fetch all currently online countries that have active virtual numbers.
 */
export async function getOnlineCountries() {
  try {
    const res = await fetch(`${ONLINESIM_BASE}/countries`);
    if (!res.ok) return [];
    const data = await res.json();

    if (data.response === '1' || data.response === 1) {
      const all = data.counties || data.countries || [];
      return all.filter((c) => c.online === true);
    }
    return [];
  } catch (err) {
    console.error('getOnlineCountries error:', err);
    return [];
  }
}

/**
 * Fetch numbers for a specific country name.
 */
export async function getCountryNumbers(country, lang = 'en') {
  try {
    const res = await fetch(
      `${ONLINESIM_BASE}/countries/${encodeURIComponent(country)}?lang=${encodeURIComponent(lang)}`
    );
    if (!res.ok) return [];
    const data = await res.json();

    if (data.response === '1' || data.response === 1) {
      return (data.numbers || []).map((n) => ({
        lastUpdate: n.data_humans,
        fullNumber: String(n.full_number),
      }));
    }
    return [];
  } catch (err) {
    console.error('getCountryNumbers error:', err);
    return [];
  }
}

/**
 * Fetch incoming SMS inbox for a specific country & number.
 * Returns an array of messages or false if number is offline/invalid.
 */
export async function getNumberInbox(country, number, lang = 'en') {
  try {
    const res = await fetch(
      `${ONLINESIM_BASE}/countries/${encodeURIComponent(country)}/${encodeURIComponent(number)}?lang=${encodeURIComponent(lang)}`
    );
    if (!res.ok) return false;
    const data = await res.json();

    if ((data.response === '1' || data.response === 1) && data.online) {
      const msgs = (data.messages?.data || []).map((m) => ({
        time: m.data_humans,
        text: m.text,
      }));
      return msgs;
    }
    return false;
  } catch (err) {
    console.error('getNumberInbox error:', err);
    return false;
  }
}
