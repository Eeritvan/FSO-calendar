import { useParams  } from 'wouter'
import dayjs from 'dayjs'

interface Dates {
  year: number
  month: number
  day: number
}

interface MonthParams {
  year: string;
  month: string;
}

const Month = () => {
  // eslint-disable-next-line react-compiler/react-compiler
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = useParams<MonthParams>()
  const dates: Dates[] = []
  const year = Number(params.year)
  const month = Number(params.month)

  for (let i = 1; i <= dayjs(`${year}-${month}-01`).daysInMonth(); i++) {
    dates.push({
      year: year,
      month: month,
      day: i
    })
  }

  return (
    <>
      {year} {month}
      <div className='grid grid-cols-7 gap-2'>
        {dates.map((x) => (
          <div key={x.day} className='bg-green-600 h-[8rem] hover:bg-red-400'>
            {x.day}a
          </div>
        ))}
      </div>
    </>
  )
}

export default Month
