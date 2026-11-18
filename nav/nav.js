/* \u547d\u7406\u7db2\u7ad9\u5171\u7528\u5c0e\u89bd\u5217 https://regulusab.github.io/nav/nav.js */
(function(){
if(window.__rgNavLoaded)return;window.__rgNavLoaded=true;
var HOME="https://regulusab.github.io/";
var SITES=[{"key": "bazi-site", "name": "\u516b\u5b57\u8ad6\u547d", "url": "https://regulusab.github.io/bazi-site/"}, {"key": "yizhu", "name": "\u4e00\u67f1\u8ad6\u547d", "url": "https://regulusab.github.io/yizhu/"}, {"key": "shishen", "name": "\u516b\u5b57\u5341\u795e\u8ad6\u547d", "url": "https://regulusab.github.io/shishen/"}, {"key": "bazi-health", "name": "\u516b\u5b57\u5065\u5eb7\u75be\u75c5\u53c3\u8003", "url": "https://regulusab.github.io/bazi-health/"}, {"key": "heluo-lishu", "name": "\u6cb3\u6d1b\u7406\u6578\u6279\u547d", "url": "https://regulusab.github.io/heluo-lishu/"}, {"key": "tieban", "name": "\u9435\u677f\u795e\u6578\u6279\u547d", "url": "https://regulusab.github.io/tieban/"}, {"key": "ziwei", "name": "\u7d2b\u5fae\u6597\u6578\u8ad6\u547d", "url": "https://regulusab.github.io/ziwei/"}, {"key": "mangpai", "name": "\u76f2\u6d3e\u516b\u5b57\u8ad6\u547d", "url": "https://regulusab.github.io/mangpai/"}, {"key": "shengming-test", "name": "\u751f\u547d\u4e4b\u773c\u5831\u544a\uff08\u6e2c\u8a66\u7248\uff09", "url": "https://regulusab.github.io/shengming-test/"}, {"key": "ironplate", "name": "\u9435\u677f\u53d6\u6578\u7814\u7a76\u7ad9", "url": "https://ironplate-methods-research.pages.dev"}];
function norm(u){try{var x=new URL(u,location.href);return (x.host+x.pathname).replace(/\/+$/,"")+"/";}catch(e){return u;}}
var here=norm(location.href),cur=null;
function esc(t){return String(t).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
function pickCur(list){var c=null;list.forEach(function(s){var b=norm(s.url);if(here.indexOf(b)===0&&(!c||b.length>norm(c.url).length))c=s;});return c;}
function itemsHtml(list){return list.map(function(s){var on=cur&&cur.key===s.key;
  return '<a part="item" class="it'+(on?' on':'')+'" href="'+esc(s.url)+'"'+(on?' aria-current="page"':'')+'>'+esc(s.name)+(on?' <small>\uff08\u672c\u7ad9\uff09</small>':'')+'</a>';}).join("");}
cur=pickCur(SITES);
function init(){
 if(document.getElementById("rg-nav-host"))return;
 var host=document.createElement("div");host.id="rg-nav-host";
 host.style.cssText="position:sticky;top:0;left:0;right:0;z-index:2147483000;display:block;margin:0;padding:0;";
 var ps=document.createElement("style");ps.textContent="@media print{#rg-nav-host{display:none!important}}";
 document.head.appendChild(ps);
 var root=host.attachShadow?host.attachShadow({mode:"open"}):host;
 var items=itemsHtml(SITES);
 root.innerHTML='<style>:host{all:initial}*{box-sizing:border-box}'+
 '.bar{font:14px/1.4 "Noto Serif TC","Songti TC","PingFang TC","Microsoft JhengHei",serif;display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:40px;height:calc(40px + env(safe-area-inset-top,0px));padding:env(safe-area-inset-top,0px) calc(12px + env(safe-area-inset-right,0px)) 0 calc(12px + env(safe-area-inset-left,0px));background:#2b2320;color:#f3e7c9;border-bottom:2px solid #a8823c;-webkit-text-size-adjust:100%}'+
 'a{color:inherit;text-decoration:none}.home{white-space:nowrap;padding:6px 4px}.home:hover,.btn:hover{color:#fff}'+
 '.cur{flex:1;text-align:center;opacity:.8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px}'+
 '.wrap{position:relative}.btn{font:inherit;color:inherit;background:transparent;border:1px solid #a8823c;border-radius:4px;padding:3px 10px;cursor:pointer}'+
 '.menu{display:none;position:absolute;right:0;top:34px;min-width:190px;background:#fbf6ea;border:1px solid #a8823c;border-radius:6px;box-shadow:0 6px 20px rgba(0,0,0,.25);padding:4px 0}'+
 '.menu.open{display:block}.it{display:block;padding:9px 14px;color:#2b2320}.it:hover{background:#efe3c6}.it.on{color:#8b2e2e;font-weight:bold;background:#f4ead2}small{font-weight:normal;opacity:.7}'+
 '@media print{.bar{display:none}}</style>'+
 '<nav class="bar" aria-label="\u547d\u7406\u7db2\u7ad9\u5c0e\u89bd"><a class="home" href="'+HOME+'">\u2190 \u56de\u7e3d\u5165\u53e3</a><span class="cur">'+(cur?cur.name:'')+'</span>'+
 '<div class="wrap"><button class="btn" type="button" aria-haspopup="true" aria-expanded="false">\u7db2\u7ad9 \u25be</button><div class="menu" role="menu">'+items+'</div></div></nav>';
 var btn=root.querySelector(".btn"),menu=root.querySelector(".menu");
 btn.addEventListener("click",function(e){e.stopPropagation();var o=menu.classList.toggle("open");btn.setAttribute("aria-expanded",o);});
 document.addEventListener("click",function(){menu.classList.remove("open");btn.setAttribute("aria-expanded","false");});
 document.addEventListener("keydown",function(e){if(e.key==="Escape")menu.classList.remove("open");});
 document.body.insertBefore(host,document.body.firstChild);
 /* --rg-nav-h: real rendered bar height (screen only). Sites: top:var(--rg-nav-h,40px) */
 var de=document.documentElement,pm=window.matchMedia?matchMedia("print"):null;
 function setH(){var h=(pm&&pm.matches)?0:Math.round(host.getBoundingClientRect().height);de.style.setProperty("--rg-nav-h",h+"px");}
 setH();window.addEventListener("load",setH);window.addEventListener("resize",setH);window.addEventListener("orientationchange",function(){setH();setTimeout(setH,300);});
 if(window.ResizeObserver)new ResizeObserver(setH).observe(host);
 if(pm){if(pm.addEventListener)pm.addEventListener("change",setH);else if(pm.addListener)pm.addListener(setH);}
 window.addEventListener("beforeprint",function(){de.style.setProperty("--rg-nav-h","0px");});window.addEventListener("afterprint",setH);
 /* refresh site list from sites.json (embedded list above is the instant fallback) */
 if(window.fetch){try{fetch(HOME+"sites.json",{cache:"no-store"}).then(function(r){return r.ok?r.json():null;}).then(function(d){
  var list=(Array.isArray(d)?d:(d&&Array.isArray(d.sites)?d.sites:[])).filter(function(x){return x&&typeof x.key==="string"&&typeof x.name==="string"&&typeof x.url==="string"&&/^https?:\/\//.test(x.url);})
   .map(function(x){return {key:x.key,name:x.name,url:x.url};});
  if(!list.length)return;cur=pickCur(list);menu.innerHTML=itemsHtml(list);var cs=root.querySelector(".cur");if(cs)cs.textContent=cur?cur.name:"";
 })["catch"](function(){});}catch(e){}}
}
if(document.body)init();else document.addEventListener("DOMContentLoaded",init);
})();
