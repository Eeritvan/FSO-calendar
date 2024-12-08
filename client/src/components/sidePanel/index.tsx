import { lazy, Suspense } from 'react'
import { Route, Switch } from 'wouter'

const Settings = lazy(() => import('../settings'))
const Users = lazy(() => import('../users'))

const SidePanel = () => {
  return (
    <div className='bg-red-600 rounded-lg p-2 m-1'>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path='/settings' component={Settings} />
          <Route path='/users/:name' component={Users} />
          <Route> 404: No such page! </Route>
        </Switch>
      </Suspense>
    </div>
  )
}

export default SidePanel
