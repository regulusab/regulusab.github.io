/* 命理網站共用導覽列 https://regulusab.github.io/nav/nav.js */
(function(){
if(window.__rgNavLoaded)return;window.__rgNavLoaded=true;
var HOME="https://regulusab.github.io/";
var SITES=[{"key": "bazi-site", "name": "八字論命", "url": "https://regulusab.github.io/bazi-site/"}, {"key": "yizhu", "name": "一柱論命", "url": "https://regulusab.github.io/yizhu/"}, {"key": "shishen", "name": "十神論命", "url": "https://regulusab.github.io/shishen/"}, {"key": "bazi-health", "name": "八字健康", "url": "https://regulusab.github.io/bazi-health/"}, {"key": "heluo-lishu", "name": "河洛理數", "url": "https://regulusab.github.io/heluo-lishu/"}, {"key": "tieban", "name": "鐵板神數", "url": "https://regulusab.github.io/tieban/"}, {"key": "ironplate", "name": "鐵板取數研究站", "url": "https://ironplate-methods-research.pages.dev"}];
function norm(u){try{var x=new URL(u,location.href);return (x.host+x.pathname).replace(/\/+$/,"")+"/";}catch(e){return u;}}
var here=norm(location.href),cur=null;
SITES.forEach(function(s){var b=norm(s.url);if(here.indexOf(b)===0&&(!cur||b.length>norm(cur.url).length))cur=s;});
function init(){
 if(document.getElementById("rg-nav-host"))return;
 var host=document.createElement("div");host.id="rg-nav-host";
 host.style.cssText="position:sticky;top:0;left:0;right:0;z-index:2147483000;display:block;margin:0;padding:0;";
 var ps=document.createElement("style");ps.textContent="@media print{#rg-nav-host{display:none!important}}";
 document.head.appendChild(ps);
 var root=host.attachShadow?host.attachShadow({mode:"open"}):host;
 var items=SITES.map(function(s){var on=cur&&cur.key===s.key;
  return '<a part="item" class="it'+(on?' on':'')+'" href="'+s.url+'"'+(on?' aria-current="page"':'')+'>'+s.name+(on?' <small>（本站）</small>':'')+'</a>';}).join("");
 root.innerHTML='<style>:host{all:initial}*{box-sizing:border-box}'+
 '.bar{font:14px/1.4 "Noto Serif TC","Songti TC","PingFang TC","Microsoft JhengHei",serif;display:flex;align-items:center;justify-content:space-between;gap:8px;height:40px;padding:0 12px;background:#2b2320;color:#f3e7c9;border-bottom:2px solid #a8823c;-webkit-text-size-adjust:100%}'+
 'a{color:inherit;text-decoration:none}.home{white-space:nowrap;padding:6px 4px}.home:hover,.btn:hover{color:#fff}'+
 '.cur{flex:1;text-align:center;opacity:.8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px}'+
 '.wrap{position:relative}.btn{font:inherit;color:inherit;background:transparent;border:1px solid #a8823c;border-radius:4px;padding:3px 10px;cursor:pointer}'+
 '.menu{display:none;position:absolute;right:0;top:34px;min-width:190px;background:#fbf6ea;border:1px solid #a8823c;border-radius:6px;box-shadow:0 6px 20px rgba(0,0,0,.25);padding:4px 0}'+
 '.menu.open{display:block}.it{display:block;padding:9px 14px;color:#2b2320}.it:hover{background:#efe3c6}.it.on{color:#8b2e2e;font-weight:bold;background:#f4ead2}small{font-weight:normal;opacity:.7}'+
 '@media print{.bar{display:none}}</style>'+
 '<nav class="bar" aria-label="命理網站導覽"><a class="home" href="'+HOME+'">← 回總入口</a><span class="cur">'+(cur?cur.name:'')+'</span>'+
 '<div class="wrap"><button class="btn" type="button" aria-haspopup="true" aria-expanded="false">網站 ▾</button><div class="menu" role="menu">'+items+'</div></div></nav>';
 var btn=root.querySelector(".btn"),menu=root.querySelector(".menu");
 btn.addEventListener("click",function(e){e.stopPropagation();var o=menu.classList.toggle("open");btn.setAttribute("aria-expanded",o);});
 document.addEventListener("click",function(){menu.classList.remove("open");btn.setAttribute("aria-expanded","false");});
 document.addEventListener("keydown",function(e){if(e.key==="Escape")menu.classList.remove("open");});
 document.body.insertBefore(host,document.body.firstChild);
}
if(document.body)init();else document.addEventListener("DOMContentLoaded",init);
})();
