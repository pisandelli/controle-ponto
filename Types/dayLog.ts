export type DayLog = {
  [key: string]: string | number | {} | null
  id: number | null
  email: string | null
  startTime: number | null
  pauseDuration: number
  endTime: number | null
  totalDuration: number
  pausaInicio: number | null
  pausaFim: number | null
  obsStart: string | null
  obsEnd: string | null
}
