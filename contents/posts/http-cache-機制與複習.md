---
title: "HTTP Cache 機制與複習"

tags: cache

category: Engineering

excerpt: 常常網站改版後，卻被 PM DESIGN 問說怎麼沒更新嗎？其實就是 cache 搞的鬼～

date: 2021-07-13

image: ./images/cache.png

image_caption: leetcode

author: author1

slug: http-cache-機制與複習
---

## 為啥網站更新不了

常常網站改版後，卻被 PM DESIGN 問說怎麼沒更新嗎？其實就是 cache 搞的鬼～

## 什麼是 cache？

因為現代的網站，圖片資訊 js 越來越多越來越大，使用者也跟著上升，如果沒有 cache 機制的話，server 一下就負擔不了。
那麼一條 request 究竟啥時會觸發 cache 哪？這就跟 `cache-control directives` 有關了。

```
Cache-Control: max-age=<秒數>
Cache-Control: max-stale[=<秒數>]
Cache-Control: min-fresh=<秒數>
Cache-Control: no-cache
Cache-Control: no-store
Cache-Control: no-transform
Cache-Control: only-if-cached
```
常用的有這些屬性，Cache-control: private, max-age=600 表示用戶端瀏覽器最長只能快取回應使用 10 分鐘 (60 秒 x 10 分)，之後就要向伺服器詢問是否有新版本。

## 認證權杖 ETag

ETag 是一組由 server 計算的 hash ，就像是大家常聽到的 md5 一樣，server用一套演算法函數，根據實體檔案的一些資訊去計算出一個 hash code 來當檔案認證碼，不同的檔案丟進這個函數就會得到不同的hash code。
用戶端在 max-age 過期後，向伺服器發送檔案 request 時會夾帶這 ETag 資訊，伺服器會計算伺服器上的該檔案 ETag 是否已改變，若是，則傳送該檔案，若沒有改變，則會回傳 status code : 304 (Not Modified) 告訴用戶端，沒有新版本，使用快取即可。

## 實際流程圖
![alt](https://miro.medium.com/max/2000/1*xWcusD6WyE99uL9FiYjx-w.png)