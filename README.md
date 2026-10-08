# AI安全与评测精选

**LLM 评测、可靠性、可解释性、对齐与安全实验**。正涛维护的方向精选，沿用 [正涛精选](https://github.com/Serennity007/zhengtao-picks) 的轻量阅读器框架。

独立方向仓库、独立精选 RSS、独立插件 ID。默认仅订阅本仓库逐篇审核的 [feed.xml](https://raw.githubusercontent.com/Serennity007/ai-safety-evals-picks/main/feed.xml)。

## 精选标准

首版 **6 篇文章，来自 5 个原始来源**。每篇保留原文标题、链接、发表日期，附原创中文摘要和具体推荐理由，见 [阅读清单](docs/PICKS.md)。

- 有方法、实验、实现细节或可复用经验，优先原作者和项目维护者。
- 不收泛伦理新闻、未经验证的风险论断和宽泛社区信息流。
- 来源池只用于发现候选，优秀作者的营销、公告和跑题文章不会进入默认频道。
- 维护者读原文、审核并提交后才更新。每 120 分钟刷新只是检查本仓库的新精选，不是自动选稿，也没有承诺固定更新频率。

## 与正涛精选并列

1. 在支持置顶的 [Zhengtao AI Pick](https://github.com/Serennity007/zhengtao-ai-pick) 中导入本仓库 [feeds.opml](https://raw.githubusercontent.com/Serennity007/ai-safety-evals-picks/main/feeds.opml)。
2. 得到「AI安全与评测精选」分组，在分组菜单点击 **置顶为独立频道**。
3. 它与「正涛精选」处于同一级。每个方向只导入一条独立精选 RSS，避免原站 RSS 在分组之间抢归属。

官方 Qiaomu AI RSS 0.26.2 没有通用置顶功能，仅导入 OPML 时仍在「我的订阅」。本仓库不会覆盖已经安装的乔木插件，也不直接改日常库的 data.json。

## 独立轻量阅读器

从 [Release](https://github.com/Serennity007/ai-safety-evals-picks/releases/tag/1.0.0) 下载 main.js、manifest.json、styles.css，放入 `<vault>/.obsidian/plugins/ai-safety-evals-picks/`，在 Obsidian 启用 **AI安全与评测精选**。BRAT 可添加 `Serennity007/ai-safety-evals-picks`。

运行命令「打开AI安全与评测精选阅读器」。支持搜索、只看未读、记入日记、自定义订阅；默认每源取最新 25 篇、合计最多 200 篇。文章只存内存，data.json 只保存设置和已读记录。移动端尚未实测。

## 维护与验证

`src/picks.js` 是文章唯一来源，`src/feeds.js` 是频道与候选来源配置。feed.xml、feeds.opml、catalog.json 与清单文档均为生成产物。

```bash
npm ci
npm run check         # 阅读器测试、精选 RSS/OPML 检查、Obsidian API 校验、生成与构建
npm run feeds:check   # 抓取已发布的本仓库精选 RSS
npm run sources:check # 检查候选来源 RSS；不会把候选自动纳入
```

新增文章时读原文，确认方向与作者，填写稳定 id、原文日期、原创摘要和具体推荐理由；重新生成、检查、提交并推送。只改选稿无需发布插件新版，读者刷新 RSS 即可获得更新。

真实抓取记录见 [精选流验证](docs/VALIDATION.md) 和 [来源池验证](docs/SOURCE-VALIDATION.md)。这些检查不等同于 Obsidian 实际界面验证。

## 许可与来源

阅读器复用 Serennity007/zhengtao-picks 1.2.0，保留 [MIT](LICENSE) 声明，详见 [FRAMEWORK.md](docs/FRAMEWORK.md)。选稿摘要和推荐理由由正涛整理。文章链接指向原站，原文与图片版权归原作者；RSS 不转载全文。本仓库不包含 Qiaomu 的 GPL 源码。
