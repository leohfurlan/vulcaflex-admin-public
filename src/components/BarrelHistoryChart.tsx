import { useState } from 'react'
import { useGetBarrelHistory } from '@/hooks/useGetBarrelHistory'
import { useFilterPlate } from '@/hooks/useFilterPlate'
import { useFormContext } from '@/contexts/FormContext'
import { DateRangePicker } from '@/components/DateRangePicker'
import { inverseTickMap } from '@/utils/chart'
import { colors } from '@/constants'
import { useDashboardContext } from '@/contexts/DashboardContext'
import { format } from 'date-fns'
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

export function BarrelHistoryChart() {
  const [enabled, setEnabled] = useState(false)
  const [startDate, setStartDate] = useState<string | undefined>(undefined)
  const [endDate, setEndDate] = useState<string | undefined>(undefined)

  const { formData } = useFormContext()
  const { plateHistory } = useDashboardContext()

  const { data } = useGetBarrelHistory(
    formData,
    startDate!,
    endDate!,
    !!startDate && !!endDate && enabled,
  )

  const handleClick = (
    startDate: Date | undefined,
    endDate: Date | undefined,
  ) => {
    setStartDate(format(startDate!, 'yyyy-MM-dd'))
    setEndDate(format(endDate!, 'yyyy-MM-dd'))
    setEnabled(true)
  }

  const mappedSeries = useFilterPlate(data, plateHistory)

  return (
    <>
      <DateRangePicker onClick={handleClick} />
      {data ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart width={500} height={400}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="key"
              type="category"
              allowDuplicatedCategory={false}
            />
            <YAxis
              dataKey="value"
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={(tick) => inverseTickMap[tick]}
              domain={[0, 5]}
            />
            <Tooltip formatter={(value: number) => inverseTickMap[value]} />
            <Legend />
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
      ) : null}
    </>
  )
}
