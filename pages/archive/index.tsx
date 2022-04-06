import Seperator from "../../components/Seperator"
import Link from "next/link"
import { orderBy } from "lodash"
import { getPosts } from "../../services/posts"
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
                {post.date}
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

  const posts = await getPosts()

  return {
    props: {
      posts: orderBy(posts, 'date', 'desc')
    },
  }
}

export default Archive