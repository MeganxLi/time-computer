import { useEffect, useState } from 'react'

import './App.css'
import DatePicker, { DatePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { TimePicker } from 'antd'
import { Code, Edit2 } from 'react-feather'
import { dateFormat, diffTimeUnit, format } from './constants/EnumType'
import fetchDayjs from './utils/function'

function App() {
  const [selectTime, setSelectTime] = useState<TimeType>({
    DisabledDate: true,
    Date: null,
    StartTime: null,
    EndTime: null,
  })

  const [recordTimeList, setRecordTimeList] = useState<TimeListType[]>([])

  useEffect(() => {
    const localTime: TimeType = JSON.parse(localStorage.getItem('Time')!)

    const today = dayjs().format(dateFormat)
    const isSameDay = localTime && dayjs(today).isSame(dayjs(localTime.Date), 'day')

    setSelectTime({
      DisabledDate: true,
      Date: today,
      StartTime: isSameDay ? fetchDayjs(localTime.StartTime) : null,
      EndTime: isSameDay ? fetchDayjs(localTime.EndTime) : null,
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('Time', JSON.stringify(selectTime))
  }, [selectTime])

  const changeDate: DatePickerProps['onChange'] = (_date, dateString) => {
    setSelectTime((prev) => ({ ...prev, Date: dateString }))
  }

  const changeStartTime = (time: Dayjs | null) => {
    setSelectTime((prev) => ({ ...prev, StartTime: time }))
  }

  const changeEndTime = (time: Dayjs | null) => {
    setSelectTime((prev) => ({ ...prev, EndTime: time }))
  }

  const exchangeTime = () => {
    setSelectTime((prev) => ({ ...prev, StartTime: prev.EndTime, EndTime: prev.StartTime }))
  }

  const calcTimeDiff = () => {
    const diffTime = Number(
      dayjs(selectTime.EndTime).diff(selectTime.StartTime, diffTimeUnit, true).toFixed(2),
    )
    const Timestamp = dayjs().valueOf() // 取得時間戳
    const updatedList: TimeListType[] = [
      {
        Timestamp,
        Date: selectTime.Date!,
        StartTime: selectTime.StartTime,
        EndTime: selectTime.EndTime,
        DiffTime: diffTime,
      },
      ...recordTimeList,
    ]
    setRecordTimeList(updatedList)
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
        <p onClick={exchangeTime}><Code /></p>
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
        <button type="button" onClick={calcTimeDiff} disabled={!selectTime.StartTime || !selectTime.EndTime}>計算</button>
      </div>
      <hr />
      <div>
        <ul>
          {recordTimeList.map((item) => (
            <li key={item.Timestamp}>
              <div>{item.Date}</div>
              <div>
                {item.StartTime.format(format)}
                -
                {item.EndTime.format(format)}
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
