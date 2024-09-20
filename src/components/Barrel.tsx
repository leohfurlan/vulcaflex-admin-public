import { useState } from 'react'
import { IBarrelDetailResponse, IPlate } from '@/models/Barrel'
import { BarrelPlate } from './BarrelPlate'
import { EMPTY } from '@/constants'
import { Button } from './ui/button'
import { useRouter } from 'next/router'

interface BarrelProps {
  data: IBarrelDetailResponse
}

export function Barrel({ data }: BarrelProps) {
  const router = useRouter()
  const [selectedPlate, setSelectedPlate] = useState<string>(EMPTY)

  const handleSelectPlate = (code: string) => {
    return code === selectedPlate
      ? setSelectedPlate(EMPTY)
      : setSelectedPlate(code)
  }

  return (
    <div className="w-full max-w-[480px] min-w-[280px] border-t-4 border-gray-500 h-20 rounded-l-xl rounded-r-xl border-l-8 border-r-8 p-2 relative">
      <div className="absolute h-4 w-4 bg-gray-500 top-7 -right-5 rounded-r-sm"></div>
      <div className="absolute h-4 w-4 bg-gray-500 top-7 -left-5 rounded-l-sm"></div>
      <div className="grid grid-cols-4 gap-3 px-3">
        <span className="text-xs md:text-lg">Placa</span>
        <span className="text-xs md:text-lg text-center">Seção 1</span>
        <span className="text-xs md:text-lg text-center">Seção 2</span>
        <span className="text-xs md:text-lg text-center">Seção 3</span>
      </div>
      <div>
        {/** upper div for scrolling when there are more than 3 barrels */}
        {data?.detalhes.map((barrelPlate, idx) => (
          <BarrelPlate
            key={idx}
            plate={barrelPlate.placas}
            onClick={() => handleSelectPlate(barrelPlate.placas.codigo)}
            selectedPlate={selectedPlate}
          />
        ))}
      </div>
      <Button
        className="bg-orange-500 text-white hover:bg-orange-400 w-full md:w-fit mt-3"
        disabled={selectedPlate === EMPTY}
        onClick={() => router.push(`/history?plate=${selectedPlate}`)}
      >
        {selectedPlate !== EMPTY
          ? `Monitorar Placa ${selectedPlate}`
          : 'Selecione uma Placa'}
      </Button>
    </div>
  )
}
