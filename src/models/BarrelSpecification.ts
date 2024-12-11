import { IPlate } from './Barrel'

export interface IBarrelSpecificationResponse {
  especificacao: string
  espessuraAtual: IPlate[]
  lista: string[]
  qnt_placas: number
  qnt_processos: number
  qnt_tambores: number
  qnt_transportadores: number
}
