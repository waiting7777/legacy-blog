---
title: 用 Gridsome 搭建自己的 Blog
tags: Javascript, Vue, Gridsome, Blog
category: Blog
excerpt: 如同 React 有 Gatsby 這個靜態網站生成器，那麼 Vue 版本的 Gridsome 使用起來如何？。
date: 2020-05-14
image: ./images/gridsome.png
image_caption: from gridsome.org
author: author1
slug: 用-gridsome-搭建-自己-的-blog
---

## 何謂靜態網站產生器

只要是用內容模板產生的靜態網站，皆可稱之為靜態網站產生器，而如果面對的使用者為一般使用者的話，通常還會附帶內容管理系統 (CMS) ，如 Wordpress，Wix 等等。但這類附帶 CMS 的對於工程師來說實在過於繁瑣，工程師希望可以簡單就好，隨便寫寫 markdown ，套點樣式就可以了，基於這種面向的也開始慢慢推出如 Jekyll，ghost，hugo，hexo 等等，而隨著時代跟程式語言的框架演進，每個語言/框架都有一套 static site generator，似乎也變成了定番。

## 關於 Vue 生態系底下有哪些

- [VuePress](https://vuepress.vuejs.org/) 主要用來生成技術文件網站，內建搜尋相當好用。

- [Nuxt.js](https://nuxtjs.org/) 相當完整的 vue spa，主打為 ssr，雖然也可以當作靜態網站生成，但有點殺雞用牛刀

- [Gridsome](https://gridsome.org/) 本次主要要介紹之框架，參考於 React 的 gatsby，關於前端效能的圖片處理，code splitting 都已經包裝在裡面，單純簡潔效能好，缺點為很多blog 常見模組都不見得有支援，真有需要得自己刻。

## 用 Gridsome 實作

先安裝 gridsome cli

```
yarn global add @gridsome/cli
```

接著用 cli 產出 template

```
gridsome create my-gridsome
```

如此一個有基本架構的 blog 系統就已完成，整個專案架構跟 nuxt.js 很像，主要是以 pages folder 接上 router 來產出 page，如同官網說明一般，就是那麼簡單。

## 接上內容

接著就是重頭戲了，要來決定內容的來源，gridsome 支援各種 headless cms 來源，如 contentful ，greenhouse，sanity 等等。而我選擇用本地 markdown file 當作我的內容來源。

安裝 *transformer-remark* 以及 *source-filesystem* 這兩個 plugin

```
yarn add @gridsome/source-filesystem
yarn add @gridsome/transformer-remark
```

這兩個 plugin 可以指定 folder，讓他成為你的內容來源，然後把放在那邊的 markdown file 轉成即時的 graphQL 資料格式，接著來串接這些資料。

在 index 頁面的 vue template 底下，用 gridsome 特別的 page-query 區塊

```
<page-query>

query($page:Int) {
  entries: allBlog(perPage: 10, page: $page) @paginate {
    totalCount,
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        title
        excerpt
        image(width:800)
        path
        timeToRead
        humanTime: date(format:"DD MMM YYYY")
        dateTime: date
      }
    }
  }
}

</page-query>
```

如此範例，會把存在你 graphQL 的 blog data 照著設定的來為撈出來並存在 this.$page裡面。只要來拿這資料來畫畫面，一個基本的 blog 範例就完成了。