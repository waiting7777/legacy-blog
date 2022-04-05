---
title: Tailwind CSS 工具類與關注點分離(作者文章中譯)

tags: CSS

category: Engineering

excerpt: 在最近的專案中，使用了 tailwindcss 這個工具類框架，感覺非常的順手，先來翻譯當初的設計理念，後面再來介紹使用心得。

date: 2020-12-08

image: ./images/tailwind-css-intro.jpg

image_caption: tailwind-css

author: author1

slug: tailwind-css-工具類與關注點分離-作者文章中譯
---

最近案子在用 Tailwind CSS，對於作者的設計理念感到共鳴，特別找到這篇，它開始做的時候的理念文章，拜讀之後簡單的翻譯一下。

<b>原文網址：[CSS Utilty Classes and "separation of Concenrs"](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)</b>

## CSS Utility Classes and 'Separation of Concerns' 工具類與關注點分離

在過去幾年中，我寫 CSS 的方法從一種非常‘語意化’的方式轉變為功能性的 CSS。

這種 CSS 寫法會激起非常多的開發者的反應，所以接下來我會解釋我是如何達成這一點的，以及從中學習到的教訓以及見解。

## Phase 1: 'Semantic' CSS '語意化' CSS

當你想把 CSS 寫得優雅的時候，其中一種聽過的最好練習，就是'關注點分離'。

這個想法認為你的 HTML 應該只包含你的內容訊息，而所有的樣式決定都應該來自於你的 CSS。

讓我們看一下這個 HTML:

```
<p class="text-center">
    Hello there!
</p>
```

看看那個 `.text-center` 類別，將文字置中是一種設計決定，所以這段程式碼違反了'關注點分離'的原則，因為它把樣式資訊混雜到了 HTML 上面。

推薦的實現方法，應該是基於它的內容給你的 element 類別，並且在 CSS 中用這些類別當作鉤子。

