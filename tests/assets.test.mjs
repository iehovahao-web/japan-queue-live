import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const root=new URL('../',import.meta.url);
test('manifest icons and service-worker precache all refer to shipped assets',()=>{
 const manifest=JSON.parse(fs.readFileSync(new URL('manifest.webmanifest',root),'utf8'));
 for(const icon of manifest.icons)assert.ok(fs.existsSync(new URL(icon.src,root)),icon.src);
 const sw=fs.readFileSync(new URL('sw.js',root),'utf8');const assets=sw.match(/const ASSETS=(\[[\s\S]*?\]);/)[1];
 for(const file of JSON.parse(assets))assert.ok(fs.existsSync(new URL(file==='./'?'index.html':file,root)),file);
});
