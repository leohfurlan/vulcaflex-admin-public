export interface ISection {
  secao1: number
  secao2: number
  secao3: number
}
export interface IPlateHistory {
  codigo: string
  data: string
  secoes: ISection
}

export interface IBarrelHistoryResponse {
  historico: IPlateHistory[]
}
