import { IBarrelDetailResponse } from '@/models/Barrel'
import axios from 'axios'

export async function getBarrelDetail(params: URLSearchParams) {
  try {
    const response = await axios.get<IBarrelDetailResponse>(
      '/api/barrel-detail',
      { params },
    )
    return response.data
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}
