import path from 'path'
import fs from 'fs/promises'
import parseFrontMatter from 'front-matter'
import { marked } from 'marked'
import dayjs from 'dayjs'

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

export type Posts = PostMarkdownAttributes[]

export type Post = PostMarkdownAttributes & { html: string }

export type Categories = Record<string, number>

export type Tags = Record<string, number>

export const POSTS_PATH = path.join(process.cwd(), 'contents/posts')

export async function getPosts() {
  const dir = await fs.readdir(POSTS_PATH)
  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(POSTS_PATH, filename), 'utf8')
      const { attributes, body } = parseFrontMatter<PostMarkdownAttributes>(file.toString())
      return { ...attributes, category: attributes.category.toLowerCase(), tags: attributes.tags.toLowerCase(), date: dayjs(attributes.date).format('YYYY-MM-DD'), readingTime: `${Math.ceil(body.length / 1024)} MIN` }
    })
  )
}

export async function getPost(slug: string) {
  const filepath = path.join(POSTS_PATH, `${slug}.md`)
  const file = await fs.readFile(filepath);
  const { attributes, body } = parseFrontMatter<PostMarkdownAttributes>(file.toString())
  const html = marked(body);
  return { ...attributes, date: dayjs(attributes.date).format('YYYY-MM-DD'), html, readingTime: `${Math.ceil(body.length / 1024)} MIN` }
}

export async function getCategories() {
  const posts = await getPosts()
  const categories = posts.reduce((prev: Record<string, number>, curr: PostMarkdownAttributes) => {
    const category = curr.category
    if (prev[category]) {
      prev[category] += 1
    } else {
      prev[category] = 1
    }
    return prev
  }, {})
  return categories
}

export async function getPostsByCategory(category: string) {
  const posts = await getPosts()
  return posts.filter(post => post.category === category)
}

export async function getTags() {
  const posts = await getPosts()
  const tags = posts.reduce((prev: Record<string, number>, curr: PostMarkdownAttributes) => {
    if (curr?.tags) {
      curr.tags.split(', ').forEach(tag => {
        if (prev[tag]) {
          prev[tag] += 1
        } else {
          prev[tag] = 1
        }
      })
    }
    return prev
  }, {})
  return tags
}

export async function getPostsByTag(tag: string) {
  const posts = await getPosts()
  return posts.filter(post => post.tags.includes(tag))
}