---
title: "CSS Pixel Art"

tags: css

category: Engineering

excerpt: 最近在網路上剛好看到這個，是用純 CSS 做的，並且圖形只能用 1個 div 完成，就開始好奇這到底應該怎麼做？

date: 2021-12-06

image: ./images/css-pixel-art.png

image_caption: css

author: author1

slug: css-pixel-art
---

原文網址: [https://kentcdodds.com/blog/how-i-built-a-modern-website-in-2021](https://kentcdodds.com/blog/how-i-built-a-modern-website-in-2021)

## Box-Shadow

查了一下之後，純 CSS 實現大概都是用 Box-Shadow 屬性來完成，因為 Box-Shadow 本身就可以透過調整 X, Y offset 來達成類似 pixel 畫板的東西。

![deployment-pipeline-dark.png](./images/css-pixel-art-1.jpeg)

如範例圖，如果我要畫一個愛心那麼先想像他是畫在一個 9 * 8 的畫板上，接著補上 box-shadow 的 CSS

```css
.pixel-heart {
  color: red; 
  box-shadow: 
    /* 1st row */ 1px 0, 2px 0, 6px 0, 7px 0,
    /* 2nd row */ 0 1px, 1px 1px, 2px 1px, 3px 1px, 5px 1px, 6px 1px, 7px 1px, 8px 1px,
    /* 3rd row */ 0 2px, 1px 2px, 2px 2px, 3px 2px, 4px 2px, 5px 2px, 6px 2px, 7px 2px, 8px 2px,
    /* 4th row */ 0 3px, 1px 3px, 2px 3px, 3px 3px, 4px 3px, 5px 3px, 6px 3px, 7px 3px, 8px 3px,
    /* 5th row */ 1px 4px, 2px 4px, 3px 4px, 4px 4px, 5px 4px, 6px 4px, 7px 4px,
    /* 6th row */ 2px 5px, 3px 5px, 4px 5px, 5px 5px, 6px 5px,
    /* 7th row */ 3px 6px, 4px 6px, 5px 6px,
    /* 8th row */ 4px 7px;  
}
```
每一個 row 其實就是上面愛心的區塊，然後再搭配上顏色即可。
```css
.pixel-heart {
  box-shadow: 
    /* 1st row */ 1px 0, 2px 0, 6px 0, 7px 0,
    /* 2nd row */ 0 1px, 1px 1px red, 2px 1px red, 3px 1px, 5px 1px, 6px 1px red, 7px 1px red, 8px 1px,
    /* 3rd row */ 0 2px, 1px 2px red, 2px 2px red, 3px 2px red, 4px 2px, 5px 2px red, 6px 2px red, 7px 2px red, 8px 2px,
    /* 4th row */ 0 3px, 1px 3px red, 2px 3px red, 3px 3px red, 4px 3px red, 5px 3px red, 6px 3px red, 7px 3px red, 8px 3px,
    /* 5th row */ 1px 4px, 2px 4px red, 3px 4px red, 4px 4px red, 5px 4px red, 6px 4px red, 7px 4px,
    /* 6th row */ 2px 5px, 3px 5px red, 4px 5px red, 5px 5px red, 6px 5px,
    /* 7th row */ 3px 6px, 4px 6px red, 5px 6px,
    /* 8th row */ 4px 7px;
}
```
這樣就能畫出ㄧ個愛心。
<iframe height="480" style="width: 100%;" scrolling="no" title="Author Bio, nested selectors" src="https://codepen.io/waiting7777/embed/ZEXGjRd?height=265&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

最後如果顏色豐富的話，就可以再用 css 變數或是 scss 之類來輔助作畫。
例如:
```scss
// The width/height of each of our "pixels".
$size: 20px;

// Colors
$t: transparent;
$black: #000;
$gray: #cdc9cf;
$dkgray: #a09da1;
$pink: #ffa6ed;
```

## CSS Animations
因為是純 CSS 做的 所以各種 CSS 動畫也能搭配套用上去，像是用 keyframe 做到逐格動畫。

<iframe height="480" style="width: 100%;" scrolling="no" title="Author Bio, nested selectors" src="https://codepen.io/waiting7777/embed/RwLPBRo?height=265&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

## 結論
理解了 Box-Shadow 的用法，並且用它當 pixel 畫板，那麼只要有像素圖片的產生工具，理論上就都能做出純 CSS 的實現了。

## 參考資料
[Creating Pixel Art with CSS](https://dev.to/jnschrag/creating-pixel-art-with-css-3451)
[box-shadow - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)