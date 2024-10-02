import { DateRangePicker } from '@/components/DateRangePicker'
import { Layout } from '@/components/template/Layout'
import { colors } from '@/constants'
import { useFormContext } from '@/contexts/FormContext'
import { useFilterPlate } from '@/hooks/useFilterPlate'
import { useGetBarrelHistory } from '@/hooks/useGetBarrelHistory'
import { inverseTickMap } from '@/utils/chart'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { useState } from 'react'
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
  const { plateId } = router.query
  const { formData } = useFormContext()

  const [enabled, setEnabled] = useState(false)
  const [startDate, setStartDate] = useState<string | undefined>(undefined)
  const [endDate, setEndDate] = useState<string | undefined>(undefined)

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

  const mappedSeries = useFilterPlate(data, plateId as string)

  return (
    <div>
      <Layout title="Histórico" subTitle="Informações de histórico da placa">
        <section className="mt-6 text-gray-700">
          <h6 className="mb-4 font-bold">
            Histórico da Placa {plateId}, Tambor: {formData.barrel}
          </h6>
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
        </section>
      </Layout>
    </div>
  )
}
