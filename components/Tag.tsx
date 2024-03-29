import Link from 'next/link'

export type TagProps = {
  tag: string,
  count?: number,
  prefix?: string,
}

function Tag({ tag, count, prefix }: TagProps) {
  return (
    <div className="bg-neutral-200 py-1 px-3 inline-flex text-sm rounded leading-6 items-center justify-center tracking-wide">
      <Link href={prefix ? `${prefix}/tags/${tag}` : `/tags/${tag}`} passHref>
        <a className="hover:!no-underline capitalize">
          <span className='!text-gray-600'>{`#${tag}`}</span>
          {count && <span className='ml-1 text-gray-600'>{`(${count})`}</span>}
        </a>
      </Link>
    </div>
  )
}

export default Tag;