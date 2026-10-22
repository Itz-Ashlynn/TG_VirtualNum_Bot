/**
 * Formatting and Helper Utilities
 */

export const CODE_TO_FLAG = {
  1: '🇺🇸', 7: '🇷🇺', 20: '🇪🇬', 27: '🇿🇦', 30: '🇬🇷', 31: '🇳🇱',
  32: '🇧🇪', 33: '🇫🇷', 34: '🇪🇸', 36: '🇭🇺', 39: '🇮🇹', 40: '🇷🇴',
  41: '🇨🇭', 43: '🇦🇹', 44: '🇬🇧', 45: '🇩🇰', 46: '🇸🇪', 47: '🇳🇴',
  48: '🇵🇱', 49: '🇩🇪', 51: '🇵🇪', 52: '🇲🇽', 53: '🇨🇺', 54: '🇦🇷',
  55: '🇧🇷', 56: '🇨🇱', 57: '🇨🇴', 58: '🇻🇪', 60: '🇲🇾', 61: '🇦🇺',
  62: '🇮🇩', 63: '🇵🇭', 64: '🇳🇿', 65: '🇸🇬', 66: '🇹🇭', 77: '🇰🇿',
  81: '🇯🇵', 82: '🇰🇷', 84: '🇻🇳', 86: '🇨🇳', 90: '🇹🇷', 91: '🇮🇳',
  92: '🇵🇰', 93: '🇦🇫', 94: '🇱🇰', 95: '🇲🇲', 98: '🇮🇷',
  212: '🇲🇦', 213: '🇩🇿', 216: '🇹🇳', 218: '🇱🇾', 220: '🇬🇲',
  221: '🇸🇳', 222: '🇲🇷', 223: '🇲🇱', 224: '🇬🇳', 225: '🇨🇮',
  226: '🇧🇫', 227: '🇳🇪', 228: '🇹🇬', 229: '🇧🇯', 230: '🇲🇺',
  231: '🇱🇷', 232: '🇸🇱', 233: '🇬🇭', 234: '🇳🇬', 235: '🇹🇩',
  236: '🇨🇫', 237: '🇨🇲', 238: '🇨🇻', 239: '🇸🇹', 240: '🇬🇶',
  241: '🇬🇦', 242: '🇨🇬', 243: '🇨🇩', 244: '🇦🇴', 245: '🇬🇼',
  248: '🇸🇨', 249: '🇸🇩', 250: '🇷🇼', 251: '🇪🇹', 252: '🇸🇴',
  253: '🇩🇯', 254: '🇰🇪', 255: '🇹🇿', 256: '🇺🇬', 257: '🇧🇮',
  258: '🇲🇿', 260: '🇿🇲', 261: '🇲🇬', 262: '🇷🇪', 263: '🇿🇼',
  264: '🇳🇦', 265: '🇲🇼', 266: '🇱🇸', 267: '🇧🇼', 268: '🇸🇿',
  269: '🇰🇲', 290: '🇸🇭', 291: '🇪🇷', 297: '🇦🇼',
  298: '🇫🇴', 299: '🇬🇱', 350: '🇬🇮', 351: '🇵🇹', 352: '🇱🇺',
  353: '🇮🇪', 354: '🇮🇸', 355: '🇦🇱', 356: '🇲🇹', 357: '🇨🇾',
  358: '🇫🇮', 359: '🇧🇬', 370: '🇱🇹', 371: '🇱🇻', 372: '🇪🇪',
  373: '🇲🇩', 374: '🇦🇲', 375: '🇧🇾', 376: '🇦🇩', 380: '🇺🇦',
  381: '🇷🇸', 382: '🇲🇪', 383: '🇽🇰', 385: '🇭🇷', 386: '🇸🇮',
  387: '🇧🇦', 389: '🇲🇰', 420: '🇨🇿', 421: '🇸🇰', 501: '🇧🇿',
  502: '🇬🇹', 503: '🇸🇻', 504: '🇭🇳', 505: '🇳🇮', 506: '🇨🇷',
  507: '🇵🇦', 509: '🇭🇹', 591: '🇧🇴', 592: '🇬🇾', 593: '🇪🇨',
  594: '🇬🇫', 595: '🇵🇾', 596: '🇲🇶', 597: '🇸🇷', 598: '🇺🇾',
  670: '🇹🇱', 673: '🇧🇳', 675: '🇵🇬', 676: '🇹🇴', 677: '🇸🇧',
  678: '🇻🇺', 679: '🇫🇯', 680: '🇵🇼', 685: '🇼🇸', 686: '🇰🇮',
  689: '🇵🇫', 690: '🇹🇰', 691: '🇫🇲', 692: '🇲🇭',
  852: '🇭🇰', 853: '🇲🇴', 855: '🇰🇭', 856: '🇱🇦', 880: '🇧🇩',
  886: '🇹🇼', 960: '🇲🇻', 961: '🇱🇧', 962: '🇯🇴', 963: '🇸🇾',
  964: '🇮🇶', 965: '🇰🇼', 966: '🇸🇦', 967: '🇾🇪', 968: '🇴🇲',
  970: '🇵🇸', 971: '🇦🇪', 972: '🇮🇱', 973: '🇧🇭', 974: '🇶🇦',
  975: '🇧🇹', 976: '🇲🇳', 977: '🇳🇵', 992: '🇹🇯', 993: '🇹🇲',
  994: '🇦🇿', 995: '🇬🇪', 996: '🇰🇬', 998: '🇺🇿',
};

