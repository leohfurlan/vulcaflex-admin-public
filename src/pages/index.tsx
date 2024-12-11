import { useState } from 'react'
import { Barrel } from '@/components/Barrel'
import { StatusForm } from '@/components/StatusForm'
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
import { CurrentUnity } from '@/components/CurrentUnity'
import { CurrentThickness } from '@/components/CurrentThickness'

export default function Home() {
  const [enabled, setEnabled] = useState(false)
  const { formData } = useFormContext()
  const { data } = useGetBarrelDetail(formData, enabled)
  const dataBar = mapBarrelChart(data)

  return (
    <div className="flex flex-col mb-6">
      <div className="w-full h-20 bg-slate-600 px-2 py-3 flex items-center">
        <div className="bg-slate-800 p-2 rounded-full text-sm w-14 h-14 flex items-center justify-center">
          <span className="text-white font-bold">LLK</span>
        </div>
      </div>

      <main className="mx-auto max-w-[340px] mt-2 flex flex-col gap-4">
        <div className="bg-slate-300 rounded-md mx-auto px-3 py-6">
          <StatusForm handleClick={() => setEnabled(true)} />
        </div>

        <div className="bg-slate-300 grid grid-cols-2 grid-rows-2 gap-4 rounded-md px-3 py-6">
          <CurrentUnity />
        </div>

        <div className="bg-slate-300 flex flex-col p-4 rounded-md">
          <CurrentThickness />
        </div>

        {!!formData.barrel ? (
          <div className="flex flex-col gap-48 bg-slate-300 px-2 py-4 rounded-md">
            <div className="flex-1 max-w-[600px]">
              {data ? <Barrel data={data} /> : null}
            </div>
            <div className="lg:flex flex-1 max-w-[600px]">
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
        ) : null}
      </main>
    </div>
  )
}
