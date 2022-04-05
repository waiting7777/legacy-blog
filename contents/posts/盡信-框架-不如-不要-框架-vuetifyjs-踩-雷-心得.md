---
title: 盡信框架，不如不要框架，vuetifyjs 踩雷心得。

tags: Javascript, Vue

category: Engineering

excerpt: 因為公司案子使用了 vuetifyjs 這個 css framework，卻遇到了麻煩的效能問題，就做了個實驗來驗證，到底用框架會遇到啥問題。

date: 2020-05-27

image: ./images/vuetify.jpg

image_caption: vuetify

author: author1

slug: 盡信-框架-不如-不要-框架-vuetifyjs-踩-雷-心得
---

由於公司業務需求，有個頁面需要 200 個左右的 checkbox，本來這個數量我覺得還好，結果實作出來後，卻導致了明顯有感的效能問題(畫面卡頓)，經過逐個測試排查後，發現問題在於用了 <v-checkbox /> 這個 component 造成的，那麼接下來就做一系列的實驗證明是它以及最後如何解決吧。

## 實驗環境

為了不讓其它套件干擾減少變因，採用 vue-cli 新建專案來測試

```
vue create vuetify-test
```

並且安裝上 vuetifyjs

```
vue add vuetifyjs
```

![vue-vuetify](/images/vue-vuetify.png)

如此一來一個 vuetify 的初始模板就已完成，接著我選擇的測量方式為：以一個 object array 存 id 跟 value ，用 v-for 畫一整排，然後在 create 的時候紀錄一次時間，在 mounted 之後也紀錄一次時間，測量一個頁面從 create 到 mounted 所花的時間來當作這次的測試目標。變因爲：

1. 用 v-checkbox v-simple-checkbox 或是用原生

2. 產生的數量 10, 100, 500, 1000

範例 code 如下：

```
<template>
  <div class="container">
    <div>Time diff: {{ diff }} ms</div>
    <div v-for="t in test" :key="t.id">
      <v-checkbox v-model="t.value"></v-checkbox>
      <v-simple-checkbox v-model="t.value" :ripple="false"></v-simple-checkbox>
      <input type="checkbox" v-model="t.value" />
    </div>
  </div>
</template>

<script>
import { range } from 'lodash'
export default {
  name: 'App',
  data() {
    return {
      test: range(10).map(v => { return { id: v, value: false }}),
      create: 0,
      mount: 0,
      diff: 0
    }
  },
  created() {
    this.create = new Date().getTime()
  },
  mounted() {
    this.mount = new Date().getTime()
    this.diff = this.mount - this.create
  }
};
</script>
```

## 實驗記錄

Compoent \ Times     | 10  | 100 | 500 | 1000 |
--------------|:-----:|-----:| ----:|----:|
v-checkbox    | 30ms |  192ms |    800ms | 1333ms |
v-simple-checkbox    | 10ms |  52ms |  220ms | 370ms |
native  | 3ms | 5ms |  20ms | 45ms |

## 實驗心得

從實驗記錄中可以發現，用 v-checkbox 在數量少的時候，差距還算小感覺不出來的情況(30ms vs 3ms)，這時候用起來可能沒啥問題，但隨著 component 的數量一多，如同實驗中的 100 個 checkbox(192ms vs 5ms) 決定性的差距就出來了，而且這還是在專案很乾淨的情況下，如果專案本身在裝些別的套件，更吃 memory 之後差距就只會更大了... 500 跟 1000 個單純做數據比較而已，如果有頁面需要畫到這麼多個 checkbox ，可能請 pm 改需求比較快 :p。

```
import './VCheckbox.sass'
import '../../styles/components/_selection-controls.sass'

// Components
import VIcon from '../VIcon'
import VInput from '../VInput'

// Mixins
import Selectable from '../../mixins/selectable'

/* @vue/component */
export default Selectable.extend({
  name: 'v-checkbox',

  props: {
    indeterminate: Boolean,
    indeterminateIcon: {
      type: String,
      default: '$checkboxIndeterminate',
    },
    offIcon: {
      type: String,
      default: '$checkboxOff',
    },
    onIcon: {
      type: String,
      default: '$checkboxOn',
    },
  },

  data () {
    return {
      inputIndeterminate: this.indeterminate,
    }
  },

  computed: {
    classes (): object {
      return {
        ...VInput.options.computed.classes.call(this),
        'v-input--selection-controls': true,
        'v-input--checkbox': true,
        'v-input--indeterminate': this.inputIndeterminate,
      }
    },
    computedIcon (): string {
      if (this.inputIndeterminate) {
        return this.indeterminateIcon
      } else if (this.isActive) {
        return this.onIcon
      } else {
        return this.offIcon
      }
    },
    // Do not return undefined if disabled,
    // according to spec, should still show
    // a color when disabled and active
    validationState (): string | undefined {
      if (this.disabled && !this.inputIndeterminate) return undefined
      if (this.hasError && this.shouldValidate) return 'error'
      if (this.hasSuccess) return 'success'
      if (this.hasColor !== null) return this.computedColor
      return undefined
    },
  },

  watch: {
    indeterminate (val) {
      // https://github.com/vuetifyjs/vuetify/issues/8270
      this.$nextTick(() => (this.inputIndeterminate = val))
    },
    inputIndeterminate (val) {
      this.$emit('update:indeterminate', val)
    },
    isActive () {
      if (!this.indeterminate) return
      this.inputIndeterminate = false
    },
  },

  methods: {
    genCheckbox () {
      return this.$createElement('div', {
        staticClass: 'v-input--selection-controls__input',
      }, [
        this.$createElement(VIcon, this.setTextColor(this.validationState, {
          props: {
            dense: this.dense,
            dark: this.dark,
            light: this.light,
          },
        }), this.computedIcon),
        this.genInput('checkbox', {
          ...this.attrs$,
          'aria-checked': this.inputIndeterminate
            ? 'mixed'
            : this.isActive.toString(),
        }),
        this.genRipple(this.setTextColor(this.rippleState)),
      ])
    },
    genDefaultSlot () {
      return [
        this.genCheckbox(),
        this.genLabel(),
      ]
    },
  },
})
```
來爬爬 v-checkbox 的 source code，再加上 mixins 裡面可以看到，有用到大量的 computed 以及 watch，而這些都會造成額外的效能消耗。那麼在量大了之後，就會造成效能問題，

## 結論

在工程技術裡面，通用性跟效能通常是很難兼得的，在這種追求通用性的大框架有時候就會犧牲了效能，所以除了框架能讓你簡單套出結果的同時，千萬別忘記怎麼用手刻基本款，這樣當有特殊需求的時候，才能有辦法處理。

測試code: [github example](https://github.com/waiting7777/vuetify-test)