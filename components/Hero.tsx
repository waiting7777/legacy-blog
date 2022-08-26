import Image from "next/image"

function Hero() {
  return (
    <div className="hero">
      <div className="hero-container gap-4 md:gap-8 md:flex-row md:w-[940px] mx-auto py-4 px-4">
        <div className="flex items-center">
          <Image width="250" height="250" src="/images/author/author1.jpeg" alt='author1' />
        </div>
        <div className="content-right leading-6">
          <div className="text-3xl font-bold mb-2">Hi 👋</div>
          I&apos;m <span className="text-red-main">Waiting7777</span>, a web developer specializing in <b>modern Javascript</b>, <b>Data Visualization</b>, <b>Crypto</b>.<br/><br/>I&apos;ve been building stuff on the web for the last 5 years, working with clients across various countries and industries.<br/><br/>This website is my digital garden of notes on Frontend, Data Visualization, and Crypto!
        </div>
      </div>
    </div>
  )
}

export default Hero