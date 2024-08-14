export interface IPlate {
  codigo: string
  secoes: {
    secao1: number
    secao2: number
    secao3: number
  }
}

interface ILocation {
  latidude: number
  longitude: number
}

export interface IBarrelDetailsResponse {
  TAG: string
  localizacao: ILocation
  dataInstalacao: string
  horasTrabalhadas: number
  responsavelInstalacao: string
  placas: IPlate[]
}