export const NAME_FLAGS = {
  russia: '🇷🇺', united_states: '🇺🇸', usa: '🇺🇸', united_kingdom: '🇬🇧',
  uk: '🇬🇧', france: '🇫🇷', germany: '🇩🇪', spain: '🇪🇸', italy: '🇮🇹',
  brazil: '🇧🇷', india: '🇮🇳', china: '🇨🇳', japan: '🇯🇵',
  south_korea: '🇰🇷', korea: '🇰🇷', canada: '🇨🇦', australia: '🇦🇺',
  mexico: '🇲🇽', argentina: '🇦🇷', colombia: '🇨🇴', chile: '🇨🇱',
  peru: '🇵🇪', venezuela: '🇻🇪', ecuador: '🇪🇨', bolivia: '🇧🇴',
  paraguay: '🇵🇾', uruguay: '🇺🇾', netherlands: '🇳🇱', belgium: '🇧🇪',
  switzerland: '🇨🇭', austria: '🇦🇹', sweden: '🇸🇪', norway: '🇳🇴',
  denmark: '🇩🇰', finland: '🇫🇮', poland: '🇵🇱', czech_republic: '🇨🇿',
  czechia: '🇨🇿', romania: '🇷🇴', hungary: '🇭🇺', portugal: '🇵🇹',
  greece: '🇬🇷', turkey: '🇹🇷', ukraine: '🇺🇦', kazakhstan: '🇰🇿',
  indonesia: '🇮🇩', malaysia: '🇲🇾', philippines: '🇵🇭',
  thailand: '🇹🇭', vietnam: '🇻🇳', singapore: '🇸🇬',
  south_africa: '🇿🇦', nigeria: '🇳🇬', kenya: '🇰🇪', egypt: '🇪🇬',
  morocco: '🇲🇦', pakistan: '🇵🇰', bangladesh: '🇧🇩',
  ireland: '🇮🇪', new_zealand: '🇳🇿', israel: '🇮🇱',
  uae: '🇦🇪', united_arab_emirates: '🇦🇪', saudi_arabia: '🇸🇦',
  myanmar: '🇲🇲', cambodia: '🇰🇭', laos: '🇱🇦', taiwan: '🇹🇼',
  hong_kong: '🇭🇰', macau: '🇲🇴', mongolia: '🇲🇳',
  uzbekistan: '🇺🇿', tajikistan: '🇹🇯', kyrgyzstan: '🇰🇬',
  turkmenistan: '🇹🇲', azerbaijan: '🇦🇿', georgia: '🇬🇪',
  armenia: '🇦🇲', belarus: '🇧🇾', moldova: '🇲🇩',
  lithuania: '🇱🇹', latvia: '🇱🇻', estonia: '🇪🇪',
  croatia: '🇭🇷', serbia: '🇷🇸', slovenia: '🇸🇮',
  bosnia: '🇧🇦', montenegro: '🇲🇪', macedonia: '🇲🇰',
  albania: '🇦🇱', bulgaria: '🇧🇬', slovakia: '🇸🇰',
  iceland: '🇮🇸', luxembourg: '🇱🇺', malta: '🇲🇹', cyprus: '🇨🇾',
  cuba: '🇨🇺', costa_rica: '🇨🇷', panama: '🇵🇦',
  guatemala: '🇬🇹', honduras: '🇭🇳', el_salvador: '🇸🇻',
  nicaragua: '🇳🇮', haiti: '🇭🇹', sri_lanka: '🇱🇰',
  afghanistan: '🇦🇫', iran: '🇮🇷', iraq: '🇮🇶',
  syria: '🇸🇾', jordan: '🇯🇴', lebanon: '🇱🇧',
  kuwait: '🇰🇼', qatar: '🇶🇦', bahrain: '🇧🇭', oman: '🇴🇲',
  yemen: '🇾🇪', nepal: '🇳🇵', bhutan: '🇧🇹', maldives: '🇲🇻',
  andorra: '🇦🇩', gibraltar: '🇬🇮',
};

export function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function userMention(user) {
  if (!user) return 'User';
  const name = escapeHtml(
    user.first_name || user.last_name || user.username || 'User'
  );
  return `<a href="tg://user?id=${user.id}">${name}</a>`;
}

export function getFlag(fullNumber) {
  const num = String(fullNumber || '').replace(/\D/g, '');
  for (const len of [3, 2, 1]) {
    const code = parseInt(num.substring(0, len), 10);
    if (CODE_TO_FLAG[code]) return CODE_TO_FLAG[code];
  }
  return '🌐';
}

export function getFlagForCountry(countryName) {
  if (!countryName) return '🌐';
  const key = String(countryName).toLowerCase().replace(/\s+/g, '_');
  return NAME_FLAGS[key] || '🌐';
}

export function formatPhone(fullNumber) {
  const num = String(fullNumber || '').replace(/\D/g, '');
  if (num.length <= 4) return `+${num}`;

  let ccLen = 1;
  for (const len of [3, 2, 1]) {
    const code = parseInt(num.substring(0, len), 10);
    if (CODE_TO_FLAG[code]) {
      ccLen = len;
      break;
    }
  }

  const cc = num.substring(0, ccLen);
  const rest = num.substring(ccLen);
  const groups = rest.match(/.{1,3}/g) || [];
  return `+${cc} ${groups.join(' ')}`;
}

export function formatCountryName(name) {
  if (!name) return '';
  return String(name)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
