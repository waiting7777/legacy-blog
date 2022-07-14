import path from 'path'
import fs from 'fs/promises'
import parseFrontMatter from 'front-matter'
import { marked } from 'marked'

export type PostMarkdownAttributes = {
  id: string;
  title: string;
  difficulty: string;
  tags: string;
  similar: string;
  slug: string;
}

export type LeetcodePosts = PostMarkdownAttributes[]

export type LeetcodePost = PostMarkdownAttributes & { html: string }

export const POSTS_PATH = path.join(process.cwd(), 'contents/leetcode')

export async function getPosts() {
  const dir = await fs.readdir(POSTS_PATH)
  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(POSTS_PATH, filename), 'utf8')
      const { attributes } = parseFrontMatter<PostMarkdownAttributes>(file.toString())
      return { ...attributes }
    })
  )
}

export async function getPost(slug: string) {
  const filepath = path.join(POSTS_PATH, `${slug}.md`)
  const file = await fs.readFile(filepath);
  const { attributes, body } = parseFrontMatter<PostMarkdownAttributes>(file.toString())
  const html = marked(body);
  return { ...attributes, html }
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