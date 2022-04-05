---
title: 初探 Vue 3.0 中的 Proxy

tags: Javascript, Vue

category: Engineering

excerpt: Vue 3.0 中有個改進是：將使用更快的原生 Proxy 來取代原本的 Object.defineProperty，那麼就來看看 proxy 是什麼吧！

date: 2020-06-30

image: ./images/proxy.png

image_caption: proxy

author: author1

slug: 初探-vue-3-0-中的-proxy
---

## Proxy

什麼是 **Proxy** ? 來看看 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy):
```javascript
const p = new Proxy(target, handler)
```
簡單的說就是在原本的 `target` 上設置 proxy ，你對 `target` 的操作如果符合 `handler` 的鉤子那就會先在 `handler` 中處理。
例如：

```javascript
const target = {}
const handler = {
    get: function(obj, prop) {
        return prop in obj ? obj[prop] : 37
    }
}

const p = new Proxy(target, handler)
p.a = 1
p.b = 'test'

console.log(p.a, p.b)  // 1, 'test'
console.log(p.c)       // 37
console.log(a.c)       // undefined

console.log(target)    // { a: 1, b: 'test' }
```

在這例子中，有個對象 object，以及一個只有 `get` 的 handler 他會檢查 object 有沒有 prop，沒有的話就印 37，所以 `p.c` 才會印出 37，而其他對 `p.a` `p.b` 的操作都跟原本一樣，且對 `proxy` 的操作也會轉到原本的 `target` 上面。

目前 `proxy` 支援的攔截總共有 13 種，請看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler)

## Vue 2.x 是如何實現 Data Reactive

遍歷撈完 `data` 中的數據，使用 `Object.defineProperty()` 劫持 getter 和 setter，在 getter 中做數據依賴的收集處理，
在 setter 中監聽數據變化，並通知訂閱當前數據的地方。[Source Code](https://github.com/vuejs/vue/blob/dev/src/core/observer/index.js#L156-L193)
```javascript
let childOb = !shallow && observe(val)
Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
        const value = getter ? getter.call(obj) : val
        if (Dep.target) {
        dep.depend()
        if (childOb) {
            childOb.dep.depend()
            if (Array.isArray(value)) {
            dependArray(value)
            }
        }
        }
        return value
    },
    set: function reactiveSetter (newVal) {
        const value = getter ? getter.call(obj) : val
        /* eslint-disable no-self-compare */
        if (newVal === value || (newVal !== newVal && value !== value)) {
        return
        }
        /* eslint-enable no-self-compare */
        if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
        }
        // #7981: for accessor properties without setter
        if (getter && !setter) return
        if (setter) {
        setter.call(obj, newVal)
        } else {
        val = newVal
        }
        childOb = !shallow && observe(newVal)
        dep.notify()
    }
})
```

這樣做有啥問題呢？

- 無法檢測 object property 的添加或移除。由於 Vue 會在初始化的時候針對 object property 執行 getter/setter 轉化，所以 property 必須在 `data` 對象上存在才能轉換為響應式，對於後來新增的屬性，就要用 `vm.$set`。

- 對於 `array` vue 也有其限制，
    1. 當你利用索引直接設置值時，`vm.items[indexOfItem] = newValue`
    2. 當你直接修改 `array` 長度時，`vm.items.length = newLength`
    
  這兩種情況都不會觸發響應的更新。

- 當需要綁定的 `object` 很大時，因為需要遍歷搜索整個 `object` 可能導致效能問題。

## Vue 3.0 中使用了 Proxy

下面分別用 `Object.definePropety()` 和 `Proxy` 實現數據響應

使用 `Object.defineProperty()`:
```javascript
class Observer {
    constructor(data) {
        for(let key of Object.keys(data)) {
            if(typeof data[key] === 'object') {
                data[key] = new Observer(data[key]);
            }
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    console.log('你訪問了' + key);
                    return data[key];
                },
                set(newVal) {
                    console.log('你設置了' + key);
                    console.log('新的' + key + '=' + newVal);
                    if(newVal === data[key]) {
                        return;
                    }
                    data[key] = newVal;
                }
            })
        }
    }
}

const obj = {
    name: 'app',
    age: '18',
    a: {
        b: 1,
        c: 2,
    },
}
const app = new Observer(obj);
app.age = 20; // 你設置了 age, 新的 age = 20
console.log(app.age); //  你訪問了 age, 20
app.newPropKey = '新屬性'; 
console.log(app.newPropKey); // 新屬性
```
看輸出可以得知，新屬性並沒有得到前面設置的 `get()` 跟 `set()` ，這也就是剛剛所說 Vue 2.x 的問題。

接下來看看 `Proxy` 版本：
```javascript
const obj = {
    name: 'app',
    age: '18',
    a: {
        b: 1,
        c: 2,
    },
}
const p = new Proxy(obj, {
    get(target, propKey, receiver) {
        console.log('你訪問了' + propKey);
        return Reflect.get(target, propKey, receiver);
    },
    set(target, propKey, value, receiver) {
        console.log('你設置了' + propKey);
        console.log('新的' + propKey + '=' + value);
        Reflect.set(target, propKey, value, receiver);
    }
});
p.age = '20'; // 你設置了 age, 新的 age=20
console.log(p.age); // 你訪問了 age, 20
p.newPropKey = '新属性'; // 你設置了 newPropKey, 新的 newPropKey=新屬性
console.log(p.newPropKey); // 你訪問了 newPropKey, 新屬性
```
可以看到，新增的屬性並不需要重新設定數據響應，這是因為針對 `Proxy` 的操作本來就都會走到 `handler` 裡面做處理。

## 總結
- `Proxy` 是用來操作物件的，而 `Object.defineProperty()` 是用來操作物件屬性的。

- 在 Vue 3 中用了 `Proxy` 來更優雅的完成數據響應，也解決了 Vue 2.x 中的問題。

- 聽說 Vue 3 正式版在今年8月就會正式上線了。