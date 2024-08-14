import { IPlate } from '@/models/Barrel'
import { PlateStatus } from '@/utils/plateStatus'
import { plateCodeColor, sectionColor } from '@/utils/plateStyles'

interface BarrelPlateProps {
  plate: IPlate
}

export function BarrelPlate({ plate }: BarrelPlateProps) {
  const thinest = Object.values(plate.secoes).sort((a, b) => a - b)[0]
  const { secao1, secao2, secao3 } = plate.secoes

  return (
    <div className="grid grid-cols-4 gap-3 px-3 border border-gray-600 p-2 rounded-lg cursor-pointer mt-1">
      <span className={`self-center font-bold ${plateCodeColor(thinest)}`}>
        {plate.codigo}
      </span>
      <div
        className={`border-2 ${sectionColor(
          secao1,
        )} p-1 rounded-lg text-center`}
      >
        {PlateStatus[secao1]}
      </div>
      <div
        className={`border-2 ${sectionColor(
          secao2,
        )} p-1 rounded-lg text-center`}
      >
        {PlateStatus[secao2]}
      </div>
      <div
        className={`border-2 ${sectionColor(
          secao3,
        )} p-1 rounded-lg text-center`}
      >
        {PlateStatus[secao3]}
      </div>
    </div>
  )
}
