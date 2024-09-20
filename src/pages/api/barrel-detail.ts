import type { NextApiRequest, NextApiResponse } from 'next'
import { api } from '@/services/api/api-routes'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { data } = await api.get('/tambor_detalhes', { params: req.query })
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: 'Erro Tambor Detalhes!' })
  }
}
