import Seperator from "../components/Seperator"
import Image from "next/image"

const about = () => {
  return (
    <>
      <div className="w-[880px] mx-auto py-10">
        <Image width="250" height="250" src="/images/author/author1.jpeg" alt='author1' />
        <div className="mt-4">
          I&apos;m Waiting7777，我是個工程師，擅長<b className="text-red-main">資料視覺化</b>、<b className="text-red-main">前端開發</b>、<b className="text-red-main">Crypto</b>，可以在 <a href="https://github.com/waiting7777" target="_blank" rel="noreferrer" className="text-red-main">我的 Github</a> 上看到我的開源項目，閒言閒語大部分用 <a href="https://twitter.com/waiting7777" target="_blank" rel="noreferrer" className="text-red-main">Twitter</a>，偶爾寫寫 Blog 整理心得。或是剪剪遊戲精華放<a href="https://www.youtube.com/channel/UCOlwT9QX7G5cGKB1JM5qI6A" target="_blank" rel="noreferrer" className="text-red-main">Youtube</a>。
          <br/><br/>
          很喜歡鑽研一些最新的趨勢，常常在拓荒中探索自己的興趣，並且把自己的經驗分享給大家。前陣子也接觸了不少 Crypto 的相關技術，例如前端如何跟鏈上智能合約互動，如何做出 Dex, Swap 等等網站。
          <br/><br/>
          除了寫程式外，最大的興趣在於玩遊戲，唸書時曾經拿過魔獸世界競技場台服 #1。目前喜歡各類&quot;自走棋&quot;遊戲，爐石戰場、聯盟戰棋等等。還是個 MTG 的骨灰玩家，雖然因為疫情很少出國打牌，但還是喜歡那句<br /><br/><b className="text-red-main text-xl"><i>Play the game, see the world!</i></b>
        </div>
        <Seperator />
        <div className="mt-8 font-medium text-2xl">
          Project
        </div>
        <div className="mt-4 pl-10">
          <ul>
            <li><a href="https://joyso.io/trade/en/markets/joy_eth" target="_blank" rel="noopener noreferrer" className="text-red-main">Joyso</a> - A Decentralized Exchange on Ethuereum</li>
            <li className="mt-4"><a href="https://tns.joyso.io/" target="_blank" rel="noopener noreferrer" className="text-red-main">TNS</a> - 建在 Tron 上面，以智能合約機制用好記的字串來取代繁雜的地址，在 2019-01 曾獲得 <a href="https://tronaccelerator.io/" target="_blank" rel="noopener noreferrer" className="text-red-main">Tron Accelerator</a> 評審獎。</li>
            <li className="mt-4"><a href="https://waiting7777.github.io/taiwan-vue-components/index.html" target="_blank" rel="noopener noreferrer" className="text-red-main">Taiwan Vue Components</a> - 用 D3 + Vue 自製台灣行政區 svg 組件庫，並且可自定義打包引用。</li>
            <li className="mt-4"><a href="https://udn.com/upf/newmedia/2018_data/rural_medical/index.html" target="_blank" rel="noopener noreferrer" className="text-red-main">地圖看台灣醫療資源</a> - 用 D3 + Vue 撈出官方數據並且比對地圖，描繪台灣地圖，製作轉場動態，點出醫療資源的城鄉差距。</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default about