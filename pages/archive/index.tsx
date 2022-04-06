import Seperator from "../../components/Seperator"
import Link from "next/link"
import { orderBy } from "lodash"
import type { PostMarkdownAttributes } from "../../services/posts"
import dayjs from "dayjs"
import { HOST } from '../../config'
import axios from 'axios'
import type { InferGetStaticPropsType } from 'next'

const Archive = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {

  return (
    <div className="container mx-auto py-10 px-4 min-h-[calc(100%-100px)]">
      <div className="text-5xl font-medium">文章列表 Archive</div>
      <Seperator />
      <ul className="pl-10">
        {posts.map(post => (
          <li key={post.slug}>
            <div className="leading-8 flex gap-4">
              <div>
                {dayjs(post.date).format('YYYY-MM-DD')}
              </div>
              <div>
                <Link href={`/blog/${post.slug}`}>
                  <a className="underline hover:text-blue-500">
                    {post.title}
                  </a>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await axios.get(`${HOST}/api/posts`)
  const posts: PostMarkdownAttributes[] = res.data

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts: orderBy(posts, 'date', 'desc')
    },
  }
}

export default Archive