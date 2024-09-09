import { Layout } from '@/components/template/Layout'
import {
  fakeHistory1,
  fakeHistory2,
  fakeHistory3,
  SeriesType,
} from '@/data/fakeHistory'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function StatusPage() {
  const router = useRouter()
  const { plate } = router.query
  const [series, setSeries] = useState<SeriesType>([])

  const colors = ['#8884d8', '#82ca9d', '#ff7300']

  useEffect(() => {
    if (plate && Number(plate) >= 36 && Number(plate) <= 38) {
      setSeries(fakeHistory1)
    }

    if (plate && Number(plate) >= 39 && Number(plate) <= 41) {
      setSeries(fakeHistory2)
    }

    if (plate && Number(plate) >= 42 && Number(plate) <= 44) {
      setSeries(fakeHistory3)
    }
  }, [plate])

  const tickMap = {
    erro: 1,
    '<5mm': 2,
    '<8mm': 3,
    '<10mm': 4,
    '>10mm': 5,
  } as Record<string, number>

  const inverseTickMap = {
    1: 'erro',
    2: '<5mm',
    3: '<8mm',
    4: '<10mm',
    5: '>10mm',
  } as Record<number, string>

  const mappedSeries = series.map((s) => ({
    ...s,
    data: s.data.map((d) => ({
      ...d,
      value: tickMap[d.value],
    })),
  }))

  return (
    <div>
      <Layout title="Histórico" subTitle="Informações de histórico da placa">
        <section className="mt-6 text-gray-700">
          <h6 className="mb-4 font-bold">Histórico da Placa {plate}</h6>
          <ResponsiveContainer width="100%" height={600}>
            <LineChart width={500} height={300}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="category"
                type="category"
                allowDuplicatedCategory={false}
              />
              <YAxis
                dataKey="value"
                ticks={Object.values(tickMap)}
                tickFormatter={(tick) => inverseTickMap[tick]}
                domain={[0, 5]}
              />
              <Tooltip formatter={(value: number) => inverseTickMap[value]} />
              <Legend />
              {mappedSeries.map((s, idx) => (
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
      </Layout>
    </div>
  )
}
