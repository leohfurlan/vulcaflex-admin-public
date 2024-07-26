import { useState } from 'react'
import { BarrelPlate } from './BarrelPlate'
import { BarrelPlateType, IBarrel } from '@/models/Barrel'
import { setPlateStyle } from '@/utils/setPlateStyle'

interface BarrelProps {
  barrel: IBarrel
}

export function Barrel({ barrel }: BarrelProps) {
  const [currentPlate, setCurrentPlate] = useState<BarrelPlateType>(
    barrel.placas[0],
  )
  return (
    <>
      <div className="w-full max-w-[640px] mb-6">
        {barrel.placas.map((plate, idx) => {
          const style = setPlateStyle(
            plate,
            idx === 0,
            idx === barrel.placas.length - 1,
          )
          return (
            <div
              key={`${plate[0]}-${idx}`}
              className={style}
              onClick={() => setCurrentPlate(plate)}
            >
              <span className="text-xl font-bold">Placa {plate[0]}</span>
            </div>
          )
        })}
      </div>

      <BarrelPlate plate={currentPlate} />
    </>
  )
}
