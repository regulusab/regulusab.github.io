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

## 頂部固定列的位移：`--rg-nav-h`

導覽列載入後，會在 `<html>` 上設定 CSS 變數 `--rg-nav-h`，值為導覽列實際高度（px）。在有瀏海的 iPhone 上會包含安全區域，可能約 47px 而非 40px；畫面尺寸、轉向改變時會自動更新，列印時為 `0px`。

若網站本身有 `position: sticky` 或 `position: fixed` 的頂部列，請不要寫死 40px，改用（預設值同樣考慮安全區域）：

```css
.your-top-bar { top: var(--rg-nav-h, calc(40px + env(safe-area-inset-top, 0px))); }
```

變數名稱固定為 `--rg-nav-h`，請勿更改。
