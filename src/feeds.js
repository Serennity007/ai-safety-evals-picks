// 频道与候选来源唯一配置；来源池不是默认订阅。
export const DIRECTION = {
  "input": "ai-safety-evals",
  "slug": "ai-safety-evals-picks",
  "name": "AI安全与评测精选",
  "icon": "scroll-text",
  "scope": "LLM 评测、可靠性、可解释性、对齐与安全实验",
  "boundary": "不收泛伦理新闻、未经验证的风险论断和宽泛社区信息流。"
};
export const CURATED_FEEDS = [
  {
    "id": "ai-safety-evals-picks",
    "name": "AI安全与评测精选",
    "category": "article",
    "siteUrl": "https://github.com/Serennity007/ai-safety-evals-picks",
    "feedUrl": "https://serennity007.github.io/ai-safety-evals-picks/feed.xml",
    "note": "人工逐篇精选，附原创摘要与推荐理由；审核并提交后才更新"
  }
];
export const SOURCE_FEEDS = [
  {
    "id": "metr",
    "name": "METR",
    "siteUrl": "https://metr.org/",
    "feedUrl": "https://metr.org/feed.xml",
    "note": "独立模型评测团队的一手实验与工程记录。候选池采用官网 RSS：104 条、最新 2026-10-06、9,051,157 字节，含多语言转载，不作为默认整源订阅。官方 Substack 曾用 urllib 抓取成功，但本机原生 Node 重复连接超时，故改用已通过原生 Node 与阅读器解析的官网地址。",
    "quality": "作者实际部署动作监控并评估误报、漏报、注入和人工审核失效；明示证据不足与工程限制。官网确认官方 Substack 归属。",
    "evidenceUrl": "https://metr.org/notes/2026-09-27-implementing-a-basic-blocking-action-monitor/",
    "evidenceTitle": "Implementing and Evaluating a Basic Per-Action Monitor for Safer Evals",
    "liveItems": 104,
    "latest": "2026-10-06T07:00:00Z",
    "bytes": 9051157,
    "defaultSubscription": false
  },
  {
    "id": "redwood",
    "name": "Redwood Research",
    "siteUrl": "https://www.redwoodresearch.org/research",
    "feedUrl": "https://blog.redwoodresearch.org/feed",
    "note": "AI control、CoT 监督和评测 elicitation 的研究者博客。20 条、最新 2026-10-05、1,331,732 字节；也有研究观点与理论讨论，因此文章层筛选具体方法和实验。",
    "quality": "原始实验对 4 个模型、9 类 CoT 控制任务进行提示词优化并检查未见模式泛化，报告准确率和推理长度的副作用；机构官网链接该博客。",
    "evidenceUrl": "https://blog.redwoodresearch.org/p/cot-controllability-evals-seem-very",
    "evidenceTitle": "CoT controllability evals seem very under-elicited",
    "liveItems": 20,
    "latest": "2026-10-05T22:04:23Z",
    "bytes": 1331732,
    "defaultSubscription": false
  },
  {
    "id": "transformer-circuits",
    "name": "Transformer Circuits",
    "siteUrl": "https://transformer-circuits.pub/",
    "feedUrl": "https://transformer-circuits.pub/feed.xml",
    "note": "官方 Atom，56 条、最新 2026-08-21、25,516 字节。近期以 LLM 内部表示、解释工具和因果干预为主；历史研究包含视觉神经网络，候选池保留，精选文章只选语言模型技术。",
    "quality": "原始可解释性论文，给出 Jacobian lens 的构建、读取与干预实验，并明确单 token 概念和其他覆盖局限；首页直接声明 Atom 地址。",
    "evidenceUrl": "https://transformer-circuits.pub/2026/workspace/index.html",
    "evidenceTitle": "Verbalizable Representations Form a Global Workspace in Language Models",
    "liveItems": 56,
    "latest": "2026-08-21T00:00:00Z",
    "bytes": 25516,
    "defaultSubscription": false
  },
  {
    "id": "far-ai",
    "name": "FAR.AI",
    "siteUrl": "https://www.far.ai/blog",
    "feedUrl": "https://www.far.ai/blog/rss.xml",
    "note": "仅候选池，不整源订阅。官方 RSS 55 条、最新 2026-09-22、45,767 字节；最近 25 条约 11 条技术实验、工具或评测方法，其余多为会议、资助、奖项与政策传播。只纳入逐篇核查的原始实验。",
    "quality": "Qoder 论文明确列出 4 个模型、30 项测试、逐任务判分和披露边界；同时该机构整源噪声偏高，不能凭一篇好文章把全部新闻收入精选。",
    "evidenceUrl": "https://www.far.ai/blog/jailbreaking-qoders-cyber-safeguards",
    "evidenceTitle": "Jailbreaking Qoder’s Cyber Safeguards",
    "liveItems": 55,
    "latest": "2026-09-22T12:00:00Z",
    "bytes": 45767,
    "defaultSubscription": false
  },
  {
    "id": "trail-of-bits-ai",
    "name": "Trail of Bits · AI",
    "siteUrl": "https://blog.trailofbits.com/categories/ai/",
    "feedUrl": "https://blog.trailofbits.com/categories/ai/index.xml",
    "note": "官方 AI 分类 RSS，4 条、最新 2026-09-18、2,601 字节；从安全工程视角讨论评测设计与 Agent 隔离。分类规模很小，只作逐篇候选；不订阅整个安全博客。",
    "quality": "安全审计从业者重新分析公开代码和补丁测试数据，区分阻断给定 exploit 与完整修复；作者有商业审计业务，保留该利益背景并仅精选有可核查技术证据的文章。",
    "evidenceUrl": "https://blog.trailofbits.com/2026/09/15/1passwords-ai-patching-benchmark-is-misleading/",
    "evidenceTitle": "1Password's AI patching benchmark is misleading",
    "liveItems": 4,
    "latest": "2026-09-18T11:00:00Z",
    "bytes": 2601,
    "defaultSubscription": false
  }
];
export const EXCLUDED_FEEDS = [
  {
    "name": "FAR.AI 整源订阅",
    "feedUrl": "https://www.far.ai/blog/rss.xml",
    "reason": "55 条中混入大量会议、资助、奖项与传播内容。只将经逐篇审查的原始实验纳入自有精选 feed；原 feed 仅作候选池。"
  },
  {
    "name": "METR 官网整源",
    "feedUrl": "https://metr.org/feed.xml",
    "reason": "HTTP 200，可解析 104 条、9.05MB，含多语言转载；官网直接链接的官方 Substack 较小，且此方案最终只导入手选文章。"
  },
  {
    "name": "Neel Nanda · Mechanistic Interpretability",
    "feedUrl": "https://www.neelnanda.io/mechanistic-interpretability?format=rss",
    "reason": "HTTP 200，16 条，最新 2023-07-18。历史技术内容优秀，但当前更新迁移，作为活跃方向候选池偏旧。"
  },
  {
    "name": "Neel Nanda 全站",
    "feedUrl": "https://www.neelnanda.io/?format=rss",
    "reason": "HTTP 200，20 条，最新 2025-08-19，混有生活、职业与研究建议；方向聚焦不足。"
  },
  {
    "name": "Apollo Research",
    "feedUrl": "https://apolloresearch.ai/feed.xml",
    "reason": "官网技术内容很强，但探测的 /feed.xml、/feed/ 返回 404，/blog?format=rss 返回 HTML。未找到官方可用 feed，不猜造订阅地址。"
  },
  {
    "name": "EleutherAI",
    "feedUrl": "https://blog.eleuther.ai/index.xml",
    "reason": "有一手评测与解释研究，但测试 feed.xml、atom.xml、index.xml、rss.xml、rss/、feed 均 404；未确认可用官方 feed。"
  },
  {
    "name": "Anthropic Alignment Science",
    "feedUrl": "https://alignment.anthropic.com/rss.xml",
    "reason": "官网活跃，但 /feed.xml、/rss.xml、/rss/ 均 404，未发现官方 RSS 声明；暂不猜造地址。"
  },
  {
    "name": "Alignment Research Center",
    "feedUrl": "https://www.alignment.org/blog/rss/",
    "reason": "HTTP 200、15 条、最新 2026-06-09。当前重心是机制估计、随机 MLP 与形式理论，与本方向的实际 LLM 评测和红队需求距离较远。"
  },
  {
    "name": "Alignment Forum 全站",
    "feedUrl": "https://www.alignmentforum.org/feed.xml?view=frontpage-rss",
    "reason": "HTTP 200、10 条、最新 2026-10-02。混有理论观点并重复 Redwood 内容；不把整个论坛当成经过手选的技术精选。"
  },
  {
    "name": "AI Safety at the Frontier",
    "feedUrl": "https://aisafetyfrontier.substack.com/feed",
    "reason": "HTTP 200、20 条、最新 2026-10-06。近期主要是 Paper Highlights 二次文献汇总；本批优先原始研究者的完整技术文章。"
  },
  {
    "name": "Failure-First",
    "feedUrl": "https://failurefirst.org/rss.xml",
    "reason": "网页声明 RSS，但主题为 embodied AI，与本批 LLM 安全评测范围不符；未为凑数继续探测。"
  },
  {
    "name": "Trail of Bits · Artificial Intelligence 分类",
    "feedUrl": "https://blog.trailofbits.com/categories/artificial-intelligence/index.xml",
    "reason": "可解析但只有一条 Claude 插件介绍；使用另一个实际活跃的 /categories/ai/index.xml 作为文章候选池。"
  }
];
