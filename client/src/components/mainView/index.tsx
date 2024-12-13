import { Link } from 'wouter'
import { useQuery } from '@tanstack/react-query'
import ky from 'ky'

interface Todo {
  id: number
  todo: string
  completed: boolean
  userId: number
}

interface TodosResponse {
  todos: Todo[]
  total: number
  skip: number
  limit: number
}

const MainView = () => {
  const result = useQuery<TodosResponse>({
    queryKey: ['todos'],
    queryFn: () => ky('http://127.0.0.1:3000/').json()
  })

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return <div>Error: {result.error.message}</div>
  }

  const todos = result.data

  return (
    <div className='bg-blue-600 rounded-lg p-2 m-1'>
      <Link to='/settings'>settings</Link>
      <br />
      <Link to='/users/321'>users</Link>
      <br />
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  )
}

export default MainView
