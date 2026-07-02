(() => {
  const byId = (id) => document.getElementById(id);
  const SITE_TIME_ZONE = 'America/Toronto';

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

  function bibleUrl(reading) {
    const query = `${reading.newTestament}; ${reading.companion}`;
    return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(query)}&version=NIV`;
  }

  function promptFor(reading) {
    const starter = reading.note.replace(/^Anchor reading:\s*/i, '').replace(/\.$/, '');
    const prompts = [
      'What is one faithful response God is calling from you today?',
      'Where do you need to bring this truth into your home, work, or relationships?',
      'What would it look like to live this out quietly and honestly today?',
      'What part of this reading needs to shape the way you respond to others today?',
      'Where are you tempted to rely on yourself instead of the Lord?'
    ];
    const seed = Number(reading.date.slice(-2));
    return `${starter}. ${prompts[seed % prompts.length]}`;
  }

  function getReminder(dateKey) {
    const start = parseKey(STUDY_CONFIG.startDate);
    const current = parseKey(dateKey);
    const day = Math.max(0, Math.round((current - start) / 86400000));
    return STUDY_CONFIG.brotherhoodReminders[day % STUDY_CONFIG.brotherhoodReminders.length];
  }

  function currentStudy(selected) {
    if (!STUDY_CONFIG.showStudyVideos || !STUDY_CONFIG.videos.length) return null;
    return STUDY_CONFIG.videos.find((video) => selected >= video.activeStart && selected <= video.activeEnd)
      || (selected < STUDY_CONFIG.videos[0].activeStart ? STUDY_CONFIG.videos[0] : STUDY_CONFIG.videos[STUDY_CONFIG.videos.length - 1]);
  }

  function nextGathering(selected) {
    return STUDY_CONFIG.gatherings.find((item) => item.date >= selected) || STUDY_CONFIG.gatherings[STUDY_CONFIG.gatherings.length - 1];
  }

  function daysUntil(fromKey, toKey) {
    const diff = Math.round((parseKey(toKey) - parseKey(fromKey)) / 86400000);
    if (diff === 0) return 'Gathering today';
    if (diff === 1) return 'Tomorrow';
    if (diff > 1) return `In ${diff} days`;
    return 'Gathering completed';
  }

  function renderHero(state) {
    const { reading, mode, preview } = state;
    const status = byId('hero-status');
    byId('hero-kicker').textContent = preview ? `PREVIEW · ${formatDate(reading.date).toUpperCase()}` : 'TODAY’S JOURNEY';
    if (mode === 'upcoming') status.textContent = `The Summer Study begins ${formatDate(STUDY_CONFIG.startDate)}. Start by looking ahead to the first day’s reading.`;
    else if (mode === 'complete') status.textContent = 'The Summer Study has concluded. Return to the final anchor reading and keep walking steadily in the Word.';
    else status.textContent = `${formatDate(reading.date)} · Open the Word, take one faithful step, and stay connected to your brothers.`;
    const url = bibleUrl(reading);
    byId('hero-reading-link').href = url;
    byId('hero-reading-link').target = '_blank';
    byId('hero-reading-link').rel = 'noopener';
  }

  function renderToday(state) {
    const { reading } = state;
    byId('today-date').textContent = formatDate(reading.date);
    byId('today-new-testament').textContent = reading.newTestament;
    byId('today-companion').textContent = reading.companion;
    byId('today-note').textContent = reading.note;
    byId('reflection-question').textContent = promptFor(reading);
    const url = bibleUrl(reading);
    byId('today-reading-link').href = url;
    byId('hero-reading-link').href = url;
    byId('brotherhood-reminder').textContent = getReminder(reading.date);
    const whatsApp = byId('whatsapp-link');
    if (STUDY_CONFIG.whatsAppUrl) {
      whatsApp.href = STUDY_CONFIG.whatsAppUrl;
      whatsApp.classList.remove('hidden');
    }
  }

  function renderStudy(state) {
    const section = byId('study');
    const item = currentStudy(state.selected);
    if (!item) { section.classList.add('hidden'); return; }
    section.classList.remove('hidden');
    byId('study-week-number').textContent = `WEEK ${item.week}`;
    byId('study-scripture').textContent = item.scripture;
    byId('study-title').textContent = item.title;
    byId('study-summary').textContent = item.summary;
    byId('study-video-link').href = item.url;
  }

  function renderGatherings(state) {
    const next = nextGathering(state.selected);
    const place = next.location ? ` · ${escapeHtml(next.location)}` : '';
    byId('next-gathering').innerHTML = `
      <div class="gathering-date-block"><span>NEXT GATHERING</span><strong>${formatDate(next.date)}</strong></div>
      <div class="gathering-copy"><h3>${escapeHtml(next.title)}</h3><p>${escapeHtml(next.time)}${place}</p></div>
      <div class="gathering-countdown">${daysUntil(state.selected, next.date)}</div>`;
    byId('gathering-list').innerHTML = STUDY_CONFIG.gatherings.map((item) => {
      const isNext = item.date === next.date;
      const location = item.location ? `<br>${escapeHtml(item.location)}` : '';
      return `<div class="gathering-mini ${isNext ? 'is-next' : ''}"><span class="mini-date">${shortDate(item.date).toUpperCase()}</span><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.time)}${location}</span></div>`;
    }).join('');
  }

  function weekNumber(dateKey) {
    const start = parseKey(STUDY_CONFIG.startDate);
    return Math.floor((parseKey(dateKey) - start) / 86400000 / 7) + 1;
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
      return `<details class="week-details"${open}><summary class="week-summary"><span><span class="week-summary-title">Week ${week}</span><span class="week-summary-subtitle">${shortDate(start)} – ${shortDate(end)}</span></span><span class="week-summary-icon">+</span></summary><div class="reading-rows">${entries.map((reading) => {
        const today = reading.date === state.reading.date;
        const url = bibleUrl(reading);
        return `<div class="reading-row ${today ? 'is-today' : ''}"><div class="date-cell"><span class="date-main">${formatDate(reading.date)}</span>${today ? '<span class="today-chip">CURRENT DAY</span>' : ''}</div><div><span class="reading-cell-label">New Testament</span><a class="reading-ref" target="_blank" rel="noopener" href="${url}">${escapeHtml(reading.newTestament)}</a></div><div><span class="reading-cell-label">Wisdom + Old Testament</span><a class="reading-ref" target="_blank" rel="noopener" href="${url}">${escapeHtml(reading.companion)}</a></div><div class="reading-note">${escapeHtml(reading.note)}</div></div>`;
      }).join('')}</div></details>`;
    }).join('');
    const notice = byId('plan-notice');
    if (state.mode === 'upcoming') { notice.style.display = 'block'; notice.textContent = `The plan begins ${formatDate(STUDY_CONFIG.startDate)}. The first day is highlighted above.`; }
    else if (state.mode === 'complete') { notice.style.display = 'block'; notice.textContent = 'The 2026 plan has concluded. The final anchor reading is highlighted above.'; }
  }

  function renderResources() {
    const studyPackage = byId('study-package-link');
    if (!STUDY_CONFIG.studyPackageUrl) {
      studyPackage.removeAttribute('href');
      studyPackage.setAttribute('aria-disabled', 'true');
      const note = studyPackage.querySelector('small');
      if (note) note.textContent = 'Upload the PDF and add its path in js/study-data.js.';
      return;
    }
    studyPackage.href = STUDY_CONFIG.studyPackageUrl;
    studyPackage.removeAttribute('aria-disabled');
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
    renderHero(state); renderToday(state); renderStudy(state); renderGatherings(state); renderReadingPlan(state); renderResources();
    setActiveNav(); setMobileMenu(); registerServiceWorker();
  }
  document.addEventListener('DOMContentLoaded', init);
})();
