---
title: "React Conf 2021 - React Forget"

tags: React

category: Engineering

excerpt: 本次 Conference 另一個覺得有趣的主題是 React Forget，目的在於讓 react 可以自動解析並且把 component memo 起來。

date: 2021-12-20

image: ./images/react-conf.png

image_caption: react-conf

author: author1

slug: react-conf-2021-react-forget
---

![deployment-pipeline-dark.png](./images/react-conf-2-1.png)

Memo
Memorization，在 react 中因為當 component 有改變時，都會觸發 re-render，所以需要把一些 component memo 起來或是把 handler `useCallback` 起來 – 把過去運算的結果直接拿來用，這樣才能提高效能達到較好的用戶體驗。

舉個例子：

![deployment-pipeline-dark.png](./images/react-conf-2-2.png)

```
function TodoList() {
  const [todos, setTodos] = useState(initialTodos)
  const handleChange = todo => setTodos(todos => getUpdated(todos, todo))
  
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} onChange={handleChange} />
        ))}
      </ul>
      <AddTodo setTodos={setTodos} />
    </div>
  )
}
```
這是一段常見的 Todo List ，code 看起來也很簡單，但每次 新增 / 修改 `Todo` 的時候，都會觸發大量的 re-render。

![deployment-pipeline-dark.png](./images/react-conf-2-3.png)

所以我們通常會用 `memo` 與 `useCallback`
```
const Todo = React.memo(UnmemoizedTodo)

function TodoList() {
  const [todos, setTodos] = useState(initialTodos)
  const handleChange = useCallback(
    todo => setTodos(todos => getUpdated(todos, todo)),
    []
  )
  
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} onChange={handleChange} />
        ))}
      </ul>
      <AddTodo setTodos={setTodos} />
    </div>
  )
}
```
但如果今天我們要新增一些功能，像是可以 `filter` 可以調 `color` 等等之類的功能呢？

隨著功能及 code base 的增大，到最後可能會變得非常可怕。

![deployment-pipeline-dark.png](./images/react-conf-2-3.png)

新增東西的時候得保持狀態被 `memo` 然後又不能破壞 dependency 不然 `memo` 就失效了。

## Re-Think
如果在沒有 `memo` hook 的情況下，應該如何寫我們的 code?
```
function TodoList({ visibility, themeColor }) {
  const [todos, setTodos] = useState(initialTodos)
  
  let hasVisibilityChnaged, hasThemeColorChanged, hasTodoChanged, memoCache
  
  const handleChange = memoCache[0] || (memoCache[0] = todo => setTodos(todos => getUpdated(todos, todo)))
  
  let filtered
  if (hasVisibilityChanged || hasTodosChanged) {
    filter = memoCache[1] = getFiltered(todos, visibility)
  } else {
    filter = memoCache[1]
  }
  
  return (
    <div>
      <ul>
        {filtered.map(todo => (
          <Todo key={todo.id} todo={todo} onChange={handleChange} />
        ))}
      </ul>
      <AddTodo setTodos={setTodos} themeColor={themeColor} />
    </div>
  )
}
```
這邊解構了 `memo` 、 `useCallback` 來理解這些 hook 到底都做了什麼，本質上就是檢查變數有沒有變化，然後新增變化到緩存，或是直接使用緩存。

那麼有沒有機會也緩存整個 `jsx` 呢？

```
function TodoList({ visibility, themeColor }) {
  const [todos, setTodos] = useState(initialTodos)
  
  let hasVisibilityChanged, hasThemeColorChanged, hasTodosChanged, memoCache
  
  if (hasVisibilityChanged || hasThemeColorChanged || hasTodosChanged) {
    const handleChange = memoCache[0] || (memoCache[0] = todo => setTodos(todos => getUpdated(todos, todo)))
  
    let filtered, jsx_todos
    if (hasVisibilityChanged || hasTodosChanged) {
      filtered = memoCache[1] = getFiltered(todos, visibility)
      jsx_todos = memoCache[2] = (<ul>{filtered.map(...)}</ul>)
    } else {
      filtered = memoCache[1]
      jsx_todos = memoCache[2]
    }
    
    const jsx_addTodo = hasThemeColorChanged
      ? (memoCache[3] = <AddTodo setTodos={setTodos} themeColor={themeColor} />)
      : memoCache[3]
      
    return (memoCache[4] = <div>{jsx_todos}{jsx_addTodos}</div>)
  } else {
    return memoCache[4]
  }
}
```
答案是可以的，本質上一樣式檢查變數有沒有改變，有的話用新的沒有的話用 memoCache 的結果。

## React Forget
如果上面的例子都能讓 compiler 來做，是不是就能大大提升 `開發體驗` 了？

這就是 React Fotget 要做的事情，目的是要透過 compiler 來消除所有的 `memo` 跟 `dep` 讓開發者更專注在開發功能上面。

但目前還沒完全解決問題，在某些 edge case 會增加 bundle size 或是會 compiler 失敗，所以就繼續觀察吧。

## 結論
剛從 vue 轉來 react 的時候真的覺得很奇怪，為啥要自己添加一堆奇怪的東西來保證效能，這些事情重複又麻煩，尤其是隨著頁面越來越複雜，就會如同上面的圖一樣，要整個搞清楚依賴關係，並且確認 memo 是有作用的進而來保證使用者體驗，現在終於有機會擺脫(?)，這狀況了。雖然對於要寫出完美通解保持存疑，但如果能保證大部分的情況可以不用手動添加 `memo` 或許也就足夠了。

## Reference
[React without memo](https://www.youtube.com/watch?v=lGEMwh32soc)
[React Conf 2021](https://conf.reactjs.org/stage)

