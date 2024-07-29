import { IPlateHistory } from '@/models/BarrelHistory'

export const tickMap = {
  erro: 1,
  '<5mm': 2,
  '<8mm': 3,
  '<10mm': 4,
  '>10mm': 5,
} as Record<string, number>

export const inverseTickMap = {
  1: 'erro',
  2: '<5mm',
  3: '<8mm',
  4: '<10mm',
  5: '>10mm',
} as Record<number, string>

export const mapSeries = (
  series: { name: string; data: { value: string }[] }[],
) => {
  return series.map((s) => ({
    ...s,
    data: s.data.map((d, index) => ({
      ...d,
      value: tickMap[d.value],
      index,
    })),
  }))
}

export const sortHistory = (history: IPlateHistory, plateName: string) => {
  const result: { value: number }[] = []
  history.historico.forEach((arr) => {
    arr.slice(1).forEach((depth) => {
      result.push({ value: tickMap[depth] })
    })
  })

  const sortedResult = result
    .sort((a, b) => a.value - b.value)
    .map((el) => ({ value: inverseTickMap[el.value] }))
    .slice(0, 15)

  return { name: plateName, data: sortedResult }
}
