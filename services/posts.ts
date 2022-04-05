import path from 'path'
import fs from 'fs/promises'
import parseFrontMatter from 'front-matter'

export type PostMarkdownAttributes = {
  title: string;
  tags: string;
  category: string;
  excerpt: string;
  date: string;
  image: string;
  readingTime: string;
  slug: string;
}

export const POSTS_PATH = path.join(process.cwd(), 'contents/posts')
console.log(POSTS_PATH)

export async function getPosts() {
  const dir = await fs.readdir(POSTS_PATH)
  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(POSTS_PATH, filename), 'utf8')
      const { attributes, body } = parseFrontMatter<PostMarkdownAttributes>(file.toString())
      return { ...attributes, readingTime: `${Math.ceil(body.length / 1024)} MIN` }
    })
  )
}