---
title: How to build a vue component library

tags: Javascript, Vue

category: Engineering

excerpt: 如果用 vue.js 開發了某個 component ，而希望將它包成 library放到npm讓大家使用的話，到底應該怎麼做呢?

date: 2018-01-19

image: ./images/vue-component.png

image_caption: vue-component

author: author1

slug: how-to-build-a-vue-component-library
---

## Example Component

```
<template>
  <div>{{ display }}</div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
      return {
          time: Date.now()
      }
  },
  computed: {
      display() {
          return moment(this.time).format("HH:mm:ss")
      }
  },
  created() {
      setInterval(() => {
          this.time = Date.now()
      }, 1000)
  }
}
</script>
```

這是一個很簡單的時鐘 component ，<div> 裡面會顯示目前的時間。

## Webpack

接下來就要設定 webpack

```
const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname + '/src/main.js'),
    output: {
        path: path.resolve(__dirname + '/dist/'),
        filename: 'vue-clock.min.js',
        libraryTarget: 'umd',
        library: 'vue-clock',
        umdNamedDefine: true
    },
    externals: {
        moment: 'moment'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: __dirname,
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                loader: 'style!less!css'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: false,
            mangle: true,
            compress: {
                warnings: false
            }
        })
    ]
}
```

比較值得注意的部分是，因為原本 component 裡面有用到 moment.js ，但在包自己的 library 時就希望不要包進去。

```
externals: {
  moment: 'moment'
}
```

## Browser and Node.js Bundle

在 webpack 打包時，是可以指定很多種模塊 ex: AMD, common.js, global… ，這次希望一次包成 browser 跟 node 兩邊可以同時使用的 library，所以在設定上是包成比較通用的 umd module，並且在引入點判斷有無 window 變數，有的話就代表是在 browser 環境。

```
import clock from './Clock.vue'

const Clock = {
    install: function(Vue){
        Vue.component('Clock', clock)
    }

}

export default Clock 

export { Clock }

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Clock)
}
```

## Conclusion

這次試著整理如何將寫好的 component 包成 library ，並且讓就算不用node.js webpack 開發的人，單純瀏覽器引入也能輕鬆使用。

[Live Demo](https://waiting7777.github.io/vue-clock-test/)

[Github](https://github.com/waiting7777/vue-clock-test/)
