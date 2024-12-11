import axios from 'axios'

interface IBarrelSpecificationResponse {
  especificacao: string
  lista: string[]
  qnt_placas: number
  qnt_processos: number
  qnt_tambores: number
  qnt_transportadores: number
}

export async function getBarrelSpecification(
  unity?: string,
  process?: string,
  transporter?: string,
  barrelId?: string,
) {
  const params = new URLSearchParams()

  if (unity) {
    params.append('unidadeCliente', unity)
  }

  if (process) {
    params.append('processoUnidade', process)
  }

  if (transporter) {
    params.append('transportadorCorreia', transporter)
  }

  if (barrelId) {
    params.append('tamborId', barrelId)
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
