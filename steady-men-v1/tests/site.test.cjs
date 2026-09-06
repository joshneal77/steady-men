const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const context = vm.createContext({
  document: { addEventListener() {} },
  window: { location: { search: '' } },
  URLSearchParams,
  Intl,
});
vm.runInContext(fs.readFileSync(path.join(root, 'js/study-data.js'), 'utf8'), context);
const app = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
// Exercise the production functions without starting browser rendering.
vm.runInContext(app.replace("document.addEventListener('DOMContentLoaded', init);", `
  globalThis.api = { bibleUrl, whatsappText, readingLinkText, scheduleState, nextStudyNight, toSiteKey, renderStudyNightNote };
`), context);
const config = vm.runInContext('STUDY_CONFIG', context);
const readings = vm.runInContext('READING_PLAN', context);
const { api } = context;
const entry = (date) => readings.find((reading) => reading.date === date);

test('Fall plan has all 76 dates, 66 readings, and exactly 10 Open Sundays', () => {
  assert.equal(config.startDate, '2026-09-21');
  assert.equal(config.endDate, '2026-12-05');
  assert.equal(readings.length, 76);
  assert.equal(readings.filter((reading) => reading.openDay).length, 10);
  readings.forEach((reading, index) => {
    const date = new Date(Date.UTC(2026, 8, 21 + index));
    assert.equal(reading.date, date.toISOString().slice(0, 10));
    assert.equal(Boolean(reading.openDay), date.getUTCDay() === 0);
    assert.ok(reading.note.length > 0);
    assert.equal(reading.note.includes('\ufffd'), false);
  });
});

test('every assigned passage produces an exact single-chapter CSB link', () => {
  for (const reading of readings) {
    if (reading.openDay) {
      assert.equal(api.bibleUrl(reading), '');
      continue;
    }
    assert.match(reading.scripture, /^(Luke|Acts) \d+(?::\d+(?:-\d+)?)?$/);
    const [book, locator] = reading.scripture.split(' ');
    const expected = reading.date === '2026-10-28'
      ? 'https://www.bible.com/bible/1713/LUK.23.1-16,18-25.CSB'
      : `https://www.bible.com/bible/1713/${book === 'Luke' ? 'LUK' : 'ACT'}.${locator.replace(':', '.')}.CSB`;
    assert.equal(api.bibleUrl(reading), expected);
    if (locator.includes('-')) {
      const [start, end] = locator.split(':')[1].split('-').map(Number);
      assert.ok(end >= start);
    }
  }
  assert.equal(api.bibleUrl({ scripture: 'Luke 1:38-2:21' }), '');
  assert.equal(entry('2026-10-28').scripture, 'Luke 23:1-25');
});

test('BibleProject appears only on the four section-start dates', () => {
  const expected = {
    '2026-09-21': 'luke-1-9',
    '2026-10-08': 'luke-10-24',
    '2026-11-02': 'acts-1-12',
    '2026-11-17': 'acts-13-28',
  };
  assert.deepEqual(Array.from(readings.filter((reading) => reading.overview), (reading) => reading.date), Object.keys(expected));
  for (const [date, slug] of Object.entries(expected)) {
    assert.equal(entry(date).overview.url, `https://bibleproject.com/videos/${slug}/`);
  }
});

