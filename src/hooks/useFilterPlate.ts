import { IBarrelHistoryResponse, IPlateHistory } from '@/models/BarrelHistory'
import { tickMap } from '@/utils/chart'
import { format, isAfter, parse } from 'date-fns'

type DataType = {
  key: string
  value: number
}

export function useFilterPlate(
  data: IBarrelHistoryResponse | undefined,
  code: string | undefined,
) {
  if (!data || !code) {
    return
  }

  const section1: DataType[] = []
  const section2: DataType[] = []
  const section3: DataType[] = []

  const historyMap = new Map<string, IPlateHistory>()

  data.historico
    .filter((plate) => plate.codigo === code)
    .forEach((plateInfo) => {
      const [splitDate] = plateInfo.data.split(' ')
      const currDate = parse(plateInfo.data, 'yyyy-MM-dd HH:mm:ss', new Date())

      if (!historyMap.has(splitDate)) {
        historyMap.set(splitDate, plateInfo)
      } else {
        const actualRecord = historyMap.get(splitDate)!
        const actualRecordDate = parse(
          actualRecord.data,
          'yyyy-MM-dd HH:mm:ss',
          new Date(),
        )

        if (isAfter(currDate, actualRecordDate)) {
          historyMap.set(splitDate, plateInfo)
        }
      }
    })

  Array.from(historyMap.values()).forEach((plateInfo) => {
    const parseDate = parse(plateInfo.data, 'yyyy-MM-dd HH:mm:ss', new Date())
    const formatDate = format(parseDate, 'dd/MM')

    section1.push({ key: formatDate, value: tickMap[plateInfo.secoes.secao1] })
    section2.push({ key: formatDate, value: tickMap[plateInfo.secoes.secao2] })
    section3.push({ key: formatDate, value: tickMap[plateInfo.secoes.secao3] })
  })

  const result = [
    {
      name: 'Seção 1',
      data: section1,
    },
    {
      name: 'Seção 2',
      data: section2,
    },
    {
      name: 'Seção 3',
      data: section3,
    },
  ]

  return result
}
