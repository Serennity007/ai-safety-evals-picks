# AI安全与评测精选来源池

默认只订阅本仓库的 [人工精选 RSS](https://raw.githubusercontent.com/Serennity007/ai-safety-evals-picks/main/feed.xml)。来源池只供维护者发现候选，不整源导入。不收泛伦理新闻、未经验证的风险论断和宽泛社区信息流。

由 src/feeds.js 自动生成；混合来源中的宣传、公告和跑题文章逐篇排除。源可抓取不代表所有文章应进入频道。

| 来源 | 为什么参考 | 质量依据 | 代表文章 | 候选订阅 |
| --- | --- | --- | --- | --- |
| METR | 独立模型评测团队的一手实验与工程记录。采用官网直接链接的官方 Substack：20 条、最新 2026-10-06、1,033,291 字节；官网 feed.xml 为 104 条、9,051,157 字节，且混合多语言转载，避免作默认整源订阅。 | 作者实际部署动作监控并评估误报、漏报、注入和人工审核失效；明示证据不足与工程限制。官网确认官方 Substack 归属。 | [Implementing and Evaluating a Basic Per-Action Monitor for Safer Evals](https://metr.org/notes/2026-09-27-implementing-a-basic-blocking-action-monitor/) | [候选 RSS](https://metr.substack.com/feed) |
| Redwood Research | AI control、CoT 监督和评测 elicitation 的研究者博客。20 条、最新 2026-10-05、1,331,732 字节；也有研究观点与理论讨论，因此文章层筛选具体方法和实验。 | 原始实验对 4 个模型、9 类 CoT 控制任务进行提示词优化并检查未见模式泛化，报告准确率和推理长度的副作用；机构官网链接该博客。 | [CoT controllability evals seem very under-elicited](https://blog.redwoodresearch.org/p/cot-controllability-evals-seem-very) | [候选 RSS](https://blog.redwoodresearch.org/feed) |
| Transformer Circuits | 官方 Atom，56 条、最新 2026-08-21、25,516 字节。近期以 LLM 内部表示、解释工具和因果干预为主；历史研究包含视觉神经网络，候选池保留，精选文章只选语言模型技术。 | 原始可解释性论文，给出 Jacobian lens 的构建、读取与干预实验，并明确单 token 概念和其他覆盖局限；首页直接声明 Atom 地址。 | [Verbalizable Representations Form a Global Workspace in Language Models](https://transformer-circuits.pub/2026/workspace/index.html) | [候选 RSS](https://transformer-circuits.pub/feed.xml) |
| FAR.AI | 仅候选池，不整源订阅。官方 RSS 55 条、最新 2026-09-22、45,767 字节；最近 25 条约 11 条技术实验、工具或评测方法，其余多为会议、资助、奖项与政策传播。只纳入逐篇核查的原始实验。 | Qoder 论文明确列出 4 个模型、30 项测试、逐任务判分和披露边界；同时该机构整源噪声偏高，不能凭一篇好文章把全部新闻收入精选。 | [Jailbreaking Qoder’s Cyber Safeguards](https://www.far.ai/blog/jailbreaking-qoders-cyber-safeguards) | [候选 RSS](https://www.far.ai/blog/rss.xml) |
| Trail of Bits · AI | 官方 AI 分类 RSS，4 条、最新 2026-09-18、2,601 字节；从安全工程视角讨论评测设计与 Agent 隔离。分类规模很小，只作逐篇候选；不订阅整个安全博客。 | 安全审计从业者重新分析公开代码和补丁测试数据，区分阻断给定 exploit 与完整修复；作者有商业审计业务，保留该利益背景并仅精选有可核查技术证据的文章。 | [1Password's AI patching benchmark is misleading](https://blog.trailofbits.com/2026/09/15/1passwords-ai-patching-benchmark-is-misleading/) | [候选 RSS](https://blog.trailofbits.com/categories/ai/index.xml) |

## 未采用或不整源订阅

| 候选 | 原因 | 地址 |
| --- | --- | --- |
| FAR.AI 整源订阅 | 55 条中混入大量会议、资助、奖项与传播内容。只将经逐篇审查的原始实验纳入自有精选 feed；原 feed 仅作候选池。 | [候选地址](https://www.far.ai/blog/rss.xml) |
| METR 官网整源 | HTTP 200，可解析 104 条、9.05MB，含多语言转载；官网直接链接的官方 Substack 较小，且此方案最终只导入手选文章。 | [候选地址](https://metr.org/feed.xml) |
| Neel Nanda · Mechanistic Interpretability | HTTP 200，16 条，最新 2023-07-18。历史技术内容优秀，但当前更新迁移，作为活跃方向候选池偏旧。 | [候选地址](https://www.neelnanda.io/mechanistic-interpretability?format=rss) |
| Neel Nanda 全站 | HTTP 200，20 条，最新 2025-08-19，混有生活、职业与研究建议；方向聚焦不足。 | [候选地址](https://www.neelnanda.io/?format=rss) |
| Apollo Research | 官网技术内容很强，但探测的 /feed.xml、/feed/ 返回 404，/blog?format=rss 返回 HTML。未找到官方可用 feed，不猜造订阅地址。 | [候选地址](https://apolloresearch.ai/feed.xml) |
| EleutherAI | 有一手评测与解释研究，但测试 feed.xml、atom.xml、index.xml、rss.xml、rss/、feed 均 404；未确认可用官方 feed。 | [候选地址](https://blog.eleuther.ai/index.xml) |
| Anthropic Alignment Science | 官网活跃，但 /feed.xml、/rss.xml、/rss/ 均 404，未发现官方 RSS 声明；暂不猜造地址。 | [候选地址](https://alignment.anthropic.com/rss.xml) |
| Alignment Research Center | HTTP 200、15 条、最新 2026-06-09。当前重心是机制估计、随机 MLP 与形式理论，与本方向的实际 LLM 评测和红队需求距离较远。 | [候选地址](https://www.alignment.org/blog/rss/) |
| Alignment Forum 全站 | HTTP 200、10 条、最新 2026-10-02。混有理论观点并重复 Redwood 内容；不把整个论坛当成经过手选的技术精选。 | [候选地址](https://www.alignmentforum.org/feed.xml?view=frontpage-rss) |
| AI Safety at the Frontier | HTTP 200、20 条、最新 2026-10-06。近期主要是 Paper Highlights 二次文献汇总；本批优先原始研究者的完整技术文章。 | [候选地址](https://aisafetyfrontier.substack.com/feed) |
| Failure-First | 网页声明 RSS，但主题为 embodied AI，与本批 LLM 安全评测范围不符；未为凑数继续探测。 | [候选地址](https://failurefirst.org/rss.xml) |
| Trail of Bits · Artificial Intelligence 分类 | 可解析但只有一条 Claude 插件介绍；使用另一个实际活跃的 /categories/ai/index.xml 作为文章候选池。 | [候选地址](https://blog.trailofbits.com/categories/artificial-intelligence/index.xml) |

无公开 RSS 的优质网页不伪造订阅地址。网络不可达只说明当前环境不可用，不代表源站不存在。
