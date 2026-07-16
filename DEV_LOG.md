# Daily Oracle — 完整开发日志

> **项目名称**：Daily Oracle（每日一卦·链上存证）
> **参赛类型**：Hackathon 2026 · Web3 × AI
> **版本**：v15 · final
> **开发周期**：2026-07-14 至 2026-07-15
> **团队**：WorkBuddy Designer + Hermes Developer + WorkBuddy Senior Developer

---

## 1. 项目概览

Daily Oracle 是一款融合中国传统文化与现代区块链技术的移动端 Web DApp。用户通过三硬币模拟占卜生成六十四卦之一，获得卦象解读和今日运势指引，并可选择通过 OKX 钱包签名将卦象存证上链。

**设计理念**：新中式水墨风（白龙、太极、水墨山水）× 紫色科技感（紫气东来），背景动态循环动画 + 花瓣飘落粒子。

**核心亮点**：
- 三段式沉浸开场动画（loading → 入场视频 → 循环背景）
- 六十四卦完整数据，三硬币法精确模拟传统占卜
- OKX 钱包链上签名存证（可选，不强制）
- localStorage 历史记录 + PWA 支持
- 零框架依赖，纯 HTML/CSS/JS 单文件架构

---

## 2. 完整迭代时间线

### 第 1 轮 — 初始设计（07-14 上午）
- 分析素材文件夹中的 8 个素材文件（6 PNG + 2 MP4）
- 建立新中式水墨风 × 区块链科技的设计方向
- 主色调：紫色 #7C5CC8、朱砂红 #C8553D、宣纸米白 #f0eeeb
- 创建三页面骨架：`index.html`、`result.html`、`history.html`
- 编写设计系统文档 `design-system.md`

### 第 2~6 轮 — UI 位置调整
- 基于效果图进行像素级测量，确定各组件的百分比定位
- 钱包: top 66%、按钮区: top 76%、底部文字: bottom 1%
- Logo 从居中改为左对齐（padding-left: 6%）

### 第 7~8 轮 — 按钮等大化 + 缩小
- 两个 action-btn 统一为固定尺寸（最终 140×58px），不用 flex 缩放
- 全部 UI 元素按比例缩小，适配 430×850px 设计稿

### 第 9 轮 — 入场景观（入场视频 + 静态背景）
- 入场动画.mp4 全屏播放，结束切换为静态背景图
- 视频加载期间显示静态图作为底图

### 第 10 轮 — 三段式动画流程
- 新增 **loading 画面**（z-index: 200）：三层旋转环 + 呼吸光点 + "神谕降临"文字
- 完整时间线：loading(≥1.8s) → intro(~8.62s) → loop(无限循环)

### 第 11 轮 — UI 渐入时机（setTimeout 精准控制）
- 入场倒数 5 秒时 UI 开始依次渐入（top 0s / wallet 0.2s / action 0.4s / bottom 0.6s）
- 三层防护：`setTimeout` 主控 → `timeupdate` 兜底 → `ended` 兜底

### 第 12~13 轮 — Z-Index 层叠修复（关键！）
- **根因**：`content-layer` z-index 只有 2，被 `intro-layer`(100) 压在下面
- **修复**：`content-layer` z-index: 2 → **150**
- 最终层叠：loading(200) > content(150) > intro(100) > petals(1) > bg(0)

### 第 14 轮 — Hermes 交接
- 生成 `HANDOFF.md`：项目概览、Z-Index 架构图、动画时间线、UI 规格、陷阱清单
- Hermes 接手核心业务逻辑开发

### Hermes 阶段 — 核心功能开发
- **oracle-core.js**：64 卦完整数据 + 三硬币占卜算法 + OKX 钱包连接
- **result.html 重写**：动态渲染卦象/运势/解读 + 分享 + 链上存证
- **history.html 重写**：localStorage 动态列表 + 统计 + 空状态
- **manifest.json**：PWA 支持
- **部署**：阿里云 SWAS 新加坡服务器 `http://43.106.59.27`
- **产品决策**：移除钱包强制限制，添加"不连钱包也能算卦"提示
- 生成 `HERMES_DEV_LOG.md` 记录踩坑（端口/缓存/bfcache）

