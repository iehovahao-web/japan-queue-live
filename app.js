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
    noData:"尚無可信資料",manual:"手動資料",developer:"開發者：Ludwig Cheung",version:"V1.3 公共測試版",
    services:{
      application:"在留・認定申請 / Application",
      permission:"許可證印 / Permission",
      "residence-card":"在留卡・再入國・申報等 / Residence Card・Re-entry・Notification",
      consultation:"行政諮詢 / Consultation",
      "permanent-card-renewal":"永住者在留卡有效期更新 / Permanent Resident Card Renewal",
      others:"其他 / Others"
    }
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
    noData:"信頼できるデータなし",manual:"手動データ",developer:"開発者：Ludwig Cheung",version:"V1.3 公開ベータ版",
    services:{
      application:"在留・認定申請 / Application",
      permission:"許可証印 / Permission",
      "residence-card":"在留カード・再入国・届出等 / Residence Card・Re-entry・Notification",
      consultation:"行政相談 / Consultation",
      "permanent-card-renewal":"永住者在留カード有効期間更新 / Permanent Resident Card Renewal",
      others:"その他 / Others"
    }
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
    noData:"No trusted data",manual:"Manual data",developer:"Developed by Ludwig Cheung",version:"V1.3 Public Beta",
    services:{
      application:"Application",
      permission:"Permission",
      "residence-card":"Residence Card / Re-entry / Notification",
      consultation:"Consultation",
      "permanent-card-renewal":"Permanent Resident Card Renewal",
      others:"Others"
    }
  }
};

const SERVICE_KEYS=[
  "application",
  "permission",
  "residence-card",
  "consultation",
  "permanent-card-renewal",
  "others"
];


const safetyCopy={
  "zh-Hant": {
    "staleTitle": "資料已過期",
    "staleHelp": "此窗口的資料已過期或時間無法確認，暫停進度計算與行動建議。請查看官方頁面或現場顯示。",
    "invalidTicket": "號碼格式不正確",
    "invalidTicketHelp": "請輸入 1 至 9999 的整數票號，不接受負數、小數或科學記號。",
    "invalidManual": "請輸入有效的手動資料；目前號碼須為 0 至 9999，等待人數須為 0 至 10000 的整數。",
    "manualHelp": "手動輸入的參考資料，非官方即時更新；請核對現場。",
    "manualWaiting": "手動等待人數",
    "staleSource": "資料已過期・暫停建議",
    "manualExpired": "手動資料已過期",
    "sampleEstimate": "樣本不足，暫不預測",
    "officialMode": "使用官方資料",
    "manualCurrentLabel": "手動目前號碼",
    "waitingInput": "手動等待人數（可不填）",
    "officeName": "大阪出入國在留管理局",
    "install": "安裝",
    "addHome": "加入主畫面",
    "iosHelp": "Safari：點擊分享按鈕，再選擇「加入主畫面」。",
    "privacy": "隱私",
    "terms": "條款"
  },
  "ja": {
    "staleTitle": "データの有効期限が切れています",
    "staleHelp": "この窓口のデータが古いか、更新時刻を確認できません。進捗計算と行動案内を停止しています。公式ページや現地表示をご確認ください。",
    "invalidTicket": "番号の形式が正しくありません",
    "invalidTicketHelp": "1〜9999の整数の受付番号を入力してください。負の数、小数、指数表記は使用できません。",
    "invalidManual": "有効な手動データを入力してください。現在番号は0〜9999、待ち人数は0〜10000の整数です。",
    "manualHelp": "手動入力による参考情報です。公式のリアルタイム更新ではありません。現地でご確認ください。",
    "manualWaiting": "手動の待ち人数",
    "staleSource": "データ期限切れ・案内停止",
    "manualExpired": "手動データの期限切れ",
    "sampleEstimate": "十分なデータがないため予測しません",
    "officialMode": "公式データを使用",
    "manualCurrentLabel": "手動の現在番号",
    "waitingInput": "手動の待ち人数（任意）",
    "officeName": "大阪出入国在留管理局",
    "install": "インストール",
    "addHome": "ホーム画面に追加",
    "iosHelp": "Safari：共有ボタンをタップし、「ホーム画面に追加」を選んでください。",
    "privacy": "プライバシー",
    "terms": "利用規約"
  },
  "en": {
    "staleTitle": "Data is out of date",
    "staleHelp": "This service has old data or an unverified update time. Progress calculations and action advice are paused. Check the official page or on-site display.",
    "invalidTicket": "Invalid ticket number",
    "invalidTicketHelp": "Enter a whole ticket number from 1 to 9999. Negative numbers, decimals and scientific notation are not accepted.",
    "invalidManual": "Enter valid manual data: current number 0–9999 and waiting count 0–10000, using whole numbers only.",
    "manualHelp": "Manually entered reference data, not an official live update. Confirm the numbers on site.",
    "manualWaiting": "Manual waiting count",
    "staleSource": "Data out of date · Advice paused",
    "manualExpired": "Manual data expired",
    "sampleEstimate": "No prediction without sufficient validated data",
    "officialMode": "Use official data",
    "manualCurrentLabel": "Manual current number",
    "waitingInput": "Manual waiting count (optional)",
    "officeName": "Osaka Regional Immigration Services Bureau",
    "install": "Install",
    "addHome": "Add to Home Screen",
    "iosHelp": "In Safari, tap Share, then choose “Add to Home Screen”.",
    "privacy": "Privacy",
    "terms": "Terms"
  }
};
Object.keys(safetyCopy).forEach(key=>Object.assign(i18n[key],safetyCopy[key]));

