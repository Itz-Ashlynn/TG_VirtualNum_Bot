import { getPlatformStats } from '../lib/db.js';
import { getOnlineCountries } from '../lib/onlinesim.js';
import { BOT_CONFIG } from '../lib/keyboards.js';

export default async function (input, ctx) {
  const [stats, countries] = await Promise.all([
    getPlatformStats(),
    getOnlineCountries(),
  ]);

  return {
    botName: BOT_CONFIG.name,
    botUsername: 'EliteTempnumBot',
    version: BOT_CONFIG.version,
    activeCountriesCount: countries.length,
    totalUsers: stats.totalUsers,
    totalQueries: stats.totalQueries,
  };
}
