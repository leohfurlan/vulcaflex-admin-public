import { Barrel } from '@/components/Barrel'
import { Layout } from '@/components/template/Layout'
import { fakeBarrel } from '@/data/fakeBarrel'

export default function StatusPage() {
  const barrel = fakeBarrel

  return (
    <div>
      <Layout title="Status" subTitle="Informações das placas de um tambor">
        <h6>Tambor: XXX-0102034</h6>
        <section className="mt-6">
          <Barrel barrel={barrel} />
        </section>
      </Layout>
    </div>
  )
}
