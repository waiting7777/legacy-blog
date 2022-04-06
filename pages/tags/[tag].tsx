import { Posts, getTags, getPostsByTag } from '../../services/posts'
import { orderBy } from 'lodash'
import PostCard from "../../components/PostCard";
import Pagination from "../../components/Pagination";
import Seperator from '../../components/Seperator';
import { POSTPERPAGE } from '../../config';
import { ParsedUrlQuery } from 'querystring'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { capitalize } from 'lodash'

type Props = {
  posts: Posts,
  tag: string
}

interface Params extends ParsedUrlQuery {
  tag: string,
}

const CategoryPosts = ({ posts, tag }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Waiting7777 - {capitalize(tag)}</title>
      </Head>
      <div>
        <div className="container mx-auto py-16 px-6 sm:px-0">
          <div className="text-5xl font-medium capitalize">{tag}</div>
          <div className='text-xl mt-2 pl-1'>A collection of {posts?.length} posts - 1 / {Math.ceil(posts.length / POSTPERPAGE)}</div>
          <Seperator />
          <div className="grid grid-cols-3 relative mb-10">
            {posts[0] && <PostCard post={posts[0]} />}
            {posts[1] && <PostCard post={posts[1]} />}
            {posts[2] && <PostCard post={posts[2]} />}
          </div>
          {posts[3] && <Seperator />}
          <div className="grid grid-cols-3 relative mb-10">
            {posts[3] && <PostCard post={posts[3]} />}
            {posts[4] && <PostCard post={posts[4]} />}
            {posts[5] && <PostCard post={posts[5]} />}
          </div>
          {posts[6] && <Seperator />}
          <div className="grid grid-cols-3 relative mb-10">
            {posts[6] && <PostCard post={posts[6]} />}
            {posts[7] && <PostCard post={posts[7]} />}
            {posts[8] && <PostCard post={posts[8]} />}
          </div>
          <div className="flex items-center justify-center mt-10">
            <Pagination classify={`tags/${tag}`} total={posts.length} />
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {

  const tags = await getTags()
  const paths = Object.keys(tags).map(tag => ({ params: { tag } }))
  
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {

  const { tag } = context.params as Params
  const posts = await getPostsByTag(tag)

  return {
    props: {
      posts: orderBy(posts, 'date', 'desc'),
      tag
    },
  }
}

export default CategoryPosts