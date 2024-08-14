import { IBarrelDetailsResponse } from '@/models/Barrel'

export const fakeBarrel: IBarrelDetailsResponse = {
  TAG: 'XX-0102VLC',
  responsavelInstalacao: 'Leonardo Furlan',
  dataInstalacao: '2024-08-15',
  horasTrabalhadas: 84,
  localizacao: { latidude: 12, longitude: 13 },
  placas: [
    {
      codigo: '18',
      secoes: { secao1: 5, secao2: 5, secao3: 8 },
    },
    {
      codigo: '19',
      secoes: { secao1: 10, secao2: 10, secao3: 10 },
    },
    {
      codigo: '20',
      secoes: { secao1: 0, secao2: -1, secao3: 10 },
    },
  ],
}
