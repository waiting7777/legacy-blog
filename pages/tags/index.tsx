import Seperator from "../../components/Seperator"
import type { InferGetStaticPropsType } from 'next'
import type { Tags } from '../../services/posts'
import Tag from '../../components/Tag'
import { getTags } from "../../services/posts"
import Head from "next/head"

const Tags = ({ tags }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Waiting7777 - 標籤 Tag</title>
      </Head>
      <div className="container mx-auto py-10 px-4 min-h-[calc(100%-100px)]">
        <div className="text-5xl font-medium">標籤 Tags</div>
        <Seperator />
        <div className='flex gap-4 flex-wrap'>
          {Object.entries(tags).map(tag => (
            <Tag key={tag[0]} tag={tag[0]} count={tag[1]} />
          ))}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {

  const tags = await getTags()

  return {
    props: {
      tags
    },
  }
}

export default Tags