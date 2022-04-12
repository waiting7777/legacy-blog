import Link from 'next/link'
import Image from 'next/image'
import type { PostMarkdownAttributes } from '../services/posts'
import dayjs from "dayjs"
import path from 'path'

function PostCard({ post }: { post: PostMarkdownAttributes }) {
  return (
    <div className="h-[520px] flex flex-1 flex-col pb-8 bg-white shadow-md transform transition-transform hover:-translate-y-px hover:scale-[1.02] rounded-lg">
      <Link href={`/blog/${post.slug}`} passHref> 
        <a className="block relative rounded-t h-[200px] flex-shrink-0">
          <Image className="w-full h-full object-cover rounded-t" layout='fill' loading='lazy' src={path.join('/blog', post.image)} alt={post.title} />
        </a>
      </Link>
      <div className="flex flex-col p-6 flex-1">
        <Link href={`/category/${post.category}`} passHref>
          <a className="text-red-main uppercase text-xs font-medium tracking-wide">{post.category}</a>
        </Link>
        <Link href={`/blog/${post.slug}`} passHref>
          <a className="mt-2 font-medium text-2xl leading-7 h-14 overflow-hidden text-ellipsis">{post.title}</a>
        </Link>
        <Link href={`/blog/${post.slug}`} passHref>
          <a className="mt-4 h-28 overflow-hidden leading-7 text-ellipsis">{post.excerpt}</a>
        </Link>
      </div>
      <div className='px-6 flex-shrink-0'>
        <div className="flex items-center mt-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image width="32" height="32" src="/images/author/author1.jpeg" alt='author1' />
          </div>
          <div className="flex flex-col leading-none ml-3 pl-3 border-l border-[#e2e8f0] text-gray-main text-xs gap-1">
            <div>{post.date}</div>
            <div>{post.readingTime}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard;