import type { InferGetStaticPropsType } from 'next'
import Hero from '../components/Hero'
import { getPosts } from '../services/posts'
import { orderBy } from 'lodash'
import PostCard from '../components/PostCard'
import Seperator from '../components/Seperator'
import Pagination from '../components/Pagination'

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Hero />
      <div className="container py-8 md:py-16">
        <div className="grid gap-4 md:gap-8 md:grid-cols-3 relative mb-10">
          <PostCard post={posts[0]} />
          <PostCard post={posts[1]} />
          <PostCard post={posts[2]} />
        </div>
        <Seperator />
        <div className="grid gap-4 md:gap-8 md:grid-cols-3 relative mb-10">
          <PostCard post={posts[3]} />
          <PostCard post={posts[4]} />
          <PostCard post={posts[5]} />
        </div>
        <Seperator />
        <div className="grid gap-4 md:gap-8 md:grid-cols-3 relative">
          <PostCard post={posts[6]} />
          <PostCard post={posts[7]} />
          <PostCard post={posts[8]} />
        </div>
        <div className="flex items-center justify-center mt-10">
          <Pagination classify="archive" total={posts.length} />
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {

  const posts = await getPosts()

  return {
    props: {
      posts: orderBy(posts, 'date', 'desc')
    },
  }
}

export default Home
