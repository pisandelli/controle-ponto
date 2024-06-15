export type DayLog = {
  [key: string]: string | number | {} | null
  id: number | null
  startTime: number | null
  pauseDuration: number
  endTime: number | null
  totalDuration: number
  pausaInicio: number | null
  pausaFim: number | null
  obs: {
    [key: string]: string | null
    startTime: string | null
    pausa: string | null
    endTime: string | null
  }
}
