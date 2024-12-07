import { lazy, Suspense } from 'react'
import { Router, Link, Route, Switch } from 'wouter'

const Settings = lazy(() => import('./routes/settings'))
const Users = lazy(() => import('./routes/users'))
const Counter = lazy(() => import('./routes/counter'))

const App = () => {
  return (
    <>
      {/* <Router>
       <h1 className="text-3xl font-bold underline">
         Hello world!
       </h1>
      <div>
        <Link to='/settings'>settings</Link>
        <Link to='/users/321'>users</Link>
        <Link to='/counter'>counter</Link>
      </div> */}
      <div className='flex h-screen w-screen'>
        <div className='container justify-center bg-red-500 min-w-52'>
          testi
        </div>
        <div className='container bg-blue-600'>
          testi
        </div>
      </div>
      {/* <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path='/settings' component={Settings} />
          <Route path='/users/:name' component={Users} />
          <Route path='/counter' component={Counter} />
          <Route> 404: No such page! </Route>
        </Switch>
      </Suspense>
    </Router> */}
    </>
  )
}

export default App