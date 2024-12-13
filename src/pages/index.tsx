import { useState } from 'react'
import { StatusForm } from '@/components/StatusForm'
import { useFormContext } from '@/contexts/FormContext'
import { useGetBarrelDetail } from '@/hooks/useGetBarrelDetail'
import { CurrentUnity } from '@/components/CurrentUnity'
import { CurrentThickness } from '@/components/CurrentThickness'
import { BarrelDetail } from '@/components/BarrelDetail'
import { BarrelListChart } from '@/components/BarrelListChat'
import { useDashboardContext } from '@/contexts/DashboardContext'
import { BarrelHistoryChart } from '@/components/BarrelHistoryChart'
import { Button } from '@/components/ui/button'
import { MapComponent } from '@/components/MapComponent'
import { ArrowLeftCircle } from 'lucide-react'

export default function Home() {
  const [enabled, setEnabled] = useState(false)
  const { formData } = useFormContext()
  const { plateHistory, setPlateHistory } = useDashboardContext()
  const { data } = useGetBarrelDetail(formData, enabled)

  return (
    <div className="flex flex-col mb-6">
      <div className="w-full h-20 bg-slate-600 px-2 py-3 flex items-center">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="bg-slate-800 p-2 rounded-full text-sm w-14 h-14 flex items-center justify-center">
            <span className="text-white font-bold">LLK</span>
          </div>
        </div>
      </div>

      {/* max-width: 640px */}
      <main className="mx-auto max-w-[340px] mt-2 flex flex-col gap-4 lg:hidden">
        <div className="bg-slate-300 rounded-md mx-auto px-3 py-6">
          <StatusForm handleClick={() => setEnabled(true)} />
        </div>

        <div className="bg-slate-300 grid grid-cols-2 grid-rows-2 gap-4 rounded-md px-3 py-6">
          <CurrentUnity />
        </div>

        <div className="bg-slate-300 flex flex-col p-4 rounded-md">
          <CurrentThickness />
        </div>

        {!plateHistory ? <MapComponent /> : null}

        {formData.barrel && data && !plateHistory ? (
          <div className="flex flex-col gap-48 bg-slate-300 px-2 py-4 rounded-md">
            <BarrelListChart data={data} />
          </div>
        ) : null}

        {formData.barrel && plateHistory ? (
          <div className="bg-slate-300 p-4 rounded-md min-h-[332px] relative">
            <div className="flex gap-4 p-2 rounded-md">
              <span className="font-bold">Placa: {plateHistory}</span>
              <span className="font-bold">Tambor: {formData.barrel}</span>
            </div>
            <BarrelHistoryChart />
            <Button
              className="absolute top-4 right-4 flex gap-2 bg-indigo-600 hover:bg-indigo-400"
              onClick={() => setPlateHistory('')}
            >
              <ArrowLeftCircle />
            </Button>
          </div>
        ) : null}
      </main>

      {/** screens over 1024px */}
      <main className="hidden lg:flex gap-12 mt-6 w-full max-w-[1200px] mx-auto">
        <section className="bg-slate-300 p-6 rounded-md mx-auto flex flex-col">
          <StatusForm handleClick={() => setEnabled(true)} />
          {data && !plateHistory ? <BarrelDetail data={data} /> : null}
        </section>

        <section className="flex flex-col flex-1 gap-4 mx-auto">
          <div className="bg-slate-300 flex gap-8 p-4 rounded-md">
            <CurrentUnity />
          </div>
          <div className="bg-slate-300 flex flex-col p-4 rounded-md">
            <CurrentThickness />
          </div>

          {!plateHistory ? <MapComponent /> : null}

          {formData.barrel && data && !plateHistory ? (
            <div className="flex gap-2 bg-slate-300 p-4 rounded-md">
              <BarrelListChart data={data} />
            </div>
          ) : null}

          {formData.barrel && plateHistory ? (
            <div className="bg-slate-300 p-4 rounded-md min-h-[332px] relative">
              <div className="flex gap-4 p-2 rounded-md">
                <span className="font-bold">Placa: {plateHistory}</span>
                <span className="font-bold">Tambor: {formData.barrel}</span>
              </div>
              <BarrelHistoryChart />
              <Button
                className="absolute top-4 right-4 flex gap-2 bg-indigo-600 hover:bg-indigo-400"
                onClick={() => setPlateHistory('')}
              >
                <ArrowLeftCircle />
              </Button>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  )
}
