import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import { GA_TRACKING_ID } from '../lib/gtag'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

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
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `,
          }}
        />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
 
}

export default MyApp
