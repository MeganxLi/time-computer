import { useEffect, useState } from 'react'

import './App.css'
import DatePicker, { DatePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'

const dateFormat = 'YYYY/MM/DD'

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

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString, '--', selectTime)
    setSelectTime((prev) => ({ ...prev, Date: dateString }))
  }
  return (
    <main>
      <span>日期</span>
      <DatePicker
        onChange={onChange}
        showToday
        value={dayjs(selectTime.Date, dateFormat)}
        format={dateFormat}
        allowClear={false} // 禁用清除日期
      />
    </main>
  )
}

export default App
