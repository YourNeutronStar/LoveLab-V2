/* LoveLab Studio v2 — lightweight editor; no framework or server required. */
'use strict';
const $=id=>document.getElementById(id);
const translations=window.LL_I18N;
const presets=window.LL_TEMPLATES;
const themes=window.LL_THEMES;
const STANDALONE_TEMPLATE=window.LoveLabStoryTemplate;
const STORE_KEY='lovelab_studio_v2';
const OLD_STORE_KEY='lovelab_studio_v1';
let counter=1;
const uid=()=>`ll_${Date.now().toString(36)}_${counter++}`;
const copy=o=>JSON.parse(JSON.stringify(o));
const choice=(label,action)=>({id:uid(),label,action});
const scene=(emoji,title,note,choices)=>({id:uid(),emoji,title,note,choices});
const supportedLanguages=['tr','en','de'];
const supportedThemes=themes.map(theme=>theme.id);
const allowedActions=['next','success','decline','runaway'];
let project;
let viewingShared=false;
let timer;

const hash=location.hash;
function t(key){return (translations[project?.lang||'tr']||translations.tr)[key]||translations.tr[key]||key;}
function presetProject(id,lang){
  const config=presets[id]||presets.coffee;
  const content=copy(config[lang]||config.tr);
  return {...content,lang,theme:config.theme,templateId:id,
    scenes:content.scenes.map(s=>scene(s.emoji,s.title,s.note,s.choices.map(c=>choice(c.label,c.action))))};
}
function safeProject(input){
  if(!input||typeof input!=='object')return presetProject('coffee','tr');
  const lang=supportedLanguages.includes(input.lang)?input.lang:'tr';
  const fallback=presetProject('coffee',lang);
  const trim=(value,length,def='')=>typeof value==='string'?value.slice(0,length):def;
  let scenes=Array.isArray(input.scenes)?input.scenes.slice(0,8):[];
  scenes=scenes.map(s=>({
    id:uid(),emoji:trim(s?.emoji,8,'💌'),title:trim(s?.title,100,tFallback(lang,'newQuestion')),
    note:trim(s?.note,420,''),
    choices:(Array.isArray(s?.choices)?s.choices.slice(0,4):[]).map(c=>({
      id:uid(),label:trim(c?.label,55,tFallback(lang,'newChoice')),
      action:allowedActions.includes(c?.action)?c.action:'next'
    }))
  })).filter(s=>s.choices.length>0);
  return {
    name:trim(input.name,75,fallback.name),to:trim(input.to,45,fallback.to),from:trim(input.from,45,fallback.from),
    theme:supportedThemes.includes(input.theme)?input.theme:'rose',lang,
    templateId:Object.prototype.hasOwnProperty.call(presets,input.templateId)?input.templateId:null,
    success:{title:trim(input.success?.title,100,fallback.success.title),body:trim(input.success?.body,600,fallback.success.body)},
    decline:{title:trim(input.decline?.title,100,fallback.decline.title),body:trim(input.decline?.body,600,fallback.decline.body)},
    scenes:scenes.length?scenes:fallback.scenes
  };
}
function tFallback(lang,key){return translations[lang]?.[key]||translations.tr[key];}
function fromShareHash(){
  if(!hash.startsWith('#lovelab='))return null;
  try{return safeProject(JSON.parse(decodeBase64(hash.slice(9))));}
  catch(error){console.warn('Invalid share link',error);return null;}
}
function decodeBase64(value){
  const str=value.replace(/-/g,'+').replace(/_/g,'/');
  const padded=str+'='.repeat((4-str.length%4)%4);
  const binary=atob(padded);
  return new TextDecoder().decode(Uint8Array.from(binary,c=>c.charCodeAt(0)));
}
function encodeBase64(str){
  const bytes=new TextEncoder().encode(str);
  let binary='';
  for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
  return btoa(binary).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
function loadProject(){
  const shared=fromShareHash();
  if(shared){viewingShared=true;return shared;}
  try{
    const stored=localStorage.getItem(STORE_KEY)||localStorage.getItem(OLD_STORE_KEY);
    return stored?safeProject(JSON.parse(stored)):presetProject('coffee','tr');
  }catch(error){console.warn('Local storage unavailable',error);return presetProject('coffee','tr');}
}
project=loadProject();

function save(){
  try{localStorage.setItem(STORE_KEY,JSON.stringify(project));$('savedStatus').textContent=t('saved');}
  catch(error){$('savedStatus').textContent=t('notSaved');}
  document.title=`${project.name||'LoveLab'} — LoveLab Studio`;
}
function esc(value){return String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));}
function localizeUi(){
  document.documentElement.lang=project.lang;
  $('langSelect').value=project.lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n);});
}
function renderTemplates(){
  $('templates').innerHTML=Object.entries(presets).map(([id,item])=>
    `<button class="template ${project.templateId===id?'active':''}" type="button" data-template="${id}" aria-pressed="${project.templateId===id}">`+
    `<span>${item.icon}</span>${esc(t(item.label))}<small>${esc(t(item.description))}</small></button>`
  ).join('');
}
function renderThemes(){
  $('themes').innerHTML=themes.map(theme=>
    `<button type="button" class="swatch ${project.theme===theme.id?'selected':''}" data-theme="${theme.id}" aria-pressed="${project.theme===theme.id}">`+
    `<i></i>${theme.icon} ${esc(t(theme.label))}</button>`
  ).join('');
}
function renderMeta(){
  document.querySelectorAll('[data-meta]').forEach(el=>{el.value=project[el.dataset.meta]||'';});
  document.querySelectorAll('[data-end]').forEach(el=>{el.value=project[el.dataset.end]?.[el.dataset.prop]||'';});
}
function actionOptions(current){
  return allowedActions.map(a=>`<option value="${a}" ${current===a?'selected':''}>${esc(t(a))}</option>`).join('');
}
function renderScenes(){
  $('sceneCount').textContent=`${project.scenes.length} ${t('scenes')}`;
  $('sceneList').innerHTML=project.scenes.map((s,i)=>`
    <article class="scene" data-sceneid="${esc(s.id)}">
      <div class="scenehead"><strong><span class="scenenumber">${i+1}</span> ${esc(t('question'))} ${i+1}</strong>
        <div class="sceneheadbuttons">
          <button class="iconbtn" type="button" title="${esc(t('moveUp'))}" aria-label="${esc(t('moveUp'))}" data-act="up" data-idx="${i}">↑</button>
          <button class="iconbtn" type="button" title="${esc(t('moveDown'))}" aria-label="${esc(t('moveDown'))}" data-act="down" data-idx="${i}">↓</button>
          <button class="iconbtn" type="button" title="${esc(t('deleteScene'))}" aria-label="${esc(t('deleteScene'))}" data-act="deleteScene" data-idx="${i}">✕</button>
        </div>
      </div>
      <div class="scenecontent">
        <div class="two">
          <div class="field"><label>${esc(t('heading'))}</label><input class="control" data-idx="${i}" data-scenefield="title" maxlength="100" value="${esc(s.title)}"></div>
          <div class="field"><label>${esc(t('emoji'))}</label><input class="control" data-idx="${i}" data-scenefield="emoji" maxlength="8" value="${esc(s.emoji)}"></div>
        </div>
        <div class="field"><label>${esc(t('description'))}</label><textarea class="control" rows="2" maxlength="420" data-idx="${i}" data-scenefield="note">${esc(s.note)}</textarea></div>
        <div class="choiceslabel">${esc(t('choices'))}<span class="miniinfo">${esc(t('maxChoices'))}</span></div>
        <div class="choices">${s.choices.map((c,j)=>`<div class="choice">
          <input aria-label="${esc(t('choiceText'))}" class="control" maxlength="55" data-idx="${i}" data-choice="${j}" data-prop="label" value="${esc(c.label)}">
          <select aria-label="${esc(t('choiceAction'))}" class="control" data-idx="${i}" data-choice="${j}" data-prop="action">${actionOptions(c.action)}</select>
          <button title="${esc(t('deleteChoice'))}" aria-label="${esc(t('deleteChoice'))}" class="trash" data-act="deleteChoice" data-idx="${i}" data-choice="${j}" type="button">×</button>
        </div>`).join('')}</div>
        <button class="button tiny" type="button" data-act="addChoice" data-idx="${i}" ${s.choices.length>=4?'disabled':''}>${esc(t('addChoice'))}</button>
      </div>
    </article>`).join('');
}
function makeStandalone(data){
  const payload=encodeURIComponent(JSON.stringify(data)).replace(/'/g,'%27');
  return STANDALONE_TEMPLATE.replace('__PROJECT_DATA__',payload).replace('<title>LoveLab surprise 💌</title>',`<title>${esc(data.name||'LoveLab surprise')}</title>`);
}
function preview(){
  const html=makeStandalone(project);
  $('previewFrame').srcdoc=html;
  if($('viewer').classList.contains('active'))$('viewerFrame').srcdoc=html;
}
function changed(){save();clearTimeout(timer);timer=setTimeout(preview,250);}
function renderAll(){localizeUi();renderTemplates();renderThemes();renderMeta();renderScenes();preview();if(!viewingShared)save();}
function toast(message){
  const box=$('toast');box.textContent=message;box.hidden=false;clearTimeout(box._timer);
  box._timer=setTimeout(()=>box.hidden=true,3200);
}

$('langSelect').addEventListener('change',event=>{
  project.lang=supportedLanguages.includes(event.target.value)?event.target.value:'tr';
  renderAll();toast(t('languageChanged'));
});
$('templates').addEventListener('click',event=>{
  const selected=event.target.closest('[data-template]');if(!selected)return;
  if(!confirm(t('confirmPreset')))return;
  project=presetProject(selected.dataset.template,project.lang);
  renderAll();toast(t('presetLoaded'));
});
$('themes').addEventListener('click',event=>{
  const selected=event.target.closest('[data-theme]');if(!selected)return;
  project.theme=selected.dataset.theme;renderThemes();changed();
});
document.querySelectorAll('[data-meta]').forEach(input=>input.addEventListener('input',event=>{
  project[event.target.dataset.meta]=event.target.value;changed();
}));
document.querySelectorAll('[data-end]').forEach(input=>input.addEventListener('input',event=>{
  project[event.target.dataset.end][event.target.dataset.prop]=event.target.value;changed();
}));
$('sceneList').addEventListener('input',event=>{
  const input=event.target;const i=Number(input.dataset.idx);
  if(!Number.isInteger(i)||!project.scenes[i])return;
  if(input.dataset.scenefield){project.scenes[i][input.dataset.scenefield]=input.value;changed();}
  else if(input.dataset.choice!==undefined){
    const answer=project.scenes[i].choices[Number(input.dataset.choice)];
    if(answer){answer[input.dataset.prop]=input.value;changed();}
  }
});
$('sceneList').addEventListener('click',event=>{
  const target=event.target.closest('[data-act]');if(!target)return;
  const i=Number(target.dataset.idx);const action=target.dataset.act;
  const scenes=project.scenes;if(!scenes[i])return;
  if(action==='up'&&i>0)[scenes[i-1],scenes[i]]=[scenes[i],scenes[i-1]];
  else if(action==='down'&&i<scenes.length-1)[scenes[i],scenes[i+1]]=[scenes[i+1],scenes[i]];
  else if(action==='deleteScene'){
    if(scenes.length<=1){toast(t('atLeastOneScene'));return;}
    scenes.splice(i,1);
  }else if(action==='addChoice'){
    if(scenes[i].choices.length<4)scenes[i].choices.push(choice(t('newChoice'),'next'));
  }else if(action==='deleteChoice'){
    const j=Number(target.dataset.choice);
    if(scenes[i].choices.length<=1){toast(t('atLeastOneChoice'));return;}
    scenes[i].choices.splice(j,1);
  }
  renderScenes();changed();
});
$('addScene').addEventListener('click',()=>{
  if(project.scenes.length>=8){toast(t('sceneLimit'));return;}
  project.scenes.push(scene('💌',t('newQuestion'),t('newDescription'),[
    choice(t('yes'),'success'),choice(t('think'),'next'),choice(t('no'),'decline')]));
  renderScenes();changed();
  setTimeout(()=>$('sceneList').lastElementChild?.scrollIntoView({behavior:'smooth',block:'center'}),100);
});
$('resetAll').addEventListener('click',()=>{
  if(!confirm(t('confirmReset')))return;
  project=presetProject('coffee',project.lang);renderAll();toast(t('resetDone'));
});
$('reloadPreview').addEventListener('click',preview);

function download(content,filename,mime){
  const blob=new Blob([content],{type:mime});const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=filename;
  document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);
}
function fileName(){
  return ((project.name||'lovelab').normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-zA-Z0-9_-]+/g,'-').replace(/^-+|-+$/g,'').toLowerCase().slice(0,45)||'lovelab');
}
function exportHtml(){download(makeStandalone(project),fileName()+'.html','text/html;charset=utf-8');toast(t('exported'));}
$('exportHtml').addEventListener('click',exportHtml);
$('topExport').addEventListener('click',exportHtml);
$('saveJson').addEventListener('click',()=>{
  download(JSON.stringify(project,null,2),fileName()+'.lovelab.json','application/json;charset=utf-8');toast(t('backedUp'));
});
$('loadJson').addEventListener('click',()=>$('fileImport').click());
$('fileImport').addEventListener('change',async event=>{
  const file=event.target.files[0];if(!file)return;
  try{
    if(file.size>100000)throw Error(t('importTooLarge'));
    const data=JSON.parse(await file.text());
    if(!Array.isArray(data.scenes))throw Error(t('invalidBackup'));
    project=safeProject(data);renderAll();toast(t('importSuccess'));
  }catch(error){toast(t('importError')+error.message);}event.target.value='';
});
function shareUrl(){return location.href.split('#')[0]+'#lovelab='+encodeBase64(JSON.stringify(project));}
$('shareLink').addEventListener('click',async()=>{
  if(location.protocol==='file:'){toast(t('shareRequiresHosting'));return;}
  const link=shareUrl();
  try{await navigator.clipboard.writeText(link);toast(t('linkCopied'));}
  catch(error){window.prompt(t('copyLink'),link);}
});
function openViewer(){
  if(!viewingShared)history.replaceState(null,'',location.href.split('#')[0]);
  $('viewerFrame').srcdoc=makeStandalone(project);
  $('viewer').classList.add('active');document.body.style.overflow='hidden';
}
function closeViewer(){
  viewingShared=false;$('viewer').classList.remove('active');$('viewerFrame').srcdoc='';
  document.body.style.overflow='';
  if(location.hash.startsWith('#lovelab='))history.replaceState(null,'',location.href.split('#')[0]);
}
$('demoButton').addEventListener('click',openViewer);
$('topDemo').addEventListener('click',openViewer);
$('exitViewer').addEventListener('click',closeViewer);
$('tabEdit').addEventListener('click',()=>{
  $('shell').classList.remove('show-preview');$('tabEdit').classList.add('current');$('tabPreview').classList.remove('current');
});
$('tabPreview').addEventListener('click',()=>{
  $('shell').classList.add('show-preview');$('tabPreview').classList.add('current');$('tabEdit').classList.remove('current');preview();
});
renderAll();
if(viewingShared)openViewer();
