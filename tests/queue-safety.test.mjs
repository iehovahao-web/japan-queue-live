import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const script=fs.readFileSync(new URL('../app.js',import.meta.url),'utf8');
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const keys=['application','permission','residence-card','consultation','permanent-card-renewal','others'];
const BASE=Date.parse('2026-10-24T13:00:00+09:00');
async function browser({stale=false,updatedAt=new Date(BASE).toISOString(),savedLanguage='en'}={}){
 let now=BASE;
 class Clock extends Date{constructor(...a){super(...(a.length?a:[now]));}static now(){return now;}}
 const el=new Map();
 for(const [,id] of html.matchAll(/\bid="([^"]+)"/g))el.set(id,{value:'',textContent:'',hidden:false,className:'',style:{},options:[],attributes:{},listeners:{},classList:{remove(){}},addEventListener(k,fn){this.listeners[k]=fn;},setAttribute(k,v){this.attributes[k]=v;}});
 el.get('service').value='application';el.get('service').options=keys.map(value=>({value,textContent:''}));el.get('office').options=[{textContent:''}];
 let failed=false,requestCount=0;const intervals=[];
 const payload={ok:true,updatedAt,stale,services:Object.fromEntries(keys.map((k,i)=>[k,{current:100+i*100,waiting:3}]))};
 const store=new Map([['jql-lang',savedLanguage]]);
 const doc={documentElement:{lang:''},hidden:false,getElementById:id=>el.get(id),querySelectorAll:()=>[],querySelector:()=>({textContent:''}),addEventListener(){}};
 const context=vm.createContext({document:doc,localStorage:{getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,v)},navigator:{userAgent:'Node'},window:{addEventListener(){}},Date:Clock,Intl,AbortController,console,setInterval(fn,delay){intervals.push({fn,delay});return intervals.length;},setTimeout(){return 1;},clearTimeout(){},fetch:async()=>{requestCount++;if(failed)throw Error('offline');return{ok:true,json:async()=>structuredClone(payload)};}});
 vm.runInContext(script,context);await new Promise(setImmediate);
 return{el,doc,payload,intervals,requests:()=>requestCount,run:s=>vm.runInContext(s,context),advance:ms=>{now+=ms;},fail:()=>{failed=true;},set:(id,value)=>{el.get(id).value=value;},render:()=>vm.runInContext('render()',context)};
}

