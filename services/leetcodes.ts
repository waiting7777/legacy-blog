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

export async function getPosts(target = 'contents/leetcode') {
  const dir = await fs.readdir(path.join(process.cwd(), target))
  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(path.join(process.cwd(), target), filename), 'utf8')
      const { attributes } = parseFrontMatter<PostMarkdownAttributes>(file.toString())
      return { ...attributes }
    })
  )
}

export async function getPost(slug: string, target = 'contents/leetcode') {
  const filepath = path.join(path.join(process.cwd(), target), `${slug}.md`)
  const file = await fs.readFile(filepath);
  const { attributes, body } = parseFrontMatter<PostMarkdownAttributes>(file.toString())
  const html = marked(body);
  return { ...attributes, html }
}

export async function getTags(target = 'contents/leetcode') {
  const posts = await getPosts(target)
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