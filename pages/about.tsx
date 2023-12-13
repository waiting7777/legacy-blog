import Seperator from "../components/Seperator"
import Image from "next/image"

const about = () => {
  return (
    <>
      <div className="container py-10">
        <Image width="250" height="250" src="/images/author/author1.jpeg" alt='author1' />
        <div className="mt-4">
          I&apos;m Waiting7777，我是個工程師，擅長<b className="text-red-main">資料視覺化</b>、<b className="text-red-main">網站開發</b>、，可以在 <a href="https://github.com/waiting7777" target="_blank" rel="noreferrer" className="text-red-main">我的 Github</a> 上看到我的開源項目，偶爾寫寫 Blog 整理心得。
          <br/><br/>
          很喜歡鑽研一些最新的趨勢，常常在拓荒中探索自己的興趣，並且把自己的經驗分享給大家。前陣子也接觸了不少 Crypto 的相關技術，例如前端如何跟鏈上智能合約互動，如何做出 Dex, Swap 等等網站。
          <br/><br/>
          過去也曾在媒體玩過很多資料視覺化，做過多種圖表以及豐富的活動頁面。
          <br/><br/>
          除了寫程式外，最大的興趣在於玩遊戲，唸書時曾經拿過魔獸世界競技場台服 #1。目前喜歡各類&quot;自走棋&quot;遊戲，爐石戰場、聯盟戰棋等等。還是個 MTG 的骨灰玩家，雖然因為疫情很少出國打牌，但還是喜歡那句<br /><br/><b className="text-red-main text-xl"><i>Play the game, see the world!</i></b>
        </div>
        <Seperator />
        <div className="mt-8 font-medium text-2xl">
          Project
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
              <a href="https://www.berry-ai.com/" target="_blank" rel="noopener noreferrer" className="text-red-main">
                <Image src="/images/about/berry-ai.png" alt="trevi" width="360" height="180" />  
              </a>
              <div className="font-bold text-red-main">Berry AI</div>
              <div>
                Computer Vision AI system
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <a href="https://www.trevi.cc/" target="_blank" rel="noopener noreferrer" className="text-red-main">
                <Image src="/images/about/trevi.png" alt="trevi" width="360" height="180" />  
              </a>
              <div className="font-bold text-red-main">Trevi</div>
              <div>
                Gaming APP and Management Platform
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <a href="https://joyso.io/trade/en/markets/joy_eth" target="_blank" rel="noopener noreferrer" className="text-red-main">
                <Image src="/images/about/joyso.png" alt="joyso" width="360" height="180" />  
              </a>
              <div className="font-bold text-red-main">JOYSO</div>
              <div>
                A Decentralized Exchange on Ethuereum 在乙太坊上面的去中心化交易所。
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <a href="https://tns.joyso.io" target="_blank" rel="noopener noreferrer" className="text-red-main">
                <Image src="/images/about/tns.png" alt="TNS" width="360" height="180" />  
              </a>
              <div className="font-bold text-red-main">TNS</div>
              <div>
              建在 Tron 上面，以智能合約機制用好記的字串來取代繁雜的地址，在 2019-01 曾獲得 <a href="https://tronaccelerator.io/" target="_blank" rel="noopener noreferrer" className="text-red-main">Tron Accelerator</a> 評審獎。
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <a href="https://waiting7777.github.io/taiwan-vue-components/index.html" target="_blank" rel="noopener noreferrer" className="text-red-main">
                <Image src="/images/about/taiwan-vue-component.png" alt="tvc" width="360" height="180" />  
              </a>
              <div className="font-bold text-red-main">Taiwan Vue Components</div>
              <div>
                D3 + Vue 自製台灣行政區的 svg 開源組件庫，並且可自定義打包引用。
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <a href="https://udn.com/upf/newmedia/2018_data/rural_medical/index.html" target="_blank" rel="noopener noreferrer" className="text-red-main">
                <Image src="/images/about/rural_medical.png" alt="tvc" width="360" height="180" />  
              </a>
              <div className="font-bold text-red-main">地圖看台灣醫療資源</div>
              <div>
                以 D3 用資料視覺化的方式，描繪台灣地圖，製作轉場動態，點出醫療資源的城鄉差距。
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <a href="https://udn.com/upf/newmedia/2017_data/summerweather/index.html" target="_blank" rel="noopener noreferrer" className="text-red-main">
                <Image src="/images/about/weather.jpeg" alt="tvc" width="360" height="180" />  
              </a>
              <div className="font-bold text-red-main">怪天氣大作戰</div>
              <div>
                以 phaser.js 製作網頁小遊戲，嘗試遊戲化新聞製作。
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <a href="https://udn.com/upf/newmedia/2016_data/20160704_middlecross/index.html" target="_blank" rel="noopener noreferrer" className="text-red-main">
                <Image src="/images/about/middlecross.png" alt="tvc" width="360" height="180" />  
              </a>
              <div className="font-bold text-red-main">中橫走過一甲子</div>
              <div>
                以滾動視差的方法呈現中橫的變化，曾獲華文永續報導獎。
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default about