const SOURCE="https://omatase10.jp/h81000/";
// The official page carries a "YYYY-MM-DD HH:MM現在" stamp and reloads itself every 30 seconds.
// Advice must not run on data older than this. Keep in sync with OFFICIAL_MAX_AGE in app.js.
const MAX_STALE_MINUTES=30;

// [key, row number on the official page, Japanese label that must appear in that row]
const SERVICES=[
  ["application","1","在留・認定申請"],
  ["permission","2","許可証印"],
  ["residence-card","3","在留カード・再入国・届出等"],
  ["consultation","4","行政相談"],
  ["permanent-card-renewal","5","永住者在留カード有効期間更新"],
  ["others","6","その他"]
];

export async function onRequestGet(){
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),8000);
  try{
    const response=await fetch(SOURCE,{
      signal:controller.signal,
      headers:{
        "User-Agent":"JapanQueueLive/1.3",
        "Accept":"text/html,application/xhtml+xml"
      },
      cf:{cacheTtl:30,cacheEverything:true}
    });

    if(!response.ok){
      return json({ok:false,code:"UPSTREAM_HTTP",error:`Upstream ${response.status}`,checkedAt:new Date().toISOString()},502);
    }

    const html=await response.text();
    const parsed=parseOfficialPage(html);

    if(!parsed){
      return json({ok:false,code:"PARSE_FAILED",error:"Queue table could not be parsed",checkedAt:new Date().toISOString()},502);
    }

    const now=Date.now();
    const updated=parsed.updatedAt?Date.parse(parsed.updatedAt):NaN;
    const staleMinutes=Number.isFinite(updated)?Math.max(0,Math.floor((now-updated)/60000)):null;
    const sameJapanDay=Number.isFinite(updated)&&japanDay(updated)===japanDay(now);

    return json({
      ok:true,
      office:"osaka-immigration",
      services:parsed.services,
      updatedAt:parsed.updatedAt,
      staleMinutes,
      stale:staleMinutes===null||staleMinutes>MAX_STALE_MINUTES||updated>now+5*60000||!sameJapanDay,
      // Server time, so the browser can measure data age without trusting the device clock.
      checkedAt:new Date(now).toISOString(),
      source:SOURCE
    },200,30);
  }catch(error){
    return json({ok:false,code:"FETCH_FAILED",error:"Official source unavailable",checkedAt:new Date().toISOString()},502);
  }finally{
    clearTimeout(timeout);
  }
}

/* Reads the official table row by row and column by column:
   [service label] [calling now] [called (recent, not in order)] [waiting "N人"].
   The "called" column must never be read as the calling number. A row is used only when its number
   and Japanese label both match, so a reordered or renamed table fails closed instead of mislabelling. */
export function parseOfficialPage(html){
  const source=String(html);
  const body=(source.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i)||[])[1];
  if(!body)return null;

  const services={};
  const rows=body.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi)||[];

  for(const row of rows){
    const cells=(row.match(/<td[^>]*>[\s\S]*?<\/td>/gi)||[]).map(cellText);
    if(cells.length<4)continue;
    const [label,calling,,waitingCell]=cells;
    const lead=label.match(/^(\d)\s*(.*)$/);
    if(!lead)continue;
    const def=SERVICES.find(([,num])=>num===lead[1]);
    if(!def)continue;
    const [key,,jp]=def;
    if(!compact(label).includes(compact(jp)))continue;
    if(services[key])continue;

    const callingMatch=calling.match(/^(\d{1,4})$/);
    const waitingMatch=waitingCell.match(/^(\d{1,5})\s*人$/);
    if(!callingMatch||!waitingMatch)continue;

    const current=Number(callingMatch[1]);
    const waiting=Number(waitingMatch[1]);
    if(Number.isInteger(current)&&current>=0&&current<=9999&&Number.isInteger(waiting)&&waiting>=0&&waiting<=10000){
      services[key]={current,waiting};
    }
  }

  if(Object.keys(services).length<4)return null;

  const text=cellText(source);
  const updated=text.match(/(\d{4})-(\d{2})-(\d{2})\s*(\d{1,2}):(\d{2})\s*現在/);

  let updatedAt=null;

  if(updated){
    const[,y,m,d,h,min]=updated;
    const candidate=`${y}-${m}-${d}T${String(h).padStart(2,"0")}:${min}:00+09:00`;
    const time=Date.parse(candidate);
    if(Number.isFinite(time)&&new Date(time+9*3600000).toISOString().slice(0,16)===candidate.slice(0,16))updatedAt=candidate;
  }

  return{services,updatedAt};
}

function cellText(html){
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi," ")
    .replace(/<style[\s\S]*?<\/style>/gi," ")
    .replace(/<br\s*\/?>/gi," ")
    .replace(/<[^>]+>/g," ")
    .replace(/&nbsp;/g," ")
    .replace(/&amp;/g,"&")
    .replace(/[\s　]+/g," ")
    .trim();
}

function compact(value){
  return String(value).replace(/[\s　]+/g,"");
}

function japanDay(time){
  return new Date(time+9*3600000).toISOString().slice(0,10);
}

function json(body,status=200,maxAge=0){
  return new Response(JSON.stringify(body),{
    status,
    headers:{
      "content-type":"application/json; charset=utf-8",
      "cache-control":`public, max-age=${maxAge}`,
      "access-control-allow-origin":"*"
    }
  });
}
