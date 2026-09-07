const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const output = process.env.QA_OUTPUT || fs.mkdtempSync(path.join(os.tmpdir(), 'steady-men-mobile-'));
fs.mkdirSync(output, { recursive: true });
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.png': 'image/png', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json' };
const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    fs.createReadStream(path.join(root, '404.html')).pipe(response);
    return;
  }
  response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(response);
});

(async () => {
  let browser;
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}) });
    const page = await browser.newPage({ viewport: { width: 375, height: 600 }, serviceWorkers: 'block' });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(base);
    const readings = await page.evaluate(() => READING_PLAN.filter((reading) => !reading.openDay).map((reading) => reading.date));
    async function checkFirstScreen(date) {
      await page.goto(base + `/?preview=${date}`);
      const checks = await page.evaluate(() => {
        const navTop = document.querySelector('.bottom-nav').getBoundingClientRect().top;
        const ids = ['today-new-testament', 'today-reading-link', 'today-copy-button', 'today-share-button'];
        return ids.map((id) => {
          const element = document.getElementById(id);
          const box = element.getBoundingClientRect();
          const hit = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2);
          return {
            id, visible: box.top >= 0 && box.bottom <= navTop && box.width > 0,
            unobstructed: element.contains(hit),
            fits: element.scrollWidth <= element.clientWidth + 1,
            tappable: id === 'today-new-testament' || box.height >= 44,
          };
        });
      });
      for (const check of checks) {
        assert.ok(check.visible && check.unobstructed && check.fits && check.tappable, `${date}: ${JSON.stringify(check)}`);
      }
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), date);
    }
    for (const date of readings) await checkFirstScreen(date);
    for (const [width, height] of [[320, 568], [375, 600], [390, 664], [430, 740]]) {
      await page.setViewportSize({ width, height });
      for (const date of ['2026-09-20', '2026-09-21', '2026-09-24', '2026-10-06', '2026-11-17', '2026-12-05', '2026-12-06']) await checkFirstScreen(date);
      await page.goto(base + '/?preview=2026-10-06');
      await page.screenshot({ path: path.join(output, `first-screen-${width}.png`) });
    }
    await page.goto(base + '/?preview=2026-09-27');
    assert.equal(await page.locator('#today-new-testament').innerText(), 'OPEN SUNDAY');
    assert.equal(await page.locator('#today-copy-button').isVisible(), false);
    assert.equal(await page.locator('#today-share-button').isVisible(), false);
    await page.screenshot({ path: path.join(output, 'open-sunday.png') });
    const response = await page.goto(base + '/missing-page');
    assert.equal(response.status(), 404);
    assert.ok(await page.locator('a[href="/"]').last().isVisible());
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.setViewportSize({ width: 1440, height: 900 });
    assert.ok(await page.evaluate(() => {
      const main = document.querySelector('main').getBoundingClientRect();
      const rail = document.querySelector('.site-header').getBoundingClientRect();
      const link = document.querySelector('main a');
      const box = link.getBoundingClientRect();
      return main.left >= rail.right && link.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2));
    }), '404 content and return link must not sit behind the desktop rail');
    await page.screenshot({ path: path.join(output, '404-desktop.png') });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert.deepEqual(errors, []);
    console.log('PASS: all 66 readings fit above the mobile fold with both copy actions unobstructed.');
    console.log('PASS: 320-430px phones, pre-start/final states, Open Sunday, and responsive 404.');
    console.log('Screenshots: ' + output);
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
