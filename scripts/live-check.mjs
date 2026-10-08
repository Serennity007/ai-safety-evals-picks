import { mkdirSync, writeFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { DIRECTION, CURATED_FEEDS, SOURCE_FEEDS } from '../src/feeds.js';
import { parseFeedXml, decodeXmlBytes } from '../src/parser.js';

const dom = new JSDOM('<html><body></body></html>');
globalThis.DOMParser = dom.window.DOMParser;
const headers = {
  Accept: 'application/atom+xml, application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Obsidian/1.13.0 Electron/39.2.7 Safari/537.36',
};
async function check(feed) {
  try {
    const response = await fetch(feed.feedUrl, { headers, redirect: 'follow', signal: AbortSignal.timeout(25000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = await response.arrayBuffer();
    const xml = decodeXmlBytes(buffer, response.headers.get('content-type') || '');
    const parsed = parseFeedXml(xml, response.url);
    if (!parsed.items.length) throw new Error('No parsed entries');
    const timestamps = parsed.items.map(item => item.publishedTs).filter(Boolean);
    const newestTs = timestamps.length ? Math.max(...timestamps) : 0;
    return {
      id: feed.id, name: feed.name, feedUrl: feed.feedUrl, finalUrl: response.url, ok: true,
      count: parsed.items.length, format: parsed.format, bytes: buffer.byteLength,
      newest: newestTs ? new Date(newestTs).toISOString().slice(0, 10) : null,
      qiaomuGuardCompatible: !/<!DOCTYPE|<!ENTITY/i.test(xml),
      sample: parsed.items.slice(0, 8).map(item => ({ title: item.title, url: item.link, date: item.published })),
    };
  } catch (error) {
    return { id: feed.id, name: feed.name, feedUrl: feed.feedUrl, ok: false, error: String(error.message || error) };
  }
}
const sourcesMode = process.argv.includes('--sources');
const feeds = sourcesMode ? SOURCE_FEEDS : CURATED_FEEDS;
const results = [];
for (let offset = 0; offset < feeds.length; offset += 4) {
  results.push(...await Promise.all(feeds.slice(offset, offset + 4).map(check)));
}
const checkedAt = new Date().toISOString();
const checkedOn = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const report = { checkedAt, checkedOn, timezone: 'Asia/Shanghai', direction: DIRECTION.slug, method: 'Direct HTTP fetch + the bundled reader decoder/parser; Electron-style UA; raw Qiaomu DTD guard checked separately', results };
mkdirSync('docs', { recursive: true });
writeFileSync(sourcesMode ? 'docs/source-validation.json' : 'docs/validation.json', `${JSON.stringify(report, null, 2)}\n`, 'utf8');
const cell = value => String(value || '').replaceAll('|', '\\|').replaceAll('\n', ' ');
const rows = results.map(row => `| ${cell(row.name)} | ${row.ok ? '可抓取/可解析' : `失败：${cell(row.error)}`} | ${row.count ?? '—'} | ${row.newest ?? '无日期'} | ${row.ok ? (row.qiaomuGuardCompatible ? '通过原始字符串守卫' : '存在 DOCTYPE/ENTITY 文本，乔木可能拒绝') : '未判定'} |`).join('\n');
const samples = results.filter(row => row.ok).map(row => `### ${row.name}\n\n${row.sample.map(item => `- [${item.title}](${item.url})${item.date ? ` — ${item.date}` : ''}`).join('\n')}`).join('\n\n');
writeFileSync(sourcesMode ? 'docs/SOURCE-VALIDATION.md' : 'docs/VALIDATION.md', `# ${DIRECTION.name}${sourcesMode ? '候选来源' : '精选流'}真实抓取验证\n\n验证日期：${checkedOn}（Asia/Shanghai）。时间戳：${checkedAt}。\n\n直接请求源站，复用本阅读器的解码与解析函数；使用 Electron 风格 UA。结果不代表 Obsidian 实际 UI 验证。乔木列只检测其当前原始字符串 DTD 守卫，不宣称已执行乔木完整解析器。${sourcesMode ? '候选池可能含边缘主题，样本不等于已经选入；默认频道只展示 picks.js 中审核的文章。' : ''}\n\n| 源 | 结果 | 条目数 | 最新条目日期 | 乔木 DTD 守卫 |\n| --- | --- | --- | --- | --- |\n${rows}\n\n日期与文章样本来自实时源站；如源站时间偏离当前日期，需人工核对，脚本不修正源站数据。\n\n## 用于方向复核的实际样本\n\n${samples}\n`, 'utf8');
for (const row of results) console.log(`${row.ok ? 'OK' : 'FAIL'} ${row.name}: ${row.ok ? `${row.count} entries; newest ${row.newest}; Qiaomu guard ${row.qiaomuGuardCompatible}` : row.error}`);
if (results.some(row => !row.ok)) process.exitCode = 1;
