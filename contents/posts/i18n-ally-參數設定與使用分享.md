---
title: "i18n-ally 參數設定與使用分享"

tags: tree-shaking, webpack, rollup

category: Engineering

excerpt: 在有做 i18n 的專案裡，通常原始碼用來顯示的字串會呈現 key 的樣子，有時候不是那麼方便閱讀，那麼有什麼好工具可以幫忙的嗎？

date: 2021-10-22

image: ./images/i18n-ally.png

image_caption: tree-shaking

author: author1

slug: i18n-ally-參數設定與使用分享
---

## 使用情境

在有使用 i18n 多國語系的專案中，當需求來時通常只會說 ooo 要改成 xxx ，如果專案是你從頭開始的，或許你很快就能找到對應的 key，但會不會有時候時間久了，或是對專案不夠瞭解，單純從 code 這邊看 key 回推語系字串，是否有時候會有些困擾？

![i18n-ally-1.png](./images/i18n-ally-1.png)

react-intl 使用範例

這時就推薦使用這個 `i18n-ally` 套件。

## 安裝與設定

`i18n-ally` 本身為 vscode 套件，到擴充套件找到它安裝即可。

它本身已經整合了大部分常用的 i18n 套件設定，所以理論上裝完就能使用。但還是大概說明一下常用的參數設定。

打開 vscode 的 `setting.json` 可以看到裡面多了 i18n-ally 開頭的設定

```jsx
"i18n-ally.localesPaths": ["src/assets/lang"]
```

此為告訴套件語系檔案放置的位置，它雖然內置了許多常用設定，但如果專案裡面語系檔案放的位置比較特殊，就必須要告訴套件語系檔的正確位置。

```jsx
"i18n-ally.pathMatcher": "{locale}.{ext}"  // example 1

"i18n-ally.pathMatcher": "package.nls.{locale}.json"  // example 2
```

此為語系檔名的格式， `locale` 為語系 `ext` 為檔名。

```jsx
"i18n-ally.displayLanguage": "zh-TW"
```

此為設定要顯示的語系。

```jsx
"i18n-ally.keystyle": "flat"
```

此為語系檔裡 key 的形式

- `nest` : "aaa":{ "bbb": { "ccc": "ddd" } }
- `flat` : "aaa.bbb.ccc": "ddd"

如果設定正確，且用的是常用的 i18n 套件，那麼應該可以看到結果如下圖：

![截圖 2021-10-22 上午7.31.26.png](./images/i18n-ally-2.png)

在 i18n key 的旁邊出現了翻譯過後的文字，這樣就可以很清楚的知道每個 i18n key 代表的翻譯，甚至有漏掉的也能馬上看出來。

## 自定義格式

那麼問題來了，如果用的是比較不大眾的套件，或是專案裡的 i18n 使用方法有經過包裝導致翻譯跑不出來，這樣又要如何設定呢。

![截圖 2021-10-22 上午7.50.30.png](./images/i18n-ally-3.png)

上圖為專案裡的片段， `msg("dashboard...selectADate")` 為經過包裝的  hook ，用途也是拿 `react-intl` 的 `formatMessage` 做翻譯，但因為不是預設的格式，所以套件不起作用。

這時候就要在專案裡創個 `.vscode` 資料夾，並建一個 `i18n-ally-custom-framework.yml` 的檔案。並貼上以下的內容：

```jsx
# .vscode/i18n-ally-custom-framework.yml

# An array of strings which contain Language Ids defined by VS Code
# You can check avaliable language ids here: https://code.visualstudio.com/docs/languages/overview#_language-id
languageIds:
  - javascript
  - typescript
  - javascriptreact
  - typescriptreact

# An array of RegExes to find the key usage. **The key should be captured in the first match group**.
# You should unescape RegEx strings in order to fit in the YAML file
# To help with this, you can use https://www.freeformatter.com/json-escape.html
usageMatchRegex:
  # The following example shows how to detect `t("your.i18n.keys")`
  # the `{key}` will be placed by a proper keypath matching regex,
  # you can ignore it and use your own matching rules as well
  - "[^\\w\\d]msg\\(['\"`]({key})['\"`]"
# An array of strings containing refactor templates.
# The "$1" will be replaced by the keypath specified.
# Optional: uncomment the following two lines to use

# refactorTemplates:
#  - i18n.get("$1")

# If set to true, only enables this custom framework (will disable all built-in frameworks)
monopoly: false
```

重點在於 `usageMatchRegex` 這邊可以自訂專案的 i18n 使用格式給套件知道，此範例中的 regex 已經是 `msg("key")` 了，到這邊設定好之後， `重新載入` 套件即可運作。

![截圖 2021-10-22 上午7.58.59.png](./images/i18n-ally-4.png)

細節可以再看[官方文件](https://github.com/lokalise/i18n-ally/wiki/Custom-Framework)

## 黑科技

`i18n-ally` 甚至有內建了直接編輯功能以及 google translate ，

![截圖 2021-10-22 上午9.53.06.png](./images/i18n-ally-5.png)

當你 hover 到 i18n key 上面時，就會顯示出功能面板，選擇鉛筆功能可以直接編輯對應的文案，而點擊地球 icon 的話它會用 google translate 自動幫你翻譯。

![截圖 2021-10-22 上午9.54.51.png](./images/i18n-ally-6.png)

如果想更快速一點，到它的側邊欄區塊中找到這個地球圖示，點下去就可以全部套用 google translate。

![截圖 2021-10-22 上午9.55.21.png](./images/i18n-ally-7.png)

## 心得

這次看了不少文件，終於把手邊的案子的參數設定完成，也蠻佩服 `i18n-ally` 作者的，雖然整個套件原理不難，但能組合起來做出來就是厲害，也確實在開發上幫助蠻大，能快速找出缺字串的 key，沒使用到的 key 等等，都幫你找出來統一顯示出來了。也能直接就在開發中檔案做修改，而不用再切換去語系檔了。

[i18n-ally 套件 github](https://github.com/lokalise/i18n-ally)