/*
 * AI安全与评测精选 (ai-safety-evals-picks) — Obsidian plugin
 * MIT License, Copyright (c) 2026 正涛 (Serennity007)
 */
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/main.js
var main_exports = {};
__export(main_exports, {
  default: () => DirectionPicksPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian3 = require("obsidian");

// src/feeds.js
var CURATED_FEEDS = [
  {
    "id": "ai-safety-evals-picks",
    "name": "AI\u5B89\u5168\u4E0E\u8BC4\u6D4B\u7CBE\u9009",
    "category": "article",
    "siteUrl": "https://github.com/Serennity007/ai-safety-evals-picks",
    "feedUrl": "https://serennity007.github.io/ai-safety-evals-picks/feed.xml",
    "note": "\u4EBA\u5DE5\u9010\u7BC7\u7CBE\u9009\uFF0C\u9644\u539F\u521B\u6458\u8981\u4E0E\u63A8\u8350\u7406\u7531\uFF1B\u5BA1\u6838\u5E76\u63D0\u4EA4\u540E\u624D\u66F4\u65B0"
  }
];

// src/view.js
var import_obsidian = require("obsidian");
var VIEW_TYPE_PICKS = "ai-safety-evals-picks-view";
var ALL = "__all";
function formatTime(ts) {
  if (!ts) return "\u65F6\u95F4\u672A\u77E5";
  const now = Date.now();
  if (Math.abs(now - ts) < 7 * 24 * 3600 * 1e3) return (0, import_obsidian.moment)(ts).fromNow();
  return (0, import_obsidian.moment)(ts).format("YYYY-MM-DD");
}
var PicksView = class extends import_obsidian.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.filter = ALL;
    this.query = "";
    this.unreadOnly = false;
  }
  getViewType() {
    return VIEW_TYPE_PICKS;
  }
  getDisplayText() {
    return "AI\u5B89\u5168\u4E0E\u8BC4\u6D4B\u7CBE\u9009";
  }
  getIcon() {
    return "scroll-text";
  }
  async onOpen() {
    this.plugin.attachView(this);
    this.build();
  }
  async onClose() {
    this.plugin.detachView(this);
    this.contentEl.empty();
  }
  build() {
    const root = this.contentEl.createDiv({ cls: "zp-root" });
    this.toolbarEl = root.createDiv({ cls: "zp-toolbar" });
    this.statusEl = root.createDiv({ cls: "zp-status" });
    this.listEl = root.createDiv({ cls: "zp-list" });
    this.buildToolbar();
    this.renderList();
  }
  buildToolbar() {
    this.toolbarEl.empty();
    this.toolbarFeeds = this.feedSignature();
    const refresh = this.toolbarEl.createEl("button", { cls: "zp-btn zp-btn-icon" });
    (0, import_obsidian.setIcon)(refresh, "refresh-cw");
    refresh.setAttr("aria-label", "\u5237\u65B0\u8BA2\u9605");
    refresh.addEventListener("click", () => {
      void this.plugin.refresh({ silent: false });
    });
    const select = this.toolbarEl.createEl("select", { cls: "zp-select" });
    const feeds = this.plugin.activeFeeds();
    select.createEl("option", { value: ALL, text: `\u5168\u90E8\uFF08${feeds.length} \u4E2A\u6E90\uFF09` });
    for (const feed of feeds) {
      select.createEl("option", { value: feed.id, text: feed.name });
    }
    select.value = this.filter;
    select.addEventListener("change", () => {
      this.filter = select.value;
      this.renderList();
    });
    this.selectEl = select;
    const search = this.toolbarEl.createEl("input", {
      cls: "zp-search",
      attr: { type: "search", placeholder: "\u641C\u7D22\u6807\u9898\u3001\u6458\u8981\u3001\u6765\u6E90" }
    });
    search.value = this.query;
    search.addEventListener("input", () => {
      this.query = search.value.trim().toLowerCase();
      this.renderList();
    });
    const unread = this.toolbarEl.createEl("button", { cls: "zp-btn", text: "\u53EA\u770B\u672A\u8BFB" });
    unread.toggleClass("is-active", this.unreadOnly);
    unread.addEventListener("click", () => {
      this.unreadOnly = !this.unreadOnly;
      unread.toggleClass("is-active", this.unreadOnly);
      this.renderList();
    });
  }
  feedSignature() {
    return this.plugin.activeFeeds().map((feed) => feed.id).join("|");
  }
  visibleItems() {
    if (this.filter !== ALL && !this.plugin.activeFeeds().some((feed) => feed.id === this.filter)) {
      this.filter = ALL;
    }
    const items = this.plugin.items;
    return items.filter((item) => {
      if (this.filter !== ALL && item.feedId !== this.filter) return false;
      if (this.unreadOnly && this.plugin.isRead(item.id)) return false;
      if (!this.query) return true;
      return [item.title, item.summary, item.feedName, item.author].join(" ").toLowerCase().includes(this.query);
    });
  }
  renderList() {
    if (!this.listEl) return;
    const items = this.visibleItems();
    if (this.selectEl) this.selectEl.value = this.filter;
    this.listEl.empty();
    if (this.plugin.loading) {
      this.statusEl.setText("\u6B63\u5728\u8BFB\u53D6\u8BA2\u9605\u2026");
      return;
    }
    const failed = this.plugin.failedFeeds();
    const parts = [`\u5171 ${items.length} \u7BC7`, `\u63D2\u4EF6\u81EA\u8BFB\u8BA2\u9605 ${this.plugin.activeFeeds().length} \u4E2A\u6E90`];
    if (this.plugin.lastRefresh) parts.push(`\u66F4\u65B0\u4E8E ${(0, import_obsidian.moment)(this.plugin.lastRefresh).format("MM-DD HH:mm")}`);
    if (failed.length) parts.push(`${failed.length} \u4E2A\u6E90\u5931\u8D25`);
    this.statusEl.setText(parts.join(" \xB7 "));
    if (!items.length) {
      this.listEl.createDiv({ cls: "zp-empty", text: "\u6CA1\u6709\u5339\u914D\u7684\u6587\u7AE0\uFF0C\u70B9\u5DE6\u4E0A\u89D2\u5237\u65B0\u62C9\u53D6\u6700\u65B0\u5185\u5BB9\u3002" });
      return;
    }
    for (const item of items) {
      this.renderItem(item);
    }
  }
  renderItem(item) {
    const row = this.listEl.createDiv({ cls: "zp-item" });
    row.toggleClass("is-read", this.plugin.isRead(item.id));
    const main = row.createDiv({ cls: "zp-item-main" });
    main.createDiv({ cls: "zp-item-title", text: item.title });
    main.createDiv({
      cls: "zp-item-meta",
      text: [item.feedName, formatTime(item.publishedTs), item.author].filter(Boolean).join(" \xB7 ")
    });
    if (item.summary) main.createDiv({ cls: "zp-item-summary", text: item.summary });
    const actions = row.createDiv({ cls: "zp-item-actions" });
    const noteBtn = actions.createEl("button", { cls: "zp-btn zp-btn-small", text: "\u8BB0\u65E5\u8BB0" });
    noteBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      void this.plugin.appendToDailyNote(item);
    });
    const openBtn = actions.createEl("button", { cls: "zp-btn zp-btn-small", text: "\u539F\u6587" });
    openBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      this.plugin.markRead(item.id);
      if (item.link) window.open(item.link);
    });
    main.addEventListener("click", () => {
      this.plugin.markRead(item.id);
      row.toggleClass("is-read", true);
      if (item.link) window.open(item.link);
    });
  }
  refresh() {
    if (this.toolbarFeeds !== this.feedSignature()) this.buildToolbar();
    this.renderList();
  }
};

