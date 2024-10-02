import { IBarrelHistoryResponse } from '@/models/BarrelHistory'
import axios from 'axios'

export async function getBarrelHistory(params: URLSearchParams) {
  try {
    const response = await axios.get<IBarrelHistoryResponse>(
      '/api/barrel-history',
      { params },
    )
    return response.data
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}
