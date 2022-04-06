// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Tags } from '../../../services/posts'
import { getTags } from '../../../services/posts'

type Data = Tags

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tags = await getTags()
  res.status(200).json(tags)
}
