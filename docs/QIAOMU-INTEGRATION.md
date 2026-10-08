# 乔木源码集成验证

2026-10-09，使用 Zhengtao AI Pick fork 的实际 src/feeds.ts 解析各方向 feed.xml 与 feeds.opml；使用 src/personal-library.ts 的 ensureGroup 与 togglePinnedGroup 创建并置顶内存分组。四条方向精选流共 26 篇文章、4 个独立分组均通过，原文链接、标题、发表时间与精选理由保持一致。

合并 OPML 解析得到 4 个不同方向分组。验证只用新的内存状态，没有读取或写入日常库 data.json，没有覆盖安装版 main.js，也没有实测 Obsidian 渲染。完整机器记录见 [qiaomu-integration.json](qiaomu-integration.json)。

并列频道仍需要运行带 pinnedGroupIds 正式功能的 fork。官方 0.26.2 只导入分组，不能据此声称已经在用户界面中并列显示。
