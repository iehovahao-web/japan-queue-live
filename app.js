
const i18n = {
  "zh-Hant":{
    eyebrow:"日本入管即時叫號公共測試版",headline:"少一點等待，多一點掌控。",lead:"輸入你的號碼，立即查看目前進度、剩餘號碼與返回建議。",
    loading:"正在連接官方資料",connected:"官方資料已連接",failed:"官方連線失敗 · 可使用手動模式",office:"機構",service:"窗口服務",queryNumber:"輸入查詢號碼",check:"查詢進度",
    callingNow:"目前叫號",remaining:"前面還有",numbers:"個號碼",waitingPeople:"官方等待人數",people:"人",estimate:"智能估算",collecting:"等待更多樣本",
    recommendation:"即時建議",enterNumber:"請輸入你的號碼",enterNumberHelp:"系統會根據官方最新叫號給出返回建議。",progress:"到號進度",
    smartAlert:"智能提醒策略",safeRule:"距離較遠：繼續關注",watchRule:"剩餘 40 號：準備返回",urgentRule:"剩餘 20 號：留在窗口附近",nowRule:"已到號：立即辦理",
    dataIntegrity:"資料可信度",dataNote:"資料直接讀取官方公開頁面，並顯示官方更新時間。若連線失敗，系統會明確標示，不會猜測。",
    openOfficial:"打開官方頁面 ↗",manualFallback:"官方資料無法連接？使用手動模式",apply:"套用",disclaimer:"非政府官方服務。請以現場螢幕及廣播為準。",
    safeTitle:"目前仍有距離",safeMsg:n=>`前面約有 ${n} 個號碼。保持關注，不要離開太遠。`,watchTitle:"請準備返回",watchMsg:n=>`只剩 ${n} 個號碼。建議現在返回大廳。`,
    urgentTitle:"請留在窗口附近",urgentMsg:n=>`只剩 ${n} 個號碼。不要再離開窗口區域。`,nowTitle:"已到號或可能過號",nowMsg:"立即前往窗口；若已過號，請直接詢問工作人員。",
    noData:"尚無可信資料",manual:"手動資料" ,developer:"開發者：Ludwig Cheung",
version:"V1.1 公共測試版",
  },
  ja:{
    eyebrow:"日本入管リアルタイム呼出し 公開ベータ版",headline:"待つ時間を減らし、行動を最適化。",lead:"番号を入力すると、現在の呼出し、残り件数、戻る目安を確認できます。",
    loading:"公式データに接続中",connected:"公式データに接続済み",failed:"公式接続に失敗 · 手動モードを利用できます",office:"機関",service:"窓口サービス",queryNumber:"照会番号を入力",check:"進捗を確認",
    callingNow:"現在の呼出し",remaining:"残り番号",numbers:"件",waitingPeople:"公式待ち人数",people:"人",estimate:"スマート予測",collecting:"サンプル収集中",
    recommendation:"リアルタイム案内",enterNumber:"番号を入力してください",enterNumberHelp:"公式の最新呼出しに基づいて戻る目安を表示します。",progress:"呼出し進捗",
    smartAlert:"スマート通知ルール",safeRule:"距離あり：引き続き確認",watchRule:"残り40件：戻る準備",urgentRule:"残り20件：窓口付近で待機",nowRule:"呼出し済み：直ちに窓口へ",
    dataIntegrity:"データ信頼性",dataNote:"公式公開ページから直接取得し、公式更新時刻を表示します。接続失敗時に推測値は表示しません。",
    openOfficial:"公式ページを開く ↗",manualFallback:"公式データに接続できない場合：手動モード",apply:"適用",disclaimer:"政府公式サービスではありません。現地表示・放送を優先してください。",
    safeTitle:"まだ余裕があります",safeMsg:n=>`前に約${n}件あります。遠くへ離れず、随時確認してください。`,watchTitle:"戻る準備をしてください",watchMsg:n=>`残り${n}件です。今から庁舎へ戻ることを推奨します。`,
    urgentTitle:"窓口付近で待機してください",urgentMsg:n=>`残り${n}件です。窓口エリアから離れないでください。`,nowTitle:"呼出し済み、または番号超過",nowMsg:"直ちに窓口へ。番号を過ぎた場合は職員に確認してください。",
    noData:"信頼できるデータなし",manual:"手動データ" ,developer:"開発者：Ludwig Cheung",
version:"V1.1 公開ベータ版",
  },
  en:{
    eyebrow:"Japan Immigration Live Queue · Public Beta",headline:"Less waiting. More control.",lead:"Enter your ticket number to see the live call, remaining numbers and when to return.",
    loading:"Connecting to official data",connected:"Official data connected",failed:"Official connection failed · Manual mode available",office:"Office",service:"Service",queryNumber:"Enter ticket number",check:"Check progress",
    callingNow:"Calling now",remaining:"Numbers ahead",numbers:"numbers",waitingPeople:"Official waiting count",people:"people",estimate:"Smart estimate",collecting:"Collecting samples",
    recommendation:"Live recommendation",enterNumber:"Enter your number",enterNumberHelp:"Recommendations are based on the latest official call number.",progress:"Queue progress",
    smartAlert:"Smart alert strategy",safeRule:"Far away: keep monitoring",watchRule:"40 numbers left: prepare to return",urgentRule:"20 numbers left: stay near the counter",nowRule:"Called: go immediately",
    dataIntegrity:"Data integrity",dataNote:"Data is read directly from the official public page with its official update time. Failed connections are clearly marked; values are never guessed.",
    openOfficial:"Open official page ↗",manualFallback:"Official data unavailable? Use manual mode",apply:"Apply",disclaimer:"Not a government service. On-site screens and announcements take priority.",
    safeTitle:"You still have time",safeMsg:n=>`About ${n} numbers remain ahead. Keep monitoring and stay nearby.`,watchTitle:"Prepare to return",watchMsg:n=>`Only ${n} numbers remain. Return to the building now.`,
    urgentTitle:"Stay near the counter",urgentMsg:n=>`Only ${n} numbers remain. Do not leave the counter area.`,nowTitle:"Called or possibly missed",nowMsg:"Go to the counter immediately. If your number passed, ask a staff member.",
    noData:"No trusted data",manual:"Manual data" ,developer:"Developed by Ludwig Cheung",
version:"V1.1 Public Beta",
  }
};

