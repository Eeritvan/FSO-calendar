/* eslint-disable react/no-multi-comp */
/* eslint-disable max-len */
import { useParams  } from 'wouter'
import dayjs from 'dayjs'
import { FixedSizeGrid } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useState, useCallback } from 'react'

interface MonthParams {
  year: string;
  month: string;
}

interface DateCellProps {
  columnIndex: number
  rowIndex: number
  style: React.CSSProperties
}

const getMonth = (month: number): string => {
  return dayjs().month(month - 1).format('MMMM')
}

const getDateNames = (): string[] => {
  return Array.from({ length: 7 }, (_, i) =>
    dayjs().day(i).format('ddd')
  )
}

const DateCell = ({ columnIndex, rowIndex, style }: DateCellProps) => {
  const calculateDate = () => {
    const totalDays = rowIndex * 7 + columnIndex
    const baseDate = dayjs().startOf('month')
    const date = baseDate.add(totalDays - baseDate.day(), 'day')
    return date
  }

  const date = calculateDate()
  const isToday = date.isSame(dayjs(), 'day')

  return (
    <div
      style={style}
      className={`border-b border-r p-2 ${ isToday ? 'bg-blue-300' : '' }`}
    >
      <span> {date.format('D')} </span>
    </div>
  )
}

const Month = () => {
  const params = useParams<MonthParams>()
  const initialYear = Number(params.year)
  const initialMonth = Number(params.month)
  const [visibleMonth, setVisibleMonth] = useState(initialMonth)
  const [visibleYear, setVisibleYear] = useState(initialYear)

  const handleScroll = useCallback(({ scrollTop }: { scrollTop: number }) => {
    const rowHeight = window.innerHeight / 6
    const monthIndex = Math.floor(scrollTop / (rowHeight * 6))

    const newMonth = initialMonth + monthIndex
    const yearOffset = Math.floor((newMonth - 1) / 12)
    const adjustedMonth = ((newMonth - 1) % 12) + 1
    const newYear = initialYear + yearOffset

    if (adjustedMonth !== visibleMonth || newYear !== visibleYear) {
      setVisibleMonth(adjustedMonth)
      setVisibleYear(newYear)
    }
  }, [initialMonth, initialYear, visibleMonth, visibleYear])

  return (
    <div className="h-screen">
      looking at {getMonth(visibleMonth)} {visibleYear}
      <div className='sticky top-2 h-14 bg-white grid rounded-xl grid-cols-7 mb-2'>
        {getDateNames().map(day => (
          <div key={day} className="flex justify-center items-center text-center font-semibold">
            {day}
          </div>
        ))}
      </div>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeGrid
            columnCount={7}
            columnWidth={width/7}
            rowCount={1000}
            rowHeight={height/6}
            width={width}
            height={height}
            onScroll={handleScroll}
          >
            {DateCell}
          </FixedSizeGrid>
        )}
      </AutoSizer>
    </div>
  )
}

export default Month
