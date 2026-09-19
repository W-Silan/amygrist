import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
export async function verifyRuntime(browser){
 const origin='http://127.0.0.1:8788';
 const context=await browser.newContext({viewport:{width:375,height:812},deviceScaleFactor:1,reducedMotion:'reduce'});
 const page=await context.newPage();const runtime=[];
 for(const path of ['/','/amy/','/inner-council/','/does-not-exist/','/robots.txt','/sitemap.xml']){
  const response=await page.request.get(origin+path);assert.equal(response.status(),path==='/does-not-exist/'?404:200);
  assert.equal(response.headers()['x-robots-tag'],'noindex, nofollow');assert.equal(response.headers()['x-content-type-options'],'nosniff');
  runtime.push({path,status:response.status(),robots:response.headers()['x-robots-tag']});
 }
 const slash=await page.request.get(origin+'/amy',{maxRedirects:0});assert.ok([301,308].includes(slash.status()));assert.ok(slash.headers().location?.endsWith('/amy/'));runtime.push({path:'/amy',status:slash.status(),location:slash.headers().location});
 const performance=[];
 await page.addInitScript(()=>{window.__lab={lcp:0,cls:0};new PerformanceObserver(list=>{window.__lab.lcp=list.getEntries().at(-1)?.startTime||0;}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(list=>{for(const entry of list.getEntries())if(!entry.hadRecentInput)window.__lab.cls+=entry.value;}).observe({type:'layout-shift',buffered:true});});
 for(const path of ['/','/amy/','/inner-council/']){
  const client=await context.newCDPSession(page);await client.send('Network.enable');await client.send('Network.setCacheDisabled',{cacheDisabled:true});await client.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1600000/8,uploadThroughput:750000/8});await client.send('Emulation.setCPUThrottlingRate',{rate:4});
  await page.goto(origin+path,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1000);
  performance.push({path,...await page.evaluate(()=>({lcpMs:Math.round(window.__lab.lcp),cls:window.__lab.cls,transferBytes:performance.getEntriesByType('resource').reduce((n,r)=>n+r.transferSize,0),jsBytes:performance.getEntriesByType('resource').filter(r=>r.name.endsWith('.js')).reduce((n,r)=>n+r.transferSize,0),requests:performance.getEntriesByType('resource').length}))});
  await client.detach();
 }
 await context.close();
 await writeFile('verification/runtime-results.json',JSON.stringify({runtime,labConditions:{viewport:'375x812',cpuSlowdown:4,latencyMs:150,downloadMbps:1.6,cache:'disabled',note:'One local Chrome laboratory sample per page, not field data or a Lighthouse score.'},performance},null,2));console.log(JSON.stringify({runtime,performance},null,2));
}