// src/settings.js
var import_obsidian2 = require("obsidian");
var DEFAULT_SETTINGS = {
  refreshOnStartup: true,
  refreshIntervalMinutes: 120,
  maxItems: 200,
  perFeedLimit: 25,
  feedTimeoutMs: 2e4,
  disabledFeedIds: [],
  customFeeds: [],
  dailyNoteFolder: "",
  dailyNoteFormat: "YYYY-MM-DD"
};
var PicksSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "AI\u5B89\u5168\u4E0E\u8BC4\u6D4B\u7CBE\u9009" });
    containerEl.createEl("p", {
      text: "\u7CBE\u9009\u65B9\u5411\uFF1ALLM \u8BC4\u6D4B\u3001\u53EF\u9760\u6027\u3001\u53EF\u89E3\u91CA\u6027\u3001\u5BF9\u9F50\u4E0E\u5B89\u5168\u5B9E\u9A8C\u3002\u4EBA\u5DE5\u9010\u7BC7\u7CBE\u9009\uFF0C\u4E0D\u6574\u6E90\u642C\u5165\u8D44\u8BAF\u3002",
      cls: "zp-setting-note"
    });
    new import_obsidian2.Setting(containerEl).setName("\u542F\u52A8\u65F6\u5237\u65B0").setDesc("\u6253\u5F00 Obsidian \u540E\u81EA\u52A8\u62C9\u53D6\u4E00\u6B21\u8BA2\u9605\u3002").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.refreshOnStartup).onChange(async (value) => {
        this.plugin.settings.refreshOnStartup = value;
        await this.plugin.saveState();
      })
    );
    new import_obsidian2.Setting(containerEl).setName("\u81EA\u52A8\u5237\u65B0\u95F4\u9694\uFF08\u5206\u949F\uFF09").setDesc("\u586B 0 \u5173\u95ED\u5B9A\u65F6\u5237\u65B0\u3002").addText(
      (text) => text.setValue(String(this.plugin.settings.refreshIntervalMinutes)).onChange(async (value) => {
        const parsed = Number.parseInt(value, 10);
        this.plugin.settings.refreshIntervalMinutes = Number.isNaN(parsed) || parsed < 0 ? 0 : parsed;
        await this.plugin.saveState();
        this.plugin.registerRefreshInterval();
      })
    );
    new import_obsidian2.Setting(containerEl).setName("\u5217\u8868\u6700\u591A\u4FDD\u7559\u6587\u7AE0\u6570").setDesc("\u6240\u6709\u6E90\u5408\u5E76\u3001\u6309\u65F6\u95F4\u5012\u5E8F\u540E\u622A\u65AD\u3002").addText(
      (text) => text.setValue(String(this.plugin.settings.maxItems)).onChange(async (value) => {
        const parsed = Number.parseInt(value, 10);
        this.plugin.settings.maxItems = Number.isNaN(parsed) || parsed < 20 ? 200 : parsed;
        await this.plugin.saveState();
      })
    );
    new import_obsidian2.Setting(containerEl).setName("\u5355\u4E2A\u6E90\u8D85\u65F6\uFF08\u6BEB\u79D2\uFF09").setDesc("Obsidian \u7684 requestUrl \u4E0D\u652F\u6301\u4E2D\u65AD\uFF0C\u8D85\u65F6\u540E\u8BE5\u6E90\u8BB0\u4E3A\u5931\u8D25\u4F46\u4E0D\u518D\u62D6\u4F4F\u6574\u6B21\u5237\u65B0\uFF1B\u8D70\u4EE3\u7406\u6216\u7F51\u7EDC\u6162\u65F6\u53EF\u8C03\u5927\u3002").addText(
      (text) => text.setValue(String(this.plugin.settings.feedTimeoutMs)).onChange(async (value) => {
        const parsed = Number.parseInt(value, 10);
        this.plugin.settings.feedTimeoutMs = Number.isNaN(parsed) || parsed < 1e3 ? 2e4 : parsed;
        await this.plugin.saveState();
      })
    );
    new import_obsidian2.Setting(containerEl).setName("\u6BCF\u65E5\u65E5\u8BB0\u6587\u4EF6\u5939").setDesc("\u7559\u7A7A\u5219\u4F7F\u7528 Obsidian \u6838\u5FC3\u300C\u65E5\u8BB0\u300D\u63D2\u4EF6\u7684\u8BBE\u7F6E\uFF1B\u627E\u4E0D\u5230\u65F6\u5199\u5165\u5E93\u6839\u76EE\u5F55\u3002").addText(
      (text) => text.setPlaceholder("\u4F8B\u5982 00-\u65E5\u8BB0").setValue(this.plugin.settings.dailyNoteFolder).onChange(async (value) => {
        this.plugin.settings.dailyNoteFolder = value.trim();
        await this.plugin.saveState();
      })
    );
    new import_obsidian2.Setting(containerEl).setName("\u6BCF\u65E5\u65E5\u8BB0\u6587\u4EF6\u540D\u683C\u5F0F").setDesc("moment \u683C\u5F0F\uFF0C\u9ED8\u8BA4 YYYY-MM-DD\u3002").addText(
      (text) => text.setValue(this.plugin.settings.dailyNoteFormat).onChange(async (value) => {
        this.plugin.settings.dailyNoteFormat = value.trim() || "YYYY-MM-DD";
        await this.plugin.saveState();
      })
    );
    containerEl.createEl("h3", { text: "\u7CBE\u9009\u8BA2\u9605\u6E90" });
    for (const feed of this.plugin.curatedFeeds()) {
      new import_obsidian2.Setting(containerEl).setName(feed.name).setDesc(`${feed.category} \xB7 ${feed.note || feed.siteUrl}`).addToggle(
        (toggle) => toggle.setValue(!this.plugin.settings.disabledFeedIds.includes(feed.id)).onChange(async (value) => {
          const disabled = new Set(this.plugin.settings.disabledFeedIds);
          if (value) disabled.delete(feed.id);
          else disabled.add(feed.id);
          this.plugin.settings.disabledFeedIds = [...disabled];
          await this.plugin.saveState();
        })
      );
    }
    containerEl.createEl("h3", { text: "\u6211\u7684\u8BA2\u9605" });
    for (const feed of this.plugin.settings.customFeeds) {
      new import_obsidian2.Setting(containerEl).setName(feed.name).setDesc(feed.feedUrl).addButton(
        (button) => button.setTooltip("\u79FB\u9664").setIcon("trash").onClick(async () => {
          this.plugin.settings.customFeeds = this.plugin.settings.customFeeds.filter(
            (candidate) => candidate.id !== feed.id
          );
          await this.plugin.saveState();
          this.display();
        })
      );
    }
    new import_obsidian2.Setting(containerEl).setName("\u6DFB\u52A0\u81EA\u5B9A\u4E49 RSS / Atom").setDesc("\u540D\u79F0\u4E0E\u8BA2\u9605\u5730\u5740\u90FD\u586B\u5199\u540E\u70B9\u300C\u6DFB\u52A0\u300D\u3002").addText((text) => {
      text.setPlaceholder("\u540D\u79F0");
      this.customNameEl = text.inputEl;
    }).addText((text) => {
      text.setPlaceholder("https://example.com/feed.xml");
      this.customUrlEl = text.inputEl;
    }).addButton(
      (button) => button.setButtonText("\u6DFB\u52A0").onClick(async () => {
        const name = this.customNameEl.value.trim();
        const url = this.customUrlEl.value.trim();
        if (!name || !/^https?:\/\//.test(url)) return;
        this.plugin.settings.customFeeds.push({
          id: `custom-${Date.now().toString(36)}`,
          name,
          feedUrl: url,
          category: "custom"
        });
        await this.plugin.saveState();
        this.display();
      })
    );
  }
};

