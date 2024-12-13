import { lazy, Suspense } from 'react'
import { Route, Switch, Link } from 'wouter'

const Settings = lazy(() => import('../settings'))
const addNew = lazy(() => import('../addNew'))

const SidePanel = () => {
  return (
    <div className='bg-red-600 rounded-lg p-2 m-1'>
      <Link to='/settings'>settings</Link>
      <br />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path='/settings' component={Settings} />
          <Route path='/add-new' component={addNew} />
          <Route> 404: No such page! </Route>
        </Switch>
      </Suspense>
    </div>
  )
}

export default SidePanel
