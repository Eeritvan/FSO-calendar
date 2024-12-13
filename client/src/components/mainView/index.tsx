import { Link } from 'wouter'
import { useQuery } from '@tanstack/react-query'
import ky from 'ky'

interface Events {
  id: number
  date: string
  title: string
  description: string
}

const MainView = () => {
  const result = useQuery<Events[]>({
    queryKey: ['events'],
    queryFn: () => ky('http://127.0.0.1:3000/').json()
  })

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return <div>Error: {result.error.message}</div>
  }

  const events = result.data

  return (
    <div className='bg-blue-600 rounded-lg p-2 m-1'>
      <Link to='/settings'>settings</Link>
      <br />
      {events && events.map((x: Events) => (
        <>
          <br />
          <div>
            <p> {x.id} </p>
            <p> {x.date} </p>
            <p> {x.title} </p>
            <p> {x.description} </p>
          </div>
        </>
      ))}
    </div>
  )
}

export default MainView
