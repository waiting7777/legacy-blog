import type { InferGetStaticPropsType } from 'next'
import { getPosts } from '../../services/leetcodes'
import { orderBy } from 'lodash'
import Link from 'next/link'
import classNames from 'classnames'

const LeetCode = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className='container py-10'>
      <div>
        <table className="min-w-full">
        <thead className="bg-white border-b">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-md leading-4 font-bold tracking-wider">ID</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-md leading-4 font-bold tracking-wider">Title</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-right text-md leading-4 font-bold tracking-wider">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-[#ecf0f1]">
                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">{post.id}</td>
                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                  <Link href={`/leetcode/${post.slug}`} passHref>
                    <span className="text-red-main cursor-pointer">{post.title}</span>
                  </Link>
                </td>
                <td className={classNames({
                  "text-easy": post.difficulty === "easy",
                  }, "px-6 py-2 whitespace-no-wrap border-b border-gray-200 text-right capitalize")}>{post.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export async function getStaticProps() {

  const posts = await getPosts()

  return {
    props: {
      posts: orderBy(posts, 'id', 'desc')
    },
  }
}

export default LeetCode
