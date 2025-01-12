/* eslint-disable max-len */
import { Link, Route, Switch, useLocation } from 'wouter'
import Login from './login'
import Register from './register'

const AuthTabs = () => {
  const [location] = useLocation()

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-[400px] items-center'>
        <div className='grid grid-cols-2 h-12 rounded-xl bg-neutral-200 p-1 gap-2'>
          <Link
            to='/login'
            className={`flex items-center justify-center rounded-xl ${
              location === '/login' ? 'bg-white font-bold' : 'text-neutral-500 font-semibold'
            }`}
          >
            Sign in
          </Link>
          <Link
            to='/register'
            className={`flex items-center justify-center rounded-xl ${
              location === '/register' ? 'bg-white font-bold' : 'text-neutral-500 font-semibold'
            }`}
          >
            Sign up
          </Link>
        </div>

        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </div>
    </div>
  )
}

export default AuthTabs
