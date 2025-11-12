const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const results = { console: [], errors: [], network: [] };
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', (msg) => {
    const type = msg.type();
    const text = msg.text();
    results.console.push({ type, text });
    if (type === 'error') results.errors.push(text);
  });

  page.on('pageerror', (err) => {
    results.errors.push(err.message || String(err));
  });

  page.on('requestfailed', (req) => {
    results.network.push({ url: req.url(), failure: req.failure() ? req.failure().errorText : 'unknown' });
  });

  try {
    // Open the app
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

    // If there's a link or button to login, try to navigate to /login
    try {
      await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle' });
    } catch (e) {
      // ignore
    }

    // Attempt to fill login form fields if present
    // Try common selectors
    const emailSelectors = ["input[type='email']", "input[name='email']", "#email", "input[placeholder*='Email']", "input[placeholder*='email']"];
    const passSelectors = ["input[type='password']", "input[name='senha']", "#senha", "input[name='password']", "input[placeholder*='Senha']"];
    const submitSelectors = ["button[type='submit']", "button:has-text('Entrar')", "button:has-text('Login')", "button:has-text('Entrar no sistema')"];

    let emailInput = null;
    for (const sel of emailSelectors) {
      const el = await page.$(sel);
      if (el) { emailInput = sel; break; }
    }

    if (emailInput) {
      await page.fill(emailInput, 'teste@teste.com');
    }

    let passInput = null;
    for (const sel of passSelectors) {
      const el = await page.$(sel);
      if (el) { passInput = sel; break; }
    }

    if (passInput) {
      await page.fill(passInput, 'senha1234');
    }

    let submitBtn = null;
    for (const sel of submitSelectors) {
      const el = await page.$(sel);
      if (el) { submitBtn = sel; break; }
    }

    if (submitBtn) {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle', timeout: 5000 }).catch(() => {}),
        page.click(submitBtn).catch(() => {}),
      ]);
    } else {
      // If no submit found, try pressing Enter on password
      if (passInput) {
        await page.press(passInput, 'Enter').catch(() => {});
        await page.waitForTimeout(1000);
      }
    }

    // Wait a bit for any console logs
    await page.waitForTimeout(1500);

    // Capture screenshot for manual inspection
    const screenshotPath = 'scripts/e2e_screenshot.png';
    await page.screenshot({ path: screenshotPath, fullPage: false }).catch(() => {});

    // Save results
    fs.writeFileSync('scripts/e2e_console.json', JSON.stringify(results, null, 2));
    console.log('E2E capture complete. Results saved to scripts/e2e_console.json');
    console.log('Console messages count:', results.console.length);
    if (results.errors.length > 0) {
      console.log('Errors captured:', results.errors.length);
      console.log(results.errors.slice(0,5));
    }
  } catch (err) {
    console.error('E2E script error', err);
  } finally {
    await browser.close();
  }
})();
