import { useEffect, useState } from 'react'

import DatePicker, { DatePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { Popover, Segmented, TimePicker } from 'antd'
import { AlertCircle, Code, Edit2 } from 'react-feather'
import { TimeUnit, TimeUnitCH, dateFormat, diffTimeUnit, format } from './constants/EnumType'
import { fetchDayjs } from './utils/function'
import TimeList from './constants/TimeList'

const App = () => {
  const [selectTime, setSelectTime] = useState<TimeType>({
    DisabledDate: true,
    Date: null,
    StartTime: null,
    EndTime: null,
  })

  const [recordTimeList, setRecordTimeList] = useState<TimeListType[]>([])
  const [timeUnit, setTimeUnit] = useState<TimeUnitType>(diffTimeUnit)

  useEffect(() => {
    const localTime: TimeType = JSON.parse(localStorage.getItem('Time')!)
    const localTimeList: TimeListType[] = JSON.parse(localStorage.getItem('List')!)

    const today = dayjs().format(dateFormat)
    const isSameDay = localTime && dayjs(today).isSame(dayjs(localTime.Date), 'day')

    setSelectTime({
      DisabledDate: true,
      Date: today,
      StartTime: isSameDay ? fetchDayjs(localTime.StartTime) : null,
      EndTime: isSameDay ? fetchDayjs(localTime.EndTime) : null,
    })

    setRecordTimeList(localTimeList || [])
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
      dayjs(selectTime.EndTime).diff(selectTime.StartTime, diffTimeUnit),
    )
    const Timestamp = dayjs().valueOf() // 取得時間戳

    const newList: TimeListType = {
      Timestamp,
      Date: selectTime.Date!,
      StartTime: selectTime.StartTime.format(format),
      EndTime: selectTime.EndTime.format(format),
      DiffTime: diffTime,
    }

    const updatedList: TimeListType[] = [newList, ...recordTimeList]
    // 僅存 10 筆，刪除最舊的資料
    if (updatedList.length > 10) {
      updatedList.pop()
    }
    setRecordTimeList(updatedList)

    // 移除 Time localStorage，存 List localStorage
    localStorage.removeItem('Time')
    localStorage.setItem('List', JSON.stringify(updatedList))
  }

  const showTimeDiff = (diff: number): number | string | undefined => {
    switch (timeUnit) {
      case TimeUnit.H:
        return (diff / 60).toFixed(2);
      case TimeUnit.M:
        return diff.toFixed(0);
      case TimeUnit.S:
        return (diff * 60).toFixed(0);
      default:
        return undefined;
    }

  }

  return (
    <main>
      <div className="select-time">
        <div className="select-time-item">
          <span>日期</span>
          <DatePicker
            onChange={changeDate}
            showToday
            value={dayjs(selectTime.Date, dateFormat)}
            format={dateFormat}
            allowClear={false}
            disabled={selectTime.DisabledDate}
          />
          <label
            className="edit-date"
            onClick={() => {
              setSelectTime((prev) => ({ ...prev, DisabledDate: !prev.DisabledDate }))
            }}
          >
            <Edit2 size={18} />
          </label>
        </div>
        <div className="select-time-item">
          <span>開始時間</span>
          <TimePicker
            value={selectTime.StartTime}
            format={format}
            onChange={changeStartTime}
            showNow={false}
          />
          <button className="button-secondary" type="button" onClick={() => changeStartTime(dayjs())}>此刻</button>
        </div>
        <p className="change-button" onClick={exchangeTime}><Code size={18} /></p>
        <div className="select-time-item">
          <span>結束時間</span>
          <TimePicker
            value={selectTime.EndTime}
            format={format}
            onChange={changeEndTime}
            showNow={false}
          />
          <button className="button-secondary" type="button" onClick={() => changeEndTime(dayjs())}>此刻</button>
        </div>
        <button type="button" onClick={calcTimeDiff} disabled={!selectTime.StartTime || !selectTime.EndTime}>計算</button>
      </div>
      <div className="time-list">
        <div className="time-list-section">
          時間紀錄
          <Popover content="僅紀錄10筆" className="time-list-popover">
            <button type="button" className='tooltip'><AlertCircle size={14} /></button>
          </Popover>

        </div>
        <hr />
        <div className='Tags'>
          <Segmented
            defaultValue={TimeUnitCH[diffTimeUnit]}
            onChange={(value) => {
              const parentEnum: TimeUnit | undefined = (Object.keys(TimeUnit) as (keyof typeof TimeUnit)[]).find(
                key => TimeUnitCH[TimeUnit[key]] === value
              ) as TimeUnit | undefined

              if (parentEnum) {
                setTimeUnit(TimeUnit[parentEnum as unknown as keyof typeof TimeUnit])
              }
            }}
            options={Object.keys(TimeUnit).map((key) => TimeUnitCH[TimeUnit[key as keyof typeof TimeUnit]])}
          />
        </div>
        <ul className="time-list-header">
          {TimeList.map((item) => (<li key={item}>{item}</li>))}
        </ul>
        <ul className="time-list-body">
          {recordTimeList.map((item) => (
            <li key={item.Timestamp} className="time-list-item">
              <div>{item.Date}</div>
              <div>
                {item.StartTime}
                &nbsp; - &nbsp;
                {item.EndTime}
              </div>
              <div>
                {showTimeDiff(item.DiffTime) ? `${showTimeDiff(item.DiffTime)}${TimeUnitCH[timeUnit]}` : "錯誤"}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default App
