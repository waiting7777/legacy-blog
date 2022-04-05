---
title: "React 18 新功能研讀"

tags: React

category: Engineering

excerpt: React 在今年 (2021) 6月公開了 React 18 的計畫，裡面提到了這會是他們下一個主要版本，以及一些新的功能，藉由研讀 React 的新功能觀察想解決的問題與前進的方向。

date: 2021-10-29

image: ./images/react-18.jpeg

image_caption: react

author: author1

slug: react-18-new-features
---

## What’s coming in React 18

在計畫中有提到了三個主要新功能

- automatic batching
- startTransition
- new streaming ssr with React.lazy

並且計劃在讓舊版本在最小的改動之下，就能使用這些提升而不用重寫整個專案。

## Automatic Batching

### what is batching?

React 18 會在核心中新增這項改進，一般用戶甚至不會意識到有這變化，不過還是來看看什麼是 `batching` 。

`batching` 是 React 把多個狀態更新濃縮成單個，來達到更好的效能，以底下這段 code 來說，每次點擊會觸發兩次 setState，然後 react 會把這兩次濃縮成一次更新，只會觸發一次 re-render。

```jsx
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    setCount(c => c + 1); // Does not re-render yet
    setFlag(f => !f); // Does not re-render yet
    // React will only re-render once at the end (that's batching!)
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
    </div>
  );
}
```

這是個很棒的功能，可以減少很多不必要的 re-render ，也不會再出現那種狀態更新到一半的情況。但是，現階段的 React 並沒有辦法處理全部的更新，目前的 React 只能將事件裏的更新 batch 起來，像是底下這種在 `fetch` 之後的 setState ，就無法處理了。

```jsx
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    fetchSomething().then(() => {
      // React 17 and earlier does NOT batch these because
      // they run *after* the event in a callback, not *during* it
      setCount(c => c + 1); // Causes a re-render
      setFlag(f => !f); // Causes a re-render
    });
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
    </div>
  );
} 
```

在 React 18 前，只有 event handler 裡面的更新會被 batch， `promise` 、 `setTimeout` 、 `native event` 等等都是不會被 batch 的。

### What is automatic batching

 在 React 18 中使用 `createRoot` ，所有的更新就都會 batch 了。

```jsx
import * as ReactDOM from 'react-dom';
import App from 'App';

const container = document.getElementById('app');

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render: Render an element to the root.
root.render(<App tab="home" />);

// During an update, there's no need to pass the container again.
root.render(<App tab="profile" />);
```

```jsx
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    fetchSomething().then(() => {
      // React 18 and later DOES batch these:
      setCount(c => c + 1);
      setFlag(f => !f);
      // React will only re-render once at the end (that's batching!)
    });
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
    </div>
  );
}
```

在 React 18 中 `fetch` 、 `promise` 、 `setTimeout` 等等的 setState 行為就一樣了。

## startTransition

在大型專案裡，如果做個 filter 來 filter 一個很大的 table ，有時候會導致畫面的卡頓，舉例來說你可能會寫成這樣：

```jsx
// Urgent: Show what was typed
setInputValue(input); // light

// Not urgent: Show the results
setSearchQuery(input);  // heavy
```

其實使用者比較希望馬上看到 inputValue 的變化，這樣的互動感覺是好的，而 table 的變化可以稍微的慢一點沒關係，但原本的寫法還是得等到整個結果完成才 render。

現在有新的 api `startTransition` 可以使用

```jsx
import { startTransition } from 'react';

// Urgent: Show what was typed
setInputValue(input);

// Mark any state updates inside as transitions
startTransition(() => {
  // Transition: Show the results
  setSearchQuery(input);
});
```

在 React 中更新有兩種策略

- Urgent updates: reflect direct interaction, like typing, clicking, pressing, and so on.
- Transition updates: transition the UI from one view to another.

在更新時只要告訴 React 那些更新是可以設定為 `Transition updates` 那麼這些更新就會是可以被 interrupt 的。

## Suspens SSR Architecture

在 React 中 SSR 通常有以下幾個步驟:

- Server 端，fetch 整個 app 的 data
- 接著 server render 出整個 app 要用的 HTML 並且回傳
- 接著 client 接收整包的 javascript code
- 接著 client 將 javascript 與 server-generated HTML 連結 (hydration)

關鍵的是每個步驟都是要處理整個 app 的 fetch 與 render，導致當app太大時反而很慢。

在 React 18 中可以用 `<Suspense>` 來將整個 app break down 成較小的獨立單位，來讓 SSR可以分開進行。

### **Streaming HTML and Selective Hydration**

原本的 SSR

```jsx
<main>
  <nav>
    <!--NavBar -->
    <a href="/">Home</a>
   </nav>
  <aside>
    <!-- Sidebar -->
    <a href="/profile">Profile</a>
  </aside>
  <article>
    <!-- Post -->
    <p>Hello world</p>
  </article>
  <section>
    <!-- Comments -->
    <p>First comment</p>
    <p>Second comment</p>
  </section>
</main> 
```

