import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Head from 'next/head'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Waiting7777 - Web developer &amp; writer</title>
        <meta name="description" content="Waiting7777 - Web developer &amp; writer" />
        <meta property="og:title" content="Waiting7777 - Web developer &amp; writer" />
        <meta property="og:description" content="Waiting7777 is web developer and writer specializing in modern JavaScript who breaks down complex concepts in an accessible and intuitive way." />
        <meta property="og:image" content="" />
        <meta property="og:url" content="https://waiting7777.org" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="waiting7777" />
      </Head>
      <Script id="google-analytics" strategy="afterInteractive">
        {
          `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-33995800-1', 'auto');
          ga('send', 'pageview');`
          }
      </Script>
      <Header />
      <Component {...pageProps} />
    </>
  )
 
}

export default MyApp
