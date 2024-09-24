import { IBarrelDetailResponse } from '@/models/Barrel'
import { chartColor } from './chartColor'

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
      key: 'Seção 1',
      value: tickMap[Math.min(...section1)],
      color: chartColor(Math.min(...section1)),
    },
    {
      key: 'Seção 2',
      value: tickMap[Math.min(...section2)],
      color: chartColor(Math.min(...section2)),
    },
    {
      key: 'Seção 3',
      value: tickMap[Math.min(...section3)],
      color: chartColor(Math.min(...section3)),
    },
  ]
}
