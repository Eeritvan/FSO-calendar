/* eslint-disable max-len */
import { Link, Route, Switch, useLocation } from 'wouter'
import Login from './login'
import Register from './register'

const AuthTabs = () => {
  const [location] = useLocation()

  return (
    <div className='flex flex-col w-[400px]'>
      <div className='relative rounded-xl inline-flex bg-neutral-200 h-12 p-1'>
        <div className={`absolute rounded-xl bg-white h-[calc(100%-8px)] w-[calc(50%-0.25rem)] transition-all duration-200 ${
          location === '/login' ? '' : 'translate-x-full'}`} />
        <Link
          to='/login'
          className={`relative rounded-xl flex items-center justify-center w-1/2 ${
            location === '/login' ? 'font-bold' : 'text-neutral-500 font-semibold'
          }`}
        >
          Sign in
        </Link>
        <Link
          to='/register'
          className={`relative rounded-xl flex items-center justify-center w-1/2 ${
            location === '/register' ? 'font-bold' : 'text-neutral-500 font-semibold'
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
  )
}

export default AuthTabs
