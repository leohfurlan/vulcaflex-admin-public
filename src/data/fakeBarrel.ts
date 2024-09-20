import { IBarrelDetailResponse } from '@/models/Barrel'

export const fakeBarrel: IBarrelDetailResponse = {
  detalhes: [
    {
      dataInstalacao: '2024-09-13 00:00:00',
      horasTrabalhadas: 0,
      localizacao: {
        latitude: 0.0,
        longitude: 0.0,
      },
      placas: {
        codigo: '1',
        secoes: {
          secao1: 8.0,
          secao2: 10.0,
          secao3: 10.0,
        },
      },
      responsavelInstalacao: 'Leonardo Furlan',
    },
    {
      dataInstalacao: '2024-09-13 00:00:00',
      horasTrabalhadas: 0,
      localizacao: {
        latitude: 0.0,
        longitude: 0.0,
      },
      placas: {
        codigo: '2',
        secoes: {
          secao1: 5.0,
          secao2: 5.0,
          secao3: 8.0,
        },
      },
      responsavelInstalacao: 'Bruno Rezende',
    },
    {
      dataInstalacao: '2024-09-13 00:00:00',
      horasTrabalhadas: 0,
      localizacao: {
        latitude: 0.0,
        longitude: 0.0,
      },
      placas: {
        codigo: '3',
        secoes: {
          secao1: 8.0,
          secao2: 10.0,
          secao3: 8.0,
        },
      },
      responsavelInstalacao: 'Bruna LLK',
    },
  ],
}
