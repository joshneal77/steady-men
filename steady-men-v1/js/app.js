(() => {
  const byId = (id) => document.getElementById(id);
  const SITE_TIME_ZONE = 'America/Toronto';
  const BIBLE_COM_VERSION_ID = '1713';
  const BIBLE_COM_VERSION_CODE = 'CSB';
  const DEFAULT_STUDY_PACKAGE_URL = 'assets/steady-men-rooted-in-the-word-full-guide.docx.pdf';
  const BIBLE_BOOK_CODES = {
    'John': 'JHN',
    'James': 'JAS',
    'Galatians': 'GAL',
    'Ecclesiastes': 'ECC',
    'Proverbs': 'PRO',
    '1 Thessalonians': '1TH',
    'Ephesians': 'EPH',
    'Colossians': 'COL',
    '1 Peter': '1PE',
    '1 Corinthians': '1CO',
    'Hebrews': 'HEB',
    'Romans': 'ROM',
    '1 Timothy': '1TI',
    '2 Timothy': '2TI'
  };

  function dateFormatter(options) {
    return new Intl.DateTimeFormat(undefined, { timeZone: SITE_TIME_ZONE, ...options });
  }

  function toSiteKey(date = new Date()) {
    const parts = dateFormatter({ year: 'numeric', month: '2-digit', day: '2-digit' })
      .formatToParts(date)
      .reduce((result, part) => {
        result[part.type] = part.value;
        return result;
      }, {});
    return `${parts.year}-${parts.month}-${parts.day}`;
  }

  function parseKey(key) { return new Date(`${key}T12:00:00Z`); }
  function formatDate(key) { return dateFormatter({ weekday: 'long', month: 'long', day: 'numeric' }).format(parseKey(key)); }
  function shortDate(key) { return dateFormatter({ month: 'short', day: 'numeric' }).format(parseKey(key)); }
  function isBefore(a, b) { return a < b; }
  function isAfter(a, b) { return a > b; }
  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[char]));
  }

  function getPreviewKey() {
    const value = new URLSearchParams(window.location.search).get('preview');
    return /^\d{4}-\d{2}-\d{2}$/.test(value || '') ? value : null;
  }

  function scheduleState() {
    const preview = getPreviewKey();
    const selected = preview || toSiteKey();
    const start = STUDY_CONFIG.startDate;
    const end = STUDY_CONFIG.endDate;
    let mode = 'active';
    let reading = READING_PLAN.find((item) => item.date === selected);
    if (isBefore(selected, start)) { mode = 'upcoming'; reading = READING_PLAN[0]; }
    else if (isAfter(selected, end)) { mode = 'complete'; reading = READING_PLAN[READING_PLAN.length - 1]; }
    else if (!reading) { reading = READING_PLAN[0]; }
    return { selected, mode, reading, preview: Boolean(preview) };
  }

  function findBibleBook(reference) {
    return Object.keys(BIBLE_BOOK_CODES)
      .sort((a, b) => b.length - a.length)
      .find((book) => reference.startsWith(`${book} `));
  }

  function biblePathParts(reference) {
    if (reference === '1 Thessalonians 4:13-5:11') return ['1TH.4.13-18', '1TH.5.1-11'];
    return reference.split(';').flatMap((part) => {
      const trimmed = part.trim();
      const book = findBibleBook(trimmed);
      if (!book) return [];
      const code = BIBLE_BOOK_CODES[book];
      const locator = trimmed.slice(book.length).trim();
      if (/^\d+-\d+$/.test(locator)) {
        const [start, end] = locator.split('-').map(Number);
        return Array.from({ length: end - start + 1 }, (_, index) => `${code}.${start + index}`);
      }
      return [`${code}.${locator.replace(':', '.').replace(/\s+/g, '')}`];
    });
  }

  function bibleUrl(reading) {
    if (reading.openDay) return '';
    const reference = reading.scripture.trim();
    const useSearch = reference.includes(';') || /:\d+-\d+:\d+/.test(reference) || /^John 9-10$/.test(reference);
    if (useSearch) return `https://www.bible.com/search/bible?q=${encodeURIComponent(reference)}&version_id=${BIBLE_COM_VERSION_ID}`;
    const parts = biblePathParts(reference);
    if (!parts.length) return '';
    return `https://www.bible.com/bible/${BIBLE_COM_VERSION_ID}/${parts.map((part) => `${part}.${BIBLE_COM_VERSION_CODE}`).join(',')}`;
  }

  function setReadingLink(link, reading) {
    if (!link) return;
    if (reading.openDay) {
      link.classList.add('hidden');
      link.removeAttribute('href');
      link.removeAttribute('target');
      link.removeAttribute('rel');
      return;
    }
    link.classList.remove('hidden');
    link.href = bibleUrl(reading);
    link.textContent = 'Open in Bible App';
    link.target = '_blank';
    link.rel = 'noopener';
  }

  function promptFor(reading) {
    if (reading.openDay) return 'What needs attention today: rest, prayer, catching up, or reaching out to a brother?';
    const prompts = [
      'What is one faithful response God is calling from you today?',
      'Where does this reading need to shape your home, work, or relationships?',
      'What truth from this passage should you carry into WhatsApp or prayer today?',
      'Where are you tempted to rely on yourself instead of Christ?',
      'What would it look like to live this out quietly and honestly today?'
    ];
    const seed = Number(reading.date.slice(-2));
    return prompts[seed % prompts.length];
  }

  function getReminder(dateKey) {
    const start = parseKey(STUDY_CONFIG.startDate);
    const current = parseKey(dateKey);
    const day = Math.max(0, Math.round((current - start) / 86400000));
    return STUDY_CONFIG.brotherhoodReminders[day % STUDY_CONFIG.brotherhoodReminders.length];
  }

  function nextStudyNight(selected) {
    return STUDY_CONFIG.studyNights.find((item) => item.date >= selected) || STUDY_CONFIG.studyNights[STUDY_CONFIG.studyNights.length - 1];
  }

  function daysUntil(fromKey, toKey) {
    const diff = Math.round((parseKey(toKey) - parseKey(fromKey)) / 86400000);
    if (diff === 0) return 'Study Night today';
    if (diff === 1) return 'Tomorrow';
    if (diff > 1) return `In ${diff} days`;
    return 'Completed';
  }

  function renderHero(state) {
    const { reading, mode, preview } = state;
    const status = byId('hero-status');
    byId('hero-kicker').textContent = preview ? `PREVIEW - ${formatDate(reading.date).toUpperCase()}` : 'ROOTED IN THE WORD';
    if (mode === 'upcoming') status.textContent = `The Rooted in the Word plan begins ${formatDate(STUDY_CONFIG.startDate)}. Start by looking ahead to the first reading.`;
    else if (mode === 'complete') status.textContent = 'The summer plan has concluded. Return to the final reading and keep walking steadily in the Word.';
    else status.textContent = `${formatDate(reading.date)} - open the Word, take one faithful step, and stay connected to your brothers.`;
    setReadingLink(byId('hero-reading-link'), reading);
  }

  function renderToday(state) {
    const { reading } = state;
    byId('today-date').textContent = formatDate(reading.date);
    byId('today-new-testament').textContent = reading.scripture;
    byId('today-companion').textContent = reading.theme;
    byId('today-note').textContent = reading.note;
    byId('reflection-question').textContent = promptFor(reading);
    setReadingLink(byId('today-reading-link'), reading);
    setReadingLink(byId('hero-reading-link'), reading);
    byId('brotherhood-reminder').textContent = getReminder(reading.date);
    const copyButton = byId('today-copy-button');
    if (copyButton) {
      copyButton.dataset.date = reading.date;
      copyButton.dataset.defaultLabel = 'Copy for WhatsApp';
      copyButton.classList.toggle('hidden', Boolean(reading.openDay));
    }
    const whatsApp = byId('whatsapp-link');
    if (STUDY_CONFIG.whatsAppUrl) {
      whatsApp.href = STUDY_CONFIG.whatsAppUrl;
      whatsApp.classList.remove('hidden');
    }
  }

  function renderStudyNights(state) {
    const next = nextStudyNight(state.selected);
    const place = next.location ? ` - ${escapeHtml(next.location)}` : '';
    byId('next-study-night').innerHTML = `
      <div class="gathering-date-block"><span>NEXT STUDY NIGHT</span><strong>${formatDate(next.date)}</strong></div>
      <div class="gathering-copy"><h3>${escapeHtml(next.title)}</h3><p>${escapeHtml(next.theme)} - ${escapeHtml(next.time)}${place}<br>${escapeHtml(next.note || '')}</p></div>
      <div class="gathering-countdown">${daysUntil(state.selected, next.date)}</div>`;
    byId('study-night-list').innerHTML = STUDY_CONFIG.studyNights.map((item) => {
      const isNext = item.date === next.date;
      const location = item.location ? `<br>${escapeHtml(item.location)}` : '';
      return `<div class="gathering-mini ${isNext ? 'is-next' : ''}"><span class="mini-date">${shortDate(item.date).toUpperCase()}</span><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.theme)}<br>${escapeHtml(item.time)}${location}</span></div>`;
    }).join('');
  }

  function weekNumber(dateKey) {
    const start = parseKey(STUDY_CONFIG.startDate);
    return Math.floor((parseKey(dateKey) - start) / 86400000 / 7) + 1;
  }

  function renderReadingReference(reading) {
    if (reading.openDay) return `<span class="reading-ref open-ref">${escapeHtml(reading.scripture)}</span>`;
    return `<a class="reading-ref" target="_blank" rel="noopener" href="${bibleUrl(reading)}">${escapeHtml(reading.scripture)}</a>`;
  }

  function renderReadingPlan(state) {
    const weekGroups = new Map();
    READING_PLAN.forEach((reading) => {
      const week = weekNumber(reading.date);
      if (!weekGroups.has(week)) weekGroups.set(week, []);
      weekGroups.get(week).push(reading);
    });
    const activeWeek = weekNumber(state.reading.date);
    const plan = byId('reading-plan-list');
    plan.innerHTML = [...weekGroups.entries()].map(([week, entries]) => {
      const start = entries[0].date, end = entries[entries.length - 1].date;
      const open = week === activeWeek ? ' open' : '';
      const theme = entries[0].theme;
      const focus = entries[0].weekFocus;
      return `<details class="week-details"${open}><summary class="week-summary"><span><span class="week-summary-title">Week ${week}: ${escapeHtml(theme)}</span><span class="week-summary-subtitle">${shortDate(start)} - ${shortDate(end)} | ${escapeHtml(focus)}</span></span><span class="week-summary-icon">+</span></summary><div class="reading-rows">${entries.map((reading) => {
        const current = reading.date === state.reading.date;
        const classes = ['reading-row'];
        if (current) classes.push('is-today');
        if (reading.openDay) classes.push('is-open-day');
        const studyNight = reading.studyNight ? `<div class="study-night-note">${escapeHtml(reading.studyNight)}</div>` : '';
        const actions = reading.openDay ? '' : `<div class="reading-actions"><button class="copy-reading-button" type="button" data-date="${reading.date}" data-default-label="Copy for WhatsApp">Copy for WhatsApp</button></div>`;
        return `<div class="${classes.join(' ')}"><div class="date-cell"><span class="date-main">${formatDate(reading.date)}</span>${current ? '<span class="today-chip">CURRENT DAY</span>' : ''}</div><div><span class="reading-cell-label">Passage</span>${renderReadingReference(reading)}</div><div class="reading-note"><span class="reading-cell-label">Reading Note</span>${escapeHtml(reading.note)}${studyNight}</div>${actions}</div>`;
      }).join('')}</div></details>`;
    }).join('');
    const notice = byId('plan-notice');
    notice.style.display = 'none';
    if (state.mode === 'upcoming') { notice.style.display = 'block'; notice.textContent = `The plan begins ${formatDate(STUDY_CONFIG.startDate)}. The first day is highlighted above.`; }
    else if (state.mode === 'complete') { notice.style.display = 'block'; notice.textContent = 'The 2026 plan has concluded. The final reading is highlighted above.'; }
  }

  function renderResources() {
    const studyPackage = byId('study-package-link');
    const studyPackageUrl = STUDY_CONFIG.studyPackageUrl || DEFAULT_STUDY_PACKAGE_URL;
    if (!studyPackageUrl) {
      studyPackage.removeAttribute('href');
      studyPackage.setAttribute('aria-disabled', 'true');
      studyPackage.classList.add('is-disabled');
      const note = studyPackage.querySelector('small');
      if (note) note.textContent = 'The full guide can be added here once it is uploaded to the site.';
    } else {
      studyPackage.href = studyPackageUrl;
      studyPackage.removeAttribute('aria-disabled');
      studyPackage.classList.remove('is-disabled');
    }

    const optionalList = byId('optional-resource-list');
    if (!optionalList) return;
    optionalList.innerHTML = (STUDY_CONFIG.optionalResources || []).map((item) => `
      <a class="optional-resource-card" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">
        <span class="reading-cell-label">${escapeHtml(item.type)}</span>
        <strong>${escapeHtml(item.title)}</strong>
        <small>${escapeHtml(item.scripture)}</small>
        <p>${escapeHtml(item.summary)}</p>
      </a>`).join('');
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const successful = document.execCommand('copy');
    textarea.remove();
    return successful ? Promise.resolve() : Promise.reject(new Error('Copy failed'));
  }

  function whatsappText(reading) {
    return `*Steady Men 16:13 — ${formatDate(reading.date)}*\n\n*Reading:* ${reading.scripture}\n${bibleUrl(reading)}`;
  }

  function setCopyFeedback(button, message) {
    const defaultLabel = button.dataset.defaultLabel || 'Copy for WhatsApp';
    button.textContent = message;
    button.classList.add('is-copied');
    window.setTimeout(() => {
      button.textContent = defaultLabel;
      button.classList.remove('is-copied');
    }, 2200);
  }

  function handleCopyButton(button) {
    const reading = READING_PLAN.find((item) => item.date === button.dataset.date);
    if (!reading || reading.openDay) return;
    copyText(whatsappText(reading))
      .then(() => setCopyFeedback(button, 'Copied'))
      .catch(() => setCopyFeedback(button, 'Select text'));
  }

  function bindCopyButtons() {
    const todayCopy = byId('today-copy-button');
    if (todayCopy) todayCopy.addEventListener('click', () => handleCopyButton(todayCopy));
    const plan = byId('reading-plan-list');
    plan.addEventListener('click', (event) => {
      const button = event.target.closest('.copy-reading-button');
      if (button) handleCopyButton(button);
    });
  }

  function setActiveNav() {
    const sections = document.querySelectorAll('.section-anchor, #today');
    const navLinks = document.querySelectorAll('[data-nav]');
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = visible.target.id;
      navLinks.forEach((link) => link.classList.toggle('active', link.dataset.nav === id));
    }, { rootMargin: '-24% 0px -60% 0px', threshold: [0.02, 0.2, 0.6] });
    sections.forEach((section) => observer.observe(section));
  }

  function setMobileMenu() {
    const button = byId('menu-button');
    const nav = byId('mobile-nav');
    button.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
    }));
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('service-worker.js')
      .then((registration) => registration.update())
      .catch(() => {});
  }

  function init() {
    const state = scheduleState();
    renderHero(state);
    renderToday(state);
    renderStudyNights(state);
    renderReadingPlan(state);
    renderResources();
    bindCopyButtons();
    setActiveNav();
    setMobileMenu();
    registerServiceWorker();
  }
  document.addEventListener('DOMContentLoaded', init);
})();
