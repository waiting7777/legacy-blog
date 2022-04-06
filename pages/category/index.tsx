import Seperator from "../../components/Seperator"
import Link from 'next/link'
import { HOST } from '../../config'
import axios from 'axios'
import type { InferGetStaticPropsType } from 'next'
import type { Categories } from '../../services/posts'

const Category = ({ categories }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="container mx-auto py-10 px-4 min-h-[calc(100%-100px)]">
      <div className="text-5xl font-medium">分類 Category</div>
      <Seperator />
      <ul className="pl-10">
        {Object.entries(categories).map(category => (
          <li key={category[0]}>
            <div className="leading-8 flex gap-4">
              <div>
                <Link href={`/category/${category[0]}`}>
                  <a className="hover:text-blue-500">
                    {`${category[0]}(${category[1]})`}
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
  const res = await axios.get(`${HOST}/api/category`)
  const categories: Categories = res.data

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      categories
    },
  }
}

export default Category