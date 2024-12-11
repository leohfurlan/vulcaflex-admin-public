import { useDashboardContext } from '@/contexts/DashboardContext'

export function CurrentThickness() {
  const { dashboard } = useDashboardContext()
  const { currThickness } = dashboard

  const classes = 'flex flex-col items-center justify-center rounded-md p-5'
  return (
    <>
      <span className="text-center uppercase font-bold mb-4">
        espessura dos revestimentos dos tambores
      </span>
      <div className="grid grid-cols-2 grid-rows-3 gap-2 text-white">
        <div className={`${classes} bg-green-600`}>
          <span className="text-xl">{'>10mm'}</span>
          <span>{currThickness.get(10) || 0}</span>
        </div>
        <div className={`${classes} bg-yellow-500`}>
          <span className="text-xl">{'<10mm'}</span>
          <span>{currThickness.get(8) || 0}</span>
        </div>
        <div className={`${classes} bg-orange-400`}>
          <span className="text-xl">{'<8mm'}</span>
          <span>{currThickness.get(5) || 0}</span>
        </div>
        <div className={`${classes} bg-red-600`}>
          <span className="text-xl">{'<5mm'}</span>
          <span>{currThickness.get(0) || 0}</span>
        </div>
        <div className={`${classes} bg-black col-span-2`}>
          <span className="text-xl">Erro de leitura</span>
          <span>{currThickness.get(-1) || 0}</span>
        </div>
      </div>
    </>
  )
}
