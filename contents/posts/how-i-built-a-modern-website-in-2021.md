---
title: "How I built a modern website in 2021 (心得整理)"

tags: react, remix, Postgres, redis

category: Engineering

excerpt: Testing Javascript 課程的作者 Kent C. Dodds 最近更新了他的個人網站，並且分享了他用的 tech stack 以及架構，那就來看看他是用了哪些技術呢? 這篇算是個人看完文章後的一些重點摘錄及心得。

date: 2021-11-26

image: ./images/modern-website.jpeg

image_caption: css

author: author1

slug: how-i-built-a-modern-website-in-2021
---

原文網址: [https://kentcdodds.com/blog/how-i-built-a-modern-website-in-2021](https://kentcdodds.com/blog/how-i-built-a-modern-website-in-2021)

## Context

如果你只是要做ㄧ個個人網站，這篇內容其實有點超過了，單純的靜態網頁生成，或是 wordpress + cdn 其實就綽綽有餘，但如果你是想了解怎麼有效率的用一些現代開發工具開發個現代網站，那麼這篇文章就比較適合。

## Technology overview

下面是整個網站有用到的 `tech stack` :

- **React**: 前端 UI 框架
- **Remix**: 他最近在推的全端框架
- **Typescript**: Typed JavaScript (necessary for any project you plan to maintain)
- **XState**: state machine tool
- **Prisma**: typescript + nodejs 的 db orm 框架
- **Express**: Node server
- **Cypress**: E2E testing
- **Jest:** Unit testing
- **Testing Library**: Simple utilities for testing DOM-based user interfaces
- **MSW**: 用來建 mock api 的工具
- **Tailwind CSS**: CSS 框架
- **Post CSS**: CSS processor
- **Reach U**I: A set of accessible UI components every app needs (accordion/tabs/dialog/etc...)
- **ESBuild**: JavaScript bundler (used by Remix and mdx-bundler)
- **mdx-bundle**: 打包 MDX 工具
- **Postgres**: Battle tested SQL database
- **Redis**: In-memory database–key/value store.

以下是網站有用的服務:

- [Fly.io](http://Fly.io): hosting platform
- **[GitHub Actions](https://github.com/features/actions):** CI pipeline
- **[Sentry](https://sentry.io/):** 錯誤偵測
- **[Cloudinary](https://cloudinary.com/):** 雲端圖片 hosting
- **[Fathom](https://kcd.im/fathom):** 數據偵測
- **[Metronome](https://metronome.sh/)**: remix 用的效能偵測

雖然洋洋灑灑列了一堆，但主要還是區分成 前端 後端 測試 DB 的框架類，以及方便開發的工具類，有些打包工具他也列上去了我是覺得有點多餘，不過看起來嚇人吧。

## Architectural overview

![deployment-pipeline-dark.png](./images/modern-website-1.png)

這是整體的網頁 deploy 流程，大致分為兩大塊，主要都使用 Github Action 完成。

### Github Actions: Refresh Content

如果每次更新個錯字，就要整個 server 重 build 然後發送出去，這樣耗時又費力，所以基本上是先檢查 `./content` folder，如果只有這邊有改動，那就代表只改了內容，那麼就用 `mdx bundler` 重 build 內容部分並送上去就好。

這讓他的網站從 10-25 分鐘 downtime 縮短到了 8 秒，並省了很多運算時間($$$)。

> 用 github 當 CMS 有點怪，但因為這是 open source，且希望可以讓大家可以合作更新內容，所以還是選用了 github。
> 

### Github Actions: Deploy

如果是整個 server 的 code 有改動到那在跑下面的流程：

- ESLint: Linting the project for simple mistakes
- ʦ TypeScript: Type checking the project for type errors
- 🃏 Jest: Running component and unit tests
- ⚫️ Cypress: Running end-to-end tests
- 🐳 Build: Building the docker image

Build 完之後再把 server 更新上去即可。

## Database Connectivity

![database-connectivity-dark.png](./images/modern-website-2.png)

會選 [Fly.io](http://Fly.io) 作為它的 node server hosts 的其中一個原因是，他可以很簡單的選擇多個國家 host，它就根據了流量選了 6 個國家。這樣世界各地的使用者就會盡可能的連到離他近的 DB 。

但這不代表沒有 trade-off ，這會遇到一致性的問題，我們並不會想把我們的 APP 照國家切開，但不同國家的 DB 還是要保持一致，那要如何保持一致性呢？我選了 Dallas 當最主要的 DB，每當 Dallas 的 DB 更新後，會自動 propagation 到其他國家的 DB 去。

## Fly Request Replays

![fly-request-replays-dark.png](./images/modern-website-3.png)

另一個問題是 read/write 的問題，如果有個朋友在 Berlin write 了 DB 並且馬上去 read ，那麼有機會拿到的是舊資料，雖然 Data propagation 通常在 millisecond 級別內完成，但如果你是上傳一個 podcast 之類的較大的資料，就有機會發生剛剛的問題。

他在這邊用的方法是，把 post request 送到主要的 db 去並且由主 db 負責 response，但這會導致他的 post 速度變慢，且目前還沒找到比較好的方法。

## Caching with Redis/LRU

他想要提升他的網站速度，不只用了 Redis 還有用 LRU (least-recently-used)來輔助

```css
type CacheMetadata = {
  createdTime: number
  maxAge: number | null
}
// it's the value/null/undefined or a promise that resolves to that
type VNUP<Value> = Value | null | undefined | Promise<Value | null | undefined>

async function cachified<
  Value,
  Cache extends {
    name: string
    get: (key: string) => VNUP<{
      metadata: CacheMetadata
      value: Value
    }>
    set: (
      key: string,
      value: {
        metadata: CacheMetadata
        value: Value
      },
    ) => unknown | Promise<unknown>
    del: (key: string) => unknown | Promise<unknown>
  },
>(options: {
  key: string
  cache: Cache
  getFreshValue: () => Promise<Value>
  checkValue?: (value: Value) => boolean
  forceFresh?: boolean | string
  request?: Request
  fallbackToCache?: boolean
  timings?: Timings
  timingType?: string
  maxAge?: number
}): Promise<Value> {
  // do the stuff...
}

// here's an example of the cachified credits.yml that powers the /credits page:
async function getPeople({
  request,
  forceFresh,
}: {
  request?: Request
  forceFresh?: boolean | string
}) {
  const allPeople = await cachified({
    cache: redisCache,
    key: 'content:data:credits.yml',
    request,
    forceFresh,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    getFreshValue: async () => {
      const creditsString = await downloadFile('content/data/credits.yml')
      const rawCredits = YAML.parse(creditsString)
      if (!Array.isArray(rawCredits)) {
        console.error('Credits is not an array', rawCredits)
        throw new Error('Credits is not an array.')
      }

      return rawCredits.map(mapPerson).filter(typedBoolean)
    },
    checkValue: (value: unknown) => Array.isArray(value),
  })
  return allPeople
}
```

## Image optimization with Cloudinary

所有的圖片都放在 Cloudinary ，並且回傳正確的 size format，它不便宜但他能幫你省下很多的頻寬，另一個原因是 Gatsby 每次 generate 的時候都得產出多個 size 的圖片並且導致整個 bundle 又慢又大包，雖然是可以 cache 但還是遇到麻煩。

而用 Cloudinary，就沒這些問題，單純上傳圖片拿到 ID 放到文章中就好，然後生出正確格式的 url 就解決了。

另外個小好處它可以產出所有的 social image with custom text。

(其實就是一個動態處理各種圖片格式的服務)

## MDX Compliation with mdx-bundler

MDX 是一種在 markdown 裡面直接寫前端 code 的格式

```jsx
import {Chart} from './snowfall.js'
export const year = 2018

# Last year’s snowfall

In {year}, the snowfall was above average.
It was followed by a warm spring which caused
flood conditions in many of the nearby rivers.

<Chart year={year} color="#fcb32c" />
```

通常用於做 Blog 網站。

## Database interaction with Prisma

```jsx
type LoaderData = Await<ReturnType<typeof getLoaderData>>

async function getLoaderData() {
  const users = await prismaRead.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      team: true,
      postReads: {
        select: {
          postSlug: true,
        },
      },
    },
  })
  return {users}
}

export const loader: LoaderFunction = async ({request}) => {
  return json(await getLoaderData())
}

export default function UsersPage() {
  const data = useLoaderData<LoaderData>()
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {/* all this auto-completes and type checks!! */}
        {data.users.map(user => (
          <li key={user.id}>
            <div>{user.firstName}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

一種 nodejs base 的 DB ORM，簡單直觀易用。

> Prisma has made me, a frontend developer, feel empowered to work directly with a database.
> 

## Authentication with Magic Links

![auth-flow-dark.png](./images/modern-website-4.png)

![session-flow-dark.png](./images/modern-website-5.png)

The basics of this is pretty simple:

- Get the session ID from the session cookie
- Get the user ID from the session
- Get the user
- Update the expiration time so active users rarely need to re-authenticate
- If any of these fails, cleanup and redirect

## 結論

原文作者不愧是講師，一些簡單的東西可以講得非常長篇大論，我已經截錄了比較重要的部分，另外他也花了很多篇幅在講 `[Remix](https://remix.run/)` 這個全端框架，這是繼 `JAMSTACK` 後又跑出來的新東西，或許有時間研究完下一篇來講個。