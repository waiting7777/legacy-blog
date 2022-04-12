import { Posts, getTags, getPostsByTag } from '../../../services/posts'
import { orderBy } from 'lodash'
import PostCard from "../../../components/PostCard";
import Pagination from "../../../components/Pagination";
import Seperator from '../../../components/Seperator';
import { POSTPERPAGE } from '../../../config';
import { ParsedUrlQuery } from 'querystring'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

type Props = {
  posts: Posts,
  tag: string,
  page: string
}

interface Params extends ParsedUrlQuery {
  tag: string,
  page: string
}

const TagPost = ({ posts, tag, page }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const p = (Number(page) - 1) * POSTPERPAGE

  return (
    <div>
      <div className="container py-8 md:py-16">
        <div className="text-5xl font-medium capitalize">{tag}</div>
        <div className='text-xl mt-2 pl-1'>A collection of {posts?.length} posts - 1 / {Math.ceil(posts.length / POSTPERPAGE)}</div>
        <Seperator />
        <div className="grid gap-4 md:gap-8 md:grid-cols-3 relative mb-10">
          {posts[p + 0] && <PostCard key={posts[p + 0].title} post={posts[p + 0]} />}
          {posts[p + 1] && <PostCard key={posts[p + 1].title} post={posts[p + 1]} />}
          {posts[p + 2] && <PostCard key={posts[p + 2].title} post={posts[p + 2]} />}
        </div>
        {posts[p + 3] && <Seperator />}
        <div className="grid gap-4 md:gap-8 md:grid-cols-3 relative mb-10">
          {posts[p + 3] && <PostCard key={posts[p + 3].title} post={posts[p + 3]} />}
          {posts[p + 4] && <PostCard key={posts[p + 4].title} post={posts[p + 4]} />}
          {posts[p + 5] && <PostCard key={posts[p + 5].title} post={posts[p + 5]} />}
        </div>
        {posts[p + 6] && <Seperator />}
        <div className="grid gap-4 md:gap-8 md:grid-cols-3 relative">
          {posts[p + 6] && <PostCard key={posts[p + 6].title} post={posts[p + 6]} />}
          {posts[p + 7] && <PostCard key={posts[p + 7].title} post={posts[p + 7]} />}
          {posts[p + 8] && <PostCard key={posts[p + 8].title} post={posts[p + 8]} />}
        </div>
        <div className="flex items-center justify-center mt-10">
          <Pagination classify={`tags/${tag}`} key={page} total={posts.length} startIndex={Number(page)} />
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {

  const tags = await getTags()
  const paths = [] as { params: Params }[]

  Object.keys(tags).forEach(tag => {
    for (let i = 1; i <= Math.ceil(tags[tag] / POSTPERPAGE); i++) {
      paths.push({ params: { tag, page: i.toString() } })
    }
  })
  
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {

  const { tag, page } = context.params as Params
  const posts = await getPostsByTag(tag)

  return {
    props: {
      posts: orderBy(posts, 'date', 'desc'),
      tag,
      page
    },
  }
}

export default TagPost