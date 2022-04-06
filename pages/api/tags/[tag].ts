// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Posts } from '../../../services/posts'
import { getPostsByTag } from '../../../services/posts'

type Data = Posts

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { tag } = req.query as { tag: string }
  const posts = await getPostsByTag(tag)
  res.status(200).json(posts)
}