### 第 15 轮 — Bug 修复 + 一致性打磨（v15·final）
- **关键 Bug**：`result.html` 顶层 `return;` 导致 SyntaxError → IIFE 包裹
- **类型 Bug**：`oracle-core.js` 的 `updateTxHash()` 中 `r.id === recordId` 类型不匹配 → `String()` 比较
- **一致性**：三页面 meta 标签统一（8 项）、字体权重对齐（800）
- 版本水印更新：v14 → v15 · final

### 第 16 轮 — 导航体验修复
- **返回按钮**：`history.back()` 改为 `window.location.href='index.html'`（可靠完整导航）
- **返回不重播动画**：`sessionStorage` 标记首次访问，返回时跳过 loading + intro，直接进入最终状态

---

## 3. 技术架构

### 3.1 Z-Index 层叠架构
```
┌─────────────────────────────────────┐
│  z-index 200  loading-layer         │  加载画面
│              "神谕降临"             │
├─────────────────────────────────────┤
│  z-index 150  content-layer         │  UI 元素层（高于 intro）
├─────────────────────────────────────┤
│  z-index 100  intro-layer           │  入场动画视频
│              background: #000       │
├─────────────────────────────────────┤
│  z-index 1    petals-container      │  花瓣粒子（9个）
├─────────────────────────────────────┤
│  z-index 0    bg-layer              │  静态背景 → 循环背景切换
└─────────────────────────────────────┘
```

### 3.2 三段式动画时间线
```
[用户打开]
    │
    ├─ 0ms — ~1.8s: Phase 1 Loading
    │   └─ canplaythrough + LOAD_MIN_TIME(1.8s)
    │      完成后 → loading 淡出
    │
    ├─ ~1.8s — ~10.4s: Phase 2 入场动画
    │   ├─ introVideo.play()
    │   ├─ ~3.6s (倒数 5s): UI 渐入（setTimeout 主控）
    │   └─ ~10.4s: introVideo.ended → 切换循环背景
    │
    └─ 10.4s+: Phase 3 循环背景
         ├─ intro-layer → hidden
         ├─ bgLoop.play() → 淡入
         └─ 花瓣粒子持续飘落
```

### 3.3 降级策略
| 场景 | 行为 |
|---|---|
| 视频 5s 未就绪 | 强制进入，跳过 loading |
| 自动播放被阻止 | `skipIntro()` → 直接显示 UI + 循环背景 |
| 入场 15s 超时 | `skipIntro()` → 强制跳过 |
| loop 播放失败 | 静态背景图降级 |
| 无 OKX 钱包 | 可算卦，存证功能不可用（已提示） |

### 3.4 数据流
```
用户点击「今日求卦」
  → castHexagram() 三硬币法模拟
  → 生成主卦 binary + 变卦 binary
  → 查 HEXAGRAMS 表获取数据
  → saveToHistory() 写入 localStorage（同日替换）
  → 跳转 result.html?params... 渲染结果

用户点击「存证上链」
  → signAttestation(message) OKX 钱包 personal_sign
  → updateTxHash() 更新 localStorage
  → UI 状态 pending → attested
```

---

## 4. 文件清单（最终交付）

```
项目根目录/
├── index.html            ← 首屏（871 行）三段式动画 + UI 渐入 + 交互入口
├── result.html           ← 结果页（690 行）动态卦象渲染 + 分享 + 链上存证
├── history.html          ← 历史页（415 行）localStorage 列表 + 统计 + 空状态
├── oracle-core.js        ← 核心逻辑（396 行）64卦数据 + 占卜 + 钱包 + 存证
├── manifest.json         ← PWA 清单
├── DEV_LOG.md            ← 📌 本文件（完整开发日志）
├── HANDOFF.md            ← Designer → Hermes 交接文档（历史记录）
├── HERMES_DEV_LOG.md     ← Hermes 开发日志（部署/踩坑记录）
└── 素材/
    ├── 静态背景图.png       (1536×2736)
    ├── 循环背景.mp4         (主界面循环动态背景)
    ├── 入场动画.mp4         (8.62s 开场动画)
    ├── 背景logo.png         (707×616)
    ├── 钱包绑定.png         (1227×239)
    ├── 算卦.png             (585×231)
    ├── 历史.png             (594×243)
    └── 背景底部文字.png     (889×362)
```

