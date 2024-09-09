import { IBarrelDetailsResponse } from '@/models/Barrel'

export const fakeBarrel1: IBarrelDetailsResponse = {
  TAG: 'XX-0102VLC',
  responsavelInstalacao: 'Leonardo Furlan',
  dataInstalacao: '2024-08-15',
  horasTrabalhadas: 84,
  localizacao: { latidude: 12, longitude: 13 },
  placas: [
    {
      codigo: '36',
      secoes: { secao1: 10, secao2: 10, secao3: 10 },
    },
    {
      codigo: '37',
      secoes: { secao1: 10, secao2: 10, secao3: 10 },
    },
    {
      codigo: '38',
      secoes: { secao1: 10, secao2: 10, secao3: 10 },
    },
  ],
}

export const fakeBarrel2: IBarrelDetailsResponse = {
  TAG: 'XX-0102VLC',
  responsavelInstalacao: 'Leonardo Furlan',
  dataInstalacao: '2024-08-15',
  horasTrabalhadas: 84,
  localizacao: { latidude: 12, longitude: 13 },
  placas: [
    {
      codigo: '39',
      secoes: { secao1: 8, secao2: 8, secao3: 8 },
    },
    {
      codigo: '40',
      secoes: { secao1: 8, secao2: 8, secao3: 8 },
    },
    {
      codigo: '41',
      secoes: { secao1: 8, secao2: 8, secao3: 8 },
    },
  ],
}

export const fakeBarrel3: IBarrelDetailsResponse = {
  TAG: 'XX-0102VLC',
  responsavelInstalacao: 'Leonardo Furlan',
  dataInstalacao: '2024-08-15',
  horasTrabalhadas: 84,
  localizacao: { latidude: 12, longitude: 13 },
  placas: [
    {
      codigo: '42',
      secoes: { secao1: 0, secao2: 0, secao3: 0 },
    },
    {
      codigo: '43',
      secoes: { secao1: 0, secao2: 0, secao3: 0 },
    },
    {
      codigo: '44',
      secoes: { secao1: 0, secao2: 0, secao3: 0 },
    },
  ],
}
