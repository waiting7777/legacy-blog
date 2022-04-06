import { Posts, Categories, getCategories, getPostsByCategory } from '../../../services/posts'
import { orderBy } from 'lodash'
import PostCard from "../../../components/PostCard";
import Pagination from "../../../components/Pagination";
import Seperator from '../../../components/Seperator';
import { POSTPERPAGE } from '../../../config';
import { ParsedUrlQuery } from 'querystring'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import axios from 'axios'
import { HOST } from '../../../config'

type Props = {
  posts: Posts,
  category: string,
  page: string
}

interface Params extends ParsedUrlQuery {
  category: string,
  page: string
}

const CategoryPosts = ({ posts, category, page }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const p = (Number(page) - 1) * POSTPERPAGE

  return (
    <div>
      <div className="container mx-auto py-16 px-6 sm:px-0">
        <div className="text-5xl font-medium">{category}</div>
        <div className='text-xl mt-2 pl-1'>A collection of {posts?.length} posts - 1 / {Math.ceil(posts.length / POSTPERPAGE)}</div>
        <Seperator />
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
          <Pagination classify={`category/${category}`} key={page} total={posts.length} startIndex={Number(page)} />
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {

  const categories = await getCategories()
  const paths = [] as { params: Params }[]

  Object.keys(categories).forEach(category => {
    for (let i = 1; i <= Math.ceil(categories[category] / POSTPERPAGE); i++) {
      paths.push({ params: { category, page: i.toString() } })
    }
  })
  
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {

  const { category, page } = context.params as Params
  const posts = await getPostsByCategory(category)

  return {
    props: {
      posts: orderBy(posts, 'date', 'desc'),
      category,
      page
    },
  }
}

export default CategoryPosts