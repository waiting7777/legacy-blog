---
title: Nodejs 的下一代？Deno 1.0 理念翻譯及初探心得。

tags: Javascript, Deno

category: Engineering

excerpt: 有 Nodejs 之父之稱的 Ryan Dahl, 因為 Nodejs 裡面隱藏了太多的技術債，所以下定決心開發一個新的語言。

date: 2020-05-18

image: ./images/deno.jpg

image_caption: deno

author: author1

slug: nodejs-的下一代-deno-1-0-理念翻譯及初探心得
---

有 Nodejs 之父之稱的 Ryan Dahl, 當年在放下了 Nodejs 開發之後，想回鍋之時，發現整個 Javascript 的生態系已經往前邁進了太多，而隨著時代演進的 Nodejs 裡面隱藏了太多的技術債，所以下定決心開發一個新的語言。Node => no-de => Deno ，那麼 Deno 又有啥過人之處，或是改進了哪些 Nodejs 的問題呢？



## 安全性

Nodejs 預設擁有訪問你所有文件的權限，對於開發者而言，這非常方便，但對於一般使用者來說，這就實在是風險很高，在 deno 裡面你必須用各種 flag 來開啟權限:

```
deno --allow-net server.ts
deno --allow-read=/etc test.ts
```

上面示範了兩個例子，deno 需要拿到特定的權限才能讓你想要的功能運行。



## 不再依賴 npm

在 nodejs ，因為一開始各種零件跟工具的匱乏，所以 npm 模組管理系統應運而生，但每次開發都要下載一大堆的 node_module 也漸漸為人詬病，如同以下的經典圖。

![node_module] (https://img.devrant.com/devrant/rant/r_1558252_FgBYz.jpg)

在 deno 希望大家都用中央的共用的 library ，也允許你直接 import 網路上的 module 不是在本地端下載一堆重複的 module

```
import * as log from "https://deno.land/std/log/mod.ts";
```



## 開箱即用大型工具

如同 webpack 在發展幾年之後，也成為了現在前端的基本，那麼 deno 期望把這些打包工具，測試工具都變成 “內掛”。這樣打從一開始就學習 deno 這一套就好。但這目前還太理想，有些工具 deno 只提供了 api ，還需要自己來完善或是等人出成共用的模組。



## Http Server 效能

根據官方 [blog](https://deno.land/v1) hello-world server，每秒可以處理 25000 筆 request 且最高延遲為 1.3 ms，如果是 nodejs  的話是 34000 筆 reques 但最高延遲為 2~300 ms，而官方認為 25000 筆足以應付現階段大不服的 use case，所以在延遲部分是很大的改進。



## 結論

Deno 會取代 Nodejs 嗎？我認為答案是否定的，他當初拋棄 Nodejs 跑去搞的 golang，也沒取代其他後端語言，一個程式語言除非他的優點真的遠大過於其他語言，否則要談取代真的太難，最重要的還是社群的活耀度，沒有一開始就完美的東西，有人用就會有人去完善它，能夠與時俱進才是最重要的，儘管如此 deno 還是帶來了很多新概念，尤其是想擺脫 node_module ，這有點如同區塊鏈的討論一般，到底是中心化的效能重要，還是去中心化的社群自治重要，永遠沒有正確答案吧。


