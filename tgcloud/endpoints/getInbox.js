import { getNumberInbox } from '../lib/onlinesim.js';

export default async function (input, ctx) {
  const country = input?.country;
  const number = input?.number;

  if (!country || !number) {
    return { messages: [], active: false };
  }

  const raw = await getNumberInbox(country, number);
  if (raw === false) {
    return { messages: [], active: false };
  }

  const clean = raw.map((m) => ({
    time: m.time,
    text: m.text ? m.text.split('received from OnlineSIM.io')[0].trim() : '—',
  }));

  return { messages: clean, active: true };
}
