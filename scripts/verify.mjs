import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
const base=process.env.TEST_URL || 'http://127.0.0.1:4321';
await mkdir('verification',{recursive:true});
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
if(process.argv.includes('--runtime')){const {verifyRuntime}=await import('./verify-runtime.mjs');await verifyRuntime(browser);await browser.close();process.exit(0);}
const results=[];
for(const width of [375,768,1440]){
 for(const route of ['/','/amy/','/inner-council/']){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{window.__metrics={};new PerformanceObserver(list=>{window.__metrics.lcp=list.getEntries().at(-1)?.startTime;}).observe({type:'largest-contentful-paint',buffered:true});});
  const response=await page.goto(base+route);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
  if(route!=='/inner-council/') await page.locator('.hero img').first().waitFor();
  assert.equal(await page.locator('.submenu:visible').count(),0,'Submenus must start closed');
  if(route==='/') {for(let i=0;i<(width<1000?3:2);i++)await page.getByRole('button',{name:'Next slide',exact:true}).click();}
  await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,35));}window.scrollTo(0,0);});
  await page.waitForTimeout(150);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false,`${width} ${route} overflow`);
  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://amygrist.com'+route);
  const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>i.getClientRects().length&&(!i.complete||!i.naturalWidth)).map(i=>i.src));assert.deepEqual(broken,[]);
  const name=route==='/'?'home':route==='/amy/'?'amy':'inner-council';await page.screenshot({path:`verification/${name}-${width}.png`,fullPage:true});
  await page.screenshot({path:`verification/top-${name}-${width}.png`});
  if(width<1000){await page.getByRole('button',{name:'Menu',exact:true}).focus();await page.keyboard.press('Enter');assert.equal(await page.getByRole('button',{name:'Menu',exact:true}).getAttribute('aria-expanded'),'true');}
  await page.getByRole('button',{name:'Offerings',exact:true}).focus();await page.keyboard.press('Enter');await page.getByRole('navigation').getByRole('link',{name:'Inner Child Practitioner Training',exact:true}).waitFor({state:'visible'});
  await page.screenshot({path:`verification/menu-${name}-${width}.png`});
  const menuAxe=await new AxeBuilder({page}).include('#site-header').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  await page.keyboard.press('Escape');assert.equal(await page.getByRole('button',{name:'Offerings',exact:true}).getAttribute('aria-expanded'),'false');
  if(width<1000){await page.keyboard.press('Escape');assert.equal(await page.getByRole('button',{name:'Menu',exact:true}).getAttribute('aria-expanded'),'false');}
  if(route==='/'){await page.getByRole('button',{name:'Next testimonial'}).click();assert.match(await page.locator('.testimonials figure:not([hidden])').innerText(),/Jocelyn/);}
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  const metrics=await page.evaluate(()=>({lcpMs:window.__metrics.lcp,domContentLoadedMs:performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd,height:document.body.scrollHeight,resources:performance.getEntriesByType('resource').length}));
  results.push({route,width,overflow,errors,metrics,menuAccessibility:menuAxe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),accessibility:axe.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});assert.deepEqual(errors,[]);
  if(axe.violations.length||menuAxe.violations.length) console.error(JSON.stringify({route,width,page:axe.violations,menu:menuAxe.violations},null,2));
  assert.equal(axe.violations.length,0,`${route} ${width}: page accessibility violations`);assert.equal(menuAxe.violations.length,0,`${route} ${width}: menu accessibility violations`);
  await context.close();
 }
}
const context=await browser.newContext();const page=await context.newPage();const missing=await page.goto(base+'/this-route-does-not-exist/');assert.equal(missing.status(),404);
const localLinks=new Set();for(const route of ['/','/amy/','/inner-council/']){await page.goto(base+route);for(const url of await page.locator('a[href]').evaluateAll(a=>a.map(n=>n.getAttribute('href')).filter(h=>h?.startsWith('/'))))localLinks.add(url);}
for(const link of localLinks){const response=await page.request.get(base+link);assert.equal(response.status(),200,link);}
const manifest=JSON.parse(await readFile('migration/media-originals.json','utf8'));for(const image of manifest){const data=await readFile(image.asset);assert.equal(createHash('sha256').update(data).digest('hex'),image.sha256);const archive=await readFile('amy-grist-astro-starter-docs/uploads/'+image.original);assert.equal(createHash('sha256').update(archive).digest('hex'),image.sha256);}
const inventory=JSON.parse(await readFile('ROUTE-INVENTORY.json','utf8'));assert.ok(inventory.entries.filter(e=>e.sourceType==='post').every(e=>e.sourceUrl===e.targetUrl&&!e.targetUrl.startsWith('/blog/')));
await writeFile('verification/browser-results.json',JSON.stringify({base,results,localLinks:[...localLinks],originalsVerified:manifest.length,rootPostUrlsPreserved:true},null,2));
await browser.close();console.log(JSON.stringify(results.map(({route,width,metrics,accessibility})=>({route,width,metrics,violations:accessibility.map(v=>({id:v.id,count:v.nodes.length}))})),null,2));
