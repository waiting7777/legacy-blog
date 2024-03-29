---
title: How to construct svg icon system in Vue

tags: Javascript, Vue

category: Engineering

excerpt: 如何在自己的 Vue app 裡面，建構完整的 svg icon 系統。

date: 2020-05-25

image: ./images/vue-icon-system.jpeg

image_caption: vue-icon-system

author: author1

slug: how-to-construct-svg-icon-system-in-vue
---

## What is SVG

SVG(Scalable Vector Graphics) 是一種 xml 格式的向量圖型，因為是向量所以定義好線條以後，各種解析度都能正常顯示，不會有一般圖片放大模糊的問題，而且檔案大小也比一般圖檔來的小。此外 svg 本身就像是 html 的 tag，所以可以直接拿來當 vue 的 component。

## SVG Icon in Vue

```
<template>
  <svg viewBox="0 0 156.189 137.062" class="icon" width="30">
    <path d="M141.415 92.083L112.571 9.125H45.919c-2.857 3.56-27.783 71.83-30.164 82.597 1.053 1.682 3.213.484 4.56 1.648 2.935 3.967 4.902 8.434 6.706 13.099-2.847 1.997-5.381 1.206-7.33.88-2.365-1.525-2.616-3.781-4.167-5.328-3.157-2.204-6.992-.41-10.394-1.08-1.353-1.906-.855-3.66-.172-5.383 6.983-17.609 12.688-35.674 19.068-53.499 4.475-12.501 8.626-25.117 12.93-37.68.482-1.406.738-2.927 2.278-4.33h33.634l5.131 4.45C80.612 3.883 81.54 1.306 84.351 0h33.155c1.359.76 1.918 1.583 2.244 2.549a87777.877 87777.877 0 0132.533 96.271c.205.606-.052 1.317-.912 2.12-2.7.621-5.928-.729-8.681.371-2.346 1.225-2.54 3.744-4.177 5.356-2.548 1.267-5.16 1.774-8.09-.298 1.471-3.807 2.861-7.498 4.325-11.16 1.067-2.663 3.842-2.198 6.667-3.126z"></path>
    <path d="M78.167 88.675c5.487 5.936 10.41 11.497 14.977 17.691-3.192 2.274-6.306 1.223-8.987 1.102-2.666-1.291-3.568-3.883-5.652-5.666-3.678 3.035-5.929 6.951-8.659 10.382-6.128 7.7-4.048 7.583-15.191 7.55-5.665-.016-11.33-.014-16.994.011-1.473.007-2.983-.206-4.594.425.406 2.282 1.559 4.08 2.921 6.206h85.483c1.995-2.901 1.995-2.901 2.337-5.884-1.61-1.248-3.511-.715-5.282-.723-11.33-.053-22.662-.201-33.986.037-4.901.104-8.189-1.984-10.995-5.783.957-2.494 2.734-4.076 4.646-5.164 2.308-.133 3.093 1.771 5.079 2.553h57.932c2.344-1.409 2.294-4.445 4.371-6.197 2.65-.735 5.406-.696 8.164-.07 1.543 2.018 2.153 4.192 2.452 6.287-1.263 2.258-3.675.879-5.008 2.152-2.114 1.341-2.134 4.174-4.821 6.129h-18.092c-1.433 3.672-2.404 7.051-4.486 9.578-1.862.896-3.553.588-5.197.607-6.365.079-6.365.062-8.918 5.764-.892.918-2.043.998-3.227 1.061-13.803.723-54.518.209-58.346-.747-1.779-1.159-2.021-3.412-3.396-4.852-3.157-2.276-6.9-.521-10.447-1.626-2.481-2.34-3.08-5.965-5.059-9.354-6.163-1.054-12.675.087-18.715-.571-2.475-1.751-2.334-4.839-4-5.948-2.37-1.35-4.482 1.021-6.423-1-.358-2.455 1.181-4.551 1.89-6.883 3.07-1.725 6.232-.826 9.172-.831 2.293 1.427 2.866 3.799 3.932 5.767 3.646 1.103 34.547 1.496 44.192.541 7.032-6.421 11.729-15.235 18.927-22.544zm29.723 42.164c-.431-.887-1.301-.887-2.11-.888-18.114-.011-36.229-.011-54.342.005-.998 0-2.027.094-2.45 1.285.381 2.553 2.33 2.399 4.177 2.399 16.618.001 33.236-.001 49.855-.003 1.336 0 2.672-.035 3.854-.771.728-.45 1.335-.995 1.016-2.027z"></path>
    <path d="M133.313 86.454c-2.323 6.989-5.354 13.446-7.988 19.476-1.665 1.445-3.108 1.779-4.637 1.788-5.492.03-10.986.028-16.479.053-2.781.013-4.572-1.604-6.227-3.587A3030.435 3030.435 0 0081.31 84.371c-.74-.872-1.678-1.578-2.682-2.507-3.349 1.676-4.845 4.988-7 7.576-4.138 4.967-7.984 10.178-11.918 15.312-1.415 1.848-3.265 2.889-5.543 2.909-6.975.062-13.951.022-20.751.022-3.763-3.445-4.064-8.264-6.247-12.114-.973-1.716-1.438-3.714-2.194-5.56-.994-2.426-.957-4.846-.163-7.309 2.034-6.307 3.891-12.675 6.101-18.918 4.867-13.747 9.437-27.587 13.776-41.509 1.078-3.457 2.15-6.964 4.329-10.306h58.595c2.645 3.155 20.639 55.389 25.7 74.487zm-30.315 17.937h19.458l7.65-18.14-23.758-70.354c-18.178-.631-35.973.497-53.537-.746-1.968 1.262-2.863 2.833-3.505 4.88-2.931 9.347-5.894 18.693-9.22 27.904-4.292 11.882-8.174 23.897-12.206 35.864-.676 2.007-.313 3.843.41 5.812 1.375 3.744 3.447 7.203 4.391 11.129.347 1.445 1.314 2.67 2.686 3.699h19.732c8.583-8.734 14.619-19.37 23.311-28.459 8.897 9.425 15.772 19.668 24.588 28.411z"></path>
  </svg>
</template>
```
如同其他的 Vue template file 一樣，直接把 svg icon 的 tag 貼上，就是一個 svg 的 vue component。這樣就可以在其他的 page / compoent 中直接引入這個 "component" 來使用這個 svg icon。

