import { useDashboardContext } from '@/contexts/DashboardContext'

export function CurrentThickness() {
  const { dashboard } = useDashboardContext()
  const { currThickness } = dashboard

  const classes =
    'flex flex-col flex-1 gap-2 items-center justify-center rounded-md p-5'

  return (
    <>
      <span className="text-center uppercase font-bold mb-4">
        espessura dos revestimentos dos tambores
      </span>
      <div className="grid grid-cols-2 grid-rows-3 gap-2 lg:flex text-white">
        <div className={`${classes} bg-green-600`}>
          <span className="text-4xl">{currThickness.get(10) || 0}</span>
          <span className="text-sm">{'>10mm'}</span>
        </div>
        <div className={`${classes} bg-yellow-500`}>
          <span className="text-4xl">{currThickness.get(8) || 0}</span>
          <span className="text-sm">{'<10mm'}</span>
        </div>
        <div className={`${classes} bg-orange-400`}>
          <span className="text-4xl">{currThickness.get(5) || 0}</span>
          <span className="text-sm">{'<8mm'}</span>
        </div>
        <div className={`${classes} bg-red-600`}>
          <span className="text-4xl">{currThickness.get(0) || 0}</span>
          <span className="text-sm">{'<5mm'}</span>
        </div>
        <div className={`${classes} bg-black col-span-2`}>
          <span className="text-4xl">{currThickness.get(-1) || 0}</span>
          <span className="text-sm">Erro de leitura</span>
        </div>
      </div>
    </>
  )
}
