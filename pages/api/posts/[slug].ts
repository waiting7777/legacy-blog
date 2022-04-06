// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Post } from '../../../services/posts'
import { getPost } from '../../../services/posts'

type Data = Post

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { slug } = req.query as { slug: string }
  const posts = await getPost(slug)
  res.status(200).json(posts)
}
