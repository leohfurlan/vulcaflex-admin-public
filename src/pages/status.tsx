import { Barrel } from '@/components/Barrel'
import { IFormValues, StatusForm } from '@/components/StatusForm'
import { Layout } from '@/components/template/Layout'
import { fakeBarrel1, fakeBarrel2, fakeBarrel3 } from '@/data/fakeBarrel'
import { IBarrelDetailsResponse } from '@/models/Barrel'
import { useState } from 'react'

export default function StatusPage() {
  const [currentBarrel, setCurrentBarrel] = useState<IBarrelDetailsResponse>()

  const handleClick = (data: IFormValues) => {
    if (data && data.barrel) {
      if (data.barrel === '0001') {
        setCurrentBarrel(fakeBarrel1)
      }

      if (data.barrel === '0002') {
        setCurrentBarrel(fakeBarrel2)
      }

      if (data.barrel === '0003') {
        setCurrentBarrel(fakeBarrel3)
      }
    }
  }

  return (
    <div>
      <Layout title="Status" subTitle="Informações das placas de um tambor">
        <section className="mt-6 text-gray-700">
          <div className="w-full flex flex-wrap gap-2 mb-4">
            <StatusForm handleClick={handleClick} />
          </div>
          {currentBarrel ? <Barrel barrel={currentBarrel} /> : null}
        </section>
      </Layout>
    </div>
  )
}
