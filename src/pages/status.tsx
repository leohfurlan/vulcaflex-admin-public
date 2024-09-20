import { useState } from 'react'
import { Barrel } from '@/components/Barrel'
import { StatusForm } from '@/components/StatusForm'
import { Layout } from '@/components/template/Layout'
import { useFormContext } from '@/contexts/FormContext'
import { useGetBarrelDetail } from '@/hooks/useGetBarrelDetail'

export default function StatusPage() {
  const [enabled, setEnabled] = useState(false)
  const { formData } = useFormContext()
  const { data } = useGetBarrelDetail(formData, enabled)

  return (
    <div>
      <Layout title="Status" subTitle="Informações das placas de um tambor">
        <section className="mt-6 text-gray-700">
          <div className="w-full flex flex-wrap gap-2 mb-4">
            <StatusForm handleClick={() => setEnabled(true)} />
          </div>
          {data ? <Barrel data={data} /> : null}
        </section>
      </Layout>
    </div>
  )
}
