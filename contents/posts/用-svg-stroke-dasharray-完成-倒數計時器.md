---
title: 用 SVG stroke-dasharray 完成倒數計時器

tags: Javascript, CSS, Datavisualization

category: Datavisualization

excerpt: SVG 有個 css 屬性叫做 stroke-dasharray，利用它再配合 transition 或是 animate 等等 css 特性，就可以做出 svg 線條的動畫。

date: 2020-06-11

image: ./images/svg-stroke-dasharray.png

image_caption: svg-stroke-dasharray

author: author1

slug: 用-svg-stroke-dasharray-完成-倒數計時器
---

## stroke-width

SVG 的 stroke 是一個很基本的屬性，如果在線段上，那他就是指整條線，例如 ```<path> <line>``` ，如果在圖形上那麼指的就是圖形的邊 ```<rect> <circle>```，stroke 可以指定顏色，storke-width 可以指定寬度，那麼 storke-dasharray 可以幹嘛呢？它是用來畫 "虛線" 的。

讓我們來看看 MDN 的範例：
```
<svg viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
  <!-- No dashes nor gaps -->
  <line x1="0" y1="1" x2="30" y2="1" stroke="black" />
 
  <!-- Dashes and gaps of the same size -->
  <line x1="0" y1="3" x2="30" y2="3" stroke="black"
          stroke-dasharray="4" />
 
  <!-- Dashes and gaps of different sizes -->
  <line x1="0" y1="5" x2="30" y2="5" stroke="black"
          stroke-dasharray="4 1" />
    
  <!-- Dashes and gaps of various sizes with an odd number of values -->
  <line x1="0" y1="7" x2="30" y2="7" stroke="black"
          stroke-dasharray="4 1 2" />
 
  <!-- Dashes and gaps of various sizes with an even number of values -->
  <line x1="0" y1="9" x2="30" y2="9" stroke="black"
          stroke-dasharray="4 1 2 3" />
</svg>
```

![mdn-example] (./images/entry7-1.png)

第一個 ```<line>```，毫無反應就是條直的黑線

第二個 ```<line>```，設置了```storke-dasharray="4"``` 成為了一條黑白相間 4px 的虛線，(因為 storke-dasharray 如果輸入奇數的數組，會自動複製一份成為雙數)，所以這條線其實是 ```stroke-dasharray="4 4"``` 4px 黑線 4px 白線。

第三條 ```<line>```，設置了```storke-dasharray="4 1"```，所以是 4px 黑線 1px 白線。

第四條 ```<line>```，設置了```storke-dasharray="4 1 2"``，所以是 4, 1, 2, 4, 1, 2 循環的虛線

第五條 ```<line>```，設置了```storke-dasharray="4 1 2 3"``，所以是 4px 黑線 1px 白線 2px 黑線 3px 白線的循環。

## 如何做動畫？

因為 ```stroke-dasharray``` 是 css 屬性，且支援 transition ，所以只要用 animation ```storke-dasharray``` 的值就可以辦到。

html:
```html
<svg width="340px" height="333px" viewBox="0 0 340 333">
  <path class="path" fill="#FFFFFF" stroke="#000000" stroke-width="4" stroke-miterlimit="10" d="M66.039,133.545c0,0-21-57,18-67s49-4,65,8
	s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
	C46.039,146.545,53.039,128.545,66.039,133.545z"/>
</svg>
```
css:
```css
.path {
  stroke-dasharray: 0 1000;
  animation: dash 5s linear infinite;
}

@keyframes dash {
  from {
    stroke-dasharray: 0 1000;
  }
  to {
    stroke-dasharray: 1000 1000;
  }
}
```
這是一個 path 長度為 1000 的不規則 svg path，初始設定了 ```stroke-dasharray: 0 1000```，然後設定了一個五秒動畫會從 0 1000 到 1000 1000，就能呈現如下的效果:

![stroke-example] (./images/entry7-2.gif)

[codepen在此](https://codepen.io/waiting7777/pen/OXaBRO)

## 計時器

簡單的線條玩完了，那麼來點複雜的，標題所說的倒數計時器呢？

![timer] (./images/entry7-3.png)

期望的計時器長這樣，我用的方法是在 svg 裡面放了 2 個```<circle>```，一個當底另一個則拿來調整```storke-dasharray```，並用一個```<text>```來放剩餘時間，
```
<svg width="300" height="300">
  <circle cx="150" cy="150" r="50" />
  <circle id="circle" cx="150" cy="150" r="50" />
  <text id="text" x="150" y="149" />
</svg>
```
```
const total = 60;
const totalLength = 313.6517639160156;
let time = 0;

function draw() {
  const circle = document.getElementById('circle')
  circle.style.strokeDasharray = `${time / total * totalLength} 313.6517639160156`
  const text = document.getElementById('text')
  text.innerHTML = `${total - time}`
  time++
  time = time % 60
}

draw()

setInterval(() => {
  draw()
}, 1000)
```
接著每秒計算目前的時間剩餘比例，並換算出應該要設定的```strokeDasharray```值，在寫回```<circle>```上面，如此一來一個純
 svg 會倒數的計時器就完成啦。

[範例網址](https://codepen.io/waiting7777/pen/abdNbgm)