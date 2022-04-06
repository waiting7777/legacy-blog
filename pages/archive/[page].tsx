import { orderBy } from 'lodash'
import PostCard from "../../components/PostCard";
import Pagination from "../../components/Pagination";
import Hero from "../../components/Hero";
import type { Posts } from '../../services/posts'
import { getPosts, getPost } from '../../services/posts';
import Seperator from '../../components/Seperator';
import { POSTPERPAGE } from '../../config';
import { HOST } from '../../config'
import axios from 'axios'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'

type Props = {
  posts: Posts,
  page: string
}

interface Params extends ParsedUrlQuery {
  page: string,
}

const ArchivePage = ({ posts, page }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const p = (Number(page) - 1) * POSTPERPAGE

  return (
    <div>
      <Hero />
      <div className="container mx-auto py-16 px-6 sm:px-0">
        <div className="grid grid-cols-3 relative mb-10">
          {posts[p + 0] && <PostCard key={posts[p + 0].title} post={posts[p + 0]} />}
          {posts[p + 1] && <PostCard key={posts[p + 1].title} post={posts[p + 1]} />}
          {posts[p + 2] && <PostCard key={posts[p + 2].title} post={posts[p + 2]} />}
        </div>
        {posts[p + 3] && <Seperator />}
        <div className="grid grid-cols-3 relative mb-10">
          {posts[p + 3] && <PostCard key={posts[p + 3].title} post={posts[p + 3]} />}
          {posts[p + 4] && <PostCard key={posts[p + 4].title} post={posts[p + 4]} />}
          {posts[p + 5] && <PostCard key={posts[p + 5].title} post={posts[p + 5]} />}
        </div>
        {posts[p + 6] && <Seperator />}
        <div className="grid grid-cols-3 relative">
          {posts[p + 6] && <PostCard key={posts[p + 6].title} post={posts[p + 6]} />}
          {posts[p + 7] && <PostCard key={posts[p + 7].title} post={posts[p + 7]} />}
          {posts[p + 8] && <PostCard key={posts[p + 8].title} post={posts[p + 8]} />}
        </div>
        <div className="flex items-center justify-center mt-10">
          <Pagination classify="archive" key={page} total={posts.length} startIndex={Number(page)} />
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const posts = await getPosts()
  const paths = []
  for (let i = 1; i <= Math.ceil(posts.length / POSTPERPAGE); i++) {
    paths.push({ params: { page: i.toString() } })
  }
  
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {

  const { page } = context.params as Params
  const posts = await getPosts()

  return {
    props: {
      posts: orderBy(posts, 'date', 'desc'),
      page
    },
  }
}

export default ArchivePage