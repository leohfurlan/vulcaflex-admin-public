import { useState } from 'react'
import { IBarrelDetailResponse } from '@/models/Barrel'
import { BarrelPlate } from './BarrelPlate'
import { EMPTY } from '@/constants'
import { Button } from './ui/button'
import { useDashboardContext } from '@/contexts/DashboardContext'

interface BarrelProps {
  data: IBarrelDetailResponse
}

export function Barrel({ data }: BarrelProps) {
  const { setPlateHistory } = useDashboardContext()
  const [selectedPlate, setSelectedPlate] = useState<string>(EMPTY)

  const handleSelectPlate = (code: string) => {
    return code === selectedPlate
      ? setSelectedPlate(EMPTY)
      : setSelectedPlate(code)
  }

  return (
    <div className="w-full max-w-[450px] min-w-[280px] border-t-4 border-gray-500 h-20 rounded-l-xl rounded-r-xl border-l-8 border-r-8 p-2">
      <div className="grid grid-cols-4 gap-3 px-3">
        <span className="text-xs lg:text-base">Placa</span>
        {data?.detalhes.placas.map((_, idx) => (
          <span key={idx} className="text-xs lg:text-base text-center">
            Seção {idx + 1}
          </span>
        ))}
      </div>
      <div>
        {/** upper div for scrolling when there are more than 3 barrels */}
        {data?.detalhes.placas.map((barrelPlate, idx) => (
          <BarrelPlate
            key={idx}
            plate={barrelPlate}
            onClick={() => handleSelectPlate(barrelPlate.codigo)}
            selectedPlate={selectedPlate}
          />
        ))}
      </div>
      <Button
        className="bg-orange-500 text-white hover:bg-orange-400 w-full mt-3"
        disabled={selectedPlate === EMPTY}
        onClick={() => setPlateHistory(selectedPlate)}
      >
        {selectedPlate !== EMPTY
          ? `Monitorar Placa ${selectedPlate}`
          : 'Selecione uma Placa'}
      </Button>
    </div>
  )
}
