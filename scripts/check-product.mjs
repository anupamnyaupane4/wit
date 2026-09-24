import assert from 'node:assert/strict';
import ts from 'typescript';
import {readFileSync,writeFileSync,mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
const temp=mkdtempSync(join(tmpdir(),'witt-check-'));
for(const name of ['seed','search','extractSignal']){const path=name==='seed'?'data/seed.ts':`lib/${name}.ts`;const code=ts.transpileModule(readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replace('"@/data/seed"','"./seed.mjs"');writeFileSync(join(temp,`${name}.mjs`),code);}
const {searchCommunity}=await import(pathToFileURL(join(temp,'search.mjs')));
const {extractSignal}=await import(pathToFileURL(join(temp,'extractSignal.mjs')));
const cases=[['AI founders in Boston','maya-chen'],['Williams alumni in cybersecurity','nora-patel'],['people who can help with healthcare sales','priya-iyer'],['summer startup internships','signal-ml-intern-health'],['founders looking for engineers','signal-cyber-founder-engineer'],['upcoming events in San Francisco','sf-founder-dinner-2026-10-08']];
for(const [q,id] of cases){const results=searchCommunity(q);assert(results.some(r=>r.id===id),`${q}: expected ${id}`);console.log(`${q}: ${results.length} relevant results`);}
assert(!searchCommunity('AI founders in Boston').some(r=>r.chips.includes('San Francisco')));
assert.equal(searchCommunity('zzxxyy no-match-keyword').length,0);
const f=extractSignal('My company is looking for an ML intern this summer. Remote is fine and happy to talk with Williams students.');assert.equal(f.role,'ML intern');assert.equal(f.location,'Remote');assert.equal(f.audience,'Williams students');assert.equal(f.referral,'not-confirmed');assert(f.topics.includes('AI / ML'));
assert.equal(extractSignal('Hiring a software engineer. No referral available.').referral,'not-confirmed');
const local={id:'local-test',category:'internship',title:'ML intern research opportunity',location:'Remote',audience:'Williams students',referral:'not-confirmed',topics:['AI / ML'],source:'You',timestamp:'2026-09-23T00:00:00Z',body:'ML intern',provenance:'approved locally',sample:false,locallyApproved:true};
assert(searchCommunity('ML intern',[local]).some(r=>r.id==='local-test'));
console.log('Search constraints, local approvals and extraction checks passed.');
