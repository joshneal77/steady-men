(() => {
  const byId = (id) => document.getElementById(id);
  const SITE_TIME_ZONE = 'America/Toronto';
  const BIBLE_COM_VERSION_ID = '1713';
  const BIBLE_COM_VERSION_CODE = 'CSB';
  const BIBLE_BOOK_CODES = {
    'Luke': 'LUK',
    'Acts': 'ACT'
  };
  const copyFeedbackTimers = new WeakMap();
  let displayedDate = null;

  function dateFormatter(options) {
    return new Intl.DateTimeFormat('en-CA', { timeZone: SITE_TIME_ZONE, ...options });
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
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null;
    const date = parseKey(value);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value ? value : null;
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
    if (reading.openDay) return '';
    if (reading.bibleUrl) return reading.bibleUrl;
    const reference = reading.scripture.trim().replace(/[\u2013\u2014]/g, '-');
    const match = /^(Luke|Acts) (\d+)(?::(\d+)(?:-(\d+))?)?$/.exec(reference);
    if (!match) return '';
    const [, book, chapter, start, end] = match;
    const verses = start ? `.${start}${end ? `-${end}` : ''}` : '';
    return `https://www.bible.com/bible/${BIBLE_COM_VERSION_ID}/${BIBLE_BOOK_CODES[book]}.${chapter}${verses}.${BIBLE_COM_VERSION_CODE}`;
  }

  function setReadingLink(link, reading) {
    if (!link) return;
    const url = bibleUrl(reading);
    if (!url) {
      link.classList.add('hidden');
      link.removeAttribute('href');
      link.removeAttribute('target');
      link.removeAttribute('rel');
      return;
    }
    link.classList.remove('hidden');
    link.href = url;
    link.textContent = 'Open in Bible App';
    link.target = '_blank';
    link.rel = 'noopener';
  }

  function renderOverview(reading) {
    if (!reading.overview || reading.openDay) return '';
    return `<a class="optional-overview text-link" href="${escapeHtml(reading.overview.url)}" target="_blank" rel="noopener"><span>Optional Section Overview<br>${escapeHtml(reading.overview.title)}</span></a>`;
  }

  function renderStudyNightNote(reading) {
    const gathering = STUDY_CONFIG.studyNights.find((item) => item.date === reading.date);
    if (!gathering) return '';
    return `<div class="study-night-note">${escapeHtml(gathering.title)} - ${escapeHtml(gathering.time)}<br>${escapeHtml(gathering.location)}. ${escapeHtml(gathering.note)}</div>`;
  }

  function getReminder(dateKey) {
    const start = parseKey(STUDY_CONFIG.startDate);
    const current = parseKey(dateKey);
    const day = Math.max(0, Math.round((current - start) / 86400000));
    return STUDY_CONFIG.brotherhoodReminders[day % STUDY_CONFIG.brotherhoodReminders.length];
  }

  function isScheduledGathering(item) {
    return /^\d{4}-\d{2}-\d{2}$/.test(item.date || '');
  }

  function gatheringDateLabel(item, style = 'long') {
    if (!isScheduledGathering(item)) return item.dateLabel || 'Date TBD';
    return style === 'short' ? shortDate(item.date).toUpperCase() : formatDate(item.date);
  }

  function gatheringCountdown(fromKey, item) {
    if (!isScheduledGathering(item)) return 'TBD';
    return daysUntil(fromKey, item.date);
  }

  function nextStudyNight(selected) {
    return STUDY_CONFIG.studyNights.find((item) => isScheduledGathering(item) && item.date >= selected)
      || STUDY_CONFIG.studyNights.find((item) => !isScheduledGathering(item))
      || null;
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
    byId('hero-kicker').textContent = preview ? `PREVIEW - ${formatDate(state.selected).toUpperCase()}` : 'FALL SESSION 2026 · LUKE + ACTS';
    if (mode === 'upcoming') status.textContent = `Our journey through Luke and Acts begins ${formatDate(STUDY_CONFIG.startDate)}, with Launch Night in person from ${STUDY_CONFIG.studyNights[0].time}.`;
    else if (mode === 'complete') status.textContent = 'The Fall reading plan is complete. Keep living as witnesses where God has placed us.';
    else status.textContent = '';
    setReadingLink(byId('hero-reading-link'), reading);
  }

  function renderToday(state) {
    const { reading } = state;
    byId('today-date').textContent = formatDate(reading.date);
    byId('today-new-testament').textContent = reading.scripture;
    byId('today-companion').textContent = reading.theme;
    byId('today-note').textContent = reading.note;
    byId('today-overview').innerHTML = renderOverview(reading);
    byId('today-study-night').innerHTML = renderStudyNightNote(reading);
    byId('today-reading-label').textContent = state.browsing ? 'FROM THE READING PLAN' : state.mode === 'upcoming' ? 'OPENING READING' : state.mode === 'complete' ? 'FINAL READING' : "TODAY'S READING";
    document.querySelector('.daily-note h2').textContent = reading.openDay ? 'Open Sunday' : 'Reading Note';
    byId('today-translation').classList.toggle('hidden', Boolean(reading.openDay));
    const index = READING_PLAN.findIndex((item) => item.date === reading.date);
    byId('previous-reading').disabled = index === 0;
    byId('next-reading').disabled = index === READING_PLAN.length - 1;
    byId('return-today').disabled = !state.browsing;
    byId('return-today').textContent = state.mode === 'upcoming' ? 'Opening day' : state.mode === 'complete' ? 'Final day' : 'Today';
    setReadingLink(byId('today-reading-link'), reading);
    setReadingLink(byId('hero-reading-link'), reading);
    byId('brotherhood-reminder').textContent = getReminder(reading.date);
    ['today-copy-button', 'today-share-button'].forEach((id) => {
      const copyButton = byId(id);
      if (!copyButton) return;
      copyButton.dataset.date = reading.date;
      copyButton.classList.toggle('hidden', Boolean(reading.openDay));
    });
    const whatsApp = byId('whatsapp-link');
    if (STUDY_CONFIG.whatsAppUrl) {
      whatsApp.href = STUDY_CONFIG.whatsAppUrl;
      whatsApp.classList.remove('hidden');
    }
  }

  function renderStudyNights(state) {
    const next = nextStudyNight(state.selected);
    byId('next-gathering-preview').innerHTML = next
      ? `<span><span class="eyebrow">NEXT STUDY NIGHT</span><strong>${gatheringDateLabel(next)}</strong><small>${escapeHtml(next.title)} · ${escapeHtml(next.time)}</small></span><span class="icon icon-arrow-right" aria-hidden="true"></span>`
      : '<span><span class="eyebrow">STEADY TOGETHER</span><strong>Fall gatherings complete</strong></span><span class="icon icon-arrow-right" aria-hidden="true"></span>';
    if (!next) {
      byId('next-study-night').innerHTML = `
        <div class="gathering-date-block"><span>GATHERINGS COMPLETE</span><strong>Keep Going</strong></div>
        <div class="gathering-copy"><h3>Fall gatherings complete</h3><p>Keep showing up in Scripture, prayer, and brotherhood.</p></div>
        <div class="gathering-countdown">Completed</div>`;
      byId('study-night-list').innerHTML = STUDY_CONFIG.studyNights.map((item) => {
        const location = item.location ? `<br>${escapeHtml(item.location)}` : '';
        return `<div class="gathering-mini"><span class="mini-date">${gatheringDateLabel(item)}</span><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.time)}${location}</span></div>`;
      }).join('');
      return;
    }
    const place = next.location ? ` - ${escapeHtml(next.location)}` : '';
    byId('next-study-night').innerHTML = `
      <div class="gathering-date-block"><span>NEXT STUDY NIGHT</span><strong>${gatheringDateLabel(next)}</strong></div>
      <div class="gathering-copy"><h3>${escapeHtml(next.title)}</h3><p>${escapeHtml(next.time)}${place}<br>${escapeHtml(next.note || '')}</p></div>
      <div class="gathering-countdown">${gatheringCountdown(state.selected, next)}</div>`;
    byId('study-night-list').innerHTML = STUDY_CONFIG.studyNights.map((item) => {
      const isNext = item === next;
      const location = item.location ? `<br>${escapeHtml(item.location)}` : '';
      return `<div class="gathering-mini ${isNext ? 'is-next' : ''}"><span class="mini-date">${gatheringDateLabel(item)}</span><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.time)}${location}</span></div>`;
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

  function readingDateHref(date) {
    const params = new URLSearchParams(window.location.search);
    params.set('day', date);
    return `?${params}#today`;
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
      return `<details class="week-details" id="week-${week}"${open}><summary class="week-summary"><span><span class="week-summary-title">Week ${week}: ${escapeHtml(theme)}</span><span class="week-summary-subtitle">${shortDate(start)} - ${shortDate(end)} | ${escapeHtml(focus)}</span></span><span class="week-summary-icon" aria-hidden="true">+</span></summary><div class="reading-rows">${entries.map((reading) => {
        const current = state.mode === 'active' && reading.date === state.selected;
        const completed = !current && isBefore(reading.date, state.selected);
        const classes = ['reading-row'];
        if (current) classes.push('is-today');
        if (completed) classes.push('is-completed');
        if (reading.openDay) classes.push('is-open-day');
        const statusChip = current
          ? '<span class="today-chip">CURRENT DAY</span>'
          : completed
            ? `<span class="completed-chip">${reading.openDay ? 'OPEN SUNDAY COMPLETED' : 'READING COMPLETED'}</span>`
            : '';
        const actions = reading.openDay ? '' : `<div class="reading-actions"><a class="text-link reading-app-link" href="${bibleUrl(reading)}" target="_blank" rel="noopener">Open in Bible App</a><button class="copy-reading-button" type="button" data-date="${reading.date}" data-copy-kind="whatsapp" data-default-label="Copy for WhatsApp">Copy for WhatsApp</button><button class="copy-reading-button" type="button" data-date="${reading.date}" data-copy-kind="reading-link" data-default-label="Copy Reading Link">Copy Reading Link</button></div>`;
        return `<div class="${classes.join(' ')}" data-reading-date="${reading.date}"><div class="date-cell"><a class="date-main" href="${escapeHtml(readingDateHref(reading.date))}" data-view-date="${reading.date}" aria-label="View reading for ${formatDate(reading.date)}">${formatDate(reading.date)}</a>${statusChip}</div><div><span class="reading-cell-label">Passage</span>${renderReadingReference(reading)}</div><div class="reading-note"><span class="reading-cell-label">${reading.openDay ? 'Open Sunday' : 'Reading Note'}</span>${escapeHtml(reading.note)}${renderStudyNightNote(reading)}${renderOverview(reading)}</div>${actions}</div>`;
      }).join('')}</div></details>`;
    }).join('');
    byId('week-select').innerHTML = [...weekGroups.entries()].map(([week, entries]) => `<option value="${week}">Week ${week} · ${shortDate(entries[0].date)} - ${shortDate(entries[entries.length - 1].date)}</option>`).join('');
    byId('week-select').value = String(activeWeek);
    const notice = byId('plan-notice');
    notice.style.display = 'none';
    if (state.mode === 'upcoming') { notice.style.display = 'block'; notice.textContent = `The plan begins ${formatDate(STUDY_CONFIG.startDate)}. The first week is open above.`; }
    else if (state.mode === 'complete') { notice.style.display = 'block'; notice.textContent = 'The Fall 2026 reading plan is complete. Completed readings are marked above.'; }
  }

  function renderResources() {
    const studyPackage = byId('study-package-link');
    const studyPackageUrl = STUDY_CONFIG.studyPackageUrl;
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
    const optionalSection = optionalList.closest('.optional-resources');
    if (optionalSection) optionalSection.hidden = STUDY_CONFIG.showOptionalResources === false;
    if (STUDY_CONFIG.showOptionalResources === false) {
      optionalList.innerHTML = '';
      return;
    }
    optionalList.innerHTML = (STUDY_CONFIG.optionalResources || []).map((item) => `
      <a class="optional-resource-card" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">
        <span class="reading-cell-label">${escapeHtml(item.type)}</span>
        <strong>${escapeHtml(item.title)}</strong>
        <small>${escapeHtml(item.scripture)}</small>
        <p>${escapeHtml(item.summary)}</p>
      </a>`).join('');
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(text); return; }
      catch { /* Fall back when a browser denies clipboard permission. */ }
    }
    const focusedElement = document.activeElement;
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    try {
      if (!document.execCommand('copy')) throw new Error('Copy failed');
    } finally {
      textarea.remove();
      if (focusedElement && focusedElement.focus) focusedElement.focus({ preventScroll: true });
    }
  }

  function whatsappText(reading) {
    const message = `*Steady Men 16:13 — ${formatDate(reading.date)}*\n\n*Reading:* ${reading.scripture}\n${bibleUrl(reading)}`;
    return reading.overview ? `${message}\n\nOptional section overview:\n${reading.overview.title}\n${reading.overview.url}` : message;
  }

  function readingLinkText(reading) {
    return `Today’s Reading — ${formatDate(reading.date)}\n\nReading: ${reading.scripture}\n${bibleUrl(reading)}`;
  }

  function setCopyFeedback(button, message) {
    const defaultLabel = button.dataset.defaultLabel || 'Copy for WhatsApp';
    button.textContent = message;
    byId('copy-status').textContent = `${defaultLabel}: ${message}`;
    button.classList.add('is-copied');
    window.clearTimeout(copyFeedbackTimers.get(button));
    copyFeedbackTimers.set(button, window.setTimeout(() => {
      button.textContent = defaultLabel;
      button.classList.remove('is-copied');
      if (byId('copy-status').textContent === `${defaultLabel}: ${message}`) byId('copy-status').textContent = '';
    }, 2200));
  }

  function handleCopyButton(button) {
    const reading = READING_PLAN.find((item) => item.date === button.dataset.date);
    if (!reading || reading.openDay) return;
    const message = button.dataset.copyKind === 'reading-link' ? readingLinkText(reading) : whatsappText(reading);
    copyText(message)
      .then(() => setCopyFeedback(button, 'Copied'))
      .catch(() => setCopyFeedback(button, 'Copy failed'));
  }

  function bindCopyButtons() {
    ['today-copy-button', 'today-share-button'].forEach((id) => {
      const button = byId(id);
      if (button) button.addEventListener('click', () => handleCopyButton(button));
    });
    const plan = byId('reading-plan-list');
    plan.addEventListener('click', (event) => {
      const button = event.target.closest('.copy-reading-button');
      if (button) handleCopyButton(button);
    });
  }

  function setActiveNav() {
    const sections = [...document.querySelectorAll('.section-anchor')];
    const navLinks = document.querySelectorAll('[data-nav]');
    let scheduled = false;
    function update() {
      const current = sections.filter((section) => section.getBoundingClientRect().top <= 140).at(-1) || sections[0];
      navLinks.forEach((link) => {
        const active = link.dataset.nav === current.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      scheduled = false;
    }
    window.addEventListener('scroll', () => {
      if (!scheduled) { scheduled = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  function setMobileMenu() {
    const button = byId('menu-button');
    const nav = byId('mobile-nav');
    function closeMenu() {
      nav.hidden = true;
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Open navigation');
    }
    button.addEventListener('click', () => {
      const open = nav.hidden;
      nav.hidden = !open;
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !nav.hidden) { closeMenu(); button.focus(); }
    });
    document.addEventListener('click', (event) => {
      if (!nav.hidden && !nav.contains(event.target) && !button.contains(event.target)) closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 800) closeMenu();
    });
  }

  function openWeek(week, scroll = false) {
    const target = byId(`week-${week}`);
    if (!target) return;
    document.querySelectorAll('.week-details').forEach((details) => { details.open = details === target; });
    byId('week-select').value = String(week);
    if (scroll) target.scrollIntoView({ block: 'start', behavior: 'instant' });
  }

  function showReading() {
    const state = scheduleState();
    if (!READING_PLAN.some((item) => item.date === displayedDate)) displayedDate = null;
    const reading = READING_PLAN.find((item) => item.date === displayedDate) || state.reading;
    const displayState = { ...state, reading, browsing: reading.date !== state.reading.date };
    renderHero(displayState);
    renderToday(displayState);
    openWeek(weekNumber(reading.date));
  }

  function navigateReading(date) {
    displayedDate = READING_PLAN.some((item) => item.date === date) ? date : null;
    const url = new URL(window.location.href);
    if (displayedDate) url.searchParams.set('day', displayedDate);
    else url.searchParams.delete('day');
    window.history.pushState(null, '', url);
    showReading();
  }

  function bindReadingNavigation() {
    ['previous-reading', 'next-reading'].forEach((id, direction) => {
      byId(id).addEventListener('click', () => {
        const date = displayedDate || scheduleState().reading.date;
        const index = READING_PLAN.findIndex((item) => item.date === date);
        const next = READING_PLAN[index + (direction === 0 ? -1 : 1)];
        if (next) navigateReading(next.date);
      });
    });
    byId('return-today').addEventListener('click', () => navigateReading(null));
    byId('reading-plan-list').addEventListener('click', (event) => {
      const link = event.target.closest('[data-view-date]');
      if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      navigateReading(link.dataset.viewDate);
      byId('today').scrollIntoView({ block: 'start', behavior: 'instant' });
      byId('today').focus({ preventScroll: true });
    });
    byId('week-select').addEventListener('change', (event) => openWeek(Number(event.target.value), true));
    byId('plan-current').addEventListener('click', () => openWeek(weekNumber(scheduleState().reading.date), true));
    window.addEventListener('popstate', () => {
      displayedDate = new URLSearchParams(window.location.search).get('day');
      showReading();
    });
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('service-worker.js')
      .then((registration) => registration.update())
      .catch(() => {});
  }

  function init() {
    displayedDate = new URLSearchParams(window.location.search).get('day');
    if (!READING_PLAN.some((item) => item.date === displayedDate)) displayedDate = null;
    let renderedDate;
    function renderDay() {
      const state = scheduleState();
      if (state.selected === renderedDate) return;
      renderedDate = state.selected;
      renderStudyNights(state);
      renderReadingPlan(state);
      showReading();
    }
    renderDay();
    window.setInterval(renderDay, 60000);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) renderDay();
    });
    renderResources();
    bindCopyButtons();
    bindReadingNavigation();
    setActiveNav();
    setMobileMenu();
    registerServiceWorker();
  }
  document.addEventListener('DOMContentLoaded', init);
})();
