import { updateUserLang } from '../lib/db.js';
import { normalizeLang, SUPPORTED_LANGUAGES } from '../lib/i18n.js';

export default async function (input, ctx) {
  const lang = normalizeLang(input?.lang);
  const user = ctx?.initData?.user;

  if (user?.id) {
    await updateUserLang(user.id, lang);
  }

  return {
    ok: true,
    lang,
    info: SUPPORTED_LANGUAGES[lang],
  };
}
