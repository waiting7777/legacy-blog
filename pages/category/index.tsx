import Seperator from "../../components/Seperator"
import Link from 'next/link'
import type { InferGetStaticPropsType } from 'next'
import { getCategories } from "../../services/posts"
import Head from 'next/head'

const Category = ({ categories }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Waiting7777 - 分類 Category</title>
      </Head>
      <div className="container py-10 min-h-[calc(100vh-100px)]">
        <div className="text-3xl md:text-5xl font-medium">分類 Category</div>
        <Seperator />
        <ul className="pl-4 md:pl-10">
          {Object.entries(categories).map(category => (
            <li key={category[0]}>
              <div className="leading-8 flex gap-4">
                <div>
                  <Link href={`/category/${category[0]}`}>
                    <a className="hover:text-blue-500 text-red-main capitalize">
                      {`${category[0]}(${category[1]})`}
                    </a>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
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