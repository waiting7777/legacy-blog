import { useEffect } from 'react'
import type { Post, Posts } from '../../services/posts'
import { faFile, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import Tag from '../../components/Tag'
import axios from 'axios'
import { HOST } from '../../config'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Image from 'next/image'
import path from 'path'
import Head from 'next/head'
import { getPost, getPosts } from '../../services/posts'

type Props = {
  post: Post
}

interface Params extends ParsedUrlQuery {
  slug: string,
}

const BlogPost = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  useEffect(() => {
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
        <title>{`Waiting7777 - ${post.title}`}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`Waiting7777 - ${post.title}`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={`${HOST}${post.image}`} />
        <meta property="og:url" content={`${HOST}/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="waiting7777" />
        <meta property="article:published_time" content={dayjs(post.date).toISOString()} />
        <meta property="article:tag" content={post.tags} />
        <meta property="article:section" content="Blog" />
        <meta property="article:author" content="waiting7777" />
        <meta property="article:publisher" content="waiting7777" />
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.min.css'></link>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/github.min.css'></link>
      </Head>
      <div className='container mx-auto p-10'>
        <div className='rounded-lg mb-10'>
          <Image width="1060" height="480" loading='lazy' src={path.join('/blog', post.image)} className="w-full h-full object-cover rounded-lg" alt="" />
        </div>
        <div className='markdown-body mx-auto'>
          <div className='font-medium text-4xl mt-4 mb-2'>{post.title}</div>
          <div className='gap-4 flex items-center'>
            <div>{dayjs(post.date).format('YYYY-MM-DD')}</div>
            <div className='cursor-pointer flex items-center gap-1'><FontAwesomeIcon className='w-5 h-5' icon={faFile} /> {post.category}</div>
            <div className='flex items-center gap-1 mt-1'><FontAwesomeIcon className='w-5 h-5' icon={faCoffee} /> {post.readingTime}</div>
          </div>
          <div className='mt-10'></div>
          <main dangerouslySetInnerHTML={{ __html: post.html }} />
          <div className="flex gap-3 mt-10">
            {post.tags.split(', ').map(tag => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        </div>
        <div id="utterances"></div>
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