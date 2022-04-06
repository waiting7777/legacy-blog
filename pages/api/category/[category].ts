// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Posts } from '../../../services/posts'
import { getPostsByCategory } from '../../../services/posts'

type Data = Posts

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { category } = req.query as { category: string }
  console.log(category)
  const posts = await getPostsByCategory(category)
  res.status(200).json(posts)
}
