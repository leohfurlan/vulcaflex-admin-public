import { Barrel } from '@/components/Barrel'
import { Layout } from '@/components/template/Layout'
import { fakeBarrel } from '@/data/fakeBarrel'

export default function StatusPage() {
  const barrel = fakeBarrel

  return (
    <div>
      <Layout title="Status" subTitle="Informações das placas de um tambor">
        <h6 className="text-gray-800">
          Cliente: 0001 | Unidade: 0001 | Processo: 0001 | Transportador: 0001 |
          Tambor: XXX-0102034
        </h6>
        <section className="mt-6 text-gray-700">
          {/* <Barrel barrel={barrel} /> */}
          <div className="w-full max-w-[480px] border-t-4 border-gray-500 h-20 rounded-l-xl rounded-r-xl border-l-8 border-r-8 p-2 relative">
            <div className="absolute h-4 w-4 bg-gray-500 top-7 -right-5 rounded-r-sm"></div>
            <div className="absolute h-4 w-4 bg-gray-500 top-7 -left-5 rounded-l-sm"></div>
            <div className="grid grid-cols-4 gap-3 px-3">
              <span>Placa</span>
              <span className="text-center">Seção 1</span>
              <span className="text-center">Seção 2</span>
              <span className="text-center">Seção 3</span>
            </div>
            <div>
              {/** upper div for scrolling when there are more than 3 barrels */}
              <div className="grid grid-cols-4 gap-3 px-3 border border-gray-600 p-2 rounded-lg cursor-pointer mt-1">
                <span className="self-center font-bold text-green-600">18</span>
                <div className="border-2 border-green-600 p-1 rounded-lg text-center">
                  {'>10mm'}
                </div>
                <div className="border-2 border-green-600 p-1 rounded-lg text-center">
                  {'>10mm'}
                </div>
                <div className="border-2 border-green-600 p-1 rounded-lg text-center">
                  {'>10mm'}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 px-3 border border-gray-600 p-2 rounded-lg cursor-pointer mt-1">
                <span className="self-center font-bold text-yellow-500">
                  19
                </span>
                <div className="border-2 border-green-600 p-1 rounded-lg text-center">
                  {'>10mm'}
                </div>
                <div className="border-2 border-yellow-500 p-1 rounded-lg text-center">
                  {'<10mm'}
                </div>
                <div className="border-2 border-yellow-500 p-1 rounded-lg text-center">
                  {'<10mm'}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 px-3 border border-gray-600 p-2 rounded-lg cursor-pointer mt-1">
                <span className="self-center font-bold text-red-600">20</span>
                <div className="border-2 border-red-600 p-1 rounded-lg text-center">
                  {'<5mm'}
                </div>
                <div className="border-2 border-red-600 p-1 rounded-lg text-center">
                  {'<5mm'}
                </div>
                <div className="border-2 border-orange-400 p-1 rounded-lg text-center">
                  {'<8mm'}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  )
}
