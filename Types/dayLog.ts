// TODO: Review all types.
export type DayLog = {
  [key: string]: string | number | {} | null
  entrada: number | null
  pausaDuration: string | null
  saida: number | null
  soma: string | null
  obs: {
    [key: string]: string | null
    entrada: string | null
    pausa: string | null
    saida: string | null
  }
}
