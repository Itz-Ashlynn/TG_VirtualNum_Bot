import { getCountryNumbers } from '../lib/onlinesim.js';
import { formatPhone, getFlag } from '../lib/formatters.js';

export default async function (input, ctx) {
  const country = input?.country;
  if (!country) {
    return { numbers: [] };
  }

  const raw = await getCountryNumbers(country);
  const formatted = raw.map((n) => ({
    fullNumber: n.fullNumber,
    formatted: formatPhone(n.fullNumber),
    flag: getFlag(n.fullNumber),
    lastUpdate: n.lastUpdate,
  }));

  return { numbers: formatted };
}
