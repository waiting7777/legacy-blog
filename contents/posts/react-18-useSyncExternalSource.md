---
title: "React 18 - useSyncExternalSource"

tags: React

category: Engineering

excerpt: useMutableSource → useSyncExternalStore 86 之前才介紹過 useMutableSource 這個新 hook，react 18 才beta 而已他就被替換了，那麼到底是啥原因導致必須要換掉它呢？

date: 2022-01-12

image: ./images/react-18.jpeg

image_caption: react

author: author1

slug: react-18-useSyncExternalSource
---

## 當 useMutableSource 遇上 redux

起因在當初 [useMutableSource](https://github.com/reactjs/rfcs/blob/main/text/0147-use-mutable-source.md) 的範例時:

```
import { useSelector } from "react-redux";

function Example() {
  // The user-provided selector should be memoized with useCallback.
  // This will prevent unnecessary re-subscriptions each update.
  // This selector can also use e.g. props values if needed.
  const memoizedSelector = useCallback(state => state.users, []);
  
  // The Redux hook will connect user code to useMutableSource.
  const users = useSelector(memoizedSelector);

  // ...
}
```

原本建議要把 `getSnapshot` 這個 function memoize 起來，不然會導致每次 re-render 的時候都會 re-subscription。

結果這造成了廣泛的討論，有人認為是過早最佳化。

另外一個問題是，在大家現有的 codebase 裏面，早就充滿了使用匿名 function 的 useSelector

```
const todos = useSelector(state => state.todos)

const todo = useSelector(state => selectTodoById(state, id))
```

如果要用新的 `useMutableSource` 要把舊的 redux code 全部都補上 `useCallback` ，實在太辛苦了。

## Concurrent reads, synchronous updates

另一個問題是，在 react 18 之後用 fiber 實作了稱之為最小單位為 fiber 的更新方式，所以一次 render 有可能拆分成多個 fiber，那麼用到外部狀態時問題就來了，有可能前一個 fiber 跟後面一個fiber時 外部狀態已經改變，這時會直接觸發 subsciption 那麼這個 callback 跟 fiber 的順序就變得不可靠。

## useMutableSource → useSyncExternalSource

經過了眾多的討論，為了讓外部 store 的更新是可靠的，最後決定了讓這個更新退回成同步的更新，

在他們新的設計下：

* store change 觸發的更新會是同步的 ， 就算有用 `startTransition`

* 作為交換，built-in 的狀態更新絕對不會被 subscription 蓋掉，就算他們在同個 render 下接收

為了更好的符合這個改動，就決定把原本的 `useMutableSource` 改名了。

## API Overview

```
import {useSyncExternalStore} from 'react';

// We will also publish a backwards compatible shim
// It will prefer the native API, when available
import {useSyncExternalStore} from 'use-sync-external-store/shim';

// Basic usage. getSnapshot must return a cached/memoized result
const state = useSyncExternalStore(store.subscribe, store.getSnapshot);

// Selecting a specific field using an inline getSnapshot
const selectedField = useSyncExternalStore(store.subscribe, () => store.getSnapshot().selectedField);
```

新版的 api 不用告訴它 store 在哪，而是直接告訴它怎麼拿到資料的快照 getSnapshot 。

```
// Name of API is not final
import {useSyncExternalStoreWithSelector} from 'use-sync-external-store/with-selector';
const selection = useSyncExternalStoreWithSelector(
  store.subscribe,
  store.getSnapshot,
  getServerSnapshot,
  selector,
  isEqual
);
```

並且給出了額外的 api 供使用。

結論

目前感覺這個 api 還很不穩定，根據 react conf 目前 Redux 確定會用 `useSyncExternalStore` 改寫，但它們改寫的過程中會不會再遇到問題導致 api 要修改就不得而知了。

另外這次很大一部分問題是 react 18 用了 fiber 後 render 不再 blocking ，當 render 交出控制權的時候，外部資料更新導致到底要如何處理的問題。

參考資料

[https://github.com/reactwg/react-18/discussions/86](https://github.com/reactwg/react-18/discussions/86)
[https://www.zhihu.com/question/502917860](https://www.zhihu.com/question/502917860)
 