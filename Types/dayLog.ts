export type DayLog = {
    [key: string]: number | boolean | {} | null
    entrada: number | null
    pausaInicio: number | null
    pausaFim: number | null
    saida: number | null
    soma: number | null
    obs: {
      [key: string]: string | null
      entrada: string | null
      pausaInicio: string | null
      pausaFim: string | null
      saida: string | null
    }
}