// src/parser.js
var ENCODING_ATTR = /encoding\s*=\s*["']([^"']+)["']/i;
var CHARSET_PARAM = /charset\s*=\s*([A-Za-z0-9_:.+-]+)/i;
var SUMMARY_LIMIT = 320;
function normalizeLabel(label) {
  if (!label) return "utf-8";
  const clean = label.replace(/^["']|["']$/g, "").trim().toLowerCase();
  if (!clean || clean === "utf8" || clean === "utf-8") return "utf-8";
  if (clean === "gb2312" || clean === "gb-2312" || clean === "windows-936") return "gbk";
  if (clean === "x-sjis" || clean === "shift_jis") return "shift_jis";
  return clean;
}
function decodeXmlBytes(arrayBuffer, contentType = "") {
  const bytes = new Uint8Array(arrayBuffer);
  const fromHeader = contentType.match(CHARSET_PARAM)?.[1];
  const prolog = new TextDecoder("utf-8", { fatal: false }).decode(bytes.slice(0, 400));
  const label = normalizeLabel(fromHeader || prolog.match(ENCODING_ATTR)?.[1]);
  try {
    return new TextDecoder(label, { fatal: false }).decode(bytes);
  } catch {
    return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
  }
}
function localName(node) {
  return String(node.localName || node.nodeName || "").split(":").pop().toLowerCase();
}
function childrenOf(el) {
  return el ? Array.from(el.children || []) : [];
}
function firstChild(el, name) {
  const target = name.toLowerCase();
  return childrenOf(el).find((child) => localName(child) === target) || null;
}
function textOf(el, name) {
  const child = firstChild(el, name);
  return child ? (child.textContent || "").trim() : "";
}
function collapse(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}
function htmlToText(html) {
  const trimmed = String(html || "").trim();
  if (!trimmed) return "";
  if (!/[<&]/.test(trimmed)) return collapse(trimmed);
  const doc = new DOMParser().parseFromString(trimmed, "text/html");
  const text = collapse(doc.body?.textContent || "");
  return text || collapse(trimmed);
}
function truncate(value) {
  if (value.length <= SUMMARY_LIMIT) return value;
  return `${value.slice(0, SUMMARY_LIMIT).trimEnd()}\u2026`;
}
function resolveLink(raw, baseUrl) {
  const value = String(raw || "").trim();
  if (!value) return "";
  try {
    return new URL(value, baseUrl || void 0).href;
  } catch {
    return value;
  }
}
function toTimestamp(value) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}
function atomLink(entry) {
  const links = childrenOf(entry).filter((child) => localName(child) === "link");
  const preferred = links.find((link) => (link.getAttribute("rel") || "alternate") === "alternate") || links[0];
  return preferred?.getAttribute("href") || preferred?.textContent?.trim() || "";
}
function parseItem(item, baseUrl, fallbackId) {
  const title = collapse(textOf(item, "title")) || "\uFF08\u65E0\u6807\u9898\uFF09";
  const rawLink = textOf(item, "link") || atomLink(item);
  const link = resolveLink(rawLink, baseUrl);
  const guid = textOf(item, "guid") || textOf(item, "id");
  const published = textOf(item, "pubDate") || textOf(item, "published") || textOf(item, "updated") || textOf(item, "date");
  const rawSummary = textOf(item, "encoded") || textOf(item, "content") || textOf(item, "description") || textOf(item, "summary");
  const author = collapse(textOf(item, "author") || textOf(item, "creator") || textOf(item, "name"));
  return {
    id: guid || link || `${fallbackId}-${title}`,
    title,
    link,
    author,
    published,
    publishedTs: toTimestamp(published),
    summary: truncate(htmlToText(rawSummary))
  };
}
function parseFeedXml(xml, baseUrl = "") {
  if (!String(xml || "").trim()) throw new Error("\u8BA2\u9605\u6E90\u5185\u5BB9\u4E3A\u7A7A");
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  if (doc.querySelector("parsererror") || doc.getElementsByTagName("parsererror").length) {
    throw new Error("\u8BA2\u9605\u6E90\u4E0D\u662F\u5408\u6CD5\u7684 XML");
  }
  const root = doc.documentElement;
  if (!root) throw new Error("\u8BA2\u9605\u6E90\u7F3A\u5C11\u6839\u8282\u70B9");
  const format = localName(root);
  if (format === "rss" || format === "rdf" || format === "feed") {
    const channel = format === "feed" ? root : firstChild(root, "channel") || root;
    const feedTitle = collapse(textOf(channel, "title")) || baseUrl;
    const container = format === "rdf" ? root : channel;
    const source = childrenOf(container).filter((c) => localName(c) === (format === "feed" ? "entry" : "item"));
    const items = source.map((entry) => parseItem(entry, baseUrl, feedTitle)).filter((entry) => entry.link || entry.title);
    return { feedTitle, format, items };
  }
  throw new Error(`\u672A\u8BC6\u522B\u7684\u8BA2\u9605\u683C\u5F0F\uFF1A${format}`);
}
function dedupeItems(items) {
  const seen = /* @__PURE__ */ new Set();
  const result = [];
  for (const item of items) {
    const keys = [item.id, item.link].filter(Boolean);
    if (keys.some((key) => seen.has(key))) continue;
    keys.forEach((key) => seen.add(key));
    result.push(item);
  }
  return result;
}

// src/main.js
var CONCURRENCY = 6;
var READ_LIMIT = 2e3;
function contentTypeOf(headers) {
  const entry = Object.entries(headers || {}).find(([key]) => key.toLowerCase() === "content-type");
  return entry ? String(entry[1]) : "";
}
function escapeTitle(value) {
  return String(value || "").replace(/[[\]]/g, "");
}
var DirectionPicksPlugin = class extends import_obsidian3.Plugin {
  constructor() {
    super(...arguments);
    __publicField(this, "items", []);
    __publicField(this, "readMap", {});
    __publicField(this, "feedStatus", {});
    __publicField(this, "loading", false);
    __publicField(this, "lastRefresh", 0);
    __publicField(this, "view", null);
    __publicField(this, "refreshHandle", null);
  }
  async onload() {
    await this.loadState();
    this.registerView(VIEW_TYPE_PICKS, (leaf) => new PicksView(leaf, this));
    this.addRibbonIcon("scroll-text", "AI\u5B89\u5168\u4E0E\u8BC4\u6D4B\u7CBE\u9009\uFF1A\u6253\u5F00\u9605\u8BFB\u5668", () => {
      void this.activateView();
    });
    this.addCommand({
      id: "open-reader",
      name: "\u6253\u5F00AI\u5B89\u5168\u4E0E\u8BC4\u6D4B\u7CBE\u9009\u9605\u8BFB\u5668",
      callback: () => {
        void this.activateView();
      }
    });
    this.addCommand({
      id: "refresh-feeds",
      name: "\u5237\u65B0\u7CBE\u9009\u8BA2\u9605",
      callback: () => {
        void this.refresh({ silent: false });
      }
    });
    this.addSettingTab(new PicksSettingTab(this.app, this));
    this.registerRefreshInterval();
    this.app.workspace.onLayoutReady(() => {
      if (this.settings.refreshOnStartup) void this.refresh({ silent: true });
    });
  }
  async loadState() {
    const raw = await this.loadData();
    this.settings = { ...DEFAULT_SETTINGS, ...raw?.settings || {} };
    this.settings.customFeeds = Array.isArray(this.settings.customFeeds) ? this.settings.customFeeds : [];
    this.settings.disabledFeedIds = Array.isArray(this.settings.disabledFeedIds) ? this.settings.disabledFeedIds : [];
    this.readMap = raw?.read && typeof raw.read === "object" ? raw.read : {};
    this.lastRefresh = typeof raw?.lastRefresh === "number" ? raw.lastRefresh : 0;
  }
  async saveState() {
    await this.saveData({
      settings: this.settings,
      read: this.readMap,
      lastRefresh: this.lastRefresh
    });
  }
  curatedFeeds() {
    return CURATED_FEEDS;
  }
  activeFeeds() {
    const disabled = new Set(this.settings.disabledFeedIds);
    return [
      ...CURATED_FEEDS.filter((feed) => !disabled.has(feed.id)),
      ...this.settings.customFeeds.filter((feed) => /^https?:\/\//.test(feed.feedUrl || ""))
    ];
  }
  attachView(view) {
    this.view = view;
    view.renderList();
  }
  detachView(view) {
    if (this.view === view) this.view = null;
  }
  notifyView() {
    this.view?.refresh();
  }
  async activateView() {
    const existing = this.app.workspace.getLeavesOfType(VIEW_TYPE_PICKS);
    if (existing.length) {
      this.app.workspace.revealLeaf(existing[0]);
      return;
    }
    const leaf = this.app.workspace.getLeaf(true);
    await leaf.setViewState({ type: VIEW_TYPE_PICKS, active: true });
    this.app.workspace.revealLeaf(leaf);
  }
  registerRefreshInterval() {
    if (this.refreshHandle !== null) window.clearInterval(this.refreshHandle);
    this.refreshHandle = null;
    const minutes = Number(this.settings.refreshIntervalMinutes);
    if (!minutes || minutes < 1) return;
    this.refreshHandle = window.setInterval(() => {
      void this.refresh({ silent: true });
    }, minutes * 60 * 1e3);
    this.registerInterval(this.refreshHandle);
  }
  async refresh({ silent = true } = {}) {
    if (this.loading) return;
    this.loading = true;
    this.notifyView();
    const feeds = this.activeFeeds();
    const collected = [];
    this.feedStatus = {};
    for (let index = 0; index < feeds.length; index += CONCURRENCY) {
      const batch = feeds.slice(index, index + CONCURRENCY);
      const results = await Promise.allSettled(batch.map((feed) => this.fetchWithTimeout(feed)));
      results.forEach((result, offset) => {
        const feed = batch[offset];
        if (result.status === "fulfilled") {
          this.feedStatus[feed.id] = { ok: true, count: result.value.length };
          collected.push(...result.value);
        } else {
          this.feedStatus[feed.id] = { ok: false, error: String(result.reason?.message || result.reason) };
        }
      });
    }
    this.items = dedupeItems(collected).sort((a, b) => (b.publishedTs || 0) - (a.publishedTs || 0)).slice(0, this.settings.maxItems);
    this.lastRefresh = Date.now();
    this.loading = false;
    this.notifyView();
    await this.saveState();
    if (!silent) {
      const failed = this.failedFeeds();
      new import_obsidian3.Notice(
        `AI\u5B89\u5168\u4E0E\u8BC4\u6D4B\u7CBE\u9009\uFF1A\u8BFB\u5230 ${this.items.length} \u7BC7\uFF0C\u6765\u81EA ${feeds.length - failed.length}/${feeds.length} \u4E2A\u6E90` + (failed.length ? `\uFF1B\u5931\u8D25\uFF1A${failed.map((entry) => entry.name).join("\u3001")}` : "")
      );
    }
  }
  // requestUrl 既没有 signal 也没有 timeout，连接被挂起时 Promise 永不落地；
  // 一个源卡住会让整批 allSettled 不返回，loading 永远为 true，之后所有刷新空转。
  fetchWithTimeout(feed) {
    let timer = null;
    const timeout = new Promise((_, reject) => {
      timer = window.setTimeout(() => {
        reject(new Error(`\u8D85\u8FC7 ${this.settings.feedTimeoutMs}ms \u6CA1\u6709\u54CD\u5E94`));
      }, this.settings.feedTimeoutMs);
    });
    return Promise.race([this.fetchFeed(feed), timeout]).finally(() => {
      if (timer !== null) window.clearTimeout(timer);
    });
  }
  async fetchFeed(feed) {
    const response = await (0, import_obsidian3.requestUrl)({
      url: feed.feedUrl,
      method: "GET",
      headers: {
        Accept: "application/atom+xml, application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*"
      }
    });
    const xml = decodeXmlBytes(response.arrayBuffer, contentTypeOf(response.headers));
    const parsed = parseFeedXml(xml, feed.feedUrl);
    return parsed.items.slice(0, this.settings.perFeedLimit).map((item) => ({
      ...item,
      feedId: feed.id,
      feedName: feed.name,
      category: feed.category
    }));
  }
  failedFeeds() {
    return Object.entries(this.feedStatus).filter(([, status]) => !status.ok).map(([id, status]) => ({
      id,
      name: this.activeFeeds().find((feed) => feed.id === id)?.name || id,
      error: status.error
    }));
  }
  isRead(id) {
    return Boolean(this.readMap[id]);
  }
  markRead(id) {
    if (!id || this.readMap[id]) return;
    this.readMap[id] = Date.now();
    const keys = Object.keys(this.readMap);
    if (keys.length > READ_LIMIT) {
      const keep = keys.sort((a, b) => this.readMap[b] - this.readMap[a]).slice(0, READ_LIMIT);
      this.readMap = Object.fromEntries(keep.map((key) => [key, this.readMap[key]]));
    }
    void this.saveState();
  }
  dailyNotePath() {
    const format = this.settings.dailyNoteFormat || "YYYY-MM-DD";
    const fileName = (0, import_obsidian3.moment)().format(format);
    let folder = String(this.settings.dailyNoteFolder || "").trim();
    if (!folder) {
      const dailyNotes = this.app.internalPlugins?.getEnabledPluginById?.("daily-notes");
      const configured = String(dailyNotes?.instance?.settings?.folder || "").trim();
      if (configured && configured !== "/") folder = configured.replace(/\/+$/, "");
    }
    return (0, import_obsidian3.normalizePath)(folder ? `${folder}/${fileName}.md` : `${fileName}.md`);
  }
  async appendToDailyNote(item) {
    const path = this.dailyNotePath();
    const entry = `- [${escapeTitle(item.title)}](${item.link}) \u2014 AI\u5B89\u5168\u4E0E\u8BC4\u6D4B\u7CBE\u9009 \xB7 ${item.feedName}`;
    const existing = this.app.vault.getAbstractFileByPath(path);
    let file = null;
    if (existing instanceof import_obsidian3.TFile) {
      const content = await this.app.vault.cachedRead(existing);
      if (item.link && content.includes(item.link)) {
        new import_obsidian3.Notice("\u4ECA\u65E5\u65E5\u8BB0\u91CC\u5DF2\u7ECF\u6709\u8FD9\u7BC7\u6587\u7AE0\u4E86");
        return;
      }
      const prefix = content && !content.endsWith("\n") ? "\n" : "";
      await this.app.vault.modify(existing, `${content}${prefix}${entry}
`);
      file = existing;
    } else {
      const folder = path.split("/").slice(0, -1).join("/");
      if (folder && !this.app.vault.getAbstractFileByPath(folder)) {
        await this.app.vault.createFolder(folder);
      }
      const title = path.split("/").pop().replace(/\.md$/, "");
      file = await this.app.vault.create(path, `# ${title}

${entry}
`);
    }
    this.markRead(item.id);
    this.notifyView();
    new import_obsidian3.Notice(`\u5DF2\u8BB0\u5165 ${path}`);
    if (file) await this.app.workspace.getLeaf(false).openFile(file);
  }
};
