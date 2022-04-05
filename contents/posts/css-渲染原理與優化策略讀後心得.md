---
title: "CSS 渲染原理與優化策略讀後心得"

tags: CSS

category: Engineering

excerpt: 提到  CSS 很多人覺得沒什麼，但根據 RedMonk 2021 Programming Language Rankings ，CSS竟然排到第五了，(參考文章 2019 時為第七)。

date: 2021-11-19

image: ./images/css.jpeg

image_caption: css

author: author1

slug: css-渲染原理與優化策略讀後心得
---

![截圖 2021-11-19 上午9.40.01.png](./images/css-1.png)

 既然 CSS 排名在上升，那麼我們花點時間來研究相關原理也就物有所值了。

## CSS 渲染

![render2.png](./images/css-2.png)

HTML Parser 產生 DOM tree，CSS Parser 產生 style rules，然後就是常見的 render tree，經過 layout paint composition 把畫面畫出來。

## CSS 特性

### 1. 優先級

CSS 有一套權重規則，某個元素被套用多個 css 時，取權重高的。

![specificity1.png](./images/css-3.png)

!import > inline > ID > class > attr > elements

### 2. 層疊性

層疊性就是對多個樣式來源進行疊加，然後根據權重規則來處理衝突。

### 3. 繼承性

font, text, color 類的 css ，如果本身沒有樣式，會繼承父元素的樣式，但優先級是非常低的。

## CSS 選擇器執行順序

渲染引擎解析 `css selector` 的時候是從右往左解析，為什麼呢？

```jsx
<div>
   <div class="test">
      <p><span> 111 </span></p>
      <p><span> 222 </span></p>
      <p><span> 333 </span></p>
      <p><span class='yellow'> 444 </span></p>
   </div>
</div>
```

CSS 如下:

```css
div > div.test p span.yellow{
   color:yellow;
}
```

如果從左往右，要先找到所有 `div` 再來要找到所有子 `div` 並且 class 是 test，再依序尋找 `p` `span.yellow` ，然後如果沒有找到，再回到最原先的 `div` 重新找。

一聽是不是覺得很沒有效率？所以其實是從右往左解析，因為通常越右邊的條件越嚴苛，元素越少，所以先把右邊的都找出來，再看父元素是否符合規則即可。

## 高效的 ComputedStyle

瀏覽器還有個非常好的策略，如果多個 `Element` 的 style 可以不通過計算就能知道相等，那麼就會只計算一次，並且共用那次的 `CompoutedStyle` 結果。

```html
<section class="one">
    <p class="desc">One</p>
</section>

<section class="one">
    <p class="desc">two</p>
</section>
```

- `TagName` 和 `Class` 要一樣
- 不能有 `style` 屬性
- 不能使用 `Sibling selector` ，如: `first-child`
- `mappedAttribute` 必須相等

 

## 優化策略

在理解了渲染原理，以及解析原理後，整理出了一些優化的原則可供參考：

1. `id selector` ，id selector 非常高效，因為是網頁裡唯一。

2. 避免太深層的 `css` 例如：

```css
/* Bad  */
div > div > div > p {color:red;} 
/* Good  */
p-class{color:red;}
```

3. 盡量少用 `attribute selector`

```css
/* Bad  */
p[id="test"]{color:red;}  
p[class="blog"]{color:red;}  
/* Good  */
#test{color:red;}  
.blog{color:red;}
```

4. 遵守 `CSSLint` 規則

5. 減少 CSS 文件大小

- 移除空的規則
- 值為0不需要單位

6. `CSS Will Change`

`will-chage` 屬性讓開發者可以提前告訴瀏覽器會有哪些變化，讓瀏覽器提早做準備

7. 避免過分 `reflow`
常見的 `reflow` 元素：

```
width
height
padding
margin
display
border-width
border
top
position
font-size
float
text-align
overflow-y
font-weight
overflow
left
font-family
line-height
vertical-align
right
clear
white-space
bottom
min-height
```

10. 高效的利用 `computedStyle`

- 共用 `class`
- 謹慎使用 `childSelector`
- 盡可能共享

結語：

過去在寫 `css`  的時候通常都是想要什麼寫什麼，所以常常有多餘的互相蓋來蓋去，在用了 `tailwindcss` 之後，以及文章中提到的 `computedStyle` 或許最後共用且原子化的 `css` 就是最好用的了。

參考資料

[http://jartto.wang/2019/10/23/css-theory-and-optimization/](http://jartto.wang/2019/10/23/css-theory-and-optimization/)