import { EMPTY } from '@/constants'
import { IPlate } from '@/models/Barrel'
import { PlateStatus } from '@/utils/plateStatus'
import { plateCodeColor, sectionColor, textColor } from '@/utils/plateStyles'

interface BarrelPlateProps {
  plate: IPlate
  onClick: () => void
  selectedPlate: string
}

export function BarrelPlate({
  plate,
  onClick,
  selectedPlate,
}: BarrelPlateProps) {
  const thinest = Object.values(plate.secoes).sort((a, b) => a - b)[0]
  const { secao1, secao2, secao3 } = plate.secoes
  const removeStyle = selectedPlate !== EMPTY && selectedPlate !== plate.codigo
  const thickBorder = selectedPlate === plate.codigo ? 'border-2' : 'border'

  return (
    <div
      className={`grid grid-cols-4 gap-3 px-3 ${thickBorder} border-gray-600 p-2 rounded-lg cursor-pointer mt-1`}
      onClick={onClick}
    >
      <span
        className={`self-center font-bold text-xs md:text-xl ${plateCodeColor(
          thinest,
          removeStyle,
        )}`}
      >
        {plate.codigo}
      </span>
      <div
        className={`flex justify-center items-center border-2 text-xs md:text-lg ${sectionColor(
          secao1,
          removeStyle,
        )} p-1 rounded-lg text-center`}
      >
        <span className={`${textColor(removeStyle)}`}>
          {PlateStatus[secao1]}
        </span>
      </div>
      <div
        className={`flex justify-center items-center border-2 text-xs md:text-lg ${sectionColor(
          secao2,
          removeStyle,
        )} p-1 rounded-lg text-center`}
      >
        <span className={`${textColor(removeStyle)}`}>
          {PlateStatus[secao2]}
        </span>
      </div>
      <div
        className={`flex justify-center items-center border-2 text-xs md:text-lg ${sectionColor(
          secao3,
          removeStyle,
        )} p-1 rounded-lg text-center`}
      >
        <span className={`${textColor(removeStyle)}`}>
          {PlateStatus[secao3]}
        </span>
      </div>
    </div>
  )
}
