/** No dependencies: node tests/smoke.mjs */
import {strict as assert} from 'node:assert';
import {readFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const context={window:{}};
vm.createContext(context);
for(const file of ['js/i18n.js','js/templates.js','js/story-template.js']){
  vm.runInContext(readFileSync(resolve(root,file),'utf8'),context,{filename:file});
}
const langs=['tr','en','de'];
const themes=context.window.LL_THEMES;
const presets=context.window.LL_TEMPLATES;
const locales=context.window.LL_I18N;
assert.equal(themes.length,6);
assert.equal(Object.keys(presets).length,6);
for(const locale of langs){
  assert.ok(locales[locale],`Missing UI locale: ${locale}`);
  for(const [key,preset] of Object.entries(presets)){
    assert.ok(preset[locale],`Missing ${locale} story for ${key}`);
    assert.ok(preset[locale].scenes.length>0,`Empty ${locale} story for ${key}`);
    for(const scene of preset[locale].scenes){
      assert.ok(scene.choices.length>0&&scene.choices.length<=4);
      for(const answer of scene.choices){
        assert.ok(['next','success','decline','runaway'].includes(answer.action));
      }
    }
  }
}
const template=context.window.LoveLabStoryTemplate;
assert.ok(template.includes('__PROJECT_DATA__'));
assert.ok(template.includes('data-theme'));
for(const id of themes.map(x=>x.id).filter(x=>x!=='rose'))assert.ok(template.includes(`data-theme="${id}"`),`Missing theme styles ${id}`);
assert.ok(template.includes(':root{font-family:'),'Missing default rose theme');
assert.ok(template.includes('art-bubu'));
assert.ok(template.includes('art-alien'));
assert.ok(template.includes('art-floral'));
console.log('✓ LoveLab: 6 themes × 6 templates × 3 languages checked.');
console.log('✓ Export template contains all three illustrated themes.');
