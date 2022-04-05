import type { InferGetStaticPropsType } from 'next'
import Hero from '../components/Hero'
import { HOST } from '../config'
import axios from 'axios'
import { PostMarkdownAttributes } from '../services/posts'
import { orderBy } from 'lodash'
import PostCard from '../components/PostCard'
import Seperator from '../components/Seperator'
import Pagination from '../components/Pagination'

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Hero />
      <div className="container py-16 px-6 sm:px-4">
        <div className="grid grid-cols-3 relative mb-10">
          <PostCard post={posts[0]} />
          <PostCard post={posts[1]} />
          <PostCard post={posts[2]} />
        </div>
        <Seperator />
        <div className="grid grid-cols-3 relative mb-10">
          <PostCard post={posts[3]} />
          <PostCard post={posts[4]} />
          <PostCard post={posts[5]} />
        </div>
        <Seperator />
        <div className="grid grid-cols-3 relative">
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
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await axios.get(`${HOST}/api/posts`)
  const posts: PostMarkdownAttributes[] = await res.data

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts: orderBy(posts, 'date', 'desc').slice(0, 10)
    },
  }
}

export default Home
