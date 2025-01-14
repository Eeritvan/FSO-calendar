import { Link, Route, Switch } from 'wouter'
import Login from './login'
import Register from './register'
import Selector from '../selector'

const AuthTabs = () => {

  return (
    <>
      <Selector>
        <Link to='/login'> Login </Link>
        <Link to='/register'> Register </Link>
      </Selector>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    </>
  )
}

export default AuthTabs
