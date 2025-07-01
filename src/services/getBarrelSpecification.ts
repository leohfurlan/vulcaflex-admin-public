import axios from 'axios'
import { IBarrelSpecificationResponse } from '@/models/BarrelSpecification'

export async function getBarrelSpecification(
  unity?: string,
  process?: string,
  transporter?: string,
  barrelId?: string,
) {
  const params = new URLSearchParams()

  if (unity) {
    params.append('unidade', unity)
  }

  if (process) {
    params.append('processo', process)
  }

  if (transporter) {
    params.append('transportador', transporter)
  }

  if (barrelId) {
    params.append('Id', barrelId)
  }

  try {
    const response = await axios.get<IBarrelSpecificationResponse>(
      '/api/barrel-specification',
      { params },
    )
    return response.data
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}