// Keep in sync with MAX_STALE_MINUTES in functions/api/queue.js.
const OFFICIAL_MAX_AGE=30*60*1000;
const MANUAL_MAX_AGE=5*60*1000;
const FUTURE_TOLERANCE=5*60*1000;
const manualByService={};
// Each service has its own number range, so a ticket typed for one service must never be compared with another.
const ticketByService={};
let activeService=null;
let queue=null;
let deferredPrompt=null;
let lastLoadFailed=false;
// Difference between server time and this device clock, measured on each successful load.
// Data age is judged on server time, so a device clock that is behind cannot make old data look fresh.
let clockSkew=0;
function nowMs(){return Date.now()+clockSkew;}
function readSavedLanguage(){try{return localStorage.getItem("jql-lang");}catch(_){return null;}}
let lang=readSavedLanguage()||"zh-Hant";
if(!i18n[lang])lang="zh-Hant";
const $=id=>document.getElementById(id);
const isiOS=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
function t(k){return i18n[lang][k]??k;}
function parseInteger(value,min,max){
  // NFKC turns full-width digits typed with a Japanese or Chinese IME (１２３) into 123.
  const raw=String(value??"").normalize("NFKC").trim();
  if(!/^\d{1,5}$/.test(raw))return null;
  const number=Number(raw);
  return Number.isSafeInteger(number)&&number>=min&&number<=max?number:null;
}
function tokyoDay(time){return new Date(time+9*60*60*1000).toISOString().slice(0,10);}
function isTrusted(service,now=nowMs()){
  if(!service||!Number.isInteger(service.current)||service.current<0||service.current>9999)return false;
  const time=Date.parse(service.updatedAt);
  if(!Number.isFinite(time)||time-now>FUTURE_TOLERANCE||tokyoDay(time)!==tokyoDay(now))return false;
  const maxAge=service.source==="manual"?MANUAL_MAX_AGE:OFFICIAL_MAX_AGE;
  return service.stale!==true&&now-time<=maxAge;
}
function normalizeOfficial(data){
  if(!data||data.ok!==true||!data.services)throw new Error("Invalid queue data");
  const services={};
  for(const key of SERVICE_KEYS){
    const record=data.services[key];
    if(!record||!Number.isInteger(record.current)||record.current<0||record.current>9999)continue;
    if(record.waiting!=null&&(!Number.isInteger(record.waiting)||record.waiting<0||record.waiting>10000))continue;
    services[key]={current:record.current,waiting:record.waiting??null,source:"official",updatedAt:record.updatedAt??data.updatedAt,stale:record.stale===true||data.stale===true};
  }
  return {services};
}
function currentService(){
  const key=$("service").value,manual=manualByService[key],official=queue?.services?.[key]??null;
  // An expired manual reference must not hide this service's fresh official data.
  if(manual&&!isTrusted(manual)&&official&&isTrusted(official)){delete manualByService[key];return official;}
  return manual??official;
}
function formatTime(value){
  const time=Date.parse(value);
  if(!Number.isFinite(time))return "—";
  return new Intl.DateTimeFormat(lang,{timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:false}).format(time)+" JST";
}
function applyLanguage(){
  document.documentElement.lang=lang;$("lang").value=lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;if(typeof i18n[lang][key]==="string")el.textContent=i18n[lang][key];});
  [...$("service").options].forEach(option=>{option.textContent=i18n[lang].services[option.value]||option.textContent;});
  $("office").options[0].textContent=t("officeName");
  $("manualCurrent").placeholder=t("manualCurrentLabel");$("manualCurrent").setAttribute("aria-label",t("manualCurrentLabel"));
  $("manualWaiting").placeholder=t("waitingInput");$("manualWaiting").setAttribute("aria-label",t("waitingInput"));
  $("installBtn").textContent=isiOS?t("addHome"):t("install");
  try{localStorage.setItem("jql-lang",lang);}catch(_){}
  render();
}
$("lang").addEventListener("change",e=>{lang=i18n[e.target.value]?e.target.value:"zh-Hant";applyLanguage();});
let loadInFlight=false;
async function loadQueue(){
  if(loadInFlight)return;loadInFlight=true;
  if(!currentService()){$("sourceState").textContent=t("loading");$("liveDot").className="dot";}
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),10000);
  try{
    const response=await fetch("./api/queue",{cache:"no-store",signal:controller.signal});
    if(!response.ok)throw new Error("HTTP "+response.status);
    const receivedAt=Date.now(),data=await response.json();
    queue=normalizeOfficial(data);lastLoadFailed=false;
    const serverTime=Date.parse(data.checkedAt);
    if(Number.isFinite(serverTime))clockSkew=serverTime-receivedAt;
  }catch(_){queue=null;lastLoadFailed=true;}
  finally{clearTimeout(timeout);loadInFlight=false;render();}
}
function clearAdvice(title,message,badge="READY"){
  $("remainingNumber").textContent="—";$("eta").textContent="—";$("confidence").textContent=t("sampleEstimate");
  $("statusTitle").textContent=title;$("statusMessage").textContent=message;$("statusBadge").textContent=badge;
  $("statusCard").className="status-card glass status-neutral";$("progressBar").style.width="0%";$("progressLabel").textContent="—";
  $("mCurrent").textContent="—";$("mWarn").textContent="—";$("mTarget").textContent="—";
}
function render(){
  const service=currentService(),trusted=isTrusted(service),manual=service?.source==="manual";
  $("currentNumber").textContent=trusted?service.current:"—";
  $("waitingPeople").textContent=trusted?(service.waiting??"—"):"—";
  const waitingLabel=document.querySelector('[data-i18n="waitingPeople"]');if(waitingLabel)waitingLabel.textContent=t(manual?"manualWaiting":"waitingPeople");
  $("officialUpdated").textContent=service?formatTime(service.updatedAt)+(trusted?"":" · STALE"):"—";
  $("sourceState").textContent=manual?(trusted?t("manual"):t("manualExpired")):service?(trusted?t("connected"):t("staleSource")):lastLoadFailed?t("failed"):t("noData");
  $("liveDot").className=trusted&&!manual?"dot live":trusted?"dot":"dot error";
  $("officialMode").hidden=!manual;
  if(manual&&$("manualDetails"))$("manualDetails").open=true;
  const raw=$("ticket").value.trim(),target=parseInteger(raw,1,9999),invalid=raw!==""&&target===null;
  $("ticket").setAttribute("aria-invalid",String(invalid));
  if(invalid){clearAdvice(t("invalidTicket"),t("invalidTicketHelp"),"INVALID");return;}
  if(!trusted){clearAdvice(service?t("staleTitle"):t("noData"),service?t("staleHelp"):lastLoadFailed?t("failed"):loadInFlight?t("loading"):t("noData"),service?"STALE":"NO DATA");return;}
  if(target===null){clearAdvice(t("enterNumber"),manual?t("manualHelp"):t("enterNumberHelp"));return;}
  const remaining=Math.max(target-service.current,0);$("remainingNumber").textContent=remaining;
  // A validated historical model is not available in this beta. Do not invent ETA or confidence percentages.
  $("eta").textContent="—";$("confidence").textContent=t("sampleEstimate");
  let cls,title,msg,badge;
  if(service.current>=target){cls="status-now";title=t("nowTitle");msg=t("nowMsg");badge="NOW";}
  else if(remaining<=20){cls="status-urgent";title=t("urgentTitle");msg=t("urgentMsg")(remaining);badge="URGENT";}
  else if(remaining<=40){cls="status-watch";title=t("watchTitle");msg=t("watchMsg")(remaining);badge="RETURN";}
  else{cls="status-safe";title=t("safeTitle");msg=t("safeMsg")(remaining);badge="SAFE";}
  $("statusCard").className=`status-card glass ${cls}`;$("statusTitle").textContent=title;
  $("statusMessage").textContent=manual?t("manualHelp")+" "+msg:msg;$("statusBadge").textContent=manual?"MANUAL":badge;
  const start=Math.max(0,target-100),pct=Math.max(0,Math.min(100,((service.current-start)/(target-start))*100));
  $("progressBar").style.width=pct+"%";$("progressLabel").textContent=Math.round(pct)+"%";
  $("mCurrent").textContent=service.current;$("mWarn").textContent=Math.max(start,target-40);$("mTarget").textContent=target;
}
$("service").addEventListener("change",()=>{
  if(activeService!==null)ticketByService[activeService]=$("ticket").value;
  activeService=$("service").value;
  $("ticket").value=ticketByService[activeService]??"";
  $("manualError").textContent="";render();
});
$("checkBtn").addEventListener("click",render);$("ticket").addEventListener("input",()=>{ticketByService[$("service").value]=$("ticket").value;render();});
$("manualBtn").addEventListener("click",()=>{
  const current=parseInteger($("manualCurrent").value,0,9999),waitingRaw=$("manualWaiting").value.trim(),waiting=waitingRaw===""?null:parseInteger(waitingRaw,0,10000);
  if(current===null||(waitingRaw!==""&&waiting===null)){$("manualError").textContent=t("invalidManual");return;}
  $("manualError").textContent="";
  manualByService[$("service").value]={current,waiting,source:"manual",updatedAt:new Date(nowMs()).toISOString(),stale:false};render();
});
$("officialMode").addEventListener("click",()=>{delete manualByService[$("service").value];render();void loadQueue();});
setInterval(render,30000);
document.addEventListener("visibilitychange",()=>{if(!document.hidden){render();void loadQueue();}});

window.addEventListener("beforeinstallprompt",e=>{
  e.preventDefault();
  deferredPrompt=e;
  $("installBtn").classList.remove("hidden");
});

if(isiOS&&!(window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches)){
  $("installBtn").classList.remove("hidden");
}

$("installBtn").addEventListener("click",async()=>{
  if(deferredPrompt){
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt=null;
    $("installBtn").classList.add("hidden");
    return;
  }
  if(isiOS)alert(t("iosHelp"));
});

if("serviceWorker"in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
}


activeService=$("service").value;
applyLanguage();
void loadQueue();
setInterval(loadQueue,5*60*1000);
