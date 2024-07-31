import { Layout } from '@/components/template/Layout'
import {
  fakePlateHistory1,
  fakePlateHistory2,
  fakePlateHistory3,
  fetchPlateHistory,
} from '@/data/fakeHistory'
import { IPlateHistory } from '@/models/BarrelHistory'
import {
  inverseTickMap,
  mapSeries,
  mapHistory,
  tickMap,
  mapHistoryData,
} from '@/utils/chart'
import { useEffect, useState } from 'react'
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type SeriesType = {
  name: string
  data: IPlateHistory
  sortData: { value: string }[]
}

type SelectSerieType = {
  name: string
  data: { time: string; value: number }[]
}

export default function History() {
  const [series, setSeries] = useState<SeriesType[]>()
  const [plateName, setPlateName] = useState('')
  const [selectedPlate, setSelectedPlate] = useState<
    SelectSerieType[] | undefined
  >(undefined)

  const fetchPlate1 = async () => {
    return await fetchPlateHistory(fakePlateHistory1)
  }
  const fetchPlate2 = async () => {
    return await fetchPlateHistory(fakePlateHistory2)
  }
  const fetchPlate3 = async () => {
    return await fetchPlateHistory(fakePlateHistory3)
  }

  useEffect(() => {
    const fetchData = async () => {
      const [data1, data2, data3] = await Promise.all([
        fetchPlate1(),
        fetchPlate2(),
        fetchPlate3(),
      ])
      const res1 = mapHistory(data1 as IPlateHistory, 'Placa 18')
      const res2 = mapHistory(data2 as IPlateHistory, 'Placa 19')
      const res3 = mapHistory(data3 as IPlateHistory, 'Placa 20')
      setSeries([res1, res2, res3])
    }

    fetchData()
  }, [])

  const mappedSeries = series && mapSeries(series)
  const colors = ['#8884d8', '#82ca9d', '#ff7300']

  const handleClickLegend = (payload: { value: string }) => {
    setPlateName(payload.value)
    const selectItem = series?.find((el) => el.name === payload.value)
    const map = mapHistoryData(selectItem?.data!)
    setSelectedPlate(map)
  }
  return (
    <div>
      <Layout title="Histórico" subTitle="Informações de histórico de placa">
        <h6>Tambor: XXX-0102034</h6>
        <section className="mt-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart width={1024} height={300}>
              <XAxis
                dataKey="index"
                allowDuplicatedCategory={false}
                tickFormatter={(tick) => tick + 1}
              />
              <YAxis
                dataKey="value"
                ticks={Object.values(tickMap)}
                tickFormatter={(tick) => inverseTickMap[tick]}
                domain={[0, 5]}
              />
              <Tooltip formatter={(value: number) => inverseTickMap[value]} />
              <Legend onClick={handleClickLegend} />
              {mappedSeries?.map((s, idx) => (
                <Line
                  dataKey="value"
                  type="monotone"
                  data={s.data}
                  name={s.name}
                  key={s.name}
                  stroke={colors[idx]}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </section>

        {selectedPlate && (
          <section className="mt-12">
            <h2 className="mb-4 text-white font-bold">{plateName}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart width={1024} height={300}>
                <XAxis dataKey="time" allowDuplicatedCategory={false} />
                <YAxis
                  dataKey="value"
                  ticks={Object.values(tickMap)}
                  tickFormatter={(tick) => inverseTickMap[tick]}
                  domain={[0, 5]}
                />
                <Tooltip formatter={(value: number) => inverseTickMap[value]} />
                <Legend />
                {selectedPlate?.map((s, idx) => (
                  <Line
                    dataKey="value"
                    type="monotone"
                    data={s.data}
                    name={s.name}
                    key={s.name}
                    stroke={colors[idx]}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </section>
        )}
      </Layout>
    </div>
  )
}
