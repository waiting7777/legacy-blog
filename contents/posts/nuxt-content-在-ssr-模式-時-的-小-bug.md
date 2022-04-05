---
title: Nuxt Content 在 ssr 模式時的小 bug

tags: Javascript, Vue, NuxtJS

category: Engineering

excerpt: 在用 Nuxt Content 時，如果是 ssr mode，server 端會報錯，那麼該如何修復呢？

date: 2020-10-29

image: ./images/nuxt-content.png

image_caption: nuxt-content

author: author1

slug: nuxt-content-在-ssr-模式-時-的-小-bug
---

## 當前版本 @nuxt/content 1.10

在此版本的 `@nuxt/content``，用 ssr 模式下會出現錯誤 `UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'length' of undefined`，只是 warning 而已，並不影響正常使用，或許也是因為這原因所以官方目前還未修正。

## 發生原因

發生的原因要看 `@nuxt/content` 的原始碼，在他的 `lib/ws.js` 中
```
const WebSocket = require('ws')

constructor (options) {
    super()
    this.wss = new WebSocket.Server({ noServer: true })
    this.hook('upgrade', (request, socket, head) => {
      if (request.url === `/${options.apiPrefix}/ws`) {
        this.handleUpgrade(request, socket, head)
      }
    })
}
serve (req) {
    this.handleUpgrade(req, req.socket, undefined)
}

handleUpgrade (request, socket, head) {
    return this.wss.handleUpgrade(request, socket, head, (client) => {
        this.wss.emit('connection', client, request)
    })
}
```
可以看出它用了 ws 的 npm module 並且呼叫了 handleUpgrade，而在這 handle 中如果沒資料期望會是空陣列 `[]` 而不是 `undefined` 所以就報錯了。

## 修復辦法

1. 把 `@nuxt/content` 的 `lib/ws.js` 修復，把 `serve (req) { this.handleUpgrade(req, req.socket, undefined) }` 改成 `serve (req) { this.handleUpgrade(req, req.socket, []) }`，這樣即可，缺點為因為是直接修改 `node_modeules` 所以當你有任何安裝/更新 modules 時，這段都會被還原，需要再次修改。

2. 在自己的 `server/index.js` 中，增加一段 `process.on('unhandledRejection', (error) => {})`，這屬於眼不見為淨的方法ＸＤ