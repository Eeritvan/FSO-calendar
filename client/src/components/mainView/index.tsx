import { Link } from 'wouter'

const MainView = () => {
  return (
    <div className='bg-blue-600 rounded-lg p-2 m-1'>
      <Link to='/settings'>settings</Link>
      <br />
      <Link to='/users/321'>users</Link>
      <br />
    </div>
  )
}

export default MainView