test('stale public data never produces numbers-ahead, ETA, progress, or urgent/called advice',async()=>{
 const b=await browser({stale:true,updatedAt:'2026-10-23T17:14:00+09:00'});b.set('ticket','160');b.render();
 assert.equal(b.el.get('statusBadge').textContent,'STALE');assert.equal(b.el.get('remainingNumber').textContent,'—');assert.equal(b.el.get('currentNumber').textContent,'—');assert.equal(b.el.get('eta').textContent,'—');assert.equal(b.el.get('progressLabel').textContent,'—');
});
test('negative, zero, decimal, exponent and out-of-range ticket numbers are rejected before calculating',async()=>{
 const b=await browser();for(const invalid of ['-1','0','1.5','1e3','10000','abc']){b.set('ticket',invalid);b.render();assert.equal(b.el.get('statusBadge').textContent,'INVALID',invalid);assert.equal(b.el.get('remainingNumber').textContent,'—');assert.equal(b.el.get('ticket').attributes['aria-invalid'],'true');}
});
test('valid fresh official numbers still calculate all four recommendation boundaries',async()=>{
 const b=await browser();for(const [ticket,badge,ahead] of [['200','SAFE',100],['140','RETURN',40],['120','URGENT',20],['100','NOW',0]]){b.set('ticket',ticket);b.render();assert.equal(b.el.get('statusBadge').textContent,badge);assert.equal(b.el.get('remainingNumber').textContent,ahead);}
});
test('manual entry affects only the selected service and cannot make stale official data fresh',async()=>{
 const b=await browser({stale:true,updatedAt:'2026-10-23T17:14:00+09:00'});b.set('ticket','160');b.set('manualCurrent','100');b.set('manualWaiting','3');b.run("$('manualBtn').listeners.click()");assert.equal(b.el.get('statusBadge').textContent,'MANUAL');assert.equal(b.el.get('remainingNumber').textContent,60);
 b.set('service','permission');b.run("$('service').listeners.change()");b.set('ticket','160');b.render();assert.equal(b.el.get('statusBadge').textContent,'STALE');assert.equal(b.el.get('currentNumber').textContent,'—');assert.match(b.el.get('officialUpdated').textContent,/23/);assert.match(b.el.get('officialUpdated').textContent,/STALE/);
});
test('invalid manual numbers are rejected and do not replace a known official service',async()=>{
 const b=await browser();b.set('ticket','160');for(const [current,waiting] of [['-1','3'],['10.5','3'],['10000','3'],['100','10001']]){b.set('manualCurrent',current);b.set('manualWaiting',waiting);b.run("$('manualBtn').listeners.click()");assert.notEqual(b.el.get('manualError').textContent,'');assert.equal(b.el.get('currentNumber').textContent,100);}
});
test('manual zero is allowed, waiting count is optional, and the reference expires after five minutes',async()=>{
 // official data for this service is also stale, so nothing fresh can take over after expiry
 const b=await browser({stale:true,updatedAt:'2026-10-23T17:14:00+09:00'});b.set('ticket','160');b.set('manualCurrent','0');b.set('manualWaiting','');b.run("$('manualBtn').listeners.click()");assert.equal(b.el.get('statusBadge').textContent,'MANUAL');assert.equal(b.el.get('waitingPeople').textContent,'—');b.advance(5*60*1000+1);b.render();assert.equal(b.el.get('statusBadge').textContent,'STALE');assert.equal(b.el.get('remainingNumber').textContent,'—');assert.equal(b.el.get('sourceState').textContent,'Manual data expired');
});
test('browser time re-check blocks expired data, previous-Japan-day data, invalid timestamps and future timestamps',async()=>{
 for(const updatedAt of ['invalid','2026-10-24T15:00:00+09:00','2026-10-23T23:59:00+09:00']){const b=await browser({updatedAt});b.set('ticket','160');b.render();assert.equal(b.el.get('statusBadge').textContent,'STALE',updatedAt);}
 const b=await browser();b.set('ticket','160');b.advance(120*60*1000+1);b.render();assert.equal(b.el.get('statusBadge').textContent,'STALE');
});
test('connection failure cannot reuse official data, but does not delete another service manual reference',async()=>{
 const b=await browser();b.set('manualCurrent','90');b.set('manualWaiting','2');b.run("$('manualBtn').listeners.click()");b.fail();await b.run('loadQueue()');b.set('ticket','100');b.render();assert.equal(b.el.get('statusBadge').textContent,'MANUAL');b.set('service','permission');b.render();assert.equal(b.el.get('statusBadge').textContent,'NO DATA');
});
test('manual references can explicitly return to the selected service official data',async()=>{
 const b=await browser();b.set('ticket','160');b.set('manualCurrent','90');b.set('manualWaiting','2');b.run("$('manualBtn').listeners.click()");b.run("$('officialMode').listeners.click()");await new Promise(setImmediate);assert.equal(b.el.get('remainingNumber').textContent,60);assert.equal(b.el.get('sourceState').textContent,'Official data connected');
});
test('all three languages explain stale and invalid states; invalid saved language cannot crash initialization',async()=>{
 for(const lang of ['en','ja','zh-Hant']){const b=await browser({stale:true,savedLanguage:lang});b.set('ticket','160');b.render();assert.equal(b.doc.documentElement.lang,lang);assert.equal(b.el.get('statusBadge').textContent,'STALE');assert.notEqual(b.el.get('statusTitle').textContent,'staleTitle');b.set('ticket','-1');b.render();assert.equal(b.el.get('statusBadge').textContent,'INVALID');}
 const b=await browser({savedLanguage:'unknown'});assert.equal(b.doc.documentElement.lang,'zh-Hant');
});


test('visible queue polling refreshes at the official 30-second cadence and skips hidden tabs',async()=>{
 const b=await browser();const timer=b.intervals.find(x=>x.fn.name==='pollOfficialQueue');assert.ok(timer);assert.equal(timer.delay,30000);
 const before=b.requests();b.doc.hidden=true;timer.fn();await new Promise(setImmediate);assert.equal(b.requests(),before);
 b.doc.hidden=false;b.payload.services.application.current=125;timer.fn();await new Promise(setImmediate);assert.equal(b.requests(),before+1);assert.equal(b.el.get('currentNumber').textContent,125);
});
test('a polling failure removes official advice without promoting a manual entry to another service',async()=>{
 const b=await browser();b.set('ticket','160');b.fail();b.run('pollOfficialQueue()');await new Promise(setImmediate);assert.equal(b.el.get('statusBadge').textContent,'NO DATA');assert.equal(b.el.get('remainingNumber').textContent,'—');
});
