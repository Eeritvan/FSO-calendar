import { Link } from 'wouter'

const MainView = () => {
  return (
    <>
      <Link to='/settings'>settings</Link>
      <br />
      <Link to='/users/321'>users</Link>
      <br />
    </>
  )
}

export default MainView