import './dom.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DIRECTION, CURATED_FEEDS, SOURCE_FEEDS } from '../src/feeds.js';
import { PICKS } from '../src/picks.js';
import { parseFeedXml } from '../src/parser.js';

test('精选 RSS 保留审核文章、原站链接、原文日期和推荐理由', () => {
  const xml = readFileSync(new URL('../feed.xml', import.meta.url), 'utf8');
  const parsed = parseFeedXml(xml, CURATED_FEEDS[0].feedUrl);
  assert.equal(parsed.items.length, PICKS.length);
  assert.equal(new Set(parsed.items.map(item => item.link)).size, PICKS.length);
  for (const pick of PICKS) {
    assert.ok(SOURCE_FEEDS.some(source => source.id === pick.sourceId));
    const item = parsed.items.find(item => item.link === pick.url);
    assert.equal(item.title, pick.title);
    assert.equal(item.publishedTs, Date.parse(pick.published));
    assert.ok(item.summary.includes('精选理由：'));
    assert.ok(pick.reason && pick.summary);
  }
  assert.doesNotMatch(xml, /<!DOCTYPE|<!ENTITY/i);
});

test('OPML 只有一个顶层方向分组和本仓库精选流', () => {
  const xml = readFileSync(new URL('../feeds.opml', import.meta.url), 'utf8');
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  assert.equal(doc.querySelectorAll('parsererror').length, 0);
  const groups = [...doc.querySelector('body').children];
  assert.equal(groups.length, 1);
  assert.equal(groups[0].getAttribute('text'), DIRECTION.name);
  assert.equal(groups[0].children.length, 1);
  assert.equal(groups[0].children[0].getAttribute('xmlUrl'), CURATED_FEEDS[0].feedUrl);
});

test('目录与选稿一致，插件标识与方向一致', () => {
  const catalog = JSON.parse(readFileSync(new URL('../catalog.json', import.meta.url), 'utf8'));
  const manifest = JSON.parse(readFileSync(new URL('../manifest.json', import.meta.url), 'utf8'));
  assert.equal(catalog.picks.length, PICKS.length);
  assert.equal(catalog.feedUrl, CURATED_FEEDS[0].feedUrl);
  assert.equal(manifest.id, DIRECTION.slug);
  assert.equal(manifest.name, DIRECTION.name);
});
