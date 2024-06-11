export type DayLog = {
  [key: string]: string | number | {} | null
  id: number | null
  startTime: number | null
  pauseDuration: string | null
  endTime: number | null
  totalDuration: string | null
  pausaInicio: number | null
  pausaFim: number | null
  obs: {
    [key: string]: string | null
    startTime: string | null
    pausa: string | null
    endTime: string | null
  }
}
