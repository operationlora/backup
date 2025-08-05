# 個人電商網站技術規格書

**版本**：2.1  
**策略**：Jekyll MVP → Astro 升級路徑

## 一、技術架構

### 1.1 系統組成
- **前端**：Jekyll + GitHub Pages
- **後端**：Cloudflare Workers（僅處理 Webhook）
- **金流**：Stripe Payment Links
- **通知**：SendGrid API

### 1.2 資料流程
```
商品瀏覽 → Stripe 付款 → Webhook → Workers → SendGrid → 郵件通知
```

## 二、功能規格

### 2.1 商品展示
- 商品列表頁 + 詳情頁
- 基礎搜尋（商品名稱、類別）
- 分類篩選
- 響應式設計

### 2.2 下單流程
- 點擊「立即購買」→ 跳轉 Stripe Payment Link
- 每個商品規格對應獨立的 Payment Link
- 無購物車功能（MVP）

### 2.3 訂單通知
- Stripe Webhook 觸發 Cloudflare Workers
- 發送訂單確認信給買家和賣家
- 包含：訂單號、商品資訊、金額、收件地址

## 三、資料結構

### 3.1 商品資料（_data/products.yml）
```yaml
- id: "candle-rose-large"
  title: "玫瑰香氛蠟燭（大）"
  price: 450
  image: "/assets/images/candle-rose.jpg"
  category: "candle"
  description: "法式玫瑰香調，燃燒時間約 40 小時"
  stripe_link: "https://buy.stripe.com/xxxxx"
  # 預留升級欄位
  tags: ["香氛", "蠟燭", "玫瑰"]
  featured: true
  stock_status: "in_stock"
```

### 3.2 分類定義
```yaml
categories:
  - candle: "香氛蠟燭"
  - perfume: "香水"
  - jewelry: "珠寶飾品"
```

## 四、檔案結構

```
├── _config.yml
├── _data/
│   ├── products.yml
│   └── categories.yml
├── _layouts/
│   ├── default.html
│   ├── home.html
│   └── product.html
├── _includes/
│   ├── header.html
│   ├── footer.html
│   └── product-card.html
├── assets/
│   ├── css/main.scss
│   ├── js/search.js
│   └── images/
├── workers/
│   ├── webhook-handler.js
│   ├── wrangler.toml
│   └── package.json
├── index.html
└── products/
    └── [product-id].html
```

## 五、關鍵頁面

### 5.1 商品列表頁（index.html）
```html
---
layout: home
---
<!-- 搜尋框 -->
<!-- 分類篩選 -->
<!-- 商品網格 -->
```

### 5.2 商品詳情頁模板（_layouts/product.html）
```html
<!-- 商品圖片 -->
<!-- 商品資訊（標題、價格、描述）-->
<!-- 立即購買按鈕（連結到 stripe_link）-->
```

## 六、技術實作

### 6.1 前端技術
- **Jekyll**：靜態網站生成
- **Liquid**：模板語言
- **SCSS**：樣式預處理
- **Vanilla JS**：搜尋功能

### 6.2 Cloudflare Workers
```javascript
// webhook-handler.js 核心邏輯
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // 1. 驗證 Stripe Webhook 簽名
  // 2. 解析訂單資料
  // 3. 呼叫 SendGrid API 發送郵件
  // 4. 回傳 200 狀態
}
```

### 6.3 部署配置
```yaml
# GitHub Actions（.github/workflows/deploy.yml）
name: Build and Deploy
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-ruby@v1
      - run: bundle install
      - run: bundle exec jekyll build
      - uses: peaceiris/actions-gh-pages@v3
```

## 七、環境變數

### 7.1 Cloudflare Workers 環境變數
```
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
SENDGRID_API_KEY=SG.xxxxx
SELLER_EMAIL=seller@example.com
```

### 7.2 Jekyll 配置（_config.yml）
```yaml
title: "精品小物店"
baseurl: ""
url: "https://username.github.io"

collections:
  products:
    output: true
    permalink: /products/:name/

plugins:
  - jekyll-feed
  - jekyll-sitemap
```

## 八、開發流程

### 8.1 本地開發
```bash
# 安裝依賴
bundle install

# 啟動開發伺服器
bundle exec jekyll serve

# Workers 本地測試
cd workers/
wrangler dev
```

### 8.2 部署步驟
```bash
# 前端自動部署
git push origin main

# Workers 部署
cd workers/
wrangler publish
```

## 九、升級路徑

### 9.1 升級觸發條件
- 月營業額 > NT$5,000 或
- 商品數量 > 20 項 或  
- 需要頻繁內容更新

### 9.2 遷移到 Astro + Sveltia CMS
```bash
# 1. 建立 Astro 專案
npm create astro@latest

# 2. 安裝 Sveltia CMS
npm install @sveltia/cms

# 3. 遷移資料（YAML → CMS）
# 4. 重新配置 GitHub Actions
# 5. 測試和上線
```

## 十、必要準備

### 10.1 帳號需求
- GitHub（repo 管理權限）
- Stripe（測試 + 正式環境）
- Cloudflare（Workers）
- SendGrid（API Key）

### 10.2 素材需求
- Logo（PNG/SVG）
- 商品照片（建議 800x800px）
- 文案內容

---
**目標**：7 天內完成 MVP，後續依營運狀況決定是否升級技術架構。