import { IPlate } from './Barrel'

interface ILocation {
  lat: number
  lng: number
}

export interface IBarrelSpecificationResponse {
  especificacao: string
  espessuraAtual: IPlate[]
  lista: string[]
  localizacao: ILocation
  qnt_placas: number
  qnt_processos: number
  qnt_tambores: number
  qnt_transportadores: number
}
