/** Creates a few ready-to-share examples from the exact shipped story engine. */
import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
import vm from 'node:vm';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const context={window:{}};
vm.createContext(context);
for(const file of ['js/templates.js','js/story-template.js'])
  vm.runInContext(readFileSync(resolve(root,file),'utf8'),context);
const presets=context.window.LL_TEMPLATES;
const template=context.window.LoveLabStoryTemplate;
const examples=[['bubu','tr','bubu-dudu.html'],['alien','en','galactic.html'],['floral','de','flower-note.html']];
for(const [id,lang,filename] of examples){
  const story=presets[id][lang];
  const project={...story,lang,theme:presets[id].theme};
  const payload=encodeURIComponent(JSON.stringify(project)).replace(/'/g,'%27');
  const title=story.name.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const html=template.replace('__PROJECT_DATA__',payload).replace('<title>LoveLab surprise 💌</title>',`<title>${title}</title>`);
  writeFileSync(resolve(root,'examples',filename),html,'utf8');
  console.log('✓ Example:',filename);
}
