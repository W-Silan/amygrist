import {chromium} from 'playwright';

const route = process.argv[2];
const name = process.argv[3];
if (!route || !name) throw new Error('Usage: node scripts/capture-route.mjs /route/ filename-prefix');

const browser = await chromium.launch({headless:true, executablePath:'/usr/bin/google-chrome', args:['--no-sandbox']});
for (const width of [375, 1440]) {
  const page = await browser.newPage({viewport:{width,height:900}, deviceScaleFactor:1});
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const response = await page.goto(`http://127.0.0.1:4323${route}`, {waitUntil:'networkidle'});
  if (!response?.ok()) throw new Error(`${width}px returned ${response?.status()}`);
  const result = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    brokenImages: [...document.images].filter(image => image.complete && !image.naturalWidth).map(image => image.currentSrc),
  }));
  if (result.overflow || result.brokenImages.length || errors.length) throw new Error(`${width}px failed: ${JSON.stringify({...result, errors})}`);
  await page.screenshot({path:`verification/${name}-${width}.png`, fullPage:true});
  console.log(`${width}px: status ${response.status()}, no overflow, broken images or browser errors`);
  await page.close();
}
await browser.close();
