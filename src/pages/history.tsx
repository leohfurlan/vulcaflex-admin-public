import { Layout } from '@/components/template/Layout'
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function History() {
  const series = [
    {
      name: 'Placa 1',
      data: [
        { time: '00:01', value: '<8mm' },
        { time: '00:02', value: '<8mm' },
        { time: '00:03', value: '<8mm' },
        { time: '00:04', value: '<8mm' },
        { time: '00:05', value: '<8mm' },
        { time: '00:06', value: '<8mm' },
      ],
    },
    {
      name: 'Placa 2',
      data: [
        { time: '00:01', value: '<5mm' },
        { time: '00:02', value: '<5mm' },
        { time: '00:03', value: '<5mm' },
        { time: '00:04', value: '<5mm' },
        { time: '00:05', value: '<5mm' },
        { time: '00:06', value: '<5mm' },
      ],
    },
    {
      name: 'Placa 3',
      data: [
        { time: '00:01', value: 'erro' },
        { time: '00:02', value: 'erro' },
        { time: '00:03', value: 'erro' },
        { time: '00:04', value: 'erro' },
        { time: '00:05', value: 'erro' },
        { time: '00:06', value: 'erro' },
      ],
    },
  ]

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
      <Layout title="Histórico" subTitle="Informações de histórico de placa">
        <h6>Tambor: XXX-0102034</h6>
        <section className="mt-6">
          <ResponsiveContainer width="100%" height={600}>
            <LineChart width={1024} height={300}>
              <XAxis
                dataKey="time"
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
              {mappedSeries.map((s) => (
                <Line
                  dataKey="value"
                  data={s.data}
                  name={s.name}
                  key={s.name}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </section>
      </Layout>
    </div>
  )
}
