import { BarrelPlateType } from '@/models/Barrel'
import { getPlateColor, PlateStatusOrder } from '@/utils/plateStatus'

interface BarrelPlateProps {
  plate: BarrelPlateType
}

export function BarrelPlate({ plate }: BarrelPlateProps) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Placa {plate[0]}</h2>
      <div className="w-full max-w-[640px] border border-gray-500 flex justify-between rounded-sm pt-2 pb-4">
        {plate.slice(1).map((value, idx) => {
          const plateStatus = PlateStatusOrder[value as keyof object]
          const bgColor = getPlateColor(plateStatus)
          return (
            <div className="flex-1 text-center">
              <h2 className="border-b-2 border-b-gray-500 mb-3 text-gray-200 font-bold">
                seção {idx + 1}
              </h2>
              <div
                className={`h-8 rounded-sm flex items-center justify-center mx-2 ${bgColor}`}
              >
                <span className="text-white text-sm">{value}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
