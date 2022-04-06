// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Categories } from '../../../services/posts'
import { getCategories } from '../../../services/posts'

type Data = Categories

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const categories = await getCategories()
  res.status(200).json(categories)
}
