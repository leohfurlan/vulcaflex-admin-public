import { IBarrelDetailResponse } from '@/models/Barrel'
import { format, parse } from 'date-fns'

interface Props {
  data: IBarrelDetailResponse
}

export function BarrelDetail({ data }: Props) {
  const date = parse(
    data.detalhes.dataInstalacao,
    'yyyy-MM-dd HH:mm:ss',
    new Date(),
  )

  return (
    <div className="flex flex-col gap-2 rounded-md bg-white mt-auto w-full max-w-[150px] p-4">
      <span className="text-xs font-bold mb-4">Detalhes do Tambor</span>
      <div className="text-xs border-b border-b-slate-200 pb-2">
        <p className="font-bold">Data de Instalação</p>
        <p className="text-slate-600">{format(date, 'dd/MM/yyyy')}</p>
      </div>
      <div className="text-xs border-b border-b-slate-200 pb-2">
        <p className="font-bold">Horas Trabalhadas</p>
        <p className="text-slate-600">{data.detalhes.horasTrabalhadas} horas</p>
      </div>
      <div className="text-xs">
        <p className="font-bold">Responsável</p>
        <p className="text-slate-600">{data.detalhes.responsavelInstalacao}</p>
      </div>
    </div>
  )
}
