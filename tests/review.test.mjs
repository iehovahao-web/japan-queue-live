import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {parseOfficialPage,onRequestGet} from '../functions/api/queue.js';

const official=fs.readFileSync(new URL('./fixtures/official-2026-10-23-1714.html',import.meta.url),'utf8');

/* ---------- parser against the real official page ---------- */
test('real official page: calling-now column is read, never the called list', ()=>{
  const data=parseOfficialPage(official);
  const got=Object.fromEntries(Object.entries(data.services).map(([k,v])=>[k,[v.current,v.waiting]]));
  assert.deepEqual(got,{
    application:[159,0], permission:[1295,1], 'residence-card':[2054,1],
    consultation:[3066,22], 'permanent-card-renewal':[4049,1], others:[5005,0]
  });
  assert.equal(data.updatedAt,'2026-10-23T17:14:00+09:00');
});
test('row without English name (row 5) is kept; empty calling cell skips only that row', ()=>{
  const html=official.replace('<td align=center>4049</td>','<td align=center></td>');
  const data=parseOfficialPage(html);
  assert.equal(data.services['permanent-card-renewal'],undefined);
  assert.equal(data.services.others.current,5005);
});
test('a row whose number and Japanese label disagree is rejected instead of mislabelled', ()=>{
  const html=official.replace('2  許可証印','2  在留・認定申請');
  const data=parseOfficialPage(html);
  assert.equal(data.services.permission,undefined);
  assert.equal(data.services.application.current,159);
});
test('page without a table fails closed', ()=>{
  assert.equal(parseOfficialPage(official.replace(/<tbody>[\s\S]*<\/tbody>/,'<tbody></tbody>')),null);
});
test('API marks previous-Japan-day data stale and returns server time', async()=>{
  const original=globalThis.fetch;
  try{
    globalThis.fetch=async()=>new Response(official);
    const data=await (await onRequestGet()).json();
    assert.equal(data.ok,true); assert.equal(data.stale,true);
    assert.ok(Number.isFinite(Date.parse(data.checkedAt)));
  }finally{globalThis.fetch=original;}
});

/* ---------- browser behaviour ---------- */
const script=fs.readFileSync(new URL('../app.js',import.meta.url),'utf8');
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const keys=['application','permission','residence-card','consultation','permanent-card-renewal','others'];
const BASE=Date.parse('2026-10-24T13:00:00+09:00');
async function browser({deviceOffset=0,updatedAt=new Date(BASE).toISOString(),checkedAt=new Date(BASE).toISOString()}={}){
  let now=BASE+deviceOffset;
  class Clock extends Date{constructor(...a){super(...(a.length?a:[now]));}static now(){return now;}}
  const el=new Map();
  for(const [,id] of html.matchAll(/\bid="([^"]+)"/g))el.set(id,{value:'',textContent:'',hidden:false,open:false,className:'',style:{},options:[],attributes:{},listeners:{},classList:{remove(){},add(){}},addEventListener(k,fn){this.listeners[k]=fn;},setAttribute(k,v){this.attributes[k]=v;}});
  el.get('service').value='application';el.get('service').options=keys.map(value=>({value,textContent:''}));el.get('office').options=[{textContent:''}];
  const payload={ok:true,updatedAt,stale:false,checkedAt,services:Object.fromEntries(keys.map((k,i)=>[k,{current:100+i*100,waiting:3}]))};
  const doc={documentElement:{lang:''},hidden:false,getElementById:id=>el.get(id),querySelectorAll:()=>[],querySelector:()=>({textContent:''}),addEventListener(){}};
  const ctx=vm.createContext({document:doc,localStorage:{getItem:()=> 'en',setItem(){}},navigator:{userAgent:'Node'},window:{addEventListener(){}},Date:Clock,Intl,AbortController,console,setInterval(){return 1;},setTimeout(){return 1;},clearTimeout(){},fetch:async()=>({ok:true,json:async()=>structuredClone(payload)})});
  vm.runInContext(script,ctx);await new Promise(setImmediate);
  return{el,run:s=>vm.runInContext(s,ctx),advance:ms=>{now+=ms;},set:(id,v)=>{el.get(id).value=v;},render:()=>vm.runInContext('render()',ctx)};
}
test('full-width digits from an IME are accepted; full-width minus is rejected', async()=>{
  const b=await browser(); b.set('ticket','１２０'); b.render();
  assert.equal(b.el.get('statusBadge').textContent,'URGENT'); assert.equal(b.el.get('remainingNumber').textContent,20);
  b.set('ticket','－１'); b.render(); assert.equal(b.el.get('statusBadge').textContent,'INVALID');
});
test('an expired manual reference falls back to fresh official data for that service', async()=>{
  const b=await browser(); b.set('ticket','160'); b.set('manualCurrent','90'); b.set('manualWaiting','');
  b.run("$('manualBtn').listeners.click()"); assert.equal(b.el.get('statusBadge').textContent,'MANUAL');
  assert.equal(b.el.get('manualDetails').open,true);
  b.advance(5*60*1000+1); b.render();
  // official data is 5 minutes old and still within its window
  assert.equal(b.el.get('statusBadge').textContent,'SAFE'); assert.equal(b.el.get('currentNumber').textContent,100);
});
test('a device clock that is behind cannot make old official data look fresh', async()=>{
  // official update 13:00, server now 13:45 (45 minutes old), device clock 3 hours behind
  const b=await browser({deviceOffset:-3*3600*1000,checkedAt:new Date(BASE+45*60*1000).toISOString()});
  b.set('ticket','160'); b.render(); assert.equal(b.el.get('statusBadge').textContent,'STALE');
});
test('a device clock that is ahead does not mark fresh official data stale', async()=>{
  const b=await browser({deviceOffset:3*3600*1000,checkedAt:new Date(BASE+60*1000).toISOString()});
  b.set('ticket','160'); b.render(); assert.equal(b.el.get('statusBadge').textContent,'SAFE');
});
test('official data older than 30 minutes pauses advice', async()=>{
  const b=await browser(); b.set('ticket','160'); b.advance(29*60*1000); b.render(); assert.equal(b.el.get('statusBadge').textContent,'SAFE');
  b.advance(2*60*1000); b.render(); assert.equal(b.el.get('statusBadge').textContent,'STALE');
});

