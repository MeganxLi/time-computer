import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

export const fetchDayjs = (time: Dayjs | null) => (time ? dayjs(time) : null)

export default fetchDayjs
