import { getOnlineCountries } from '../lib/onlinesim.js';
import { getFlagForCountry, formatCountryName } from '../lib/formatters.js';

export default async function (input, ctx) {
  const raw = await getOnlineCountries();
  const sorted = raw.sort((a, b) => a.name.localeCompare(b.name));

  const list = sorted.map((c) => ({
    name: c.name,
    displayName: formatCountryName(c.name),
    flag: getFlagForCountry(c.name),
  }));

  return { countries: list };
}