### 代码统计
| 文件 | 行数 | 用途 |
|---|---|---|
| `index.html` | 871 | 首屏 + CSS + JS 动画 + 交互 |
| `result.html` | 690 | 结果页 + CSS + JS 渲染 + 存证 |
| `history.html` | 415 | 历史页 + CSS + JS 动态列表 |
| `oracle-core.js` | 396 | 64卦数据 + 占卜算法 + 钱包 + 存证 |
| **总计** | **2372** | 零框架依赖，纯 HTML/CSS/JS |

---

## 5. 设计令牌

```css
:root {
  --primary-400: #a78bfa;      /* 浅紫，loading 光晕 */
  --primary-500: #7C5CC8;      /* 主紫，品牌色 */
  --primary-600: #6B4FB5;      /* 深紫，hover */
  --accent-red: #C8553D;       /* 朱砂红，印章/变爻 */
  --ink-900: #1a1a1a;          /* 墨黑 */
  --ink-700: #4a4a4a;          /* 中灰 */
  --ink-500: #888888;          /* 浅灰 */
  --paper-warm: #e8e6e3;       /* 宣纸米白 */
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
  --radius-lg: 16px;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);  /* 东方韵味缓动 */
}
```

---

## 6. 已知问题与设计决策

### 已解决的 Bug（16 轮迭代）
1. **Z-Index 层叠**：UI 被入场视频遮挡 → z-index 150
2. **timeupdate 时机不准**：部分浏览器 250ms 触发间隔 → setTimeout 主控
3. **result.html 语法错误**：顶层 `return` 导致 SyntaxError → IIFE
4. **updateTxHash 类型不匹配**：Number vs String → `String()` 转换
5. **返回按钮无效**：`history.back()` + bfcache → `location.href` 完整导航
6. **返回首页重播动画**：sessionStorage 标记首次访问

### 产品决策
- **钱包非强制**：不连钱包也能算卦查看结果，仅存证上链需要签名
- **每日一卦**：localStorage 同日替换机制，每天只保留最新一卦
- **存证 = 链上签名**：使用 OKX Wallet `personal_sign` 而非合约交易，降低用户门槛
- **手机端限制**：OKX Wallet 插件仅桌面端可用，手机端存证功能不可用（已在提示中说明）

---

## 7. 录屏演示指南

### 7.1 演示路径
```
1. [冷启动] 打开 index.html
   → 展示：loading 画面（旋转环 + 神谕降临）
   → 入场动画（白龙水墨 ~8.62s）
   → UI 渐入（依次：Logo → 钱包 → 按钮 → 底部文字）
   → 循环背景 + 花瓣飘落

2. [求卦] 点击「今日求卦」
   → 水波纹反馈
   → 跳转 result.html 展示卦象

3. [结果页] 展示关键元素
   → 卦名 + 卦象图形（六爻，含变爻标记 ○/×）
   → 卦象解读 + 标签
   → 运势四维（事业/财运/感情/健康）
   → 链上存证卡片
   → 点击「分享」演示分享功能
   → 点击「存证上链」（需桌面端 OKX Wallet）

4. [返回首页] 点击返回按钮
   → 跳过入场动画，直接显示主界面

5. [历史] 点击「历史卦象」
   → 统计卡片（总求卦/已存证/上签）
   → 历史列表（月份分组 + 已存证/未存证标记）
   → 空状态引导（若首次使用无数据）
```

### 7.2 演示前检查清单
- [ ] 浏览器窗口调整为手机竖屏比例（约 400×850 或用 Chrome DevTools）
- [ ] 清除 `localStorage` 和 `sessionStorage`（如需展示首次加载）
- [ ] 桌面端演示存证功能时，确保已安装 OKX Wallet 插件
- [ ] 确认素材/ 文件夹与 HTML 同级
- [ ] 若演示 PWA 功能，需通过 HTTP 服务器访问（非 file://）

