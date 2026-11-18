import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import Module, { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const filename = path.resolve('app/api/leads/route.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;

function loadRoute(notion = false) {
  const originalKey = process.env.NOTION_API_KEY, originalDb = process.env.NOTION_DATABASE_ID;
  const calls = [];
  if (notion) { process.env.NOTION_API_KEY = 'test-only'; process.env.NOTION_DATABASE_ID = 'test-db'; }
  else { delete process.env.NOTION_API_KEY; delete process.env.NOTION_DATABASE_ID; }
  const mod = new Module(filename);
  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  mod.require = id => id === '@notionhq/client' ? { Client: class { pages = { create: async args => { calls.push(args); return { id: 'test' }; } }; } } : require(id);
  mod._compile(compiled, filename);
  if (originalKey === undefined) delete process.env.NOTION_API_KEY; else process.env.NOTION_API_KEY = originalKey;
  if (originalDb === undefined) delete process.env.NOTION_DATABASE_ID; else process.env.NOTION_DATABASE_ID = originalDb;
  return { post: data => mod.exports.POST(new Request('http://localhost/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })), calls };
}

const review = { source: 'funnel-review', name: 'Example Coach', email: 'coach@example.com', url: 'https://example.com', offer: 'Executive coaching for founders', context: 'Referrals and LinkedIn; 4 enquiries last month.' };

test('a review reaches the existing Notion database with its full context', async () => {
  const { post, calls } = loadRoute(true);
  assert.equal((await post(review)).status, 201);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].parent.database_id, 'test-db');
  assert.equal(calls[0].properties.URL.url, review.url);
  assert.equal(calls[0].properties.Source.rich_text[0].text.content, 'funnel-review');
  assert.equal(calls[0].children[0].paragraph.rich_text[1].text.content, review.offer);
  assert.equal(calls[0].children[1].paragraph.rich_text[1].text.content, review.context);
});

test('legacy lead payloads keep the existing fields and storage format', async () => {
  const { post, calls } = loadRoute(true);
  assert.equal((await post({ name: 'Example', email: 'coach@example.com', source: 'cta', url: 'https://example.com', calls: '12' })).status, 201);
  assert.equal(calls[0].properties['Monthly Calls'].number, 12);
  assert.equal(calls[0].children, undefined);
});

test('incomplete reviews, invalid email and unsafe URLs never reach Notion', async () => {
  const { post, calls } = loadRoute(true);
  for (const input of [{ ...review, name: ' ' }, { ...review, email: 'invalid' }, { ...review, url: 'javascript:alert(1)' }, { ...review, offer: '' }, { ...review, context: 'x'.repeat(2001) }]) assert.equal((await post(input)).status, 400);
  assert.equal(calls.length, 0);
});

test('local development stores review context without touching real lead data', async () => {
  const originalDirectory = process.cwd(), originalMode = process.env.NODE_ENV;
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'compel-lead-test-'));
  try {
    process.chdir(directory); process.env.NODE_ENV = 'development';
    const { post } = loadRoute();
    assert.equal((await post(review)).status, 201);
    const saved = JSON.parse(fs.readFileSync(path.join(directory, 'data/leads.json'), 'utf8'));
    assert.equal(saved[0].offer, review.offer);
    assert.equal(saved[0].context, review.context);
  } finally {
    process.chdir(originalDirectory);
    if (originalMode === undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV = originalMode;
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
