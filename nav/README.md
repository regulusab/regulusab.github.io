# 共用導覽列（nav.js）

在任何網站的 `<head>` 或 `</body>` 前貼上這一行，即會在頁面頂端加入「← 回總入口」及七站選單，並自動標示目前所在網站：

```html
<script src="https://regulusab.github.io/nav/nav.js" defer></script>
```

特點：
- 使用 Shadow DOM，樣式完全隔離，不影響原網站 CSS。
- 以 `position: sticky` 置頂（插入於 `<body>` 最前），不會遮住內容，不需另加 padding。
- 列印時自動隱藏（`@media print`）。
- 手機友善；重複載入只會插入一次。

## 不使用 JavaScript 的備用寫法

```html
<a href="https://regulusab.github.io/" style="display:block;padding:8px 12px;background:#2b2320;color:#f3e7c9;text-decoration:none;font-size:14px">← 回總入口</a>
```

> 注意：若網站本身有 `position: fixed` 的頂部列，請確認層級（導覽列 z-index 極高）是否符合需求。
