import { useEffect, useState } from 'react'

import './App.css'
import DatePicker, { DatePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { TimePicker } from 'antd'
import { dateFormat, format } from './constants/EnumType'

function App() {
  const [selectTime, setSelectTime] = useState<TimeType>({
    Date: null,
    StartTime: null,
    EndTime: null,
  })

  useEffect(() => {
    const today = dayjs().format(dateFormat)
    setSelectTime((prev) => ({ ...prev, Date: today }))
  }, [])

  const changeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString, '--', selectTime)
    setSelectTime((prev) => ({ ...prev, Date: dateString }))
  }

  const changeStartTime = (time: Dayjs | null) => {
    console.log(time)

    setSelectTime((prev) => ({ ...prev, StartTime: time }))
  }

  const changeEndTime = (time: Dayjs | null) => {
    setSelectTime((prev) => ({ ...prev, EndTime: time }))
  }

  return (
    <main>
      <div>
        <span>日期</span>
        <DatePicker
          onChange={changeDate}
          showToday
          value={dayjs(selectTime.Date, dateFormat)}
          format={dateFormat}
          allowClear={false}
        />
      </div>
      <div>
        <span>開始時間</span>
        <TimePicker
          value={selectTime.StartTime}
          format={format}
          onChange={changeStartTime}
          showNow={false}
        />
        <button type="button" onClick={() => changeStartTime(dayjs())}>此刻</button>
      </div>
      <div>
        <span>結束時間</span>
        <TimePicker
          value={selectTime.EndTime}
          format={format}
          onChange={changeEndTime}
          showNow={false}
        />
        <button type="button" onClick={() => changeEndTime(dayjs())}>此刻</button>
      </div>

    </main>
  )
}

export default App
