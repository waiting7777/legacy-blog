---
title: Nuxt Content 的 Theme - doc 使用心得

tags: Javascript, Vue, NuxtJS

category: Engineering

excerpt: 用 Nuxt Content 快速搭建的網站越來越多，而官方也推出了第一套 theme，doc 模板可以使用，讓你可以快速的建構 doc 網站。

date: 2020-09-07

image: ./images/nuxt-content-doc.png

image_caption: nuxt-content-doc

author: author1

slug: nuxt-content-theme-doc-使用心得
---

## Nuxt Content Theme

Nuxt Content 除了之前介紹過的，將`content`資料夾結構轉換成文章結構，現在又推出了安裝即用的模板`doc`。
這邊來介紹試用的心得與整理。

## 創建專案

首先來創建專案，在 teminal 輸入：

```
yarn create nuxt-content-docs <project-name>
```

![nuxt-content-1](./images/nuxt-content-doc-1.png)

他會在 cli 問你一些問題，這些問題都是到時候 doc 網站會用到的(可以先填預設之後再改)。

接著輸入

```
yarn dev
```

![nuxt-content-2](./images/nuxt-content-doc-2.png)

這樣在 `localhost:3000` 一個美美的文件網站就誕生啦。

## i18n目錄結構

接下來，來研究一下整個專案的目錄結構，看看這麼使用這個模板。

首先它內建了 `nuxt-i8n`

![nuxt-content-3](./images/nuxt-content-doc-3.png)

![nuxt-content-4](./images/nuxt-content-doc-4.png)

照著上圖的結構與設定放置`md`檔，他會照著語系資料夾底下的`md`檔，產出相對應的文件頁面，如此一來一個多語系的文件網站就完成了(切換語系的按鈕在footer)。

## 側邊結構

在`md`檔裡面，要用`Front-matter`來設定必須的參數，以下為參數列表跟作用簡介。

#### Required fields

- `title (String)` 頁面的標題，顯示在側邊欄上。
- `description (String)` 用來放在頁面 meta 的簡介。
- `position (Number)` 用來排序他在側邊欄的位置。

### Optional fields

- `category (String)` 用來讓側邊欄分群組的屬性
- `version (Float)` 使用者會看到一個提示並存一個數字在 localstorage，當數字更新後使用者才會再看到提示。
- `fullscreen (Boolen)` 如果為 true，會隱藏右邊的文章標題側邊欄。
- `menuTitle (String) v0.4.0+` 用來覆蓋顯示在左邊的 title
- `subtitle (String) v0.5.0+` 用來顯示在標題底下的副標
- `badge (String) v0.5.0+` 用來顯示在標題旁邊的標章

## 圖片

```
<img src="/logo-light.svg" class="light-img" alt="Logo light" />
<img src="/logo-dark.svg" class="dark-img" alt="Logo dark" />
```
在專案中，可以用`class`來區分 light/dark mode 的圖片

## 組件

這套模板裡，還有一些預設的組件可以使用。

`<alert>`:

```
<alert>

Check out an info alert with a `codeblock` and a [link](/themes/docs)!

</alert>
```

![nuxt-content-5](./images/nuxt-content-doc-5.png)

`<list>`:

```
items:
  - Item1
  - Item2
  - Item3
---

<list :items="items"></list>
```

![nuxt-content-6](./images/nuxt-content-doc-6.png)

`<badge>`:

```
<badge>v1.2+</badge>
```

![nuxt-content-7](./images/nuxt-content-doc-7.png)

`<code-block>`:

```
# Backslashes are for demonstration

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add @nuxt/content-theme-docs
  \```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install @nuxt/content-theme-docs
  \```

  </code-block>
</code-group>
```

![nuxt-content-8](./images/nuxt-content-doc-8.png)

## Showcase

以下這些網站 包含 Nuxt Content 本身的文件都是用 doc 模板搭建的：

[![nuxt-content-9](https://content.nuxtjs.org/preview.png)](https://content.nuxtjs.org/)
[![nuxt-content-9](https://tailwindcss.nuxtjs.org/preview.png)](https://tailwindcss.nuxtjs.org/)

## 心得結論

Nuxt Content 真的提供了一套簡單快速上手的文件模板，還內建了各種常用的功能: light/dark mode、文檔搜尋、github 協作等等讓想專注於功能開發的工程師們，可以不用再花多餘的時間調整文件模板，並且所有相關設定都是 Nuxt 全家桶，學一套無痛上手使用～
