import { Switch, Route, useParams, Link  } from 'wouter'
import { useQuery } from '@tanstack/react-query'

interface Events {
  id: number
  date: string
  title: string
  description: string
}

const Year = () => {
  return (
    <div>
      year
    </div>
  )
}

const Month = () => {
  const params = useParams()

  return (
    <div>
      month {params.id} {params.gg}
      <Link to='#add-new'>
        <button>add new</button>
      </Link>
    </div>
  )
}

const Week = () => {
  return (
    <div>
      week
      <Link to='#add-new'>
        <button>add new</button>
      </Link>
    </div>
  )
}

const Date = () => {
  return (
    <div>
      date
      <Link to='#add-new'>
        <button>add new</button>
      </Link>
    </div>
  )
}

const MainView = () => {
  const result = useQuery<Events[]>({
    queryKey: ['events'],
    queryFn: () => fetch('http://127.0.0.1:3000/').then(res => res.json())
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
      <Link to='/year'>
        <button>year</button>
        <br />
      </Link>
      <Link to='/month'>
        <button>month</button>
        <br />
      </Link>
      <Link to='/week'>
        <button>week</button>
        <br />
      </Link>
      <Link to='/date'>
        <button>date</button>
        <br />
      </Link>
      <Switch>
        <Route path='/year' component={Year} />
        <Route path='/month' component={Month} />
        <Route path='/week' component={Week} />
        <Route path='/date' component={Date} />
      </Switch>
    </div>
  )
}

export default MainView
