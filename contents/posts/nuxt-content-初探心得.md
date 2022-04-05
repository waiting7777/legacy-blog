---
title: Nuxt Content 初探心得

tags: Javascript, Vue, NuxtJS

category: Engineering

excerpt: NuxtJs 團隊在今年拿到融資以後，開始著手建立更多好用的原生掛件，讓生態系更加豐富，那麼以下是 Nuxt Content 的使用測試心得。

date: 2020-06-01

image: ./images/nuxt-content.png

image_caption: nuxt-content

author: author1

slug: nuxt-content-初探心得
---

## 介紹
在你的 NuxtJs 專案底下安裝 ```@nuxtjs/content``` 套件，並且將你的內容放在 ```content/``` 資料夾底下，那麼套件將會自動將資料夾底下的 Markdown，JSON，YAML，CSV 檔案轉成 MongoDB 形式的 API，這樣你的專案將會如同擁有一個內容的資料庫。

## 特色
* 開發時快速 hot reload
* 可以在 markdown 裡面用 vue compoents
* 全文搜索
* 支援靜態網站生成 `nuxt generate`
* 強大的 QueryBuilder API (MongoDB like)
* code block 內建用 PrismJS 的語法高亮

## 安裝
將 ```@nuxt/conent``` 裝入你的專案
```
yarn add @nuxt/content
```
然後設定 ```nuxt.config.js``` 的 modules
```
{
  modules: [
    '@nuxt/content'
  ],
  content: {
    // options
  }
}
```

## 內容
在專案底下，創個 ```content``` 資料夾，結構如下：
```
content/
  articles/
    article-1.md
    article-2.md
  home.md
```
會自動將裡面的 ```.md```，```.yaml```，```.csv```，```.json```，檔案轉換並生成以下額外的屬性：
* dir
* path
* slug
* extension
* createdAt
* updatedAt

```
[
  {
    "toc": [
      {
        "id": "這是測試副標",
        "depth": 2,
        "text": "這是測試副標"
      }
    ],
    "body": {
      "type": "root",
      "children": [
        {
          "type": "element",
          "tag": "h1",
          "props": {
            "id": "這是測試標題"
          },
          "children": [
            {
              "type": "element",
              "tag": "a",
              "props": {
                "ariaHidden": "true",
                "href": "#%E9%80%99%E6%98%AF%E6%B8%AC%E8%A9%A6%E6%A8%99%E9%A1%8C",
                "tabIndex": -1
              },
              "children": [
                {
                  "type": "element",
                  "tag": "span",
                  "props": {
                    "className": [
                      "icon",
                      "icon-link"
                    ]
                  },
                  "children": []
                }
              ]
            },
            {
              "type": "text",
              "value": "這是測試標題"
            }
          ]
        },
        {
          "type": "element",
          "tag": "h2",
          "props": {
            "id": "這是測試副標"
          },
          "children": [
            {
              "type": "element",
              "tag": "a",
              "props": {
                "ariaHidden": "true",
                "href": "#%E9%80%99%E6%98%AF%E6%B8%AC%E8%A9%A6%E5%89%AF%E6%A8%99",
                "tabIndex": -1
              },
              "children": [
                {
                  "type": "element",
                  "tag": "span",
                  "props": {
                    "className": [
                      "icon",
                      "icon-link"
                    ]
                  },
                  "children": []
                }
              ]
            },
            {
              "type": "text",
              "value": "這是測試副標"
            }
          ]
        },
        {
          "type": "element",
          "tag": "p",
          "props": {},
          "children": [
            {
              "type": "text",
              "value": "這是測試內文"
            }
          ]
        }
      ]
    },
    "dir": "/",
    "path": "/test",
    "extension": ".md",
    "slug": "test",
    "createdAt": "2020-06-01T06:26:44.150Z",
    "updatedAt": "2020-06-01T06:55:23.703Z"
  }
]
```

## Fetching & Displaying Content
有了內容以後，再來要將它讀出來並放到頁面上， ```@nuxtjs/content``` 會在你的 vue 上面掛載 ```$content``` 接口，接著用各種 mongoDB 的方式來 query 內容，再用它的呈現專用 component 來呈現內容。
```
<template>
  <article>
    <h1>{{ page.title }}</h1>
    <nuxt-content :document="page" />
  </article>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const page = await this.$content('articles').sortBy('desc').limit(5).fetch()

    return {
      page
    }
  }
}
</script>
```

## 結論

因為現在 JAMSTACK 越來越盛行了，以前端製作一個外皮然後搭上內容就是一個網站，而```@nuxtjs/content``` 這個 module 提供了一個幫你把 markdown file 轉換成 API 的接口，讓前端靜態網站blog 系統的製作越來越省心，另外這個 github repo 才剛創一個月，目前只能說是一個概念的展示，或是說 mvp 吧，很多應該要可以 custom 的地方，都不見得有提供 config 給你修改，所以就目前來說想用到完全客製化的話，可能還需要再等等。