client 端會先收到

[https://camo.githubusercontent.com/e44ee4be56e56e74da3b9f7f5519ca6197b24e9c34488df933140950f1b31c38/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f534f76496e4f2d73625973566d5166334159372d52413f613d675a6461346957316f5061434668644e36414f48695a396255644e78715373547a7a42326c32686b744a3061](https://camo.githubusercontent.com/e44ee4be56e56e74da3b9f7f5519ca6197b24e9c34488df933140950f1b31c38/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f534f76496e4f2d73625973566d5166334159372d52413f613d675a6461346957316f5061434668644e36414f48695a396255644e78715373547a7a42326c32686b744a3061)

接著 load javascript 並且 `hydrate`

![https://camo.githubusercontent.com/8b2ae54c1de6c1b24d9080d2a50a68141f7f57252803543c30cc69cdd4b82fa1/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f784d50644159634b76496c7a59615f3351586a5561413f613d354748716b387a7939566d523255565a315a38746454627373304a7553335951327758516f3939666b586361](https://camo.githubusercontent.com/8b2ae54c1de6c1b24d9080d2a50a68141f7f57252803543c30cc69cdd4b82fa1/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f784d50644159634b76496c7a59615f3351586a5561413f613d354748716b387a7939566d523255565a315a38746454627373304a7553335951327758516f3939666b586361)

### React 18 中的 SSR

```jsx
<Layout>
  <NavBar />
  <Sidebar />
  <RightPane>
    <Post />
    <Suspense fallback={<Spinner />}>
      <Comments />
    </Suspense>
  </RightPane>
</Layout>
```

將 `<Comments />` 放到 `<Suspense/>` 中， 就是告訴 React，不用等 `<Comments />` 裡的東西。

[https://camo.githubusercontent.com/484be91b06f3f998b3bda9ba3efbdb514394ab70484a8db2cf5774e32f85a2b8/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f704e6550316c4253546261616162726c4c71707178413f613d716d636f563745617955486e6e69433643586771456961564a52637145416f56726b39666e4e564646766361](https://camo.githubusercontent.com/484be91b06f3f998b3bda9ba3efbdb514394ab70484a8db2cf5774e32f85a2b8/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f704e6550316c4253546261616162726c4c71707178413f613d716d636f563745617955486e6e69433643586771456961564a52637145416f56726b39666e4e564646766361)

![https://camo.githubusercontent.com/e44ee4be56e56e74da3b9f7f5519ca6197b24e9c34488df933140950f1b31c38/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f534f76496e4f2d73625973566d5166334159372d52413f613d675a6461346957316f5061434668644e36414f48695a396255644e78715373547a7a42326c32686b744a3061](https://camo.githubusercontent.com/e44ee4be56e56e74da3b9f7f5519ca6197b24e9c34488df933140950f1b31c38/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f534f76496e4f2d73625973566d5166334159372d52413f613d675a6461346957316f5061434668644e36414f48695a396255644e78715373547a7a42326c32686b744a3061)

另外在 client 端也可以加入 `lazy` 來讓前端的 code 是分段載入的，而不是一大包。

```jsx
import { lazy } from 'react';

const Comments = lazy(() => import('./Comments.js'));

// ...

<Suspense fallback={<Spinner />}>
  <Comments />
</Suspense>
```

![https://camo.githubusercontent.com/4892961ac26f8b8dacbd53189a8d3fd1b076aa16fe451f8e2723528f51b80f66/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f304e6c6c3853617732454247793038657149635f59413f613d6a396751444e57613061306c725061516467356f5a56775077774a357a416f39684c31733349523131636f61](https://camo.githubusercontent.com/4892961ac26f8b8dacbd53189a8d3fd1b076aa16fe451f8e2723528f51b80f66/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f304e6c6c3853617732454247793038657149635f59413f613d6a396751444e57613061306c725061516467356f5a56775077774a357a416f39684c31733349523131636f61)

![https://camo.githubusercontent.com/8b2ae54c1de6c1b24d9080d2a50a68141f7f57252803543c30cc69cdd4b82fa1/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f784d50644159634b76496c7a59615f3351586a5561413f613d354748716b387a7939566d523255565a315a38746454627373304a7553335951327758516f3939666b586361](https://camo.githubusercontent.com/8b2ae54c1de6c1b24d9080d2a50a68141f7f57252803543c30cc69cdd4b82fa1/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f784d50644159634b76496c7a59615f3351586a5561413f613d354748716b387a7939566d523255565a315a38746454627373304a7553335951327758516f3939666b586361)

## 心得

以上就是 React 18 計畫裡提到的三個新功能，看起來都是加入了 fiber 以後，讓 react render 變得更有彈性，所以在做功能時可能要想到耦合度不要太高，能夠功能區塊切割完整的話，未來才能享用這些新功能。
