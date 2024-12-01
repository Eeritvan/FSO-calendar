import { lazy, Suspense } from 'react'
import { Router, Link, Route, Switch } from 'wouter'

const Settings = lazy(() => import('./routes/settings'))
const Users = lazy(() => import('./routes/users'))

const App = () => {
  return (
    <Router>
      <div>
        <Link to='/settings'>settings</Link>
        <Link to='/users/321'>users</Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path='/settings' component={Settings} />
          <Route path='/users/:name' component={Users} />
          <Route>
            404: No such page!
          </Route>
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App