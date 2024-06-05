// TODO: Review all types.
export type DayLog = {
  [key: string]: string | number | {} | null
  startTime: number | null
  pauseDuration: string | null
  endTime: number | null
  totalDuration: string | null
  obs: {
    [key: string]: string | null
    startTime: string | null
    pausa: string | null
    endTime: string | null
  }
}
