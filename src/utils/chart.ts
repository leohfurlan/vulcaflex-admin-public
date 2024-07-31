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
  series: {
    name: string
    sortData: { value: string }[]
    data: IPlateHistory
  }[],
) => {
  return series.map((s) => ({
    ...s,
    data: s.sortData.map((d, index) => ({
      ...d,
      value: tickMap[d.value],
      index,
    })),
  }))
}

export const mapHistory = (history: IPlateHistory, plateName: string) => {
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

  return { name: plateName, data: history, sortData: sortedResult }
}

export const mapHistoryData = (history: IPlateHistory) => {
  const section1: { time: string; value: number }[] = []
  const section2: { time: string; value: number }[] = []
  const section3: { time: string; value: number }[] = []

  history.historico.forEach((arr) => {
    const time = arr[0].split(' ')[1].substring(0, 5)
    section1.push({ time, value: tickMap[arr[1]] })
    section2.push({ time, value: tickMap[arr[2]] })
    section3.push({ time, value: tickMap[arr[3]] })
  })

  return [
    { name: 'Seção 1', data: section1 },
    { name: 'Seção 2', data: section2 },
    { name: 'Seção 3', data: section3 },
  ]
}
