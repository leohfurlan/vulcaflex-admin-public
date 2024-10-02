import { IBarrelDetailResponse } from '@/models/Barrel'

export const fakeBarrel: IBarrelDetailResponse = {
  detalhes: {
    dataInstalacao: '2024-09-13 00:00:00',
    horasTrabalhadas: 0,
    localizacao: {
      latitude: 0.0,
      longitude: 0.0,
    },
    placas: [
      {
        codigo: '1',
        secoes: {
          secao1: 8.0,
          secao2: 10.0,
          secao3: 10.0,
        },
      },
      {
        codigo: '2',
        secoes: {
          secao1: 8.0,
          secao2: 10.0,
          secao3: 10.0,
        },
      },
      {
        codigo: '3',
        secoes: {
          secao1: 8.0,
          secao2: 10.0,
          secao3: 10.0,
        },
      },
    ],
    responsavelInstalacao: 'Leonardo Furlan',
  },
}
