---
title: 關於字型檔案的兩三事，及 FontForge 介紹

tags: Tool

category: Engineering

excerpt: 為了想在畫面呈現更多的數字，設計想換數字的字型，而有了後面的故事。

date: 2020-11-06

image: ./images/font-forge.png

image_caption: font-forge

author: author1

slug: 關於-字型檔案的兩三事-及-font-forge-介紹
---

## 起因

因為畫面的空間有限，又想塞入盡量多的數字，設計找到了一個 `word space` 比較小的字型，但偏偏字型檔又偏大，實在不想直接放入專案中，而有了以下的研究。

## 字型檔的大小

字型檔案的大小取決於文字的量，一般英文語系的字型檔大概幾百 kb，而中文語系的字型檔案則需要 4~10mb，所以平常是非常不建議換系統之外的字型(尤其是中文)，除非真的對於美觀有強烈的要求。

## FontForge

[FontForge](https://fontforge.org/en-US/) 是一個開源工具，他可以針對字型檔做修改，操作的介面如圖:

![Alt text](./images/font-forge.png)

這次因為需求只要改動數字的字型，所以我把這字型檔除了數字的部分全部刪除，這樣就可以讓原本 200 KB 的字型檔一口氣縮減到 5 KB，

改動前:

![Alt text](./images/font-forge-1.png)

改動後:

![Alt text](./images/font-forge-2.png)

具體操作為 `Encoding` -> `Detach & Remove Glyphs` 就可以把選取的字型移除，最後再選 `File` -> `Generate Fonts` 就大功告成啦，之後只要是有條件的使用字型也可以處理了。
 