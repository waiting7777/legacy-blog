---
title: "React Conf 2021 - React Develop Tooling"

tags: React

category: Engineering

excerpt: React Conf 2021 剛結束，來分享看完 React Develop Tooling 的心得。

date: 2021-12-13

image: ./images/react-conf.png

image_caption: react-conf

author: author1

slug: react-conf-2021-react-develop-tooling
---

## Hooks name

![deployment-pipeline-dark.png](./images/react-conf-1.png)

在目前的版本，react tool 並沒辦法顯示 hook 的 “name”，所以 hook 在 dev tool 裡面看起來都一樣還要看他的 state 來得知是哪一個。

![deployment-pipeline-dark.png](./images/react-conf-2.png)

那麼什麼是 hook 的 “name” 呢？當大家提起 hook 的時候，通常說的是他的變數名稱。

![deployment-pipeline-dark.png](./images/react-conf-3.png)

所以 devtool 從 source map 取得 source code 然後 parse 出變數名稱來顯示。

## Timeline

![deployment-pipeline-dark.png](./images/react-conf-4.png)

React devtool 新增了 timeline 區塊，看請來就像瀏覽器效能工具，但跟瀏覽器效能工具不同的是，react devtool 提供了更詳細的訊息以及建議。

```
function App() {
  const [text, setText] = useState("")
  
  const updateText = event => {
    setText(event.target.value)
  }
  
  return (
    <>
      <input value={text} onChange={updateText} />
      <FilteredList filterBy={text} />
    </>
  )
}
```

這是一個由 `text` 控制的 input 以及一個 list，在打字並擷取後看一下 timeline

![deployment-pipeline-dark.png](./images/react-conf-5.png)

當打字時，因為 input 跟 list 要同時更新，所以整個更新時間總和會比較長，這時候 devtool 就建議我們將這個更新分開。

這時就可以用 react 18 裡面的新 hook `useDeferredValue`

```
function App() {
  const [text, setText] = useState("")
  const deferredText = useDeferredValue(text)
  
  const updateText = event => {
    setText(event.target.value)
  }
  
  return (
    <>
      <input value={text} onChange={updateText} />
      <FilteredList filterBy={deferredText} />
    </>
  )
}
```

這 hook 接收一個 value 並且回傳一個稍微滯後(優先級較低)版本的值，這樣就可以把 input 跟 list 的更新分開，讓 input 的更新比較即時，然後比較昂貴的 list 更新稍微延後一些讓整體體驗更好。

![deployment-pipeline-dark.png](./images/react-conf-6.png)

在圖中就可以看到 input 跟 list 的更新分開了。

## Timeline - Suspense

Suspense 是新的 API ，可以告訴 react 需要等待一些東西，而在 devtool 中同樣也會紀錄 Suspense 的狀態並且顯示在 Timeline 中。

![deployment-pipeline-dark.png](./images/react-conf-7.png)

## Timeline - Browser context

如果有個情境，應用程式要從外部拿取 json 並且執行昂貴的 parse 後才把資料存回 react 中，就算上述所說行為都在 render 之外，Timeline 同樣可以展示發生了什麼。

![deployment-pipeline-dark.png](./images/react-conf-8.png)

## What’s next?

* Profiler 和 Timeline 的整合
* React Native 的 profiling, inspecting, debugging
* Server Component 的使用

## 總結
在 `React Developer Tooling` 這 stage 算是一種火力展示吧，但 `hook name` 這功能看起來 parse source code 蠻花時間的，所以是給個按鈕按了才展示，同時也見識到了 `useDeferredValue` 的使用場景，期望新的 tool 可以在 coding 上給予更多的幫助。

## Reference
[React Conf 2021](https://conf.reactjs.org/stage)

