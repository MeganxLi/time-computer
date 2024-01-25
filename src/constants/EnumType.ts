export const dateFormat = 'YYYY/MM/DD'
export const format = 'HH:mm a'
export const maxLength = 10

export enum TimeUnit {
  H = 'hours',
  M = 'minutes',
  S = 'seconds',
}
export const diffTimeUnit: TimeUnitType = TimeUnit.M

export const TimeUnitCH = {
  [TimeUnit.H]: "時",
  [TimeUnit.M]: "分",
  [TimeUnit.S]: "秒",
} as const