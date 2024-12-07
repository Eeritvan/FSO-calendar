import { lazy, Suspense } from 'react'
import { Router, Link, Route, Switch } from 'wouter'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

const Settings = lazy(() => import('./routes/settings'))
const Users = lazy(() => import('./routes/users'))
const Counter = lazy(() => import('./routes/counter'))

const App = () => {
  return (
    <Router>
      <div className='flex h-screen w-screen'>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className='bg-red-600 rounded-lg p-2 m-1'>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route path='/settings' component={Settings} />
                <Route path='/users/:name' component={Users} />
                <Route path='/counter' component={Counter} />
                <Route> 404: No such page! </Route>
              </Switch>
            </Suspense>
          </ResizablePanel>
          <ResizableHandle className='my-3 w-1 rounded-sm' withHandle/>
          <ResizablePanel className='bg-blue-600 rounded-lg p-2 m-1'>
            <Link to='/settings'>settings</Link>
            <br />
            <Link to='/users/321'>users</Link>
            <br />
            <Link to='/counter'>counter</Link>
            <br />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Router>
  )
}

export default App