## 如何做出如同 font awesome 的 icon library？

如同前問所敘，我們現在已經擁有一系列的 svg icon Vue template，那麼當 icon 的量越來越多時，或是一個頁面同時用上了多種 icon ，難到還要一個一個引入成 component 嗎？我用的辦法是，先指定一個資料夾，裡面全部放的都是 svg icon，然後跑一個 vue plugin 的 js。
```
import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context(
  // Look for files in the current directory
  "@/components/icons",
  // Do not look in subdirectories
  false,
  // Only include "_base-" prefixed .vue files
  /[\w-]+\.vue$/
);

// For each matching file name...
requireComponent.keys().forEach(fileName => {
  // Get the component config
  const componentConfig = requireComponent(fileName);
  // Get the PascalCase version of the component name
  const componentName = upperFirst(
    camelCase(
      fileName
        // Remove the "./_" from the beginning
        .replace(/^\.\/_/, "")
        // Remove the file extension from the end
        .replace(/\.\w+$/, "")
    )
  );
  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig);
});
```
這個範例中，我把 '@/components/icons' 裡面所有的 vue 檔案都註冊成 component，這樣未來無論要新增什麼 icon 就把 svg template 往那個資料夾塞就好。

```
<template>
  <component :is="icon" />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>
```
最後再用 vue 的特殊 component tag 來達成動態指定所需的 svg icon，如此一來在我整個 Vue app 裡面只要如同下面一般簡潔就能呼叫出各式各樣的 icon 了。

```
<Icon icon="LogoA" />
<Icon icon="LogoB" />
<Icon icon="LogoC" />
```
