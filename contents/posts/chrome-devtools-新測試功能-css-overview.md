---
title: Chrome Devtools 新測試功能 CSS Overview

tags: devtools, chrome

category: Tool

excerpt: 這是一個 chrome devtools 的新的實驗功能，看起來蠻有趣的，所以來分享一下開啟的方法以及功能介面。

date: 2020-08-04

image: ./images/css-overview.jpg

image_caption: css-overview

author: author1

slug: chrome-devtools-新測試功能-css-overview
---

## CSS Overview

`CSS Overview` 這是一個 chrome devtools 的實驗功能，可以從裡面看到整個網站中，使用的背景顏色、文字顏色、邊框顏色以及字型種類、字型大小等等
甚至還有 media query 的總數。

## 開啟實驗功能

因為他目前還是實驗功能，所以預設是看不到的，必須到設定中去開啟它：

- 打開 devtools

- 打開 devtools 的 settings

- 點選 experiments 分頁

- 開啟 CSS Overview

![cssover-view-1](./images/css-overview-1.png)

當設置開啟以後，就可以在 devtools 的分頁中看到多了一項 `CSS Overview` (沒看到的話 重開 devtools)，點擊 `Capture overview` 按鈕就可以看到整個網站的 css 概覽啦。

![cssover-view-2](./images/css-overview-2.png)

理論上一個網站的背景顏色、文字顏色等等風格應該要一致，並且文字字型種類不應該太多，然後 media query 應該也是在一個規範內，各位前端們可以用這頁面去跟設計師們好好溝通了。
