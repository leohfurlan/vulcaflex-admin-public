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

export default function Home() {
  const [enabled, setEnabled] = useState(false)
  const { formData } = useFormContext()
  const { data } = useGetBarrelDetail(formData, enabled)
  const dataBar = mapBarrelChart(data)

  return (
    <div className="flex flex-col">
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

        <div className="bg-slate-300 flex flex-col">
          <span className="text-2xl text-center uppercase">
            espessura dos revestimentos dos tambores
          </span>
          <div className="grid grid-cols-2 grid-rows-3 gap-2">
            <div className="flex flex-col items-center justify-center bg-green-600 rounded-md p-5 text-white">
              <span className="text-2xl">{'>10mm'}</span>
              <span className="text-xl">10</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-orange-600 rounded-md text-white">
              <span className="text-2xl">{'<10mm'}</span>
              <span className="text-xl">10</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-yellow-500 rounded-md text-white">
              <span className="text-2xl">{'<8mm'}</span>
              <span className="text-xl">10</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-red-600 rounded-md text-white">
              <span className="text-2xl">{'<5mm'}</span>
              <span className="text-xl">10</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-black rounded-md col-span-2 text-white">
              <span className="text-2xl">erro de leitura</span>
              <span className="text-xl">10</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex-1 max-w-[600px]">
            {data ? <Barrel data={data} /> : null}
          </div>
          <div className="mt-24 lg:flex flex-1 max-w-[600px]">
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
                    formatter={(val: number) => [inverseTickMap[val], 'Valor']}
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
      </main>
    </div>
  )
}
