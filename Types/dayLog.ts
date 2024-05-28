// TODO: Review all types.
export type DayLog = {
  [key: string]: number | boolean | {} | null
  entrada: Date | null
  pausaInicio: Date | null
  pausaFim: Date | null
  pausaDuration: string | null
  saida: Date | null
  soma: string | null
  obs: {
    [key: string]: string | null
    entrada: string | null
    pausa: string | null
    saida: string | null
  }
}
