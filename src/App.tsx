import { useEffect, useState } from 'react'

import './App.css'
import DatePicker, { DatePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { TimePicker } from 'antd'
import { Edit2 } from 'react-feather'
import { dateFormat, diffTimeUnit, format } from './constants/EnumType'

function App() {
  const [selectTime, setSelectTime] = useState<TimeType>({
    DisabledDate: true,
    Date: null,
    StartTime: null,
    EndTime: null,
  })

  const [recordTimeList, setRecordTimeList] = useState<TimeListType[]>([])

  useEffect(() => {
    const today = dayjs().format(dateFormat)
    setSelectTime((prev) => ({ ...prev, Date: today }))
  }, [])

  const changeDate: DatePickerProps['onChange'] = (_date, dateString) => {
    setSelectTime((prev) => ({ ...prev, Date: dateString }))
  }

  const changeStartTime = (time: Dayjs | null) => {
    setSelectTime((prev) => ({ ...prev, StartTime: time }))
  }

  const changeEndTime = (time: Dayjs | null) => {
    setSelectTime((prev) => ({ ...prev, EndTime: time }))
  }

  const calcTimeDiff = () => {
    const diffTime = Number(
      dayjs(selectTime.EndTime).diff(selectTime.StartTime, diffTimeUnit, true).toFixed(2),
    )
    const Timestamp = dayjs().valueOf() // 取得時間戳
    setRecordTimeList((prev) => {
      const updatedList: TimeListType[] = [
        {
          Timestamp,
          Date: selectTime.Date!,
          StartTime: selectTime.StartTime,
          EndTime: selectTime.EndTime,
          DiffTime: diffTime,
        },
        ...prev,
      ]
      return updatedList
    })
  }

  return (
    <main>
      <div>
        <div>
          <span>日期</span>
          <DatePicker
            onChange={changeDate}
            showToday
            value={dayjs(selectTime.Date, dateFormat)}
            format={dateFormat}
            allowClear={false}
            disabled={selectTime.DisabledDate}
          />
          <label onClick={() => {
            setSelectTime((prev) => ({ ...prev, DisabledDate: !prev.DisabledDate }))
          }}
          >
            <Edit2 />
          </label>
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
        <button type="button" onClick={calcTimeDiff}>計算</button>
      </div>
      <hr />
      <div>
        <ul>
          {recordTimeList.map((item) => (
            <li key={item.Timestamp}>
              <div>{item.Date}</div>
              <div>
                {selectTime.StartTime.format(format)}
                -
                {selectTime.StartTime.format(format)}
              </div>
              <div>
                {item.DiffTime}
                小時
              </div>
            </li>
          ))}
        </ul>
      </div>

    </main>
  )
}

export default App