```
<style>
.greeting {
    text-align: center
}
</style>

<p class="greeting">
    Hello there!
</p>
```
遵循最好的實現是 [CSS Zen Garden](http://www.csszengarden.com/) ，它旨在展示如果你符合了'關注點分離'，你可以完全可以靠替換樣式文件來重新設計網站。

我的工作流程如下：

1.  先寫下我需要新 UI 的 HTML (在這裡是作者簡介卡片):
    ```
    <div>
        <img src="https://cdn-images-1.medium.com/max/1600/0*o3c1g40EXj65Fq9k." alt="">
        <div>
            <h2>Adam Wathan</h2>
            <p>
                Adam is a rad dude who likes TDD, Active Record, and garlic bread with cheese. He also hosts a decent podcast and has never had a really great haircut.
            </p>
        </div>
    </div>
    ```
2.  依據內容增加敘述性的類別:
    ```
    - <div>
    + <div class="author-bio">
        <img src="https://cdn-images-1.medium.com/max/1600/0*o3c1g40EXj65Fq9k." alt="">
        <div>
        <h2>Adam Wathan</h2>
        <p>
            Adam is a rad dude who likes TDD, Active Record, and garlic bread with cheese. He also hosts a decent podcast and has never had a really great haircut.
        </p>
        </div>
    </div>
    ```
3.  用這些類別代表鉤子，並完善我的 CSS/Less/Sass 樣式:
    ```
    .author-bio {
        background-color: white;
        border: 1px solid hsl(0,0%,85%);
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        overflow: hidden;
        > img {
            display: block;
            width: 100%;
            height: auto;
        }
        > div {
            padding: 1rem;
            > h2 {
            font-size: 1.25rem;
            color: rgba(0,0,0,0.8);
            }
            > p {
            font-size: 1rem;
            color: rgba(0,0,0,0.75);
            line-height: 1.5;
            }
        }
    }
    ```

最後我的結果就像這樣:
<iframe height="480" style="width: 100%;" scrolling="no" title="Author Bio, nested selectors" src="https://codepen.io/adamwathan/embed/ZJeWBY?height=265&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/adamwathan/pen/ZJeWBY'>Author Bio, nested selectors</a> by Adam Wathan
  (<a href='https://codepen.io/adamwathan'>@adamwathan</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

這樣的實現對我來說非常直覺，與此同時這是我這時寫 HTML 和 CSS 的方法。

儘管如此，有些事情還是開始感覺不對勁。

雖然我'分離關注點'了，但我的 CSS 跟 HTML 之間還是有非常明顯的耦合。大部份時候我的 CSS 就像是 HTML 的鏡子，完美呈現了 HTML 的架構。

<b>我的 HTML 不關注樣式了，但我的 CSS 卻非常關注 HTML 的結構。</b>

或許我的'關注'仍然沒有分離...

## Phase 2: Decoupling styles from structure 從結構中解耦樣式

為了解決這耦合問題，在經過一番尋找之後，我發現越來越多的建議是增加比較多的類別到你的 HTML，所以你可以快速地指向它，並且讓 CSS 選擇器相對簡單並且讓你的樣式
較少的依賴你的 DOM 結構。

最廣為人知的方法是 [Block Element Modifer](http://getbem.com/introduction/)，或是簡寫叫 BEM。

來做一個 BEM-like 的實現，我們的個人簡介 HTML 會長的像這樣:

```
<div class="author-bio">
  <img class="author-bio__image" src="https://cdn-images-1.medium.com/max/1600/0*o3c1g40EXj65Fq9k." alt="">
  <div class="author-bio__content">
    <h2 class="author-bio__name">Adam Wathan</h2>
    <p class="author-bio__body">
      Adam is a rad dude who likes TDD, Active Record, and garlic bread with cheese. He also hosts a decent podcast and has never had a really great haircut.
    </p>
  </div>
</div>
```

同時我們的 CSS 會看起來像這樣:
```
.author-bio {
  background-color: white;
  border: 1px solid hsl(0,0%,85%);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}
.author-bio__image {
  display: block;
  width: 100%;
  height: auto;
}
.author-bio__content {
  padding: 1rem;
}
.author-bio__name {
  font-size: 1.25rem;
  color: rgba(0,0,0,0.8);
}
.author-bio__body {
  font-size: 1rem;
  color: rgba(0,0,0,0.75);
  line-height: 1.5;
}
```
[view on codepen](https://codepen.io/adamwathan/pen/ZJepYj)

對我來說彷彿感覺到了巨大的改進，我的 HTML 仍然是'語意化'的，並且不包含任何樣式的抉擇，而我的 CSS 感覺從 HTML 結構解耦了，靠著增加新類別來避遠非必要的 selector。

但是接著我就陷入了困境。

### Dealing with similar components 處理類似的組件

如果我需要增加新的功能，用卡片呈現文章預覽。

如果這個文章預覽卡在上面有個撐滿的圖片，有個內容區塊在下面，並且有較粗的標題以及較小的內文。

如果他長得非常像作者簡介。

![author bio](./images/tailwind-css-intro-1.png)

當我們想要維持分離關注，什麼是最好的實現方式？

我們不能直接使用 `.author-bio` 類別在我們的預覽文章上，因為這樣語意不清。所以我們肯定得建立個 `.article-preview` 類別以及它的組件。

這是我們的 HTML:

```
<div class="article-preview">
  <img class="article-preview__image" src="https://i.vimeocdn.com/video/585037904_1280x720.webp" alt="">
  <div class="article-preview__content">
    <h2 class="article-preview__title">Stubbing Eloquent Relations for Faster Tests</h2>
    <p class="article-preview__body">
      In this quick blog post and screencast, I share a trick I use to speed up tests that use Eloquent relationships but don't really depend on database functionality.
    </p>
  </div>
</div>
```

但是我們該如何處理 CSS?

### Option 1: 複製樣式 Duplicate the styles

一種方法是直接複製 `.author-bio` 的樣式，然後重新命名類別。

```
.article-preview {
  background-color: white;
  border: 1px solid hsl(0,0%,85%);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}
.article-preview__image {
  display: block;
  width: 100%;
  height: auto;
}
.article-preview__content {
  padding: 1rem;
}
.article-preview__title {
  font-size: 1.25rem;
  color: rgba(0,0,0,0.8);
}
.article-preview__body {
  font-size: 1rem;
  color: rgba(0,0,0,0.75);
  line-height: 1.5;
}
```

這樣是可行的，但不是非常的<b>DRY</b>(譯註: Don't Repeat Yourself)。以及這非常容易讓這些組件產生些微的不同。

### Option 2: 拓展作者簡介組件 @extend the author bio component

另一個實現方法是使用 `@extend` 的語法來實現。讓你可以用你早已定義的 `author-bio` 組件來完成樣式。

```
.article-preview {
  @extend .author-bio;
}
.article-preview__image {
  @extend .author-bio__image;
}
.article-preview__content {
  @extend .author-bio__content;
}
.article-preview__title {
  @extend .author-bio__name;
}
.article-preview__body {
  @extend .author-bio__body;
}
```

[view on codepen](https://codepen.io/adamwathan/pen/ZJepLq)

用 `@extend` 的方式[普遍來說是不推薦的](https://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/)，但除此之外這方法的確解決了我們的問題？

我們移除了我們重複的 CSS，而我們的 HTML 仍然獨立於樣式之外。

但讓我們再來檢查另一個方法...

### Option 3: 建立一個無關內容的組件 Create a content-agnostic component

我們的 `.autore-bio` 和 `.article-preview` 組件在語意上並沒有共通點，一個是作者的簡介，一個是文章的預覽。

但如同前面所見，他們在設計上有很多的共通點。

所以如果我們想，我們可以建立一個新的組件，並取名為他們共同的部分，然後共用這個組件。

讓我們稱呼他為 `media-card`。

這是 CSS:

```
.media-card {
  background-color: white;
  border: 1px solid hsl(0,0%,85%);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}
.media-card__image {
  display: block;
  width: 100%;
  height: auto;
}
.media-card__content {
  padding: 1rem;
}
.media-card__title {
  font-size: 1.25rem;
  color: rgba(0,0,0,0.8);
}
.media-card__body {
  font-size: 1rem;
  color: rgba(0,0,0,0.75);
  line-height: 1.5;
}
```

...因此這是作者簡介的 HTML:

```
<div class="media-card">
  <img class="media-card__image" src="https://cdn-images-1.medium.com/max/1600/0*o3c1g40EXj65Fq9k." alt="">
  <div class="media-card__content">
    <h2 class="media-card__title">Adam Wathan</h2>
    <p class="media-card__body">
      Adam is a rad dude who likes TDD, Active Record, and garlic bread with cheese. He also hosts a decent podcast and has never had a really great haircut.
    </p>
  </div>
</div>
```

...而這是文章預覽的 HTML:

```
<div class="media-card">
  <img class="media-card__image" src="https://i.vimeocdn.com/video/585037904_1280x720.webp" alt="">
  <div class="media-card__content">
    <h2 class="media-card__title">Stubbing Eloquent Relations for Faster Tests</h2>
    <p class="media-card__body">
      In this quick blog post and screencast, I share a trick I use to speed up tests that use Eloquent relationships but don't really depend on database functionality.
    </p>
  </div>
</div>
```

這樣的實現方式，同時移除了重複的 CSS，但是我們現在是不是'混合關注'了?

我們的 HTML 全部突然發現同時需要兩邊的內容才能為我們的卡片添加樣式。如果我們想要把作者簡介改動樣式，卻又不改動文章預覽的樣子？

在之前，我們可以簡單地打開 CSS，然後為組件選擇新的樣子，現在我們需要同時更新 HTML!天阿!

但讓我們反過來想一下。

<b>如果我們需要同時新增新類別的內容以及樣式呢？</b>

用'語意'化的寫法，我們必須寫新的 HTML，新增一些內容特化的樣式，打開 CSS，增加一段新的 CSS 組件，並且放上共通的樣式，無論是複製或是用 `@extend` 或是用 mixin。

而如果用我們的不管內容的類別 `.media-card`，所有我們需要做的事情只有寫新的 HTML，而不用再寫新的 CSS。

如果我們真的'混合關注'，那麼我們是否應該在多個地方做變更？

## "分離關注點"是一個稻草人

當你用"分離關注點"在想 HTML 和 CSS 之間的關聯時，那是非常的非黑即白。

你有"分離關注點"(good!)，你沒有"分離關注點"(bad!)，

但這不是正確的思考 HTML 和 CSS 的地方。

取而代之的是，<b>思考他們依賴的方向</b>

你可以有兩種方法寫你的 HTML 和 CSS:

1. <del>"分離關注點"</del><br/><b>CSS that depends on HTML.</b><br/><br/>
    你的類別基於你的內容取名(像是 `.author-bio`)，代表了你的 CSS 依賴 HTML

    HTML 本身是獨立的，它不在乎你讓他長怎樣，它單純暴露了接口 `.author-bio`

    你的 CSS 則不是獨立的，它需要知道哪些類別是 HTML 暴露出來的接口，以及需要為這些類別添加樣式。

    在這個模式下，你的 HTML 是可重複用的，但你的 CSS 無法重複使用

2. <del>'混合關注'</del><br/><b>HTML that depends on CSS.</b><br/><br/>
    你的類別基於樣式的模型取名，跟內容無關(像是 `.mdeia-card`)代表了你的 HTML 依賴 CSS

    CSS 本身是獨立的，它不在乎什麼內容會被添加上去，他單純暴露了一系列你可以添加到 HTML 的區塊。

    你的 HTML 則不是獨立的，它需要知道有哪些類別是 CSS 提供的，並且需要知道如何組合出需要的設計。

    在這個模式下，你的 CSS 是可以重複用的，但你的 HTML 無法重複樣式

CSS Zen Garden 用了第一種方式實現，而 UI 框架像是 [Bootstrap](http://v4-alpha.getbootstrap.com/) 或是 [Bulma](http://bulma.io/) 則是第二種實現。

沒有一個是'錯'的，它們只是一種抉擇，基於在你的狀況下那個是比較重要的。

對於你在做的專案中，哪個是比較有價值的，可以重新樣式 HTML? 或是可重複用的 CSS?

### 選擇可重用性

對我來說關鍵的轉折點是當我讀到了 Nicolas Gallagher 的 [About HTML semantics and front-end architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/)。

我不會在這邊重複他的觀點，但無庸置疑的是，當我讀完它的 Blog 之後，他完全說服我了，可重複使用的 CSS 對我在做的專案來說將會是正確的選擇。

## 階段3: Content-agnostic CSS 組件

在這時間點我的目標很明確的避免建立基於內容的類別，取而代之的是，我試著對於每個可能重用的類別用它的功能取名。

而結果的類別名像是:

*   `.card`
*   `.btn`, `.btn--primary`, `.btn--secondary`
*   `.badge`
*   `.card-list`, `.card-list-item`
*   `.img--round`
*   `.modal-form`, `.modal-form-section`

...諸如此類。

當我專注於建立這些可重用的 CSS 類別，我注意到了一些其他的問題:

<b>當一個組件做得越多，或是定製的越多，它就越難重用</b>

這裡有直觀的範例:

我們正在建立個表單，有一些單元以及在底部有個送出按鈕。

如果我們認為所有的表單內容都是 `.stacked-form` 組件的一部分，那我們應該會給送出按鈕一個類別像是 `.stacked-form__button`
```
<form class="stacked-form" action="#">
  <div class="stacked-form__section">
    <!-- ... -->
  </div>
  <div class="stacked-form__section">
    <!-- ... -->
  </div>
  <div class="stacked-form__section">
    <button class="stacked-form__button">Submit</button>
  </div>
</form>
```
但是也許網站有個其他的按鈕，但不是表單的一部分，卻需要一樣的樣式。

在按鈕用 `.stacked-form__button` 類別感覺不對，因為那按鈕並不是表單的一部分。

這兩個按鈕都是代表了頁面的主要行為，所以如果我們想共用這個類別，或許這個應該使用 `.btn-primary` 這個類別，並移除 `.stacked-form__` 前綴。

```
<form class="stacked-form" action="#">
  <!-- ... -->
  <div class="stacked-form__section">
-   <button class="stacked-form__button">Submit</button>
+   <button class="btn btn--primary">Submit</button>
  </div>
</form>
```
接著我們希望這個 stacked form 看起來像浮動的卡片。

其中一個作法會是建立一個修改的樣式，然後添加上去:
```
- <form class="stacked-form" action="#">
+ <form class="stacked-form stacked-form--card" action="#">
  <!-- ... -->
</form>
```
但是如果我們已經有一個 `.card` 類別，那何不把卡片跟表單組合成新的 UI?
```
+ <div class="card">
  <form class="stacked-form" action="#">
    <!-- ... -->
  </form>
+ </div>
```
改用這種實現方式的時候，我們有了一個 `.card` 樣式，可以當任何內容的根，以及一個不特定的 `.stacked-form`，可以放到任何 container 裡面。

我們可以得到更多的組件重用，並且<b>不需要寫任何新的 CSS</b>

### 組合子組件 Composition over subcomponents

如果我們要新增按鈕在 stacked-form 的按鈕下面，以及希望跟現有的按鈕有個間隔。
```
<form class="stacked-form" action="#">
  <!-- ... -->
  <div class="stacked-form__section">
    <button class="btn btn--secondary">Cancel</button>
    <!-- Need some space in here -->
    <button class="btn btn--primary">Submit</button>
  </div>
</form>
```
這種實現方式將會建立新的子組件，像是 `.stacked-form__footer`，新增額外的類別到每個按鈕 `.stacked-form__footer-item`，並且增加特定的選擇器來增加 margin:
```
<form class="stacked-form" action="#">
  <!-- ... -->
-   <div class="stacked-form__section">
+   <div class="stacked-form__section stacked-form__footer">
-     <button class="btn btn--secondary">Cancel</button>
-     <button class="btn btn--primary">Submit</button>
+     <button class="stacked-form__footer-item btn btn--secondary">Cancel</button>
+     <button class="stacked-form__footer-item btn btn--primary">Submit</button>
  </div>
</form>
```

因此我們的 CSS 看起來會像:

```
.stacked-form__footer {
  text-align: right;
}
.stacked-form__footer-item {
  margin-right: 1rem;
  &:last-child {
    margin-right: 0;
  }
}
```

但是如果我們在子導覽列或是頂端列有同樣的問題呢?

我們沒辦法在 `.stacked-form` 外面重用 `.stacked-form__footer`，所以或許我們在頂端列做個新的子組件:

```
<header class="header-bar">
  <h2 class="header-bar__title">New Product</h2>
+   <div class="header-bar__actions">
+     <button class="header-bar__action btn btn--secondary">Cancel</button>
+     <button class="header-bar__action btn btn--primary">Save</button>
+   </div>
</header>
```

...但是現在我們必須複製我們剛才 `.stacked-form__footer` 的工作到我們新的 `.header-bar__action`組件。

這感覺彷彿回到了最一開始我們用內容導向的類別名稱遇到的問題？

一個可能的解決辦法是，在建立一個全新的組件。或許叫做 `.actions-list`:

```
.actions-list {
  text-align: right;
}
.actions-list__item {
  margin-right: 1rem;
  &:last-child {
    margin-right: 0;
  }
}
```

現在我們可以完全擺脫 `.stacked-form__footer` 和 `.header-bar__actions`，並且用 `.actions-list` 來取代他們:

```
<!-- Stacked form -->
<form class="stacked-form" action="#">
  <!-- ... -->
  <div class="stacked-form__section">
    <div class="actions-list">
      <button class="actions-list__item btn btn--secondary">Cancel</button>
      <button class="actions-list__item btn btn--primary">Submit</button>
    </div>
  </div>
</form>

<!-- Header bar -->
<header class="header-bar">
  <h2 class="header-bar__title">New Product</h2>
  <div class="actions-list">
    <button class="actions-list__item btn btn--secondary">Cancel</button>
    <button class="actions-list__item btn btn--primary">Save</button>
  </div>
</header>
```

但是如果其中一個 action-list 想要置左對齊，而另一個想要置右對齊？我們應該在建立一個 `.actions-list--left` 和 `.actions-list--right` 修改符？

## Phase 4: 無視內容組件 + 功能性類別 Content-agnostic components + utility classes

在一段時間之後，想要完全理解這些組件名稱是令人筋疲力盡的。

當你建立一個修改符 `.actions-list--left`，你只為了一個 CSS 屬性建立了一個新的組件。它名字裡已經有個 `left`，所以你不會在語義上混淆其他人。

但如果我們有其他的組件需要 `left-align` 和 `right-align` 呢？我們又要見一個新的修改符嗎？

這又回到了當初我們決定移除 `.stacked-form__footer` 和 `.header-bar__actions` 並且用 `.actions-list` 替代時遇到的問題:

### 我們偏好用組合來複製 We prefer composition to duplication

所以我們有兩個 action-list ，一個想要置左對齊，而另一個想要置右對齊，我們要如何用組合來解決這個問題？

### 對齊公用 Alignment utilities

要用組合來解決這個問題，我們需要新增兩個可重用的類別，來達到我們想要的結果。

如果我們已經準備把我們的修改符叫做 `.actions-list--left` 和 `.actions-list--right`，那我們更沒理由不把我們的新類別叫做 `.align-left` 以及 `.align-right`:

```
.align-left {
  text-align: left;
}
.align-right {
  text-align: right;
}
```

現在我們可以用這兩個類別來幫我們的 stacked form 按鈕作置左對齊:

```
<form class="stacked-form" action="#">
  <!-- ... -->
  <div class="stacked-form__section">
    <div class="actions-list align-left">
      <button class="actions-list__item btn btn--secondary">Cancel</button>
      <button class="actions-list__item btn btn--primary">Submit</button>
    </div>
  </div>
</form>
```

...以及我們的 header 作置右對齊:
```
<header class="header-bar">
  <h2 class="header-bar__title">New Product</h2>
  <div class="actions-list align-right">
    <button class="actions-list__item btn btn--secondary">Cancel</button>
    <button class="actions-list__item btn btn--primary">Save</button>
  </div>
</header>
```

### 別害怕 Don't be afraid

如果在你的 HTML 上面出現 'left' 和 'right' 會讓你感到不舒服，記得在這時間點我們已經決定了 UI 模式。
 
沒有任何預設的 `.stacked-form` 跟 `.align-right`，他們同樣都根據他們的命名來影響 HTML，而我們將它們組合起來來達成我們想要的結果。

我們在攥寫 CSS-dependent HTML，如果我們想要改變我們的 `.stacked-form` 到 `.horizontal-form`，靠改變他的 HTML 而不是 CSS。

### 刪除不必要的抽象 Deleting useless abstractions

關於這個解法有趣的事情是，我們的 `.actions-list` 類別基本上無用處了。所有他做的事情也只有把內容置右。

所以刪除它吧:

```
- .actions-list {
-   text-align: right;
- }
  .actions-list__item {
    margin-right: 1rem;
    &:last-child {
      margin-right: 0;
    }
  }
```

但是這樣會有點奇怪，因為我們有一個 `.actions-list__item` 卻沒有 `.action-list`，那麼回到原本問題，有沒有辦法解決它而又不產生 `.action-list__item` 呢？

回過頭想想，我們建立這個類別其實只是為了在兩個按鈕之間增加 margin，`.action-list` 對於一系列的按鈕是個很棒的比喻以及可重用的命名。但是如果有個情境是我們需要同樣的間隔但對象的 item 卻不是 'action' 時？

或許更可以重用的命名為 `.spaced-horizontal-list`? 我們已經刪除了整個 `.action-list`，因為只有他的 child 是真的需要樣式的。

### Soacer utilities

如果只有 children 需要樣式，或許簡單的直接對 children 樣式就好，而不是取個很華麗的類別名稱讓們成為群組？

對於對旁邊元素加個間隔的類別，最能重用的辦法就是讓他叫做 '這個元素應該對旁邊元素留個間隔'。

我們已經增加了一些公用類別像是 `.align-left` 和 `.align-right`。那麼我們試著增加新的 right margin 共用呢？

來新增新的公用類別 `.mar-r-sm`，對於一個元素的右邊增加一點 margin。

```
- .actions-list__item {
-   margin-right: 1rem;
-   &:last-child {
-     margin-right: 0;
-   }
- }
+ .mar-r-sm {
+   margin-right: 1rem;
+ }
```

接著這是我們的 form 目前的 HTML:
```
<!-- Stacked form -->
<form class="stacked-form" action="#">
  <!-- ... -->
  <div class="stacked-form__section align-left">
    <button class="btn btn--secondary mar-r-sm">Cancel</button>
    <button class="btn btn--primary">Submit</button>
  </div>
</form>

<!-- Header bar -->
<header class="header-bar">
  <h2 class="header-bar__title">New Product</h2>
  <div class="align-right">
    <button class="btn btn--secondary mar-r-sm">Cancel</button>
    <button class="btn btn--primary">Save</button>
  </div>
</header>
```

整個 `.action-list` 的觀念已經不見，而我們的 CSS 更小，類別也擁有更多的重用性。

## Phase 5 公用優先 CSS Utility-first CSS

當我意識到這點時，我已經為我的網站建構了許多公用類別，像是:

* Text sizes, colors, weights
* Border colors, widths, positions
* Background colors
* Flexbox utilities
* Padding and margin helpers

而神奇的事情是，因此你可以建立新的組件而不用寫任何新的 CSS。

看看這個我其中一個專案的'產品卡片':

![new component](./images/tailwind-css-intro-2.png)

這是他的 HTML:
```
<div class="card rounded shadow">
    <a href="..." class="block">
        <img class="block fit" src="...">
    </a>
    <div class="py-3 px-4 border-b border-dark-soft flex-spaced flex-y-center">
        <div class="text-ellipsis mr-4">
            <a href="..." class="text-lg text-medium">
                Test-Driven Laravel
            </a>
        </div>
        <a href="..." class="link-softer">
            @icon('link')
        </a>
    </div>
    <div class="flex text-lg text-dark">
        <div class="py-2 px-4 border-r border-dark-soft">
            @icon('currency-dollar', 'icon-sm text-dark-softest mr-4')
            <span>$3,475</span>
        </div>
        <div class="py-2 px-4">
            @icon('user', 'icon-sm text-dark-softest mr-4')
            <span>25</span>
        </div>
    </div>
</div>
```

類別的使用數量起初可能會讓你倒退，但是我是想做真正的 CSS 公用組件。

我們不想用跟內容相關特定的名稱，因為它可能叫這樣?

```
.image-card-with-a-full-width-section-and-a-split-section { ... }
```

當然這是沒道理的，就像我們之前討論過的，我們會把他切分成較小的組件類別。

或許他是被放在卡片裡，但不是所有卡片有 shadow，所以我們可能有個 `.card-shadowed` 修改符，或是我們可以建立一個 `.shadow` 公用類別來用在所有地方，這聽起來更可重用，那就這樣做吧。

接下來有些卡片有圓角但有些沒有，我們可以用 `.card--rounded` 解決，但是網站上有時候有些元件也要圓角卻不是卡片，所以用一個 `.rounded` 公用類別顯得更合適。

那如果是置頂圖片？或許用 `.img--fitted` 讓它填滿卡片，但是如果網站的其他圖片要其他的方式，或許用個 `.fit` 可能比較好。

...所以你看到了我的思路過程。

如果你跟隨了我的整個過程，可能就會明瞭，用這些公用類別會是目前的最好選擇。

### 強化一致性 Enforced consistency

使用小的可組合的公用組件的其中一個最大好處是，在你團隊裡的每個開發者都總是從固定的設定中選值。

有多少次當被說'這個文字需要黑一點點'，而你卻需要樣式你的 HTML 用個 `darken()` 函式來改變基礎的 `$text-color`？

或是'這個字應該小一點'，然後就在你的組件添加一個 `font-size: .85em`？

這樣做看起來是'對的'，因為你用了相對的顏色跟尺寸，而不是用了一個絕對的設定。

但是如果你決定讓你的組件文字暗10%，但是其他人是12%？在你發覺之前在你的樣式文件上已經有[402 個獨特的文字顏色](http://cssstats.com/stats?link=https%3A%2F%2Fgist.githubusercontent.com%2Fadamwathan%2F51ce5f8445dece60ef49d6b7dcc4e538%2Fraw%2Fe5349db6f1ccbd175f7dd7c581e061b4d49c1ff4%2Fgitlab.css)

只要你是寫新的 CSS 來樣式組件，就會發生這件事。

* [GitLab](http://cssstats.com/stats?link=https%3A%2F%2Fgist.githubusercontent.com%2Fadamwathan%2F51ce5f8445dece60ef49d6b7dcc4e538%2Fraw%2Fe5349db6f1ccbd175f7dd7c581e061b4d49c1ff4%2Fgitlab.css): 402 text colors, 239 background col'ors, 59 font sizes
* [Buffer](http://cssstats.com/stats?link=https%3A%2F%2Fgist.githubusercontent.com%2Fadamwathan%2F51ce5f8445dece60ef49d6b7dcc4e538%2Fraw%2Fd560c4dadb9e85197d6e33ac0cb55c2435c45c65%2Fbuffer.css): 124 text colors, 86 background colors, 54 font sizes
* [HelpScout](http://cssstats.com/stats?link=https%3A%2F%2Fgist.githubusercontent.com%2Fadamwathan%2F51ce5f8445dece60ef49d6b7dcc4e538%2Fraw%2F1a12773f211891f4199d03c59bde97e814e044f0%2Fhelpscout.css): 198 text colors, 133 background colors, 67 font sizes
* [Gumroad](http://cssstats.com/stats?link=https%3A%2F%2Fstatic-1.gumroad.com%2Fres%2Fgumroad%2Fassets%2Fapplication-f7ade6b83ca73dcd02cc9762068df43c4ea824e0c94babde8e4c9ecfc2653acb.css): 91 text colors, 28 background colors, 48 font sizes
* [Stripe](http://cssstats.com/stats?link=https%3A%2F%2Fgist.githubusercontent.com%2Fadamwathan%2Fca146a9dbe99754159c07c6599ea45d2%2Fraw%2F90d64ed31422e9c4fc8b08b035b47ea048275ad1%2Fstripe.css): 189 text colors, 90 background colors, 35 font sizes
* [GitHub](http://cssstats.com/stats?url=http%3A%2F%2Fgithub.com&name=GitHub): 163 text colors, 147 background colors, 56 font sizes
* [ConvertKit](http://cssstats.com/stats?link=https%3A%2F%2Fgist.githubusercontent.com%2Fadamwathan%2F4ca6aafc50342ad87a98970204053b71%2Fraw%2Fbb42e4fda01d9933afff7225b33e77dbfbd559ff%2Fconvertkit.css): 128 text colors, 124 background colors, 70 font sizes

這是因為每一小段你寫的 CSS 都是個空白畫布，沒有辦法可以阻止你用任何你想用的。

你可以嘗試透過變數或 mixins 增強一致性，但是<b>每一行新的 CSS 都是增加複雜度的機會</b>，增加 CSS 永遠不會讓你的 CSS 變簡單。

如果你嘗試用已存在的類別來樣式組件，所有的突然新增樣式的問題就解決了。

當你想要讓暗字更黑？添加 `.text-dark-soft` 類別。

需要讓字型更小一點？使用 `.text-sm` 類別。

當你專案中的所有人從有限的預選類別做樣式，你的 CSS 就不會再線性的肥大，而你自動就獲得了一致性。

### 你仍然應該建立組件 You should still create components

其中一個跟一些死忠的 functional CSS 擁護者不同的見解是，你不應該只用公用類別做組件。

如果你看向一些受歡迎的公用框架像是 [Tachyons](http://tachyons.io/)，你會看到他們即使是按鈕也是用純公用類別:

```
<button class="f6 br3 ph3 pv2 white bg-purple hover-bg-light-purple">
  Button Text
</button>
```

先讓我簡介一下:
* `f6`: Use the sixth font size in the font size scale (.875rem in Tachyons)
* `br3`: Use the third border radius in the radius scale (.5rem)
* `ph3`: Use the third size in the padding scale for horizontal padding (1rem)
* `pv2`: Use the second size in the padding scale for vertical padding (.5rem)
* `white`: Use white text
* `bg-purple`: Use a purple background
* `hover-bg-light-purple`: Use a light purple background on hover

如果你需要有同樣組合類別的多種按鈕，Tachyons 建議的實現方式是對 template 作抽象而不是 CSS。

如果你用`Vue.js`做範例，你可能會建立個組件像這樣：
```
<ui-button color="purple">Save</ui-button>
```
然後定義成這樣:
```
<template>
  <button class="f6 br3 ph3 pv2" :class="colorClasses">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['color'],
  computed: {
    colorClasses() {
      return {
        purple: 'white bg-purple hover-bg-light-purple',
        lightGray: 'mid-gray bg-light-gray hover-bg-light-silver',
        // ...
      }[this.color]
    }
  }
}
</script>
```

這對於很多專案是很好的實現，但是<b>但是我仍然認為有很多使用情境是建立個CSS component 比較實際</b>。

對我在做的專案中，建立一個 `.btn-purple` 類別組合剛剛那7個公用類別，然後用在每個按鈕 template 上會是比較舒適的。

### ...公用優先的建立 but build them using utilities first

我稱我的實現方式是 CSS 公用優先的原因是，我建立之前我都盡可能地使用公用類別，然後<b>只在他出現重複時提取</b>。

如果你用`Less`當預處理器，你可以把存在的類別當作 mixins，這代表你可以建立 `.btn-purple` 非常輕鬆:

![new component](./images/tailwind-css-intro-3.gif)

很不幸的在Sass跟Stylus 沒辦法這麼做，所以在這邊還是有額外的工作。

對於組件中如何用公用，不是每個都是很簡單的決定。複雜的互動以及 parent child 組件間的互動也不見得那麼好公用，所以你最好的判斷就是用最簡單的方法實踐。

### 不再過早的抽象化 No more premature abstraction

用組件優先的實現，代表你有可能建立了永遠用不到的組件，這個過早的抽象化會讓你的樣式表膨脹。

以導覽列為例。在你的 app 中你重寫了它的 HTML 幾次？

我的話通常是一次。

如果你以公用優先並且只在你看到令人擔憂的重複時才提取抽象，<b>你可能重來不會需要提取導覽列。</b>

取而代之的是你的導覽列看起來會像:

```
<nav class="bg-brand py-4 flex-spaced">
  <div><!-- Logo goes here --></div>
  <div>
    <!-- Menu items go here -->
  </div>
</nav>
```

沒有啥值得提取的。

### 這不是行內樣式嗎？ Isn't this just inline styles？

如果你很簡單的看這實現，並且認為這就是把 style 放到你想要的 HTML 上面，但在我的經驗中，這是非常不同的。

如果是行內樣式，並沒有可供選擇的常數。

其中一個可以是 `font-size: 14px`，另一個是 `font-size: 13px`，在另一個是 `font-size: .9em`，然後可以是 `font-size: .85em`。

<b>這是同樣的空白畫布問題，當你需要寫新的 CSS。</b>

而公用強迫你選擇:

這是 `text-sm` 或是 `text-xs`？

我該用 `py-3` 或是 `py-4`？

我想要 `text-dark-soft` 或是 `text-dark-faint`？

你沒辦法選擇任何的數值，你只能從預選名單中選出。

這樣你就不會有380個文字顏色，而是只有 10~12個。

我的經驗是公用優先會比組件優先讓整體設計更一致。

## 從哪開始 Where to start

如果這樣的實現讓你感興趣，這裡有一些框架:

* [Tachyons](http://tachyons.io/)
* [Basscss](http://basscss.com/)
* [Beard](http://buildwithbeard.com/)
* [turretcss](http://turretcss.com/)

或是，我也在寫我的開源公用優先的 CSS 框架 [Tailwind CSS](https://tailwindcss.com/)，如果你感興趣就來我網站看看。



