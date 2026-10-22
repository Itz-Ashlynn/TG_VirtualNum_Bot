/**
 * Elite Virtual Number Bot — Enhanced Frontend Client
 * Uiverse.io Navigation, Real-Time Interactive Simulator & Telegram WebApp
 */

const SAMPLE_NUMBERS = {
  united_states: [
    { phone: '12025550198', display: '1 202 555 0198', flag: '🇺🇸', name: 'United States' },
    { phone: '13125550143', display: '1 312 555 0143', flag: '🇺🇸', name: 'United States' },
    { phone: '14155552671', display: '1 415 555 2671', flag: '🇺🇸', name: 'United States' },
  ],
  united_kingdom: [
    { phone: '447700900077', display: '44 7700 900077', flag: '🇬🇧', name: 'United Kingdom' },
    { phone: '447911123456', display: '44 7911 123456', flag: '🇬🇧', name: 'United Kingdom' },
  ],
  france: [
    { phone: '33754057766', display: '33 754 057 766', flag: '🇫🇷', name: 'France' },
    { phone: '33612345678', display: '33 6 12 34 56 78', flag: '🇫🇷', name: 'France' },
  ],
  germany: [
    { phone: '4915201234567', display: '49 152 01234567', flag: '🇩🇪', name: 'Germany' },
    { phone: '4917612345678', display: '49 176 12345678', flag: '🇩🇪', name: 'Germany' },
  ],
  spain: [
    { phone: '34612345678', display: '34 612 34 56 78', flag: '🇪🇸', name: 'Spain' },
  ],
  russia: [
    { phone: '79991234567', display: '7 999 123 45 67', flag: '🇷🇺', name: 'Russia' },
  ],
  india: [
    { phone: '919876543210', display: '91 98765 43210', flag: '🇮🇳', name: 'India' },
  ],
  brazil: [
    { phone: '5511987654321', display: '55 11 98765 4321', flag: '🇧🇷', name: 'Brazil' },
  ],
  canada: [
    { phone: '14165550199', display: '1 416 555 0199', flag: '🇨🇦', name: 'Canada' },
  ],
  netherlands: [
    { phone: '31612345678', display: '31 6 12345678', flag: '🇳🇱', name: 'Netherlands' },
  ],
  poland: [
    { phone: '48512345678', display: '48 512 345 678', flag: '🇵🇱', name: 'Poland' },
  ],
  sweden: [
    { phone: '46701234567', display: '46 70 123 45 67', flag: '🇸🇪', name: 'Sweden' },
  ],
};

let currentCountry = 'united_states';
let currentPhone = '12025550198';

// Telegram WebApp Initialization
if (window.Telegram && window.Telegram.WebApp) {
  try {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
      const userLang = tg.initDataUnsafe.user.language_code;
      const langPicker = document.getElementById('langSelect');
      if (userLang && langPicker) {
        const optionExists = Array.from(langPicker.options).some(
          (opt) => opt.value === userLang
        );
        if (optionExists) {
          langPicker.value = userLang;
        }
      }
    }
  } catch (err) {
    console.warn('Telegram WebApp setup error:', err);
  }
}

// UI Elements
const countryPicker = document.getElementById('countryPicker');
const displayFlag = document.getElementById('displayFlag');
const displayCountry = document.getElementById('displayCountry');
const displayPhone = document.getElementById('displayPhone');
const displayUpdated = document.getElementById('displayUpdated');
const btnRandomNum = document.getElementById('btnRandomNum');
const btnRenewNum = document.getElementById('btnRenewNum');
const btnQuickTest = document.getElementById('btnQuickTest');
const btnCopyPhone = document.getElementById('btnCopyPhone');
const btnCheckTG = document.getElementById('btnCheckTG');
const btnRefreshInbox = document.getElementById('btnRefreshInbox');
const smsFeed = document.getElementById('smsFeed');
const inboxBadge = document.getElementById('inboxBadge');
const langSelect = document.getElementById('langSelect');
const toast = document.getElementById('toast');
const copiedBadge = document.getElementById('copiedBadge');