test('sharing messages contain only the requested text, with optional overviews only for WhatsApp', () => {
  const first = entry('2026-09-21');
  const link = 'https://www.bible.com/bible/1713/LUK.1.1-38.CSB';
  assert.equal(api.whatsappText(first), `*Steady Men 16:13 \u2014 Monday, September 21*\n\n*Reading:* Luke 1:1-38\n${link}\n\nOptional section overview:\nBibleProject - Luke 1-9\nhttps://bibleproject.com/videos/luke-1-9/`);
  assert.equal(api.readingLinkText(first), `Today\u2019s Reading \u2014 Monday, September 21\n\nReading: Luke 1:1-38\n${link}`);
  for (const reading of readings.filter((item) => !item.openDay)) {
    const whatsapp = api.whatsappText(reading);
    const share = api.readingLinkText(reading);
    assert.equal(whatsapp.split('\n').length, reading.overview ? 8 : 4);
    assert.equal(share.split('\n').length, 4);
    assert.ok(whatsapp.includes(api.bibleUrl(reading)));
    assert.ok(share.includes(api.bibleUrl(reading)));
    assert.doesNotMatch(whatsapp + share, /Reading Note|Study Night|steadymen\.ca|Consider/);
    assert.doesNotMatch(share, /BibleProject|Optional|\*/);
  }
  assert.equal(api.whatsappText(entry('2026-10-06')), '*Steady Men 16:13 \u2014 Tuesday, October 6*\n\n*Reading:* Luke 9:1-36\nhttps://www.bible.com/bible/1713/LUK.9.1-36.CSB');
});

test('all seven Study Nights match the guide, including Tuesday October 6 and December 7 wrap-up', () => {
  assert.deepEqual(Array.from(config.studyNights, (night) => night.date), [
    '2026-09-21', '2026-10-06', '2026-10-19', '2026-11-02', '2026-11-16', '2026-11-30', '2026-12-07',
  ]);
  config.studyNights.forEach((night) => {
    assert.equal(night.time, '8:00-9:30 PM');
    assert.equal(night.location, 'In person');
    assert.match(night.note, /WhatsApp/);
    assert.equal(api.nextStudyNight(night.date).date, night.date);
  });
  assert.equal(api.renderStudyNightNote(entry('2026-10-05')), '');
  assert.match(api.renderStudyNightNote(entry('2026-10-06')), /Study Night 2/);
  assert.equal(api.nextStudyNight('2026-12-06').date, '2026-12-07');
  assert.equal(api.nextStudyNight('2026-12-08'), null);
});

test('pre-start, open Sunday, section changes, final reading, and post-plan previews', () => {
  for (const [date, mode, scripture] of [
    ['2026-09-20', 'upcoming', 'Luke 1:1-38'],
    ['2026-09-21', 'active', 'Luke 1:1-38'],
    ['2026-09-27', 'active', 'OPEN SUNDAY'],
    ['2026-10-06', 'active', 'Luke 9:1-36'],
    ['2026-10-08', 'active', 'Luke 10'],
    ['2026-11-02', 'active', 'Acts 1'],
    ['2026-11-17', 'active', 'Acts 13:1-25'],
    ['2026-12-05', 'active', 'Acts 28'],
    ['2026-12-06', 'complete', 'Acts 28'],
  ]) {
    context.window.location.search = `?preview=${date}`;
    const state = api.scheduleState();
    assert.equal(state.mode, mode);
    assert.equal(state.reading.scripture, scripture);
  }
});

test('Toronto midnight and daylight saving boundaries are independent of device timezone', () => {
  for (const [instant, day] of [
    ['2026-09-21T03:59:59Z', '2026-09-20'],
    ['2026-09-21T04:00:00Z', '2026-09-21'],
    ['2026-11-01T05:59:59Z', '2026-11-01'],
    ['2026-11-01T06:00:00Z', '2026-11-01'],
    ['2026-11-02T04:59:59Z', '2026-11-01'],
    ['2026-11-02T05:00:00Z', '2026-11-02'],
    ['2026-12-06T05:00:00Z', '2026-12-06'],
  ]) assert.equal(api.toSiteKey(new Date(instant)), day);
});

test('current download exists and active site files have no summer links or video curriculum', () => {
  assert.ok(fs.statSync(path.join(root, config.studyPackageUrl)).size > 0);
  assert.equal(config.whatsAppUrl, '');
  assert.equal(config.showOptionalResources, false);
  assert.equal(config.optionalResources.length, 0);
  for (const file of ['index.html', 'js/app.js', 'js/study-data.js', 'manifest.webmanifest']) {
    assert.doesNotMatch(fs.readFileSync(path.join(root, file), 'utf8'), /summer|biblegateway|rightnow|2026-07-|2026-08-|Psalm 1/i);
  }
});
