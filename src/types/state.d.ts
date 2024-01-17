type TimeType = {
  DisabledDate: boolean,
  Date: string | null,
  StartTime: Dayjs | null,
  EndTime: Dayjs | null
}

type TimeListType = {
  Timestamp: number,
  Date: string,
  StartTime: Dayjs,
  EndTime: Dayjs,
  DiffTime: Dayjs,
}
