import { faTwitter, faLinkedin, faTwitch, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faDragon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

function Header() {
  return (
    <div className="sticky top-0 h-12 bg-black text-white z-50">
      <div className="container mx-auto flex items-center justify-between h-full px-4">
        <div className="flex gap-4 items-center">
          <Link href="/" passHref>
            <div className='mr-4 cursor-pointer'>
              <FontAwesomeIcon className='w-5 h-5' icon={faDragon} />
              <span className='ml-2 text-xl'>Import Data</span>
            </div>
          </Link>
          <div>
            <Link href="/archive">
              文章列表
            </Link>
          </div>
          <div>
            <Link href="/category">
              分類
            </Link>
          </div>
          <div>
            <Link href="/tags">
              標籤
            </Link>
          </div>
          <div>
            <Link href="/about">
              關於我
            </Link>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="mr-2">
            <Link href="/about">Waiting7777</Link>
          </div>
          <div>
            <a href="https://www.github.com/waiting7777" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
          <div>
            <a href="https://www.twitch.com/waiting7777" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitch} />
            </a>
          </div>
          <div>
            <a href="https://www.linkedin.com/in/weiting-cheng-34a697127/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
          <div>
            <a href="https://twitter.com/waiting7777" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header