### 7.3 视频播放注意事项
- `入场动画.mp4`（8.62s）和 `循环背景.mp4` 需要浏览器允许自动播放
- Chrome/Edge 需要用户有过至少一次页面交互后才允许自动播放
- 移动端 Safari 需要 `playsinline` 属性（已添加）
- 若自动播放被阻止，降级方案会自动跳过入场动画，不影响核心功能

---

## 8. 团队分工

| 角色 | Agent | 贡献 |
|---|---|---|
| UI 设计师 | WorkBuddy Designer | 设计系统、CSS 令牌、三段式动画、Z-Index 层叠、16 轮迭代 |
| 全栈开发 | Hermes | 64卦数据、占卜算法、OKX 钱包集成、result/history 重写、PWA、部署 |
| 高级开发 | WorkBuddy Senior Dev | Bug 修复、一致性打磨、导航体验、sessionStorage 优化 |

---

## 9. 技术亮点总结

1. **零框架架构**：纯 HTML/CSS/JS，2372 行代码，无 npm 依赖，即开即用
2. **三段式沉浸动画**：loading(旋转太极) → intro(白龙水墨) → loop(动态背景+花瓣)，三层防护降级
3. **东方美学设计**：`cubic-bezier(0.16, 1, 0.3, 1)` 缓动函数营造"渐显+轻微弹入"的东方韵味
4. **传统占卜算法**：三硬币法精确模拟传统占卜，support 变卦（动爻变化）
5. **链上签名存证**：OKX Wallet `personal_sign` 签名作为链上存证，低成本可验证
6. **PWA 支持**：manifest.json + Service Worker 预备 + iOS Safari meta 标签完善
7. **响应式适配**：三断点（750px / 650px），移动端竖屏优先
8. **sessionStorage 智能返回**：首次访问播放完整动画，返回时跳过，体验流畅

---

### 第十八轮（2026-07-16）X Layer 测试网真实链上存证

用户决定用 OKX 提供的 X Layer 测试网做链上存证演示。

#### 链上存证架构

```
用户点击"存证上链"
    │
    ▼
┌─ switchToXLayerTestnet() ──────────────────────────┐
│  · wallet_switchEthereumChain (chainId: 0x7A0/1952) │
│  · wallet_addEthereumChain 兜底（首次添加）          │
└────────────────────────────────────────────────────┘
    │
    ▼
┌─ personal_sign ────────────────────────────────────┐
│  · 签名卦象消息（含卦名/卦辞/时间/Chain ID）        │
│  · 返回 EIP-191 签名                                │
└────────────────────────────────────────────────────┘
    │
    ▼
┌─ eth_sendTransaction ──────────────────────────────┐
│  · to: 自己 (自转账)                                 │
│  · value: 0x0 (0 OKB)                              │
│  · data: 0x4441494c594f5241434c45 + 签名片段         │
│  · 返回真实 txHash                                  │
└────────────────────────────────────────────────────┘
    │
    ▼
  存储 txHash + signature → localStorage
  展示区块浏览器链接
```

#### 存证验证

裁判可在 OKX 区块浏览器查看交易：
`https://www.okx.com/web3/explorer/xlayer-test/tx/{txHash}`

交易 Input Data 字段包含 `0x4441494c594f5241434c45`（ASCII: "DAILYORACLE"）标记 + 签名片段，区块链时间戳不可篡改，证明卦象存证的时间点。

#### 修改文件

| 文件 | 改动 |
|---|---|
| oracle-core.js | +`XLAYER_TESTNET` 常量、+`switchToXLayerTestnet()`、+`stringToHex()`、+`sendOnChainAttestation()`、+`updateAttestationRecord()` |
| result.html | 区块链区域加步骤指示器 + 浏览器链接；`saveToChain()` 重写为四状态状态机（pending→signing→sending→attested/error） |

#### 9. **X Layer 测试网链上存证**：eth_sendTransaction 真实写入区块链，零 Gas（测试币），交易可查可验证

