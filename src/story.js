/* This file runs inside the exported mini-site, not the editor. */
'use strict';
const data = JSON.parse(decodeURIComponent('__PROJECT_DATA__'));
const el = id => document.getElementById(id);
const state = {scene:0,end:null,escapes:0};
const strings = {
  tr:{note:'KÜÇÜK BİR SÜRPRİZ',loveNote:'LOVE NOTE',restart:'↻ Baştan',replay:'Bir daha oyna ↻',pick:'Seç',runawayHint:'Tamam tamam, gerçekten hayır da diyebilirsin 🤍'},
  de:{note:'EINE KLEINE ÜBERRASCHUNG',loveNote:'LIEBESNOTIZ',restart:'↻ Neustart',replay:'Noch einmal ↻',pick:'Wählen',runawayHint:'Okay, du darfst natürlich auch Nein sagen 🤍'},
  en:{note:'A LITTLE SURPRISE',loveNote:'LOVE NOTE',restart:'↻ Restart',replay:'Play again ↻',pick:'Choose',runawayHint:'Okay, you can absolutely say no 🤍'}
};
const lang = ['tr','en','de'].includes(data.lang) ? data.lang : 'tr';
const tr = strings[lang];
const allowed = ['rose','night','sunny','bubu','alien','floral'];
document.documentElement.lang = lang;
document.body.dataset.theme = allowed.includes(data.theme) ? data.theme : 'rose';
function setText(id,value){el(id).textContent=String(value ?? '');}
function render(){
  const scene=(data.scenes||[])[state.scene]||{};
  const finished=Boolean(state.end);
  const ending=state.end==='decline'?data.decline:data.success;
  setText('picture',finished?(state.end==='decline'?'🤍':'🎉'):(scene.emoji||'💌'));
  setText('label',finished?tr.loveNote:`${data.to || tr.note} ♡ ${data.from || 'LoveLab'}`);
  setText('title',finished?(ending?.title||''):scene.title);
  setText('message',finished?(ending?.body||''):scene.note);
  setText('sign',`♡ ${data.from||'LoveLab'}`);
  setText('hint',!finished&&state.escapes>=2?tr.runawayHint:'');
  setText('restart',tr.restart);
  const zone=el('choiceZone');
  zone.replaceChildren();
  if(finished){
    addButton(zone,tr.replay,'alt',()=>reset());
  } else {
    (scene.choices||[]).forEach((choice,index)=>{
      const button=addButton(zone,choice.label||tr.pick,index?'alt':'primary',()=>choose(choice,button));
      if(choice.action==='runaway'){
        button.classList.add('runaway');
        let locked=false;
        button.addEventListener('pointerenter',event=>{
          if(event.pointerType==='mouse'&&state.escapes<2&&!locked){
            locked=true;move(button);setTimeout(()=>locked=false,350);
          }
        });
      }
    });
  }
  const dots=el('dots');dots.replaceChildren();
  (data.scenes||[]).forEach((_,index)=>{
    const dot=document.createElement('i');if(!finished&&index===state.scene)dot.className='on';dots.appendChild(dot);
  });
}
function addButton(parent,label,klass,fn){
  const b=document.createElement('button');b.type='button';b.className=klass;b.textContent=label;
  b.addEventListener('click',fn);parent.appendChild(b);return b;
}
function choose(choice,button){
  if(choice.action==='runaway'){
    if(state.escapes<2){move(button);return;}
    state.end='decline';render();return;
  }
  if(choice.action==='next'){
    if(state.scene<(data.scenes?.length||1)-1){state.scene++;state.escapes=0;render();}
    else {state.end='success';render();confetti();}
    return;
  }
  if(choice.action==='decline'){state.end='decline';render();return;}
  state.end='success';render();confetti();
}
function move(button){
  state.escapes++;
  const zone=el('choiceZone');
  const maxX=Math.max(4,zone.clientWidth-button.offsetWidth-10);
  const maxY=Math.max(4,zone.clientHeight-button.offsetHeight-10);
  button.classList.add('moved');
  button.style.left=`${Math.random()*maxX}px`;
  button.style.top=`${Math.random()*maxY}px`;
  if(state.escapes>=2)setText('hint',tr.runawayHint);
}
function confetti(){
  const root=el('celebrate');root.replaceChildren();
  const motifs=data.theme==='alien'?['🛸','✨','👽','⭐']:data.theme==='floral'?['🌸','🌼','🌿','💗']:['💗','✨','💌','🤍'];
  for(let i=0;i<26;i++){
    const x=document.createElement('span');x.textContent=motifs[i%motifs.length];
    x.style.left=(Math.random()*100)+'%';
    x.style.animationDelay=(Math.random()*.9)+'s';
    x.style.animationDuration=(1.8+Math.random()*1.2)+'s';
    root.appendChild(x);
  }
  setTimeout(()=>root.replaceChildren(),3500);
}
function reset(){state.scene=0;state.end=null;state.escapes=0;render();}
el('restart').addEventListener('click',reset);
render();
