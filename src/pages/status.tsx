import { useState } from 'react'
import { Barrel } from '@/components/Barrel'
import { StatusForm } from '@/components/StatusForm'
import { Layout } from '@/components/template/Layout'
import { useFormContext } from '@/contexts/FormContext'
import { useGetBarrelDetail } from '@/hooks/useGetBarrelDetail'
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
import { inverseTickMap, mapBarrelChart } from '@/utils/chart'
import { colors } from '@/constants'

export default function StatusPage() {
  const [enabled, setEnabled] = useState(false)
  const { formData } = useFormContext()
  const { data } = useGetBarrelDetail(formData, enabled)

  const series = mapBarrelChart(data)

  return (
    <div>
      <Layout title="Status" subTitle="Informações das placas de um tambor">
        <section className="mt-6 text-gray-700">
          <div className="w-full flex flex-wrap gap-2 mb-12">
            <StatusForm handleClick={() => setEnabled(true)} />
          </div>
          <div className="flex gap-8">
            <div className="flex-1">{data ? <Barrel data={data} /> : null}</div>
            <div className="hidden lg:flex flex-1">
              {data ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart width={500}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="index"
                      type="category"
                      allowDuplicatedCategory={false}
                      tickFormatter={(tick) => tick + 1}
                    />
                    <YAxis
                      dataKey="value"
                      ticks={[1, 2, 3, 4, 5]}
                      tickFormatter={(tick) => inverseTickMap[tick]}
                      domain={[0, 5]}
                    />
                    <Tooltip formatter={(val: number) => inverseTickMap[val]} />
                    <Legend />
                    {series?.map((s, idx) => (
                      <Line
                        dataKey="value"
                        data={s.data}
                        name={s.name}
                        key={s.name}
                        stroke={colors[idx]}
                        type="monotone"
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              ) : null}
            </div>
          </div>
        </section>
      </Layout>
    </div>
  )
}
