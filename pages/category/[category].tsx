import { Posts, Categories, getPostsByCategory, getCategories } from '../../services/posts'
import { orderBy } from 'lodash'
import PostCard from "../../components/PostCard";
import Pagination from "../../components/Pagination";
import Seperator from '../../components/Seperator';
import { POSTPERPAGE } from '../../config';
import { ParsedUrlQuery } from 'querystring'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import axios from 'axios'
import { HOST } from '../../config'

type Props = {
  posts: Posts,
  category: string
}

interface Params extends ParsedUrlQuery {
  category: string,
}

const CategoryPosts = ({ posts, category }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <div className="container mx-auto py-16 px-6 sm:px-0">
        <div className="text-5xl font-medium">{category}</div>
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
          <Pagination classify={`category/${category}`} total={posts.length} />
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {

  const categories = await getCategories()
  const paths = Object.keys(categories).map(category => ({ params: { category } }))
  
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {

  const { category } = context.params as Params
  const posts = await getPostsByCategory(category)

  return {
    props: {
      posts: orderBy(posts, 'date', 'desc'),
      category
    },
  }
}

export default CategoryPosts