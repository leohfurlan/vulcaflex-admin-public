import axios from 'axios'

interface IBarrelSpecificationResponse {
  especificacao: string
  lista: string[]
}

export async function getBarrelSpecification(
  unity?: string,
  process?: string,
  transporter?: string,
) {
  const params = new URLSearchParams()

  if (unity) {
    params.append('unidades', unity)
  }

  if (process) {
    params.append('processos', process)
  }

  if (transporter) {
    params.append('transportadores', transporter)
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
