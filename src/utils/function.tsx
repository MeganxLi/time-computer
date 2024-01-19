import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

// eslint-disable-next-line import/prefer-default-export
export const fetchDayjs = (time: Dayjs | null) => (time ? dayjs(time) : null)