/* ---------- copy ---------- */
test('every interface string exists in all three languages', ()=>{
  const ctx=vm.createContext({});
  const head=script.slice(0,script.indexOf('const OFFICIAL_MAX_AGE'));
  vm.runInContext(head+';globalThis.__i18n=i18n;',ctx);
  const {en,ja}=ctx.__i18n, zh=ctx.__i18n['zh-Hant'];
  const k=o=>Object.keys(o).sort();
  assert.deepEqual(k(ja),k(en)); assert.deepEqual(k(zh),k(en));
  assert.deepEqual(k(ja.services),k(en.services)); assert.deepEqual(k(zh.services),k(en.services));
});
test('Traditional Chinese copy and the page defaults contain no Simplified-only characters', ()=>{
  const simplified=/[输号码询进时请显数间说该这们页资语连户应务实让读认议态]/;
  const ctx=vm.createContext({});
  vm.runInContext(script.slice(0,script.indexOf('const OFFICIAL_MAX_AGE'))+';globalThis.__i18n=i18n;',ctx);
  const zh=JSON.stringify(ctx.__i18n['zh-Hant'],(key,v)=>typeof v==='function'?v(7):v);
  assert.doesNotMatch(zh,simplified); assert.doesNotMatch(html,simplified);
});
test('legal pages carry no inline style that the CSP would block', ()=>{
  for(const f of ['../privacy.html','../terms.html','../index.html']){
    const page=fs.readFileSync(new URL(f,import.meta.url),'utf8');
    assert.doesNotMatch(page,/<style|\sstyle=|<script>(?!<\/script>)|\son[a-z]+=/i,f);
  }
});

test('a ticket typed for one service is not carried over to another service', async()=>{
  const b=await browser();
  b.set('ticket','160'); b.run("$('ticket').listeners.input()"); assert.equal(b.el.get('statusBadge').textContent,'SAFE');
  b.set('service','permission'); b.run("$('service').listeners.change()");
  assert.equal(b.el.get('ticket').value,''); assert.equal(b.el.get('statusBadge').textContent,'READY');
  b.set('service','application'); b.run("$('service').listeners.change()");
  assert.equal(b.el.get('ticket').value,'160'); assert.equal(b.el.get('statusBadge').textContent,'SAFE');
});
