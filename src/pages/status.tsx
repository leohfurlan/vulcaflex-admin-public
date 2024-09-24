import { useState } from 'react'
import { Barrel } from '@/components/Barrel'
import { StatusForm } from '@/components/StatusForm'
import { Layout } from '@/components/template/Layout'
import { useFormContext } from '@/contexts/FormContext'
import { useGetBarrelDetail } from '@/hooks/useGetBarrelDetail'
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { inverseTickMap, mapBarrelChart } from '@/utils/chart'

export default function StatusPage() {
  const [enabled, setEnabled] = useState(false)
  const { formData } = useFormContext()
  const { data } = useGetBarrelDetail(formData, enabled)

  const dataBar = mapBarrelChart(data)

  return (
    <div>
      <Layout title="Status" subTitle="Informações das placas de um tambor">
        <section className="mt-6 text-gray-700">
          <div className="w-full flex flex-wrap gap-2 mb-12">
            <StatusForm handleClick={() => setEnabled(true)} />
          </div>
          <div className="flex gap-8">
            <div className="flex-1 max-w-[600px]">
              {data ? <Barrel data={data} /> : null}
            </div>
            <div className="hidden lg:flex flex-1 max-w-[600px]">
              {data ? (
                <ResponsiveContainer width="100%" minWidth={300} height={300}>
                  <BarChart width={300} height={40} data={dataBar}>
                    <XAxis dataKey="key" />
                    <Bar dataKey="value">
                      {dataBar?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                    <Tooltip
                      formatter={(val: number) => [
                        inverseTickMap[val],
                        'Valor',
                      ]}
                      contentStyle={{ backgroundColor: '#FFF' }}
                      cursor={{ fill: 'transparent' }}
                    />
                    <YAxis
                      dataKey="value"
                      ticks={[1, 2, 3, 4, 5]}
                      tickFormatter={(tick) => inverseTickMap[tick]}
                      domain={[0.5, 5]}
                      padding={{ top: 10 }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : null}
            </div>
          </div>
        </section>
      </Layout>
    </div>
  )
}