// Glider Tabs Logic (Uiverse-inspired)
function initGliderTabs() {
  const tabs = document.querySelectorAll('.glider-tabs input[type="radio"]');
  const glider = document.querySelector('.tab-glider');
  if (!glider || !tabs.length) return;

  function updateGlider(input) {
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (label) {
      glider.style.width = `${label.offsetWidth}px`;
      glider.style.transform = `translateX(${label.offsetLeft - 5}px)`;
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('change', (e) => {
      updateGlider(e.target);
      const label = document.querySelector(`label[for="${e.target.id}"]`);
      const targetId = label?.getAttribute('data-target');
      if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  const checked = document.querySelector('.glider-tabs input[type="radio"]:checked');
  if (checked) {
    setTimeout(() => updateGlider(checked), 50);
  }

  window.addEventListener('resize', () => {
    const current = document.querySelector('.glider-tabs input[type="radio"]:checked');
    if (current) updateGlider(current);
  });
}

// Show Toast helper
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

// Update Phone Card
function updatePhoneDisplay(countryKey) {
  const pool = SAMPLE_NUMBERS[countryKey] || SAMPLE_NUMBERS.united_states;
  const picked = pool[Math.floor(Math.random() * pool.length)];

  currentCountry = countryKey;
  currentPhone = picked.phone;

  if (displayFlag) displayFlag.textContent = picked.flag;
  if (displayCountry) displayCountry.textContent = picked.name;
  if (displayPhone) displayPhone.textContent = picked.display;
  if (displayUpdated) displayUpdated.textContent = 'Just now';

  refreshSmsInbox();
}

// Random Number Generator
function getRandomNumber() {
  const keys = Object.keys(SAMPLE_NUMBERS);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  if (countryPicker) countryPicker.value = randomKey;
  updatePhoneDisplay(randomKey);
  showToast('📱 New active number pool selected!');
}

// Refresh SMS Feed Simulator
function refreshSmsInbox() {
  const otp1 = Math.floor(100000 + Math.random() * 900000);
  const otp2 = Math.floor(100000 + Math.random() * 900000);
  const otp3 = Math.floor(100000 + Math.random() * 900000);

  const services = [
    { sender: 'Telegram Auth', template: `Your Telegram login code is: <code class="copy-code" data-code="${otp1}">${otp1}</code>. Do not share.` },
    { sender: 'WhatsApp Verification', template: `&lt;#&gt; Your WhatsApp code is: <code class="copy-code" data-code="${otp2}">${otp2}</code>` },
    { sender: 'Google Security', template: `G-<code class="copy-code" data-code="${otp3}">${otp3}</code> is your Google security verification code.` },
    { sender: 'Discord App', template: `Your Discord verification code is: <code class="copy-code" data-code="${Math.floor(100000 + Math.random() * 900000)}">${Math.floor(100000 + Math.random() * 900000)}</code>` },
    { sender: 'OpenAI Auth', template: `Your OpenAI verification code is <code class="copy-code" data-code="${Math.floor(100000 + Math.random() * 900000)}">${Math.floor(100000 + Math.random() * 900000)}</code>` },
  ];

  const shuffled = services.sort(() => 0.5 - Math.random()).slice(0, 3);

  if (smsFeed) {
    smsFeed.innerHTML = shuffled
      .map(
        (s, i) => `
      <div class="sms-card">
        <div class="sms-top">
          <span class="sms-sender">${s.sender}</span>
          <span class="sms-time">${i === 0 ? 'Just now' : `${(i + 1) * 2} mins ago`}</span>
        </div>
        <div class="sms-body">${s.template}</div>
      </div>
    `
      )
      .join('');

    // Attach click-to-copy on OTP codes
    smsFeed.querySelectorAll('.copy-code').forEach((codeEl) => {
      codeEl.addEventListener('click', () => {
        const code = codeEl.getAttribute('data-code');
        if (code) {
          navigator.clipboard.writeText(code).then(() => {
            showToast(`📋 Copied OTP: ${code}`);
          });
        }
      });
    });
  }

  if (inboxBadge) inboxBadge.textContent = `${shuffled.length} Messages`;
}

// Copy Phone Handler
if (btnCopyPhone) {
  btnCopyPhone.addEventListener('click', () => {
    navigator.clipboard
      .writeText(`+${currentPhone}`)
      .then(() => {
        showToast(`📋 Copied +${currentPhone} to clipboard!`);
        if (copiedBadge) {
          copiedBadge.classList.add('show');
          setTimeout(() => copiedBadge.classList.remove('show'), 1800);
        }
      })
      .catch(() => {
        showToast(`Number: +${currentPhone}`);
      });
  });
}

// Check Telegram Profile
if (btnCheckTG) {
  btnCheckTG.addEventListener('click', () => {
    window.open(`https://t.me/+${currentPhone}`, '_blank');
  });
}

// Command copy buttons
document.querySelectorAll('.cmd-copy-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const cmd = btn.getAttribute('data-copy');
    if (cmd) {
      navigator.clipboard.writeText(cmd).then(() => {
        showToast(`Copied ${cmd}`);
      });
    }
  });
});

// Event Listeners
if (countryPicker) {
  countryPicker.addEventListener('change', (e) => {
    updatePhoneDisplay(e.target.value);
  });
}

if (btnRandomNum) {
  btnRandomNum.addEventListener('click', getRandomNumber);
}

if (btnRenewNum) {
  btnRenewNum.addEventListener('click', () => {
    updatePhoneDisplay(currentCountry);
    showToast('🔄 Renewed with fresh virtual number!');
  });
}

if (btnQuickTest) {
  btnQuickTest.addEventListener('click', () => {
    getRandomNumber();
    const simEl = document.getElementById('interactive-simulator');
    if (simEl) simEl.scrollIntoView({ behavior: 'smooth' });
  });
}

if (btnRefreshInbox) {
  btnRefreshInbox.addEventListener('click', () => {
    refreshSmsInbox();
    showToast('🔄 Real-time SMS inbox refreshed!');
  });
}

if (langSelect) {
  langSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    showToast(`🌐 Language set to: ${e.target.options[e.target.selectedIndex].text}`);
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.Serverless) {
      window.Telegram.WebApp.Serverless.call('setLanguage', { lang: selected }, () => {});
    }
  });
}

// Try to fetch live stats from the serverless backend
async function loadLiveStats() {
  try {
    const res = await fetch('/api/getStats', { method: 'POST', body: '{}' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.result) {
        const stats = data.result;
        const statCountries = document.getElementById('statCountries');
        if (statCountries && stats.activeCountriesCount) {
          statCountries.textContent = `${stats.activeCountriesCount}+ Pools`;
        }
      }
    }
  } catch {}
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initGliderTabs();
  refreshSmsInbox();
  loadLiveStats();
});