let lang = localStorage.getItem("jql-lang") || "zh-Hant";
let queue = null;
let deferredPrompt = null;
const samples = JSON.parse(localStorage.getItem("jql-samples") || "[]").filter(x=>Date.now()-x.ts<86400000);

const $ = id => document.getElementById(id);
function t(k){ return i18n[lang][k] ?? k; }

function applyLanguage(){
  document.documentElement.lang = lang;
  $("lang").value = lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key=el.dataset.i18n;
    if(typeof i18n[lang][key]==="string") el.textContent=i18n[lang][key];
  });
  localStorage.setItem("jql-lang",lang);
  render();
}
$("lang").addEventListener("change",e=>{lang=e.target.value;applyLanguage();});

async function loadQueue(){
  $("sourceState").textContent=t("loading");
  $("liveDot").className="dot";
  try{
    const res=await fetch("./api/queue",{cache:"no-store"});
    if(!res.ok) throw new Error("HTTP "+res.status);
    const data=await res.json();
    if(!data.ok || !Number.isFinite(data.current)) throw new Error("Invalid data");
    queue=data;
    const last=samples[samples.length-1];
    if(!last || last.n!==data.current || Date.now()-last.ts>15*60*1000){
      samples.push({n:data.current,ts:Date.now()});
      while(samples.length>48) samples.shift();
      localStorage.setItem("jql-samples",JSON.stringify(samples));
    }
    $("sourceState").textContent=data.stale ? `${t("connected")} · STALE` : t("connected");
    $("liveDot").className="dot live";
    render();
  }catch(err){
    $("sourceState").textContent=t("failed");
    $("liveDot").className="dot error";
    queue=null;
    render();
  }
}

