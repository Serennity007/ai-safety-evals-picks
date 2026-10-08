# 框架来源

复用 https://github.com/Serennity007/zhengtao-picks 1.2.0（69e6062）的 MIT 阅读器。方向名称、图标、view type、插件 ID 独立；解析、超时、搜索、已读与记日记功能沿用原实现。保留 MIT 版权声明。

选稿存于 src/picks.js，RSS 仅输出原创摘要、推荐理由及原站链接。SOURCE_FEEDS 是候选池，不是默认订阅。

乔木内 OPML 导入一个分组，复用 fork 已有的 pinnedGroupIds 功能得到并列频道；没有复制乔木代码或扩展 bundle 补丁。
