const SOURCE="https://omatase10.jp/h81000/";
const MAX_STALE_MINUTES=120;

const SERVICES=[
  ["application","1","在留・認定申請","Application"],
  ["permission","2","許可証印","Permission"],
  ["residence-card","3","在留カード・再入国・届出等","Residence Card"],
  ["consultation","4","行政相談","Consultation"],
  ["permanent-card-renewal","5","永住者在留カード有効期間更新","Permanent Resident"],
  ["others","6","その他","Others"]
];

export async function onRequestGet(){
  try{
    const response=await fetch(SOURCE,{
      headers:{
        "User-Agent":"JapanQueueLive/1.1",
        "Accept":"text/html,application/xhtml+xml"
      },
      cf:{cacheTtl:60,cacheEverything:true}
    });

    if(!response.ok){
      return json({ok:false,code:"UPSTREAM_HTTP",error:`Upstream ${response.status}`},502);
    }

    const html=await response.text();
    const parsed=parseOfficialPage(html);

    if(!parsed){
      return json({ok:false,code:"PARSE_FAILED",error:"Queue table could not be parsed"},502);
    }

    const staleMinutes=parsed.updatedAt
      ?Math.max(0,Math.floor((Date.now()-Date.parse(parsed.updatedAt))/60000))
      :null;

    return json({
      ok:true,
      office:"osaka-immigration",
      services:parsed.services,
      updatedAt:parsed.updatedAt,
      staleMinutes,
      stale:staleMinutes===null||staleMinutes>MAX_STALE_MINUTES,
      source:SOURCE
    },200,60);
  }catch(error){
    return json({ok:false,code:"FETCH_FAILED",error:error.message||"Fetch failed"},500);
  }
}

export function parseOfficialPage(html){
  const text=String(html)
    .replace(/<script[\s\S]*?<\/script>/gi," ")
    .replace(/<style[\s\S]*?<\/style>/gi," ")
    .replace(/<[^>]+>/g," ")
    .replace(/&nbsp;/g," ")
    .replace(/&amp;/g,"&")
    .replace(/\s+/g," ")
    .trim();

  const services={};

  for(const [key,num,jp,en] of SERVICES){
    const pattern=new RegExp(
      `(?:^|\\s)${num}\\s*${escapeRegExp(jp)}[\\s\\S]{0,180}?${num}\\s*${escapeRegExp(en)}[\\s\\S]{0,220}?(\\d{1,4})\\s+(\\d+)\\s*人`,
      "i"
    );

    const match=text.match(pattern);

    if(match){
      const current=Number(match[1]);
      const waiting=Number(match[2]);

      if(
        Number.isInteger(current)&&current>=0&&current<=9999&&
        Number.isInteger(waiting)&&waiting>=0&&waiting<=10000
      ){
        services[key]={current,waiting};
      }
    }
  }

  if(Object.keys(services).length<4)return null;

  const updated=
    text.match(/(\d{4})-(\d{2})-(\d{2})\s+(\d{1,2}):(\d{2})\s*現在/)||
    text.match(/(\d{4})\/(\d{1,2})\/(\d{1,2})\s+(\d{1,2}):(\d{2})/);

  let updatedAt=null;

  if(updated){
    const[,y,m,d,h,min]=updated;
    updatedAt=`${y}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}T${String(h).padStart(2,"0")}:${min}:00+09:00`;
  }

  return{services,updatedAt};
}

function escapeRegExp(value){
  return value.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
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
