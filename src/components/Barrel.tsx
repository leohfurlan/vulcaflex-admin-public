import { IBarrelDetailsResponse } from '@/models/Barrel'
import { BarrelPlate } from './BarrelPlate'

interface BarrelProps {
  barrel: IBarrelDetailsResponse
}

export function Barrel({ barrel }: BarrelProps) {
  return (
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
        {barrel.placas.map((plate) => (
          <BarrelPlate key={plate.codigo} plate={plate} />
        ))}
      </div>
    </div>
  )
}
