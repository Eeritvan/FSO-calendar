import { Link, Route, Switch, useLocation } from 'wouter'
import Login from './login'
import Register from './register'

const AuthTabs = () => {
  const [location] = useLocation()

  return (
    <div>
      <div className="flex gap-4">
        <Link to="/login"> Login </Link>
        <Link to="/register"> Register </Link>
      </div>

      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  )
}

export default AuthTabs
