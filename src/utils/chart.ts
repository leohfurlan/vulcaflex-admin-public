import { IBarrelDetailResponse } from '@/models/Barrel'

export const tickMap = {
  '-1': 1,
  '0': 2,
  '5': 3,
  '8': 4,
  '10': 5,
} as Record<string, number>

export const inverseTickMap = {
  1: 'erro',
  2: '<5mm',
  3: '<8mm',
  4: '<10mm',
  5: '>10mm',
} as Record<number, string>

export const mapBarrelChart = (data: IBarrelDetailResponse | undefined) => {
  if (!data) {
    return
  }

  const section1: number[] = []
  const section2: number[] = []
  const section3: number[] = []

  data.detalhes.forEach((plate) => {
    section1.push(plate.placas.secoes.secao1)
    section2.push(plate.placas.secoes.secao2)
    section3.push(plate.placas.secoes.secao3)
  })

  return [
    {
      name: 'Seção 1',
      data: section1
        .sort((a, b) => b - a)
        .map((el, index) => ({ value: tickMap[el], index })),
    },
    {
      name: 'Seção 2',
      data: section2
        .sort((a, b) => b - a)
        .map((el, index) => ({ value: tickMap[el], index })),
    },
    {
      name: 'Seção 3',
      data: section3
        .sort((a, b) => b - a)
        .map((el, index) => ({ value: tickMap[el], index })),
    },
  ]
}
