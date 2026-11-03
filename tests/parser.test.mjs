import test from 'node:test';
import assert from 'node:assert/strict';
import {parseOfficialPage,onRequestGet} from '../functions/api/queue.js';
const services=[['在留・認定申請','Application'],['許可証印','Permission'],['在留カード・再入国・届出等','Residence Card'],['行政相談','Consultation'],['永住者在留カード有効期間更新','Permanent Resident'],['その他','Others']];
// Same table shape as the official page: label | calling now | called (recent) | waiting.
function fixture(stamp='2026-10-24 13:00'){return '<html><body><table><tbody>'+services.map(([jp,en],i)=>`<tr><td>${i+1}  ${jp}<br>${i+1}  ${en}</td><td>${100+i}</td><td>${String(10+i).padStart(3,'0')} ${90+i} </td><td>3人</td></tr>`).join('')+`</tbody></table><p align='right'>${stamp}現在</p></body></html>`;}
test('all six official service rows parse without confusing their call numbers',()=>{const data=parseOfficialPage(fixture());assert.equal(Object.keys(data.services).length,6);assert.equal(data.services.permission.current,101);assert.equal(data.updatedAt,'2026-10-24T13:00:00+09:00');});
test('missing table fails closed and invalid calendar timestamps cannot become fresh',()=>{assert.equal(parseOfficialPage('<html>no official table</html>'),null);assert.equal(parseOfficialPage(fixture('2026-02-31 13:00')).updatedAt,null);});
test('upstream HTTP and transport failures return no queue data',async()=>{const original=globalThis.fetch;try{globalThis.fetch=async()=>new Response('no',{status:503});let res=await onRequestGet();assert.equal(res.status,502);assert.equal((await res.json()).ok,false);globalThis.fetch=async()=>{throw Error('network');};res=await onRequestGet();assert.equal(res.status,502);assert.equal((await res.json()).code,'FETCH_FAILED');}finally{globalThis.fetch=original;}});
test('missing and implausibly future timestamps are explicitly stale at the API boundary',async()=>{const original=globalThis.fetch;try{for(const html of [fixture('2026-02-31 13:00'),fixture('2099-10-24 13:00')]){globalThis.fetch=async()=>new Response(html);const data=await (await onRequestGet()).json();assert.equal(data.ok,true);assert.equal(data.stale,true);}}finally{globalThis.fetch=original;}});

function partialFixture(numericCount){
 let index=0;
 return fixture().replace(/(<\/td><td>)\d+(<\/td><td>)/g,(_,before,after)=>before+(index++<numericCount?'0013':'---')+after);
}
test('zero through six numeric windows accept the complete official table without inventing placeholder calls',()=>{
 for(let count=0;count<=6;count++){
  const data=parseOfficialPage(partialFixture(count));assert.ok(data,`numeric windows ${count}`);
  assert.equal(Object.keys(data.services).length,6);
  assert.equal(Object.values(data.services).filter(s=>s.current!==null).length,count);
  assert.ok(Object.values(data.services).every(s=>s.current===null||s.current===13));
 }
});
test('partial tables still reject changed, missing, duplicate and reordered service rows',()=>{
 const good=partialFixture(3),rows=good.match(/<tr>[\s\S]*?<\/tr>/g);
 for(const bad of [good.replace('行政相談','行政相談改名'),good.replace(rows[2],''),good.replace(rows[2],rows[1]),good.replace(rows[1]+rows[2],rows[2]+rows[1]),good.replace('</tbody>',rows[0]+'</tbody>')])assert.equal(parseOfficialPage(bad),null);
});
test('only literal --- or the existing numeric range is accepted; waiting values and columns remain strict',()=>{
 const good=partialFixture(3);
 for(const token of ['--','none','10000','-1','1.5','<script>1</script>'])assert.equal(parseOfficialPage(good.replace('<td>---</td>',`<td>${token}</td>`)),null,token);
 for(const waiting of ['10001人','-1人','3','unknown'])assert.equal(parseOfficialPage(good.replace('<td>3人</td>',`<td>${waiting}</td>`)),null,waiting);
 assert.equal(parseOfficialPage(good.replace('<td>3人</td>','<td>3人</td><td>extra</td>')),null);
 assert.equal(parseOfficialPage(good.replace('<td>0013</td>','<td>0000</td>')).services.application.current,0);
});
test('a valid partial table reaches the API as null calls and retains stale timestamp protections',async()=>{
 const original=globalThis.fetch;
 try{
  globalThis.fetch=async()=>new Response(partialFixture(3));
  const response=await onRequestGet(),data=await response.json();assert.equal(response.status,200);assert.equal(data.ok,true);assert.equal(data.services.consultation.current,null);assert.equal(data.stale,true);
 }finally{globalThis.fetch=original;}
});
