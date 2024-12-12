import { IBarrelDetailResponse } from '@/models/Barrel'
import { inverseTickMap, mapBarrelChart } from '@/utils/chart'
import { Barrel } from './Barrel'
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface Props {
  data: IBarrelDetailResponse
}

export function BarrelListChart({ data }: Props) {
  const dataBar = mapBarrelChart(data)

  return (
    <>
      <div className="flex flex-1 max-w-[600px]">
        <Barrel data={data} />
      </div>
      <div className="flex flex-1 max-w-[600px]">
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
      </div>
    </>
  )
}