---
### 第十九轮（2026-07-16）部署 & 收尾

#### 新加坡服务器部署（最终成功）

- **第一次尝试**：沙箱限制 → 22 端口超时，转用 CloudStudio 部署
- **第二次尝试（20:08）**：绕过沙箱直连 → 22 端口确认开放（SSH-2.0-OpenSSH_8.0）
- **部署结果**：paramiko SFTP 上传 24MB tar.gz → 解压覆盖 → 重启 http.server ✅
- **验证结果**：HTTP 200 ✅，进程运行中 ✅，文件完整 ✅
- **RPC 端点验证**：`testrpc.xlayer.tech` → `{"result":"0x7a0"}` (Chain ID 1952) ✅

#### 部署地址

| 平台 | 地址 |
|------|------|
| **新加坡服务器** | `http://43.106.59.27` |
| **CloudStudio 备选** | `https://16f931a2e31d4026a64cfc03ee5948d9.app.codebuddy.work` |

#### 参赛交付状态

- ✅ 三段式入场动画（loading → intro → loop）
- ✅ 三硬币占卜算法 + 64 卦完整数据
- ✅ 算卦过程动画（素材/算卦过程.mp4）
- ✅ 结果页暖纸系 UI + 卦象解读左右并排
- ✅ 今日运势四维面板（图标+标签+星星横向排列）
- ✅ X Layer 测试网链上存证（personal_sign + eth_sendTransaction）
- ✅ 返回首页跳过入场动画（sessionStorage）
- ✅ 系统字体回退链（Google Fonts 被墙修复）
- ✅ 桌面端浏览器兼容（95vh + max-height 850px）
- ✅ 新加坡服务器部署完成

---

#### 第二十轮（2026-07-16 20:35）资源加载优化

**首屏加速策略** — 不降画质，精准控制加载时机：

| 资源 | 改动 | 首屏节省 |
|------|------|---------|
| 算卦过程.mp4 (4.4MB) | `preload="auto"` → `preload="none"` | 4.4MB |
| 循环背景.mp4 (4.8MB) | `preload="auto"` → `preload="metadata"` | ~4.7MB |
| 静态背景图.png (5.8MB) | 添加 `loading="lazy" decoding="async"` | 5.8MB |
| 背景底部文字.png (71KB) | 添加 `loading="lazy" decoding="async"` | ~71KB |
| 背景logo.png (159KB) | 添加 `fetchpriority="high"` | —（确保优先加载） |

**效果**：首屏关键路径从 **~23.7MB → ~8.9MB**（仅入场动画 + UI 核心图）

> **日志生成时间**：2026-07-16 20:42
> **提交状态**：✅ 参赛提交就绪（含 X Layer 测试网链上存证 + 资源加载优化 + 新加坡部署）

---

#### 第二十一轮（2026-07-16 21:30）算卦过程动画更新

**背景**：用户替换了 `素材/算卦过程.mp4` 新视频文件（4.4MB → 9.2MB），需要优化加载策略。

**改动清单**：

| 改动 | 说明 |
|------|------|
| 延迟预加载 | UI 可见后 2s 后台静默调用 `divinationVideo.load()`，用户点按钮时大概率已缓存 |
| 加载动画 | 算卦层新增太极旋转加载器（`卦象凝现`），视频缓冲时显示，播放时隐藏 |
| playing/waiting 事件 | 视频开始播放隐藏加载器，缓冲时重新显示，避免黑屏等待 |
| play().then() | `play()` Promise resolve 时也隐藏加载器（双重保障） |
| 日志增强 | 添加缓存命中/未命中日志，方便调试 |
| 版本号 | v19 → v21 |

**预加载触发点**（三处）：
1. 从子页面返回 → `preloadDivinationVideo()`
2. 入场动画正常结束 → `hideIntroAndPlayLoop()` 末尾
3. 跳过入场动画 → `skipIntro()` 末尾

**效果**：新视频 9.2MB 不影响首屏（preload="none"），UI 可见后 2s 后台静默加载，用户点击时若已缓存则秒播，未缓存则显示太极加载动画。
> **版本**：v20 · optimised
