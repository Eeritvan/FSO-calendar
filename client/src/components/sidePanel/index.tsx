import { lazy, Suspense } from 'react'
import { Route, Switch } from 'wouter'

const Settings = lazy(() => import('../settings'))
const Users = lazy(() => import('../users'))
const Counter = lazy(() => import('../counter'))

const SidePanel = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path='/settings' component={Settings} />
        <Route path='/users/:name' component={Users} />
        <Route path='/counter' component={Counter} />
        <Route> 404: No such page! </Route>
      </Switch>
    </Suspense>
  )
}

export default SidePanel