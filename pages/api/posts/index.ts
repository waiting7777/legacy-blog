// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { PostMarkdownAttributes } from '../../../services/posts'
import { getPosts } from '../../../services/posts'

type Data = PostMarkdownAttributes[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const posts = await getPosts()
  res.status(200).json(posts)
}
