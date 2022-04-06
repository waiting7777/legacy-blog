import Seperator from "../../components/Seperator"
import Link from 'next/link'
import type { InferGetStaticPropsType } from 'next'
import { getCategories } from "../../services/posts"

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

  const categories = await getCategories()

  return {
    props: {
      categories
    },
  }
}

export default Category