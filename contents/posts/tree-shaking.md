---
title: "Tree-Shaking"

tags: tree-shaking, webpack, rollup

category: Engineering

excerpt: 經常在打包的時候聽到，引入了 Tree-Shaking 來減少 bundle size。且每次談到打包的性能優化時，總會提到這個詞，那麼到底什麼是 Tree Shaking 呢？

date: 2021-10-13

image: ./images/tree-shaking-code-splitting-webpack-1.png

image_caption: tree-shaking

author: author1

slug: tree-shaking
---

## Rich Harris 和他的 Rollup

知名的 [rollup.js](https://github.com/rollup/rollup) 的作者 Rich Harris 在 2015 年 12 月的一篇 blog **[[Tree-shaking versus dead code elimination]](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80)** 中首次提到了 Tree-Shaking 的概念。

> I’ve been working (albeit sporadically of late, admittedly) on a tool called Rollup, which bundles together JavaScript modules. One of its features is tree-shaking, by which I mean that it only includes the bits of code your bundle actually needs to run.
> 

Rich Harris 在文中提到 Tree-Shaking 是為了 [Dead code elimination](https://en.wikipedia.org/wiki/Dead_code_elimination) ，這是常見的 [compiler optimization](https://en.wikipedia.org/wiki/Compiler_optimization) 優化方式，簡單來說就是消除無用的 code。那麼什麼是 `Dead code` 呢？

## Dead code

`Dead code` 包含以下：

- unreachable code - 永遠不會被執行到的 code
- dead variables - 宣告了但永遠不會被讀取的變數

舉例來說，以下這段 `return` 之後的 code 就永遠不會被執行到，然後 `b` 宣告了卻沒人用它。

```jsx
function foo() {
	const a = 24;
	const b = 25; // dead variables
	const c = a * 4;
	return c;
	b = 24; // unreachable code
	return 0;
}
```

需要注意的是，如果 module 宣告了未被使用，也可以看做 `Dead code` ，比如下面的 `bar` module。

```jsx
// foo.js
function foo() {
	console.log('foo');
}
export default foo;

// bar.js
function bar() {
	console.log('bar');
}
export default bar;

// index.js
import foo from './foo.js';
import bar from './bar.js';
foo()

// 雖然有引入bar，但並未使用
```

Dead code 我們知道了，那麼 Tree-Shaking 呢？

在傳統的靜態語言中，complier 可以判斷出某些程式根本不影響輸出，所以我們可以借助 compiler 來幫忙把 Dead code 刪除。但 JavaScript 是動態語言，compiler 無法幫我們完成，所以得自己實現 `Dead code elimination` 。

我們平常說的 Tree-Shaking 就是 dce 的一種實現，借助於 ES Module，來消除無用的 module。

## ECMA Script 6 module

JavaScript 的模組化經歷過一個漫長的發展過程，在最一開始 JavaScript 是沒有模組化概念的，我們只能借助閉包來讓，後來社群出現了以 [RequireJS](https://github.com/requirejs/requirejs) 為代表的 AMD 規範，和以 [Sea.js](https://github.com/seajs/seajs) 為代表的 CMD 規範，Nodejs server 端也出現了 [CommonJS](https://nodejs.org/docs/latest/api/modules.html) 規範，再來 ES6 之後原生引入了 ES Module，取代了社群方案成為了瀏覽器端統一的解決方案。

- ES Module 輸出的是值的引用，而 CommonJS 輸出的是複製
- ES Module 是編譯時執行，而 CommonJS 則是在運行時載入

所以 ES Module 最大的特點就是靜態化，在編譯時就能確定模組的依賴關係，以及輸入輸出的值。這也代表了依賴關係是確定的，所以就讓 Tree-Shaking 成為可能。這也是為什麼 rollup 和 webpack  都要用 ES Module 才能支援 Tree-Shaking

## Tree-Shaking

藉由 ES Module 的靜態結構，透過編譯階段的靜態分析，找到沒有引入的模組並做標記，到了壓縮階段利用像 `uglift-js` 這樣的壓縮工具刪除這些沒用到的模組。

以 `webpack` 為例，驗證一下：

新建資料夾並且初始化檔案，並安裝最新的 `webpack` 

```jsx
$ mkdir tree-shaking && cd tree-shaking
$ npm init -y
$ npm i webpack webpack-cli -D
```

新增個 webpack config以及入口 `index.js` 以及 `math.js` 模組

```jsx
// webpack.config.js
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    // 开启 usedExports  收集 Dead code 相关的信息
    usedExports: true,
  },
};

// src/math.js
export function square(x) {
  return x * x;
}

export function cube(x) {
  var a, b, c; // 这里引入了三个未使用的变量作为 Dead code 的一种
  return x * x * x;
}

// src/index.js
import { cube } from "./math.js";

function component() {
  var element = document.createElement("pre");
  element.innerHTML = "5 cubed is equal to " + cube(5);
  return element;
}

document.body.appendChild(component());
```

執行 webpack 打包指令，然後觀察包出來的 `bundle.js` 中 `math.js` 的 code 。

```jsx
/***/ "./src/math.js":
/*!*********************!*\
  !*** ./src/math.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cube\": () => (/* binding */ cube)\n/* harmony export */ });\n/* unused harmony export square */\nfunction square(x) {\r\n  return x * x;\r\n}\r\n\r\nfunction cube(x) {\r\n  var a, b, c;\r\n  return x * x * x;\r\n}\r\n\n\n//# sourceURL=webpack://tree-shaking/./src/math.js?");

/***/ })
```

將 eval 裡面的內容提取出來比較好閱讀：

```jsx
/* harmony export */
__webpack_require__.d(__webpack_exports__, {
  /* harmony export */
  cube: () => /* binding */ cube /* harmony export */,
});
/* unused harmony export square */
function square(x) {
  return x * x;
}
function cube(x) {
  var a, b, c;
  return x * x * x;
}
```

可以發現， `__webpack_exports__` 只導出了 `cube` 函數，沒用到的 `square` 並沒有被導出，並且多了 `/* unused harmony exprot square */` 的註解，但 `cube` 裏面沒用到的 `a, b, c` 還是被打包了。從這邊就可以理解 `webpack` 可以通過 Tree-Shaking 找出未使用的模組，但並不會刪除 Dead code。

接著將 `mode` 切換到 `production` 已啟用 `uglify-js` 進行壓縮，然後再次執行打包指令。

```jsx
(() => {
  "use strict";
  var e, t;
  document.body.appendChild(
    (((t = document.createElement("pre")).innerHTML =
      "5 cubed is equal to " + (e = 5) * e * e),
    t)
  );
})();
```

結果如當初預期一樣， `uglify-js` 在壓縮的同時刪除了 `Dead code` :

- 未使用的 `square` 函數
- 未使用的 `a, b, c`

## 結論

從 ES Module 的角度來理解 Tree-Shaking，因為 JavaScript 是動態語言，原本的模組載入方式打包工具無法判斷 code 裡面是否有用到模組，所以只能全部打包起來，而改用 ES Module 之後，打包工具就能在編譯時判斷並找出未使用的模組，並將其 Tree-Shaking。而也經由實驗得知，將 Dead code 移除是 `uglify-js` 做的而不是打包工具。