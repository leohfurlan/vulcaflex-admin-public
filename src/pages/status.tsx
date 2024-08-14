import { Barrel } from '@/components/Barrel'
import { StatusForm } from '@/components/StatusForm'
import { Layout } from '@/components/template/Layout'
import { fakeBarrel } from '@/data/fakeBarrel'

export default function StatusPage() {
  const barrel = fakeBarrel

  const handleClick = (data: any) => {
    console.log(data)
  }

  return (
    <div>
      <Layout title="Status" subTitle="Informações das placas de um tambor">
        <section className="mt-6 text-gray-700">
          <div className="w-full flex flex-wrap gap-2 mb-4">
            <StatusForm handleClick={handleClick} />
          </div>
          <Barrel barrel={barrel} />
        </section>
      </Layout>
    </div>
  )
}