function estimate(target,current){
  const remaining=Math.max(target-current,0);
  if(samples.length<2) return {text:"—",confidence:t("collecting")};
  const a=samples[0],b=samples[samples.length-1];
  const hours=(b.ts-a.ts)/3600000;
  const rate=hours>0?(b.n-a.n)/hours:0;
  if(rate<=0) return {text:"—",confidence:t("collecting")};
  const mins=Math.round((remaining/rate)*60);
  const eta=new Date(Date.now()+mins*60000);
  return {text:eta.toLocaleTimeString(lang,{hour:"2-digit",minute:"2-digit"}),confidence:`~${Math.min(90,45+samples.length*8)}%`};
}

function render(){
  $("currentNumber").textContent=queue?.current ?? "—";
  $("waitingPeople").textContent=queue?.waiting ?? "—";
  $("officialUpdated").textContent=queue?.updatedAt
    ? `${queue.updatedAt.replace("T"," ").slice(0,16)}${queue.stale ? " · STALE" : ""}`
    : (queue?.manual?t("manual"):"—");
  const target=parseInt($("ticket").value,10);
  if(!queue || !Number.isFinite(target)){
    $("remainingNumber").textContent="—";$("eta").textContent="—";$("confidence").textContent=t("collecting");
    $("statusTitle").textContent=queue?.stale ? "官方資料已過期" : (queue?t("enterNumber"):t("noData"));
    $("statusMessage").textContent=t("enterNumberHelp");$("statusBadge").textContent="READY";
    $("statusCard").className="status-card glass status-neutral";$("progressBar").style.width="0%";$("progressLabel").textContent="—";
    return;
  }
  const remaining=Math.max(target-queue.current,0);
  $("remainingNumber").textContent=remaining;
  const est=estimate(target,queue.current);$("eta").textContent=est.text;$("confidence").textContent=est.confidence;
  let cls,title,msg,badge;
  if(queue.current>=target){cls="status-now";title=t("nowTitle");msg=t("nowMsg");badge="NOW";}
  else if(remaining<=20){cls="status-urgent";title=t("urgentTitle");msg=t("urgentMsg")(remaining);badge="URGENT";}
  else if(remaining<=40){cls="status-watch";title=t("watchTitle");msg=t("watchMsg")(remaining);badge="RETURN";}
  else{cls="status-safe";title=t("safeTitle");msg=t("safeMsg")(remaining);badge="SAFE";}
  $("statusCard").className=`status-card glass ${cls}`;$("statusTitle").textContent=title;$("statusMessage").textContent=msg;$("statusBadge").textContent=badge;
  const start=Math.max(0,target-100);const pct=Math.max(0,Math.min(100,((queue.current-start)/(target-start))*100));
  $("progressBar").style.width=pct+"%";$("progressLabel").textContent=Math.round(pct)+"%";
  $("mCurrent").textContent=queue.current;$("mWarn").textContent=Math.max(start,target-40);$("mTarget").textContent=target;
}

$("checkBtn").addEventListener("click",render);
$("ticket").addEventListener("input",render);
$("manualBtn").addEventListener("click",()=>{
  const current=parseInt($("manualCurrent").value,10);
  const waiting=parseInt($("manualWaiting").value,10);
  if(!Number.isFinite(current)) return;
  queue={current,waiting:Number.isFinite(waiting)?waiting:null,updatedAt:new Date().toISOString(),manual:true};
  $("sourceState").textContent=t("manual");$("liveDot").className="dot";
  render();
});

window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;$("installBtn").classList.remove("hidden");});
const isiOS=/iphone|ipad|ipod/i.test(navigator.userAgent);
if(isiOS && !window.matchMedia("(display-mode: standalone)").matches){
  $("installBtn").classList.remove("hidden");
  $("installBtn").textContent="Add to Home";
}
$("installBtn").addEventListener("click",async()=>{
  if(deferredPrompt){
    deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$("installBtn").classList.add("hidden");return;
  }
  if(isiOS) alert("Safari：點擊分享按鈕，再選擇「加入主畫面」。");
});

if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
applyLanguage();
loadQueue();
setInterval(loadQueue,5*60*1000);
