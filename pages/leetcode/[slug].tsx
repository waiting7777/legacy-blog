import { useEffect } from 'react'
import type { LeetcodePost } from '../../services/leetcodes'
import { HOST } from '../../config'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'
import { getPost, getPosts } from '../../services/leetcodes'
import hljs from 'highlight.js'

type Props = {
  post: LeetcodePost
}

interface Params extends ParsedUrlQuery {
  slug: string,
}

const BlogPost = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  useEffect(() => {
    hljs.initHighlighting();
    if (typeof window !== 'undefined') {
      let script = document.createElement("script");
      let anchor = document.getElementById("utterances");

      script.setAttribute("src", "https://utteranc.es/client.js");
      script.setAttribute("crossorigin","anonymous");
      script.setAttribute("async", "true");
      script.setAttribute("repo", "waiting7777/blog");
      script.setAttribute("issue-term", "pathname");
      script.setAttribute("label", "BLOG-COMMENT");
      script.setAttribute( "theme", "github-light");
      if (anchor && anchor.childNodes.length === 0) {
        anchor.appendChild(script);
      }
    }

  }, [])

  return (
    <>
      <Head>
        <title>{`Leetcode - ${post.title}`}</title>
        <meta name="description" content={post.title} />
        <meta property="og:title" content={`Waiting7777 - ${post.title}`} />
        <meta property="og:description" content={post.title} />
        <meta property="og:url" content={`${HOST}/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="waiting7777" />
        <meta property="article:tag" content={post.tag} />
        <meta property="article:section" content="Blog" />
        <meta property="article:author" content="waiting7777" />
        <meta property="article:publisher" content="waiting7777" />
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.min.css'></link>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/github.min.css'></link>
      </Head>
      <div className='container py-8 md:py-16'>
        <div className='markdown-body mx-auto'>
          <div className='font-medium text-4xl mt-4 mb-2'>{post.title}</div>
          <main dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <div id="utterances" className='mt-4'></div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const posts = await getPosts()
  const paths = posts.map(post => ({ params: { slug: post.slug } }))
  
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const { slug } = context.params as Params
  const post = await getPost(slug)

  return {
    props: {
      post
    },
  }
}

export default BlogPost