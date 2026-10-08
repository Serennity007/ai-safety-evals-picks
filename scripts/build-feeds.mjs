import { mkdirSync, writeFileSync } from 'node:fs';
import { DIRECTION, CURATED_FEEDS, SOURCE_FEEDS, EXCLUDED_FEEDS } from '../src/feeds.js';
import { PICKS, CURATED_ON } from '../src/picks.js';

const esc = value => String(value || '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const cell = value => String(value || '').replaceAll('|', '\\|').replaceAll('\n', ' ');
const outlines = CURATED_FEEDS.map(feed => `      <outline type="rss" text="${esc(feed.name)}" title="${esc(feed.name)}" xmlUrl="${esc(feed.feedUrl)}" htmlUrl="${esc(feed.siteUrl)}"/>`).join('\n');
const opml = `<?xml version="1.0" encoding="UTF-8"?>\n<opml version="2.0">\n  <head><title>${esc(DIRECTION.name)}</title></head>\n  <body>\n    <outline text="${esc(DIRECTION.name)}" title="${esc(DIRECTION.name)}">\n${outlines}\n    </outline>\n  </body>\n</opml>\n`;
writeFileSync('feeds.opml', opml, 'utf8');
const sourceOf = pick => SOURCE_FEEDS.find(source => source.id === pick.sourceId);
const ordered = [...PICKS].sort((a, b) => Date.parse(b.published) - Date.parse(a.published));
const items = ordered.map(pick => {
  const source = sourceOf(pick);
  if (!source || !Number.isFinite(Date.parse(pick.published)) || !pick.reason || !pick.summary) throw new Error(`Incomplete article ${pick.id}`);
  const description = `${source.name}。精选理由：${pick.reason}\n\n摘要：${pick.summary}\n\n阅读原文：${pick.url}`;
  return `    <item>\n      <title>${esc(pick.title)}</title>\n      <link>${esc(pick.url)}</link>\n      <guid isPermaLink="true">${esc(pick.url)}</guid>\n      <pubDate>${new Date(pick.published).toUTCString()}</pubDate>\n      <dc:creator>${esc(source.name)}</dc:creator>\n      <description>${esc(description)}</description>\n    </item>`;
}).join('\n');
writeFileSync('feed.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">\n  <channel>\n    <title>${esc(DIRECTION.name)}</title>\n    <link>https://github.com/Serennity007/${DIRECTION.slug}</link>\n    <description>${esc(DIRECTION.scope)}。逐篇精选，附原创摘要与推荐理由；链接到原站，不转载全文。</description>\n    <language>zh-CN</language>\n${items}\n  </channel>\n</rss>\n`, 'utf8');
const catalog = { schemaVersion: 1, id: DIRECTION.slug, title: DIRECTION.name, scope: DIRECTION.scope, curatedOn: CURATED_ON, feedUrl: CURATED_FEEDS[0].feedUrl, picks: ordered, sourcePool: SOURCE_FEEDS, excluded: EXCLUDED_FEEDS };
writeFileSync('catalog.json', `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');
mkdirSync('docs', { recursive: true });
const rows = SOURCE_FEEDS.map(feed => `| ${cell(feed.name)} | ${cell(feed.note)} | ${cell(feed.quality)} | [${cell(feed.evidenceTitle || '代表文章')}](${feed.evidenceUrl}) | [候选 RSS](${feed.feedUrl}) |`).join('\n');
const excluded = EXCLUDED_FEEDS.map(feed => `| ${cell(feed.name)} | ${cell(feed.reason)} | ${feed.feedUrl ? `[候选地址](${feed.feedUrl})` : '—'} |`).join('\n');
writeFileSync('docs/FEEDS.md', `# ${DIRECTION.name}来源池\n\n默认只订阅本仓库的 [人工精选 RSS](${CURATED_FEEDS[0].feedUrl})。来源池只供维护者发现候选，不整源导入。${DIRECTION.boundary}\n\n由 src/feeds.js 自动生成；混合来源中的宣传、公告和跑题文章逐篇排除。源可抓取不代表所有文章应进入频道。\n\n| 来源 | 为什么参考 | 质量依据 | 代表文章 | 候选订阅 |\n| --- | --- | --- | --- | --- |\n${rows}\n\n## 未采用或不整源订阅\n\n| 候选 | 原因 | 地址 |\n| --- | --- | --- |\n${excluded || '| — | 未记录其他候选 | — |'}\n\n无公开 RSS 的优质网页不伪造订阅地址。网络不可达只说明当前环境不可用，不代表源站不存在。\n`, 'utf8');
const sections = ordered.map((pick, index) => `## ${index + 1}. [${pick.title}](${pick.url})\n\n来源：${sourceOf(pick).name} · 原文日期：${pick.published.slice(0, 10)}\n\n${pick.summary}\n\n**精选理由：** ${pick.reason}`).join('\n\n');
writeFileSync('docs/PICKS.md', `# ${DIRECTION.name}阅读清单\n\n精选日期：${CURATED_ON}。${ordered.length} 篇原站技术文章，按原文时间倒序；基础文章不伪装成新消息。摘要与推荐理由为原创，完整内容请访问原站。\n\n${sections}\n`, 'utf8');
console.log(`Generated ${DIRECTION.slug}: ${PICKS.length} reviewed articles`);
